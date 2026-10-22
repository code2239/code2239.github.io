export const PRESETS = [
  {id:'tft',name:'以牙还牙',en:'TIT FOR TAT',color:'#688bd2',shape:'round',p:[1,1,0,1,0],kind:'memory',desc:'先释放善意，再回应对方。',rule:'首轮合作；之后复制对方上一轮的实际行动。'},
  {id:'allc',name:'永远合作',en:'ALWAYS COOPERATE',color:'#85a56d',shape:'flower',p:[1,1,1,1,1],kind:'memory',desc:'始终相信，合作会有回报。',rule:'无论发生什么，每轮都计划合作。'},
  {id:'alld',name:'永远背叛',en:'ALWAYS DEFECT',color:'#dd845f',shape:'spike',p:[0,0,0,0,0],kind:'memory',desc:'每一次，都争取眼前利益。',rule:'无论发生什么，每轮都计划背叛。'},
  {id:'generous',name:'宽容的以牙还牙',en:'GENEROUS TFT',color:'#ab8abe',shape:'cloud',p:[1,1,.2,1,.2],kind:'memory',desc:'懂得回应，也留一点余地。',rule:'首轮合作；对手合作则合作，背叛则有 20% 概率原谅。'},
  {id:'wsls',name:'赢留输换',en:'WIN STAY, LOSE SHIFT',color:'#66a8a0',shape:'square',p:[1,1,0,0,1],kind:'memory',desc:'好的选择留下，坏的选择改变。',rule:'首轮合作；上轮双方行动相同则合作，不同则背叛。对应默认收益下的赢留输换。'},
  {id:'random',name:'随机行动',en:'RANDOM',color:'#d0b353',shape:'diamond',p:[.5,.5,.5,.5,.5],kind:'memory',desc:'给每一种可能，平等的机会。',rule:'每轮独立地以 50% 的概率合作。'},
  {id:'grim',name:'冷酷触发',en:'GRIM TRIGGER',color:'#7d858c',shape:'arch',p:[1,1,0,1,0],kind:'grim',desc:'信任只有一次，失去就不再回来。',rule:'首轮合作；一旦观察到对手实际背叛，之后永久计划背叛。'},
  {id:'tf2t',name:'两次才报复',en:'TIT FOR TWO TATS',color:'#c38f9e',shape:'ears',p:[1,1,1,1,1],kind:'two',desc:'一次失误，不足以否定一段关系。',rule:'首轮合作；只有对手最近连续两次实际背叛，才计划背叛。'}
];
export function rng(seed){let n=seed>>>0;return()=>{n+=0x6D2B79F5;let t=n;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
export function validateConfig(c){
  if(!Number.isInteger(c.rounds)||c.rounds<1||c.rounds>100000)throw Error('博弈轮数须为 1–100,000 的整数。');
  if(!Number.isFinite(c.noise)||c.noise<0||c.noise>.5)throw Error('失误率须为 0–50%。');
  if(!Number.isInteger(c.seed)||c.seed<0||c.seed>4294967295)throw Error('随机种子须为 0–4,294,967,295 的整数。');
  if(!['R','S','T','P'].every(k=>Number.isFinite(c.payoffs[k])&&Math.abs(c.payoffs[k])<=100))throw Error('收益须为 −100 到 100 的数字。');
  return c;
}
export function validStrategy(s){if(!s||!Array.isArray(s.p)||s.p.length!==5||!s.p.every(p=>Number.isFinite(p)&&p>=0&&p<=1)||!['memory','grim','two'].includes(s.kind))throw Error('策略参数无效。');return s;}
export function createGame(a,b,config){
  validateConfig(config);validStrategy(a);validStrategy(b);
  const seed=config.seed>>>0;
  return {a,b,config,t:0,totalA:0,totalB:0,coopA:0,coopB:0,states:[0,0,0,0],prevA:null,prevB:null,streakA:0,streakB:0,triggerA:false,triggerB:false,
    ra:rng(seed^0xA341316C),rb:rng(seed^0xC8013EA4),na:rng(seed^0xAD90777D),nb:rng(seed^0x7E95761E)};
}
function probability(s,t,self,opp,oppStreak,trigger){
  if(!t)return s.p[0];
  if(s.kind==='grim')return trigger?0:1;
  if(s.kind==='two')return oppStreak>=2?0:1;
  return s.p[1+(self?0:2)+(opp?0:1)];
}
export function step(g){
  const pA=probability(g.a,g.t,g.prevA,g.prevB,g.streakB,g.triggerA),pB=probability(g.b,g.t,g.prevB,g.prevA,g.streakA,g.triggerB);
  const intendedA=g.ra()<pA,intendedB=g.rb()<pB,errorA=g.na()<g.config.noise,errorB=g.nb()<g.config.noise;
  const a=errorA?!intendedA:intendedA,b=errorB?!intendedB:intendedB;
  const {R,S,T,P}=g.config.payoffs,scoreA=a?(b?R:S):(b?T:P),scoreB=b?(a?R:S):(a?T:P);
  const previousA=g.prevA,previousB=g.prevB;
  g.t++;g.totalA+=scoreA;g.totalB+=scoreB;g.coopA+=+a;g.coopB+=+b;g.states[(a?0:2)+(b?0:1)]++;
  g.streakA=a?0:g.streakA+1;g.streakB=b?0:g.streakB+1;g.triggerA||=!b;g.triggerB||=!a;g.prevA=a;g.prevB=b;
  return {t:g.t,a,b,pA,pB,intendedA,intendedB,errorA,errorB,scoreA,scoreB,totalA:g.totalA,totalB:g.totalB,coopA:g.coopA,coopB:g.coopB,previousA,previousB};
}
export function runGame(a,b,config,record=true){const g=createGame(a,b,config),records=[];for(let i=0;i<config.rounds;i++){const r=step(g);if(record)records.push(r);}return {records,totalA:g.totalA,totalB:g.totalB,avgA:g.totalA/g.t,avgB:g.totalB/g.t,coopA:g.coopA/g.t,coopB:g.coopB/g.t,states:g.states};}
export function pairSeed(base,i,j,rep){let n=(base^Math.imul(i+1,0x9e3779b1)^Math.imul(j+1,0x85ebca6b)^Math.imul(rep+1,0xc2b2ae35))>>>0;return n;}
export function mean(v){return v.reduce((a,b)=>a+b,0)/v.length;}
export function sampleSD(v){if(v.length<2)return 0;const m=mean(v);return Math.sqrt(v.reduce((s,x)=>s+(x-m)**2,0)/(v.length-1));}
export function interval(v){const m=mean(v);if(v.length<2)return {mean:m,margin:null};const n=v.length;const t=n>=30?2.045:n>=20?2.093:n>=10?2.262:n>=5?2.776:n>=3?4.303:12.706;return {mean:m,margin:t*sampleSD(v)/Math.sqrt(n)};}
export function describeDecision(s,r,side){
  const p=side==='a'?r.pA:r.pB,intended=side==='a'?r.intendedA:r.intendedB,actual=side==='a'?r.a:r.b,error=side==='a'?r.errorA:r.errorB;
  let why=r.t===1?'首轮使用初始合作概率':s.kind==='grim'?'根据是否曾观察到对手背叛决定':s.kind==='two'?'检查对手是否连续两次背叛':`根据上轮${(side==='a'?r.previousA:r.previousB)?'自己合作':'自己背叛'}、${(side==='a'?r.previousB:r.previousA)?'对方合作':'对方背叛'}决定`;
  return `${why}，本轮合作概率 ${Math.round(p*100)}%，计划${intended?'合作':'背叛'}${error?'，因执行失误反转为'+(actual?'合作':'背叛'):''}。`;
}
