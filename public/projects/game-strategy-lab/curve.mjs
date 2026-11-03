export const CURVE_FAMILIES=[
 {id:'none',name:'不反制',color:'#9ea794',description:'没有惩罚，也没有执行成本。'},
 {id:'linear',name:'等比例反制',color:'#688bd2',description:'背叛增加多少，反制就按比例增加。'},
 {id:'concave',name:'早期强硬',color:'#ab8abe',description:'对轻微背叛快速回应，之后逐渐放缓。'},
 {id:'convex',name:'逐步升级',color:'#dd845f',description:'起初温和，背叛越严重，反制增长越快。'},
 {id:'threshold',name:'容忍后反制',color:'#d0b353',description:'门槛以内不反制，超过后连续增加。'},
 {id:'smooth',name:'平滑升级',color:'#66a8a0',description:'S 形增长，起点和终点都平滑。'},
 {id:'custom',name:'自定义曲线',color:'#7e9363',description:'用六个控制点定义一条连续折线。'}
];
export function defaultCurve(){return {base:3,gain:2,harm:3,effect:6,cost:1.5,maintenance:.3,recovery:0,opponent:'best',fixed:.5,tie:'high',objective:'self',policy:{family:'linear',amplitude:.8,threshold:0,exponent:2,points:[0,.2,.4,.6,.8,1]}};}
export function validateCurve(c){
 if(!c||!c.policy)throw Error('反制曲线设置不完整。');
 for(const [key,min,max] of [['base',-20,20],['gain',0,20],['harm',0,20],['effect',0,20],['cost',0,20],['maintenance',0,10],['recovery',0,1],['fixed',0,1]])if(!Number.isFinite(c[key])||c[key]<min||c[key]>max)throw Error('收益与成本参数超出允许范围。');
 const p=c.policy;if(!CURVE_FAMILIES.some(f=>f.id===p.family)||!Number.isFinite(p.amplitude)||p.amplitude<0||p.amplitude>1||!Number.isFinite(p.threshold)||p.threshold<0||p.threshold>.9||!Number.isFinite(p.exponent)||p.exponent<1||p.exponent>5)throw Error('曲线参数无效。');
 if(!Array.isArray(p.points)||p.points.length!==6||p.points[0]!==0||!p.points.every(y=>Number.isFinite(y)&&y>=0&&y<=1))throw Error('六个控制点须在 0–100% 之间，且起点固定为 0。');
 if(!['best','fixed'].includes(c.opponent)||!['low','high'].includes(c.tie)||!['self','deterrence','social'].includes(c.objective))throw Error('对手与比较规则无效。');return c;
}
export function curveValue(p,x){
 x=Math.max(0,Math.min(1,x));if(p.family==='none'||p.amplitude===0)return 0;
 if(p.family==='custom'){const at=Math.min(4,Math.floor(x*5)),t=x*5-at;return p.amplitude*(p.points[at]*(1-t)+p.points[at+1]*t);}
 const t=p.threshold,z=Math.max(0,Math.min(1,(x-t)/(1-t)));if(!z)return 0;
 if(p.family==='smooth')return p.amplitude*(3*z*z-2*z*z*z);
 const k=p.family==='convex'?p.exponent:p.family==='concave'?1/p.exponent:1;return p.amplitude*z**k;
}
export function curveMaintenance(p,coefficient){
 if(p.family==='none')return 0;
 if(p.family==='custom'){let integral=0;for(let i=0;i<5;i++)integral+=(p.points[i]**2+p.points[i]*p.points[i+1]+p.points[i+1]**2)/15;return coefficient*p.amplitude**2*integral;}
 const k=p.family==='convex'?p.exponent:p.family==='concave'?1/p.exponent:1;
 return coefficient*p.amplitude**2*(1-p.threshold)*(p.family==='smooth'?13/35:1/(2*k+1));
}
export function curveOutcome(c,x,policy=c.policy){
 const reaction=curveValue(policy,x),penalty=c.effect*reaction,execution=c.cost*reaction**2,maintenance=curveMaintenance(policy,c.maintenance),harm=c.harm*x,recovered=c.recovery*Math.min(harm,penalty);
 const attacker=c.base+c.gain*x-penalty,defender=c.base-harm+recovered-execution-maintenance;
 return {x,reaction,penalty,execution,maintenance,harm,recovered,attacker,defender,social:attacker+defender};
}
// All maxima of this model lie at endpoints, knots, or these analytic stationary points.
export function bestCurveResponse(c,policy=c.policy){
 const candidates=[0,1];
 if(policy.family==='custom'){for(let i=1;i<5;i++)candidates.push(i/5);}
 else if(policy.family!=='none'&&policy.amplitude>0){
  const t=policy.threshold;candidates.push(t);const force=c.effect*policy.amplitude;
  if(force>0){
   if(policy.family==='smooth'){
    const discriminant=1-2*c.gain*(1-t)/(3*force);
    if(discriminant>=0){for(const z of [(1-Math.sqrt(discriminant))/2,(1+Math.sqrt(discriminant))/2])if(z>0&&z<1)candidates.push(t+(1-t)*z);}
   }else{
    const k=policy.family==='convex'?policy.exponent:policy.family==='concave'?1/policy.exponent:1;
    if(Math.abs(k-1)>1e-12&&c.gain>0){const z=(c.gain*(1-t)/(force*k))**(1/(k-1));if(z>0&&z<1)candidates.push(t+(1-t)*z);}
   }
  }
 }
 const unique=[...new Set(candidates)].sort((a,b)=>a-b),values=unique.map(x=>curveOutcome(c,x,policy)),max=Math.max(...values.map(v=>v.attacker)),tolerance=1e-10*Math.max(1,Math.abs(max)),ties=values.filter(v=>Math.abs(v.attacker-max)<=tolerance);
 const chosen=c.tie==='low'?ties[0]:ties[ties.length-1];return {...chosen,tied:ties.length>1,tieMin:ties[0].x,tieMax:ties[ties.length-1].x};
}
export function evaluateCurve(c,policy=c.policy){return c.opponent==='fixed'?{...curveOutcome(c,c.fixed,policy),tied:false}:bestCurveResponse(c,policy);}
export function curveObjective(outcome,objective){return objective==='self'?outcome.defender:objective==='social'?outcome.social:-outcome.x;}
export function compareCurves(c){
 validateCurve(c);
 const rows=CURVE_FAMILIES.map(f=>{const policy={...c.policy,family:f.id,threshold:f.id==='custom'?0:f.id===c.policy.family?c.policy.threshold:f.id==='threshold'?.25:0};return {...f,policy,outcome:evaluateCurve(c,policy)};});
 return rows.sort((a,b)=>curveObjective(b.outcome,c.objective)-curveObjective(a.outcome,c.objective)||a.outcome.x-b.outcome.x||a.outcome.maintenance-b.outcome.maintenance);
}
export function searchCurves(c){
 validateCurve(c);const candidates=[{...c.policy,family:'none',amplitude:0,threshold:0}];
 for(const family of ['linear','convex','concave','smooth'])for(const amplitude of [0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1])for(const threshold of [0,.1,.2,.3,.4,.5]){
  for(const exponent of (family==='convex'||family==='concave'?[1,2,3,4,5]:[2]))candidates.push({...c.policy,family,amplitude,threshold,exponent});
 }
 candidates.push({...c.policy,family:'custom',points:[...c.policy.points]});
 const rows=candidates.map(policy=>({policy,outcome:evaluateCurve(c,policy)}));
 rows.sort((a,b)=>curveObjective(b.outcome,c.objective)-curveObjective(a.outcome,c.objective)||a.outcome.x-b.outcome.x||a.outcome.maintenance-b.outcome.maintenance);
 return {best:rows[0],count:rows.length};
}
