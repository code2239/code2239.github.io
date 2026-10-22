import {runGame,validateConfig,pairSeed,mean,interval} from './engine.mjs';
self.onmessage=({data})=>{try{
 const {mode,config,a,b,strategies,reps,weights}=data;validateConfig(config);
 if(mode==='duel'){self.postMessage({type:'done',result:runGame(a,b,config)});return;}
 if(!Number.isInteger(reps)||reps<2||reps>30||strategies.length<2||strategies.length>8||weights.some(w=>!Number.isFinite(w)||w<0)||!weights.some(w=>w>0))throw Error('请至少选两个策略，并设置有效的对手权重。');
 const k=strategies.length,mat=Array.from({length:k},()=>Array.from({length:k},()=>[])),coops=Array.from({length:k},()=>Array.from({length:k},()=>[]));
 const total=k*(k+1)/2*reps;let done=0;
 for(let i=0;i<k;i++)for(let j=i;j<k;j++)for(let r=0;r<reps;r++){
  const result=runGame(strategies[i],strategies[j],{...config,seed:pairSeed(config.seed,i,j,r)},false);
  if(i===j){mat[i][j].push((result.avgA+result.avgB)/2);coops[i][j].push((result.coopA+result.coopB)/2);}
  else{mat[i][j].push(result.avgA);mat[j][i].push(result.avgB);coops[i][j].push(result.coopA);coops[j][i].push(result.coopB);}
  done++;if(done%Math.max(1,Math.ceil(total/100))===0||done===total)self.postMessage({type:'progress',value:done/total});
 }
 const sum=weights.reduce((a,b)=>a+b,0),w=weights.map(v=>v/sum);
 const samples=mat.map(row=>Array.from({length:reps},(_,r)=>row.reduce((s,v,j)=>s+w[j]*v[r],0)));
 const ranking=strategies.map((s,i)=>({...s,index:i,...interval(samples[i]),samples:samples[i],coop:coops[i].reduce((s,v,j)=>s+w[j]*mean(v),0)})).sort((a,b)=>b.mean-a.mean);
 const diff=interval(samples[ranking[0].index].map((v,r)=>v-samples[ranking[1].index][r]));
 self.postMessage({type:'done',result:{matrix:mat.map(row=>row.map(mean)),ranking,weights:w,difference:diff,reps,strategies,totalMatches:total}});
}catch(e){self.postMessage({type:'error',message:e.message});}};
