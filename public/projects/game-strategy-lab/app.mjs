import {PRESETS,validateConfig,validStrategy,describeDecision,allocatePopulation,validateEvolution} from './engine.mjs';
import {CURVE_FAMILIES,defaultCurve,validateCurve,curveValue,curveMaintenance,curveOutcome,evaluateCurve,compareCurves,searchCurves} from './curve.mjs';
const $=id=>document.getElementById(id),clone=x=>structuredClone(x),fmt=(v,d=2)=>Number(v).toLocaleString('zh-CN',{minimumFractionDigits:d,maximumFractionDigits:d}),pct=v=>`${fmt(v*100,Math.abs(v*100-Math.round(v*100))>.00001?1:0)}%`,esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const iconPaths={play:'<path d="m7 4 10 7-10 7Z"/>',pause:'<path d="M8 5v14M16 5v14"/>',step:'<path d="m5 5 10 7-10 7Z"/><path d="M19 5v14"/>',reset:'<path d="M4 9a8 8 0 1 1 0 7M4 3v6h6"/>',download:'<path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/>',history:'<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7m2-5v6l4 2"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4m0 3v.1"/>',duel:'<circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 19v-3a4 4 0 0 1 8 0v3m4 0v-3a4 4 0 0 1 8 0v3"/>',league:'<path d="M4 20v-7h5v7m1 0V5h5v15m1 0V9h5v11M2 20h21"/>',chevron:'<path d="m6 9 6 6 6-6"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',tune:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="white"/><circle cx="15" cy="17" r="3" fill="white"/>',file:'<path d="M14 3H5v18h14V8Zm0 0v5h5M8 13h8m-8 4h6"/>'};
iconPaths.evolve='<path d="M4 8h13l-3-3m6 11H7l3 3M4 8v5m16 3v-5"/><circle cx="4" cy="17" r="2"/><circle cx="20" cy="7" r="2"/>';
iconPaths.curve='<path d="M3 3v18h18M5 17c8 0 4-10 14-12"/>';
function icon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]||iconPaths.help}</svg>`;}
function hydrate(root=document){root.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));}
function character(s,action=null){
 const color=/^#[0-9a-f]{6}$/i.test(s.color)?s.color:'#688bd2';
 const bodies={round:'<path d="M31 73c0-28 15-43 39-43s39 15 39 43v23H31Z"/>',flower:'<path d="M39 32c8-10 21-6 27-1 9-12 25-10 29 1 14 0 23 13 17 25 12 10 9 26-2 30 0 15-16 23-28 16-11 11-26 7-31-3-15 2-28-10-23-24-11-13-8-27 4-32-1-6 1-10 7-12Z"/>',spike:'<path d="m30 93 2-40 10-24 16 12 12-18 12 18 16-12 11 25 1 39Z"/>',cloud:'<path d="M28 93V65c0-15 10-22 21-21 4-17 22-22 34-11 17-7 32 6 29 22 13 11 14 26 4 38Z"/>',square:'<rect x="30" y="31" width="80" height="66" rx="19"/>',diamond:'<path d="m70 23 46 40-12 34H36L24 63Z"/>',arch:'<path d="M31 95V66a39 39 0 0 1 78 0v29Z"/>',ears:'<path d="M34 94V55c-14-22-4-35 7-20l12 9c11-8 23-8 34 0l12-9c11-15 21-2 7 20v39Z"/>'};
 return `<svg class="character" viewBox="0 0 140 130" role="img" aria-label="${esc(s.name)}角色"><ellipse cx="70" cy="116" rx="36" ry="4" fill="#243b2b" opacity=".055"/><path d="m49 94-4 17m46-17 4 17" stroke="#53624a" stroke-width="3" stroke-linecap="round"/><path d="M35 75 22 82m84-7 12 7" stroke="${color}" stroke-width="6" stroke-linecap="round"/><g fill="${color}">${bodies[s.shape]||bodies.round}</g><ellipse cx="55" cy="66" rx="3" ry="4" fill="#2c3d35"/><ellipse cx="84" cy="66" rx="3" ry="4" fill="#2c3d35"/>${action===false?'<path d="m48 55 11 4m19 0 11-4M63 82h13" stroke="#2c3d35" stroke-width="2" fill="none" stroke-linecap="round"/>':'<path d="M61 79q9 8 18 0" stroke="#2c3d35" stroke-width="2" fill="none" stroke-linecap="round"/>'}<ellipse cx="45" cy="77" rx="5" ry="2.5" fill="white" opacity=".2"/><ellipse cx="94" cy="77" rx="5" ry="2.5" fill="white" opacity=".2"/>${s.shape==='round'?'<path d="m40 35 24-14 33 9-25 15Z" fill="#4b6baf"/><path d="m94 31 2 14" stroke="#4b6baf" stroke-width="2"/><circle cx="96" cy="47" r="3" fill="#4b6baf"/>':''}</svg>`;
}
const defaultEvolution=()=>({population:40,interval:5,generations:40,adoption:.5,rule:'fixed'});
const defaultState=()=>({mode:'duel',config:{rounds:200,noise:0,seed:42,payoffs:{R:3,S:0,T:5,P:1}},a:clone(PRESETS[0]),b:clone(PRESETS[2]),lib:clone(PRESETS),selected:PRESETS.map(s=>s.id),weights:Object.fromEntries(PRESETS.map(s=>[s.id,1])),reps:10,evolution:defaultEvolution(),curve:defaultCurve()});
let state=defaultState();
try{const saved=JSON.parse(localStorage.getItem('coop-lab-draft-v1'));if(saved){validateConfig(saved.config);validStrategy(saved.a);validStrategy(saved.b);if(!Array.isArray(saved.lib)||saved.lib.length!==8)throw Error();saved.lib.forEach(validStrategy);if(!Array.isArray(saved.selected)||!saved.weights||!Number.isInteger(saved.reps)||saved.reps<2||saved.reps>30)throw Error();const evolution=validateEvolution({...defaultEvolution(),...saved.evolution}),curve=validateCurve(saved.curve||defaultCurve());state={...state,...saved,evolution,curve};}}catch{}
let result=null,leagueResult=null,evolutionResult=null,evoPos=0,evoPlaying=false,evoTimer=null,pos=0,playing=false,timer=null,worker=null,busy=false,pendingStep=false,chartType='average',history=[];
let curveRows=[],curveSearchNote='',curvePreviousPolicy=null,curveDragging=null;
const curveInputErrors=new Set();
try{history=JSON.parse(localStorage.getItem('coop-lab-history-v1'))||[];if(!Array.isArray(history))history=[];}catch{}
function persist(){try{localStorage.setItem('coop-lab-draft-v1',JSON.stringify(state));}catch{}}
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').classList.remove('visible'),3300);}
function showModal(title,html){$('modal-title').textContent=title;$('modal-body').innerHTML=html;hydrate($('modal-body'));if(!$('modal').open)$('modal').showModal();}
$('modal-close').onclick=()=>$('modal').close();$('modal').addEventListener('click',e=>{if(e.target===$('modal')){const r=$('modal').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('modal').close();}});
function stop(){clearInterval(timer);timer=null;playing=false;document.body.classList.remove('playing');stopEvolutionPlayback();}
function terminate(){if(worker){worker.terminate();worker=null;}busy=false;}
function dirty(){stop();terminate();result=null;leagueResult=null;evolutionResult=null;evoPos=0;pos=0;pendingStep=false;$('league-progress').hidden=true;$('evolution-progress').hidden=true;$('league-run').innerHTML=icon('play')+'<span>运行循环赛</span>';$('league-results').innerHTML=emptyLeague();persist();renderDuel();renderEvolution();}
function pullConfig(){
 const config={rounds:state.mode==='evolution'?state.config.rounds:Number($('rounds').value),noise:Number($('noise').value)/100,seed:Number($('seed').value),payoffs:Object.fromEntries(['R','S','T','P'].map(k=>[k,Number($('payoff-'+k).value)]))};
 if([...(state.mode==='evolution'?[]:['rounds']),'seed','payoff-R','payoff-S','payoff-T','payoff-P'].some(id=>$(id).value.trim()===''))throw Error('请填写完整的数字参数。');
 validateConfig(config);return config;
}
function syncSettings(){
 $('rounds').value=state.config.rounds;$('noise').value=state.config.noise*100;$('noise-value').value=`${fmt(state.config.noise*100,state.config.noise*100%1?1:0)}%`;$('seed').value=state.config.seed;$('reps').value=state.reps;
 for(const k of ['R','S','T','P'])$('payoff-'+k).value=state.config.payoffs[k];settingsLabels();
 syncEvolutionSettings();
 syncCurveControls();
}
function settingsLabels(){
 const {T,R,P,S}=state.config.payoffs;let msg='经典囚徒困境 · 双方收益对称',warning=false;
 if(!(T>R&&R>P&&P>S)){msg='自定义对称博弈 · 已不满足囚徒困境条件';warning=true;}else if(2*R<=T+S){msg='囚徒困境 · 轮流背叛的总收益不低于合作';warning=true;}
 $('matrix-message').classList.toggle('warning',warning);$('matrix-message').innerHTML='<span class="live-dot"></span>'+msg;
 $('seed-badge').textContent=`可复现 · SEED ${state.config.seed}`;$('round-total').textContent=state.config.rounds.toLocaleString();
 document.querySelectorAll('[data-rounds]').forEach(b=>b.classList.toggle('selected',+b.dataset.rounds===state.config.rounds));
}
function changeSettings(){try{state.config=pullConfig();$('noise-value').value=`${fmt(state.config.noise*100,state.config.noise*100%1?1:0)}%`;settingsLabels();dirty();}catch(e){dirty();$('status-pill').innerHTML='请检查输入';}}
for(const id of ['rounds','noise','seed','payoff-R','payoff-S','payoff-T','payoff-P'])$(id).addEventListener('input',changeSettings);
$('quick-rounds').onclick=e=>{const b=e.target.closest('[data-rounds]');if(b){$('rounds').value=b.dataset.rounds;changeSettings();}};
$('payoff-reset').onclick=()=>{state.config.payoffs={R:3,S:0,T:5,P:1};syncSettings();dirty();toast('已恢复经典收益规则');};
$('reps').oninput=()=>{const n=+$('reps').value;if(Number.isInteger(n)&&n>=2&&n<=30){state.reps=n;dirty();}else{dirty();}};
$('scenario').onchange=()=>{state.config=defaultState().config;if($('scenario').value==='noise')state.config.noise=.05;if($('scenario').value==='long')state.config.rounds=10000;if($('scenario').value==='temptation')state.config.payoffs.T=8;syncSettings();dirty();toast('环境已切换，开始一次新的实验');};
$('reset-button').onclick=()=>{state=defaultState();curveSearchNote='';curvePreviousPolicy=null;dirty();syncSettings();renderPlayers();renderRoster();setMode('duel');$('scenario').value='classic';toast('已恢复默认设置');};
function setMode(mode){stop();terminate();state.mode=mode;document.querySelector('.settings').classList.toggle('evolution-active',mode==='evolution');document.querySelector('.settings').classList.toggle('curve-active',mode==='curve');for(const m of ['duel','league','evolution','curve']){$(m+'-view').hidden=m!==mode;$('tab-'+m).classList.toggle('active',m===mode);$('tab-'+m).setAttribute('aria-selected',String(m===mode));}$('discrete-settings').hidden=mode==='curve';$('curve-settings').hidden=mode!=='curve';$('reps-wrap').hidden=mode!=='league';$('rounds-setting').hidden=mode==='evolution';$('evolution-settings').hidden=mode!=='evolution';$('seed-badge').textContent=mode==='curve'?'连续决策 · ONE SHOT':`可复现 · SEED ${state.config.seed}`;$('intro-kicker').innerHTML='<span></span>'+(mode==='curve'?'ONE-SHOT GAME · CONTINUOUS RESPONSE':'THE ITERATED PRISONER’S DILEMMA');$('intro-description').textContent=mode==='curve'?'把反制变成曲线，观察对方的选择与自己的净收益。':'让不同的策略相遇，看看信任如何建立，又如何改变。';if(mode==='league'&&!leagueResult)$('league-results').innerHTML=emptyLeague();if(mode==='duel')renderDuel();$('league-progress').hidden=true;$('evolution-progress').hidden=true;$('league-run').innerHTML=icon('play')+'<span>运行循环赛</span>';renderEvolution();updateCurveValidation();if(mode==='curve'){syncCurveControls();renderCurve();}persist();}
$('tab-duel').onclick=()=>setMode('duel');$('tab-league').onclick=()=>setMode('league');$('tab-evolution').onclick=()=>setMode('evolution');$('tab-curve').onclick=()=>setMode('curve');
function playerCard(side){const s=state[side];return `<article class="player-card" style="--player:${s.color}"><div class="player-card-top"><div class="player-avatar">${character(s)}</div><div class="player-main"><span class="player-label">PLAYER ${side==='a'?'01':'02'}${s.custom?'<span class="player-custom">已调整</span>':''}</span><select id="select-${side}" aria-label="玩家${side==='a'?'一':'二'}的策略">${state.lib.map(p=>`<option value="${p.id}" ${s.id===p.id?'selected':''}>${esc(p.name)}</option>`).join('')}</select></div><button class="tune-button" id="tune-${side}" title="调整策略参数" aria-label="调整玩家${side==='a'?'一':'二'}的策略参数">${icon('tune')}</button></div><p>${esc(s.custom?'你的参数，定义了它的下一步。':s.desc)}</p></article>`;}
function renderPlayers(){
 $('duel-players').innerHTML=playerCard('a')+playerCard('b');
 for(const side of ['a','b']){$('select-'+side).onchange=e=>{state[side]=clone(state.lib.find(s=>s.id===e.target.value));dirty();renderPlayers();};$('tune-'+side).onclick=()=>tune(side);}
 $('intro-characters').innerHTML=character(PRESETS[1])+character(PRESETS[0])+character(PRESETS[2]);renderDuel();
}
function tune(target){
 const roster=target.startsWith('lib:'),id=roster?target.slice(4):null,s=clone(roster?state.lib.find(s=>s.id===id):state[target]);
 const names=[['首轮选择','p₀ · 没有历史时'],['维持合作','pCC · 上轮双方合作'],['被背叛后的宽容','pCD · 自己合作，对方背叛'],['占便宜后的回应','pDC · 自己背叛，对方合作'],['修复关系','pDD · 上轮双方背叛']];
 showModal('调整策略',`<div class="tune-intro"><div id="tune-character">${character(s)}</div><div><strong>${esc(s.name)}</strong><p>${esc(s.rule)}</p><label class="color-label">角色颜色<input type="color" id="strategy-color" value="${s.color}" aria-label="策略角色颜色"></label></div></div><div class="strategy-sliders">${names.map((n,i)=>s.kind!=='memory'&&i>0?'':`<div class="parameter-row"><label for="param-${i}">${n[0]}<small>${n[1]}</small></label><input type="range" id="param-${i}" min="0" max="100" step="1" value="${Math.round(s.p[i]*100)}"><output id="out-${i}">${pct(s.p[i])}</output></div>`).join('')}</div><p class="tune-note">${s.kind==='memory'?'概率为 100% 时一定合作，0% 时一定背叛。这里设置的是计划行动；执行失误在行动后独立发生。':'该策略需要额外历史状态，后续行动由固定规则决定，因此只调整首轮合作概率和角色颜色。'}${s.id==='wsls'?'<br>此处保留经典行动规则；修改收益后，不会自动改变满意收益阈值。':''}</p><div class="modal-actions"><button class="small-link" id="restore-strategy">恢复此策略默认值</button><button class="primary-button" id="apply-strategy">应用策略 ${icon('chevron')}</button></div>`);
 for(let i=0;i<5;i++)if($('param-'+i))$('param-'+i).oninput=e=>{$('out-'+i).value=e.target.value+'%';};
 $('strategy-color').oninput=e=>{s.color=e.target.value;$('tune-character').innerHTML=character(s);};
 $('restore-strategy').onclick=()=>{const original=PRESETS.find(p=>p.id===s.id);for(let i=0;i<5;i++)if($('param-'+i)){$('param-'+i).value=original.p[i]*100;$('out-'+i).value=pct(original.p[i]);}$('strategy-color').value=original.color;s.color=original.color;$('tune-character').innerHTML=character(s);};
 $('apply-strategy').onclick=()=>{for(let i=0;i<5;i++)if($('param-'+i))s.p[i]=+$('param-'+i).value/100;s.color=$('strategy-color').value;s.custom=s.p.some((v,i)=>v!==PRESETS.find(p=>p.id===s.id).p[i]);if(roster)state.lib[state.lib.findIndex(p=>p.id===id)]=s;else state[target]=s;dirty();renderPlayers();renderRoster();$('modal').close();toast('已应用策略，重新运行以查看结果');};
}
function renderDuel(){
 const r=result?.records[pos-1],c=state.config;
 for(const side of ['a','b']){const s=state[side],action=r?r[side]:null;$('arena-person-'+side).innerHTML=character(s,action)+`<strong>${esc(s.name)}</strong><span class="action-tag ${r?(action?'cooperate':'defect'):''}">${r?(action?'● 合作 C':'● 背叛 D'):'等待选择'}${r&&r[side==='a'?'errorA':'errorB']?' ✱':''}</span>`;}
 $('round-current').textContent=pos.toLocaleString();$('round-total').textContent=c.rounds.toLocaleString();$('duel-progress').style.width=(pos/c.rounds*100)+'%';
 let caption='第一次相遇，故事由你开始',symbol='↔';if(r){if(r.a&&r.b){caption='善意得到回应，合作继续';symbol='✳';}else if(!r.a&&!r.b){caption='双方背叛，关系陷入僵局';symbol='×';}else{caption='一次背叛，信任开始摇摆';symbol='⇄';}}
 $('interaction-caption').textContent=caption;$('connection-symbol').textContent=symbol;
 $('status-pill').classList.toggle('running',playing||busy);$('status-pill').innerHTML='<span class="live-dot"></span>'+(busy?'正在计算':playing?'正在互动':pos===c.rounds&&result?'本次实验完成':pos>0?'回放已暂停':'等待开始');
 $('run-label').textContent=busy?'取消计算':playing?'暂停':result&&pos<c.rounds?'继续回放':result?'重新实验':'开始实验';$('run-button').firstElementChild.innerHTML=icon(busy?'close':playing?'pause':'play');$('step-button').disabled=busy||pos===c.rounds;$('replay-button').disabled=!result||busy;
 const aAvg=r?r.totalA/pos:0,bAvg=r?r.totalB/pos:0,aCoop=r?r.coopA/pos:0,bCoop=r?r.coopB/pos:0;
 $('stats-grid').innerHTML=`<article class="stat-card"><div class="stat-label"><i class="legend-dot" style="background:${state.a.color}"></i>${esc(state.a.name)}${state.a.custom?' · 已调整':''}</div><div class="stat-main">${fmt(aAvg)}<small>分 / 轮</small></div><div class="stat-bottom"><span>累计 ${fmt(r?.totalA||0,1)} 分</span><span>合作 ${pct(aCoop)}</span></div></article><article class="stat-card"><div class="stat-label"><i class="legend-dot" style="background:${state.b.color}"></i>${esc(state.b.name)}${state.b.custom?' · 已调整':''}</div><div class="stat-main">${fmt(bAvg)}<small>分 / 轮</small></div><div class="stat-bottom"><span>累计 ${fmt(r?.totalB||0,1)} 分</span><span>合作 ${pct(bCoop)}</span></div></article><article class="stat-card"><div class="stat-label">双方共同收益</div><div class="stat-main">${fmt(aAvg+bAvg)}<small>分 / 轮</small></div><div class="stat-bottom"><span>平均合作 ${pct((aCoop+bCoop)/2)}</span><span>${pos?'已互动 '+pos.toLocaleString()+' 轮':'等待实验'}</span></div></article>`;
 $('chart-legend').innerHTML=['a','b'].map((side,i)=>`<span><i class="legend-dot" style="background:${state[side].color}"></i>${esc(state[side].name)}${i?' · 虚线':''}</span>`).join('');
 $('scrubber').disabled=!result;$('scrubber').max=c.rounds;$('scrubber').value=pos;drawChart();renderTimeline();
}
function drawChart(){
 const el=$('chart'),W=780,H=180,L=39,R=15,T=14,B=24,pw=W-L-R,ph=H-T-B,c=state.config;
 let min=0,max=chartType==='average'?Math.max(...Object.values(c.payoffs),1):Math.max(...Object.values(c.payoffs),1)*c.rounds;
 min=chartType==='average'?Math.min(...Object.values(c.payoffs),0):Math.min(...Object.values(c.payoffs),0)*c.rounds;
 if(result&&pos){const records=result.records;for(let i=0;i<pos;i+=Math.max(1,Math.floor(pos/400))){const r=records[i];for(const key of ['totalA','totalB']){const v=chartType==='average'?r[key]/r.t:r[key];min=Math.min(min,v);max=Math.max(max,v);}}}
 if(max===min)max=min+1;const pad=(max-min)*.06;min-=pad;max+=pad;
 const x=t=>L+(t/c.rounds)*pw,y=v=>T+(max-v)/(max-min)*ph;
 let svg=`<svg class="chart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${chartType==='average'?'每轮平均收益':'累计得分'}折线图">`;
 for(let i=0;i<=4;i++){const v=min+(max-min)*i/4,yy=y(v);svg+=`<line x1="${L}" y1="${yy}" x2="${W-R}" y2="${yy}" stroke="#edf0e7" stroke-dasharray="3 5"/><text x="${L-9}" y="${yy+3}" text-anchor="end">${Math.abs(v)>=1000?fmt(v/1000,1)+'k':fmt(v,chartType==='average'?1:0)}</text>`;}
 for(let i=0;i<=4;i++){const t=Math.round(c.rounds*i/4),xx=x(t);svg+=`<text x="${xx}" y="${H-5}" text-anchor="middle">${t>=1000?fmt(t/1000,t%1000?1:0)+'k':t}</text>`;}
 if(result&&pos){for(const [i,key] of ['totalA','totalB'].entries()){const pts=[],stride=Math.max(1,Math.ceil(pos/420));for(let j=0;j<pos;j+=stride){const r=result.records[j];pts.push(`${x(r.t).toFixed(2)},${y(chartType==='average'?r[key]/r.t:r[key]).toFixed(2)}`);}const last=result.records[pos-1],ly=y(chartType==='average'?last[key]/last.t:last[key]);pts.push(`${x(pos)},${ly}`);svg+=`<polyline points="${pts.join(' ')}" stroke="${i?state.b.color:state.a.color}" stroke-width="2.5" fill="none" stroke-linejoin="round" ${i?'stroke-dasharray="6 4"':''}/><circle cx="${x(pos)}" cy="${ly}" r="3.5" fill="${i?state.b.color:state.a.color}" stroke="white" stroke-width="1.5"/>`;}}
 svg+='</svg>';if(!result||!pos)svg+='<div class="empty-chart-label">选择策略，开始你的第一次实验</div>';el.innerHTML=svg;
 $('chart-note').textContent=result&&pos?`已展示前 ${pos.toLocaleString()} 轮 · 曲线按需抽样显示，统计使用全部轮次 · 不代表纳什均衡`:'运行实验后，观察策略的收益如何随互动变化。';
 const svgEl=el.querySelector('svg');svgEl.onpointermove=e=>{if(!result||!pos)return;const rect=svgEl.getBoundingClientRect(),fraction=((e.clientX-rect.left)/rect.width*W-L)/pw,t=Math.max(1,Math.min(pos,Math.round(fraction*c.rounds))),r=result.records[t-1];let tip=el.querySelector('.chart-tooltip');if(!tip){tip=document.createElement('div');tip.className='chart-tooltip';el.append(tip);}tip.textContent=`第 ${t} 轮 · 玩家 1 ${fmt(chartType==='average'?r.totalA/t:r.totalA)} / 玩家 2 ${fmt(chartType==='average'?r.totalB/t:r.totalB)}`;};svgEl.onpointerleave=()=>el.querySelector('.chart-tooltip')?.remove();
}
function renderTimeline(){
 if(!result||!pos){$('timeline').innerHTML='';$('decision-details').textContent='还没有选择。开始一场对局，让故事发生。';return;}
 const count=window.innerWidth<680?18:28,start=Math.max(0,Math.min(pos-1-Math.floor(count/2),state.config.rounds-count)),end=Math.min(state.config.rounds,start+count);
 $('timeline').innerHTML=['a','b'].map(side=>`<div class="timeline-row"><span class="timeline-name">玩家 ${side==='a'?'01':'02'}</span><div class="timeline-cells">${Array.from({length:end-start},(_,i)=>{const t=start+i+1,r=result.records[t-1],shown=t<=pos;return `<button class="timeline-cell ${shown?(r[side]?'cooperate':'defect'):''} ${shown&&r[side==='a'?'errorA':'errorB']?'error':''} ${t===pos?'current':''}" data-round="${t}" aria-label="查看第 ${t} 轮，玩家${side==='a'?'一':'二'}${r[side]?'合作':'背叛'}" title="第 ${t} 轮">${shown?(r[side]?'C':'D'):'·'}</button>`;}).join('')}</div></div>`).join('')+`<div class="timeline-labels"><span>第 ${start+1} 轮</span><span>第 ${end} 轮</span></div>`;
 $('timeline').querySelectorAll('[data-round]').forEach(b=>b.onclick=()=>{stop();pos=+b.dataset.round;renderDuel();});
 const r=result.records[pos-1];$('decision-details').innerHTML=`<div style="margin-bottom:4px;color:#7e916c">第 ${pos} 轮 · 本轮得分 ${fmt(r.scoreA,1)} : ${fmt(r.scoreB,1)}</div>`+['a','b'].map(side=>`<div class="decision-line"><i class="legend-dot" style="background:${state[side].color}"></i><strong>${esc(state[side].name)}</strong><span>${esc(describeDecision(state[side],r,side))}</span></div>`).join('');
}
function beginPlayback(){
 stop();if(!result)return;if($('speed').value==='instant'){pos=state.config.rounds;renderDuel();return;}playing=true;document.body.classList.add('playing');renderDuel();
 timer=setInterval(()=>{const jump=+$('speed').value||1;pos=Math.min(state.config.rounds,pos+jump);if(pos===state.config.rounds)stop();renderDuel();},110);
}
function startDuel(stepOnly=false){
 try{state.config=pullConfig();}catch(e){toast(e.message);return;}
 stop();terminate();result=null;pos=0;busy=true;pendingStep=stepOnly;renderDuel();worker=new Worker('./worker.mjs',{type:'module'});
 worker.onerror=()=>{terminate();toast('计算未能完成，请重试或减少轮数。');renderDuel();};
 worker.onmessage=({data})=>{if(data.type==='error'){terminate();toast(data.message);renderDuel();return;}if(data.type==='done'){result=data.result;terminate();addHistory('duel');if(pendingStep){pos=1;renderDuel();}else beginPlayback();}};
 worker.postMessage({mode:'duel',config:clone(state.config),a:clone(state.a),b:clone(state.b)});persist();
}
$('run-button').onclick=()=>{if(busy){terminate();renderDuel();return;}if(playing){stop();renderDuel();return;}if(result&&pos<state.config.rounds){beginPlayback();return;}startDuel();};
$('step-button').onclick=()=>{stop();if(!result){startDuel(true);return;}pos=Math.min(state.config.rounds,pos+1);renderDuel();};
$('replay-button').onclick=()=>{stop();pos=0;renderDuel();};
$('speed').onchange=()=>{if(playing)beginPlayback();};
$('scrubber').oninput=e=>{stop();pos=+e.target.value;renderDuel();};
for(const type of ['average','total'])$('chart-'+type).onclick=()=>{chartType=type;$('chart-average').classList.toggle('active',type==='average');$('chart-total').classList.toggle('active',type==='total');drawChart();};
function emptyLeague(){return `<div class="panel empty-league">${character(PRESETS[1])}同一个世界，不同的选择。<br><span style="font-size:9px">运行循环赛，探索各种策略的长期表现。</span></div>`;}
function renderRoster(){
 for(const [container,prefix,evolution] of [[$('league-roster'),'league',false],[$('evolution-roster'),'evo',true]]){
  container.innerHTML=state.lib.map(s=>`<div class="roster-item ${state.selected.includes(s.id)?'':'off'}"><input type="checkbox" id="${prefix}-include-${s.id}" ${state.selected.includes(s.id)?'checked':''} aria-label="让${esc(s.name)}${evolution?'进入初始人群':'参赛'}">${character(s)}<label class="roster-name" for="${prefix}-include-${s.id}"><strong>${esc(s.name)}${s.custom?' ✳':''}</strong><span>${esc(s.en)}</span></label><label class="weight-wrap">${evolution?'初始权重':'对手权重'}<input type="number" min="0" max="100" step="1" value="${state.weights[s.id]}" id="${prefix}-weight-${s.id}" aria-label="${esc(s.name)}的${evolution?'初始':'对手'}权重"></label><button class="tune-button" data-tune="${s.id}" aria-label="调整${esc(s.name)}">${icon('tune')}</button></div>`).join('');
  for(const s of state.lib){$(prefix+'-include-'+s.id).onchange=e=>{state.selected=e.target.checked?[...new Set([...state.selected,s.id])]:state.selected.filter(id=>id!==s.id);dirty();renderRoster();};$(prefix+'-weight-'+s.id).oninput=e=>{const n=e.target.value.trim()===''?NaN:+e.target.value;state.weights[s.id]=n;const other=$(prefix==='evo'?'league-weight-'+s.id:'evo-weight-'+s.id);other.value=Number.isFinite(n)?n:'';dirty();};}
  container.querySelectorAll('[data-tune]').forEach(b=>b.onclick=()=>tune('lib:'+b.dataset.tune));
 }
 renderEvolution();
}
function runLeague(){
 if(busy){terminate();$('league-progress').hidden=true;$('league-run').innerHTML=icon('play')+'<span>运行循环赛</span>';toast('已取消计算');return;}
 let strategies,weights;
 try{state.config=pullConfig();state.reps=+$('reps').value;if(!Number.isInteger(state.reps)||state.reps<2||state.reps>30)throw Error('独立重复次数须为 2–30 的整数。');strategies=state.lib.filter(s=>state.selected.includes(s.id));if(strategies.length<2)throw Error('请至少选择两种策略参赛。');weights=strategies.map(s=>{const input=$('league-weight-'+s.id);if(input.value.trim()==='')throw Error('请填写完整的对手权重。');const n=+input.value;if(!Number.isFinite(n)||n<0||n>100)throw Error('对手权重须在 0–100 之间。');state.weights[s.id]=n;return n;});if(!weights.some(v=>v>0))throw Error('至少一种对手的权重需要大于 0。');}catch(e){toast(e.message);return;}
 stop();terminate();busy=true;leagueResult=null;persist();$('league-results').innerHTML='';$('league-progress').hidden=false;$('league-progress').firstElementChild.style.width='0%';$('league-progress').lastElementChild.textContent='正在准备计算…';$('league-run').innerHTML=icon('close')+'<span>取消计算</span>';
 worker=new Worker('./worker.mjs',{type:'module'});worker.onerror=()=>{terminate();$('league-progress').hidden=true;$('league-run').innerHTML=icon('play')+'<span>运行循环赛</span>';$('league-results').innerHTML='<div class="error-box">计算中断，请减少轮数或重复次数后再试。</div>';};
 worker.onmessage=({data})=>{if(data.type==='progress'){$('league-progress').firstElementChild.style.width=(data.value*100)+'%';$('league-progress').lastElementChild.textContent=`正在计算 ${Math.round(data.value*100)}%`;}else if(data.type==='error'){terminate();$('league-progress').hidden=true;$('league-run').innerHTML=icon('play')+'<span>运行循环赛</span>';toast(data.message);}else if(data.type==='done'){leagueResult=data.result;terminate();$('league-progress').hidden=true;$('league-run').innerHTML=icon('play')+'<span>重新运行</span>';renderLeague();addHistory('league');toast('循环赛完成，已保存实验记录');}};
 worker.postMessage({mode:'league',config:clone(state.config),strategies:clone(strategies),weights,reps:state.reps});
}
$('league-run').onclick=runLeague;
function renderLeague(){
 const r=leagueResult;if(!r)return;const first=r.ranking[0],second=r.ranking[1],diff=r.difference,unclear=diff.margin===null||diff.mean-diff.margin<=0;
 const insight=`<strong>${esc(first.name)}</strong> 在当前参考对手分布中平均收益最高，约 <strong>${fmt(first.mean)} 分 / 轮</strong>。${unclear?`与 ${esc(second.name)} 的差异尚不明确。`:`比 ${esc(second.name)} 高 ${fmt(diff.mean)} 分 / 轮。`}<br>这是参赛策略中的探索性排名；筛选后的领先仍需独立实验验证。`;
 const min=Math.min(...r.matrix.flat()),max=Math.max(...r.matrix.flat()),range=max-min||1;
 $('league-results').innerHTML=`<section class="panel ranking-panel"><div class="panel-title"><h2><span class="section-number">03</span>这个世界的成绩单</h2><span class="tiny-label">${r.reps} 次独立重复 · ${r.totalMatches.toLocaleString()} 场对局</span></div><div class="league-insight">${insight}</div><table class="ranking-table"><thead><tr><th>#</th><th>策略</th><th>平均收益</th><th>合作率</th><th>近似 95% 区间</th></tr></thead><tbody>${r.ranking.map((s,i)=>`<tr><td>${String(i+1).padStart(2,'0')}</td><td><div class="rank-name">${character(s)}<span>${esc(s.name)}${s.custom?' ✳':''}</span></div></td><td><strong>${fmt(s.mean)}</strong><div class="rank-bar"><div style="width:${Math.max(2,(s.mean-min)/range*100)}%;background:${s.color}"></div></div></td><td>${pct(s.coop)}</td><td>${s.margin===null?'—':fmt(s.mean-s.margin)+' – '+fmt(s.mean+s.margin)}</td></tr>`).join('')}</tbody></table><p class="ci-note">区间基于完整独立重复实验，使用样本标准差与保守 t 临界值；不是逐轮独立采样。该区间不校正筛选偏差，也不衡量更换人群后的不确定性。<br>前两名收益差：${fmt(diff.mean)} ± ${fmt(diff.margin||0)} 分 / 轮。固定策略比赛结果不等于纳什均衡。</p></section><section class="panel heatmap-panel"><div class="panel-title"><div><h2>策略相遇时，会发生什么？</h2><p>行是自己，列是对手。数值为行策略面对该对手的每轮平均收益。</p></div></div><div class="heatmap-scroll"><table class="heatmap-table"><thead><tr><th>自己 / 对手</th>${r.strategies.map(s=>`<th title="${esc(s.name)}">${esc(shortName(s.name))}<br><span style="color:#b1baa4;font-size:7px">${pct(r.weights[r.strategies.indexOf(s)])}</span></th>`).join('')}</tr></thead><tbody>${r.matrix.map((row,i)=>`<tr><th><span class="legend-dot" style="background:${r.strategies[i].color};margin-right:4px"></span>${esc(shortName(r.strategies[i].name))}</th>${row.map((v,j)=>`<td style="background:hsl(82 38% ${97-(v-min)/range*24}%)" title="${esc(r.strategies[i].name)} 对 ${esc(r.strategies[j].name)}：${fmt(v)} 分/轮">${fmt(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="heatmap-legend"><span>低收益</span><i></i><span>高收益</span></div><p class="ci-note">对角线为两个独立参与者采用同策略。列权重自动归一化；这是一组参考对手权重，不是有限人数的随机配对模型。</p></section>`;
}
function shortName(name){return name==='宽容的以牙还牙'?'宽容互惠':name==='随机行动'?'随机':name;}
function syncEvolutionSettings(){
 const e=state.evolution;for(const [id,key] of [['evo-interval','interval'],['evo-population','population'],['evo-generations','generations']])$(id).value=e[key];
 $('evo-adoption').value=e.adoption*100;$('evo-rule').value=e.rule;evolutionSettingLabels();
}
function evolutionSettingLabels(){
 const e=state.evolution;$('evo-adoption-value').value=pct(e.adoption);
 $('evo-probability-note').textContent=e.rule==='fixed'?`每个低分者随机挑选一位高分者，以 ${pct(e.adoption)} 的概率采用对方的策略。`:`实际概率最高为 ${pct(e.adoption)}，随均分差占收益最大分差的比例增加。`;
 document.querySelectorAll('[data-interval]').forEach(b=>b.classList.toggle('selected',+b.dataset.interval===e.interval));
}
function pullEvolution(){
 const fields=[['evo-interval','interval'],['evo-population','population'],['evo-generations','generations']];
 const e={...state.evolution};for(const [id,key] of fields){if($(id).value.trim()==='')throw Error('请填写完整的演化参数。');e[key]=+$(id).value;}
 e.adoption=+$('evo-adoption').value/100;e.rule=$('evo-rule').value;return validateEvolution(e);
}
for(const id of ['evo-interval','evo-population','evo-generations','evo-adoption','evo-rule'])$(id).addEventListener('input',()=>{try{state.evolution=pullEvolution();evolutionSettingLabels();dirty();}catch(e){dirty();$('evo-allocation-note').textContent=e.message;}});
$('interval-presets').onclick=e=>{const b=e.target.closest('[data-interval]');if(b){try{$('evo-interval').value=b.dataset.interval;state.evolution=pullEvolution();evolutionSettingLabels();dirty();}catch(error){toast(error.message);}}};
function evolutionInputs(){
 const strategies=state.lib.filter(s=>state.selected.includes(s.id));if(!strategies.length)throw Error('请至少选择一种初始策略。');
 const weights=strategies.map(s=>{const input=$('evo-weight-'+s.id);const value=input?input.value:state.weights[s.id];if(String(value).trim()==='')throw Error('请填写初始权重。');const n=Number(value);if(!Number.isFinite(n)||n<0||n>100)throw Error('初始权重须在 0–100 之间。');return n;});
 const counts=allocatePopulation(weights,state.evolution.population);return {strategies,weights,counts};
}
function stopEvolutionPlayback(){clearInterval(evoTimer);evoTimer=null;evoPlaying=false;}
function renderEvolution(){
 if(!$('population-grid'))return;
 let strategies,frame,initialCounts;
 try{const inputs=evolutionInputs();strategies=evolutionResult?.strategies||inputs.strategies;initialCounts=evolutionResult?.frames[0].counts||inputs.counts;frame=evolutionResult?.frames[evoPos]||{stage:0,counts:inputs.counts,population:inputs.counts.flatMap((n,i)=>Array(n).fill(i)),scores:null,events:[],meanPayoff:null,cooperation:null};
  $('evo-allocation-note').textContent=`${state.evolution.population} 人 · ${inputs.strategies.length} 种候选策略 · 初始人数按权重分配为 ${inputs.counts.join(' / ')} 人。`;
 }catch(e){$('evo-allocation-note').textContent=e.message;$('population-grid').innerHTML=`<p class="evolution-empty">${esc(e.message)}</p>`;$('population-legend').innerHTML='';$('evolution-metrics').innerHTML='';$('evolution-chart').innerHTML='<div class="evolution-empty">设置有效的初始人群后，即可开始演化。</div>';$('evolution-events').innerHTML='';return;}
 const active=frame.counts.filter(n=>n>0).length,e=state.evolution;
 $('evolution-run').innerHTML=icon(busy&&state.mode==='evolution'?'close':'play')+`<span>${busy&&state.mode==='evolution'?'取消计算':evolutionResult?'重新演化':'开始演化'}</span>`;
 $('evo-status').classList.toggle('running',evoPlaying||busy);$('evo-status').innerHTML='<span class="live-dot"></span>'+(busy?'正在计算':evoPlaying?'正在演化':evolutionResult?(evoPos===e.generations?'演化完成':'可回放'):'等待演化');
 $('evo-stage-caption').textContent=frame.stage?`第 ${frame.stage} 阶段 · 每对累计安排 ${frame.stage*e.interval} 轮互动 · 当前为转化后的人群`:'初始人群 · 每个角色代表一位参与者，点击查看';
 $('evolution-metrics').innerHTML=`<div><span>现存策略</span><strong>${active}<small>/ ${strategies.length} 种</small></strong></div><div><span>本阶段转化</span><strong>${frame.events.length}<small>人</small></strong></div><div><span>阶段人均收益</span><strong>${frame.meanPayoff===null?'—':fmt(frame.meanPayoff)}<small>分 / 次</small></strong></div><div><span>阶段合作率</span><strong>${frame.cooperation===null?'—':pct(frame.cooperation)}</strong></div>`;
 const changed=new Set(frame.events.map(event=>event.person));
 $('population-grid').innerHTML=frame.population.map((idx,i)=>`<button class="population-person ${changed.has(i)?'converted':''}" style="--person-color:${strategies[idx].color}" data-person="${i}" title="参与者 ${i+1} · ${esc(strategies[idx].name)}${changed.has(i)?' · 本阶段已转化':''}" aria-label="查看参与者 ${i+1}，当前策略${esc(strategies[idx].name)}${changed.has(i)?'，本阶段已转化':''}">${character(strategies[idx])}<span>${String(i+1).padStart(2,'0')}</span>${changed.has(i)?'<i>↻</i>':''}</button>`).join('');
 $('population-grid').querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>{const i=+b.dataset.person,current=strategies[frame.population[i]],old=frame.playedPopulation?strategies[frame.playedPopulation[i]]:null,event=frame.events.find(ev=>ev.person===i);showModal(`参与者 ${String(i+1).padStart(2,'0')}`,`<div class="person-detail">${character(current)}<strong>当前策略：${esc(current.name)}</strong><p>${esc(current.custom?'合作概率（首轮 / CC / CD / DC / DD）：'+current.p.map(pct).join(' / '):current.rule)}</p></div><div class="modal-copy">${old?`<p>刚结束的阶段使用 <strong>${esc(old.name)}</strong>，平均每次得 <strong>${fmt(frame.scores[i])}</strong> 分。</p>`:'<p>这是初始状态，还没有互动得分。</p>'}${event?`<p>本阶段向参与者 <strong>${event.model+1}</strong> 学习。对方均分 ${fmt(event.modelScore)}，本次转化概率 ${pct(event.probability)}，已从 ${esc(strategies[event.from].name)} 转为 ${esc(strategies[event.to].name)}。</p>`:frame.stage?'<p>本阶段未改变策略。</p>':''}</div>`);});
 $('population-legend').innerHTML=strategies.map((s,i)=>`<span class="${frame.counts[i]?'':'extinct'}"><i class="legend-dot" style="background:${s.color}"></i>${esc(shortName(s.name))}<strong>${frame.counts[i]}</strong>${frame.counts[i]?'':`<small>${initialCounts[i]?'已消失':'未进入'}</small>`}</span>`).join('');
 $('evo-play').disabled=!evolutionResult||busy;$('evo-step').disabled=!evolutionResult||busy||evoPos===e.generations;$('evo-end').disabled=!evolutionResult||busy;$('evo-scrubber').disabled=!evolutionResult||busy;
 $('evo-play').innerHTML=icon(evoPlaying?'pause':'play')+(evoPlaying?'暂停演化':evolutionResult&&evoPos===e.generations?'重新回放':'播放演化');
 $('evo-current-stage').textContent=`第 ${evoPos} 阶段`;$('evo-total-stage').textContent=`共 ${e.generations} 阶段`;$('evo-scrubber').max=e.generations;$('evo-scrubber').value=evoPos;
 $('evo-log-count').textContent=`第 ${frame.stage} 阶段 · ${frame.events.length} 人转化`;
 if(!frame.stage)$('evolution-events').innerHTML='<p class="evolution-empty">每阶段结算后，这里会记录每一次策略转化。</p>';
 else if(!frame.events.length)$('evolution-events').innerHTML=`<p class="evolution-empty">本阶段无人转化。${active===1?'人群只剩一种策略；在当前无变异规则下，其他策略不会自行重生。':'可能是同分、选到了同策略对象，或本次没有触发转化概率。'}</p>`;
 else $('evolution-events').innerHTML=`<div class="event-table-wrap"><table class="evolution-event-table"><thead><tr><th>参与者</th><th>原策略 → 新策略</th><th>自己 / 榜样均分</th><th>转化概率</th></tr></thead><tbody>${frame.events.map(event=>`<tr><td>#${String(event.person+1).padStart(2,'0')} <small>学习 #${event.model+1}</small></td><td><span style="color:${strategies[event.from].color}">${esc(shortName(strategies[event.from].name))}</span> <span class="event-arrow">→</span> <span style="color:${strategies[event.to].color}">${esc(shortName(strategies[event.to].name))}</span></td><td>${fmt(event.ownScore)} / ${fmt(event.modelScore)}</td><td>${pct(event.probability)}</td></tr>`).join('')}</tbody></table></div>`;
 drawEvolutionChart(strategies,frame);
}
function drawEvolutionChart(strategies,frame){
 const el=$('evolution-chart'),W=780,H=210,L=35,R=12,T=12,B=27,e=state.evolution,N=e.population,pw=W-L-R,ph=H-T-B;
 const frames=evolutionResult?evolutionResult.frames.slice(0,evoPos+1):[frame],x=stage=>L+stage/e.generations*pw,y=count=>T+(1-count/N)*ph;
 let svg=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="每阶段各策略人数堆叠图，当前第 ${evoPos} 阶段"><title>各策略人数随阶段的变化，总人数 ${N}</title>`;
 for(let i=0;i<=4;i++){const count=N*i/4;svg+=`<line x1="${L}" x2="${W-R}" y1="${y(count)}" y2="${y(count)}" stroke="#e8eddf" stroke-dasharray="3 4"/><text x="${L-7}" y="${y(count)+3}" text-anchor="end">${fmt(count,count%1?1:0)}</text>`;}
 for(let i=0;i<strategies.length;i++){
  const lower=frames.map(f=>f.counts.slice(0,i).reduce((s,n)=>s+n,0)),upper=frames.map((f,j)=>lower[j]+f.counts[i]);
  if(frames.length===1){svg+=`<rect x="${L}" y="${y(upper[0])}" width="3" height="${(upper[0]-lower[0])/N*ph}" fill="${strategies[i].color}"/>`;continue;}
  const top=frames.map((f,j)=>`${x(f.stage)},${y(upper[j])}`),bottom=frames.map((f,j)=>`${x(f.stage)},${y(lower[j])}`).reverse();
  svg+=`<path d="M${top.join('L')}L${bottom.join('L')}Z" fill="${strategies[i].color}" opacity=".82"><title>${esc(strategies[i].name)}：当前 ${frame.counts[i]} 人</title></path>`;
 }
 for(let i=0;i<=4;i++){const stage=Math.round(e.generations*i/4);svg+=`<text x="${x(stage)}" y="${H-6}" text-anchor="middle">${stage}</text>`;}
 svg+=`<line x1="${x(evoPos)}" x2="${x(evoPos)}" y1="${T}" y2="${H-B}" stroke="#526a40" stroke-width="1.2" stroke-dasharray="3 3"/><text x="${L}" y="${T-4}" text-anchor="start">人数</text></svg>`;el.innerHTML=svg;
 el.querySelector('svg').onclick=event=>{if(!evolutionResult)return;const rect=event.currentTarget.getBoundingClientRect(),t=((event.clientX-rect.left)/rect.width*W-L)/pw;stopEvolutionPlayback();evoPos=Math.max(0,Math.min(e.generations,Math.round(t*e.generations)));renderEvolution();};
}
function beginEvolutionPlayback(){
 stopEvolutionPlayback();if(!evolutionResult)return;if(evoPos>=state.evolution.generations)evoPos=0;evoPlaying=true;renderEvolution();
 evoTimer=setInterval(()=>{evoPos=Math.min(state.evolution.generations,evoPos+1);if(evoPos===state.evolution.generations)stopEvolutionPlayback();renderEvolution();},+$('evo-speed').value);
}
function startEvolutionExperiment(){
 if(busy){terminate();$('evolution-progress').hidden=true;renderEvolution();toast('已取消演化计算');return;}
 let inputs;try{state.config=pullConfig();state.evolution=pullEvolution();inputs=evolutionInputs();}catch(e){toast(e.message);return;}
 stop();terminate();evolutionResult=null;evoPos=0;busy=true;persist();renderEvolution();$('evolution-progress').hidden=false;$('evolution-progress').firstElementChild.style.width='0%';$('evolution-progress').lastElementChild.textContent='正在模拟真实参与者之间的互动…';
 try{worker=new Worker('./worker.mjs',{type:'module'});}catch(e){terminate();$('evolution-progress').hidden=true;renderEvolution();toast('无法启动计算，请使用单文件版本或本地 HTTP 预览。');return;}
 worker.onerror=()=>{terminate();$('evolution-progress').hidden=true;renderEvolution();toast('演化计算中断，请减少人数或阶段数后重试。');};
 worker.onmessage=({data})=>{if(data.type==='progress'){$('evolution-progress').firstElementChild.style.width=pct(data.value);$('evolution-progress').lastElementChild.textContent=`正在计算 ${pct(data.value)}`;}else if(data.type==='error'){terminate();$('evolution-progress').hidden=true;renderEvolution();toast(data.message);}else if(data.type==='done'){evolutionResult=data.result;terminate();$('evolution-progress').hidden=true;addHistory('evolution');beginEvolutionPlayback();toast('演化计算完成，可以播放、拖动或直接查看最终阶段');}};
 worker.postMessage({mode:'evolution',config:clone(state.config),evolution:clone(state.evolution),strategies:clone(inputs.strategies),weights:inputs.weights});
}
$('evolution-run').onclick=startEvolutionExperiment;
$('evo-play').onclick=()=>{if(evoPlaying){stopEvolutionPlayback();renderEvolution();}else beginEvolutionPlayback();};
$('evo-step').onclick=()=>{stopEvolutionPlayback();evoPos=Math.min(state.evolution.generations,evoPos+1);renderEvolution();};
$('evo-end').onclick=()=>{stopEvolutionPlayback();evoPos=state.evolution.generations;renderEvolution();};
$('evo-scrubber').oninput=event=>{stopEvolutionPlayback();evoPos=+event.target.value;renderEvolution();};
$('evo-speed').onchange=()=>{if(evoPlaying)beginEvolutionPlayback();};
function syncCurveControls(){
 const c=state.curve;curveInputErrors.clear();for(const key of ['base','gain','harm','effect','cost','maintenance']){$('curve-'+key).value=c[key];$('curve-'+key).removeAttribute('aria-invalid');}
 $('curve-recovery').value=c.recovery*100;$('curve-opponent').value=c.opponent;$('curve-tie').value=c.tie;$('curve-objective').value=c.objective;
}
function curveChanged(keepPoints=false){curveSearchNote='';curvePreviousPolicy=null;persist();renderCurve(keepPoints);}
function updateCurveValidation(){const invalid=curveInputErrors.size>0;$('curve-input-error').hidden=!invalid;$('curve-input-error').textContent='有未填写或超出范围的收益参数。请先修正；图表暂时保留上一次有效计算。';$('curve-save').disabled=invalid;$('curve-search').disabled=invalid;$('export-button').disabled=state.mode==='curve'&&invalid;}
for(const key of ['base','gain','harm','effect','cost','maintenance'])$('curve-'+key).oninput=event=>{const input=event.target,value=input.value,next={...state.curve,[key]:+value};try{if(value.trim()==='')throw Error();validateCurve(next);curveInputErrors.delete(key);input.removeAttribute('aria-invalid');state.curve=next;curveChanged();}catch{curveInputErrors.add(key);input.setAttribute('aria-invalid','true');updateCurveValidation();}};
$('curve-recovery').oninput=event=>{state.curve.recovery=+event.target.value/100;curveChanged();};
for(const key of ['opponent','tie','objective'])$('curve-'+key).onchange=event=>{state.curve[key]=event.target.value;curveChanged();};
for(const [id,key,divisor] of [['curve-amplitude','amplitude',100],['curve-threshold','threshold',100],['curve-exponent','exponent',1]])$(id).oninput=event=>{state.curve.policy[key]=+event.target.value/divisor;curveChanged();};
$('curve-inspect').oninput=event=>{state.curve.fixed=+event.target.value/100;curveChanged();};
$('curve-families').onclick=event=>{const b=event.target.closest('[data-family]');if(!b)return;const p=state.curve.policy;
 p.family=b.dataset.family;if(p.family!=='none'&&p.amplitude===0)p.amplitude=.8;p.threshold=p.family==='threshold'?.25:0;curveChanged();};
function curvePolicyText(p){const k=p.family==='convex'?p.exponent:p.family==='concave'?1/p.exponent:1;return p.family==='none'?'f(d) = 0':p.family==='custom'?`六点连续折线 · 上限 ${pct(p.amplitude)}`:`上限 ${pct(p.amplitude)} · 门槛 ${pct(p.threshold)}${p.family==='smooth'?' · S 形':` · 指数 ${fmt(k,2)}`}`;}
function curveSamples(c,policy=c.policy){return Array.from({length:201},(_,i)=>curveOutcome(c,i/200,policy));}
function renderCurve(keepPoints=false){
 const c=state.curve;try{validateCurve(c);}catch{return;}
 updateCurveValidation();
 const p=c.policy,family=CURVE_FAMILIES.find(f=>f.id===p.family),out=evaluateCurve(c),baseline=evaluateCurve(c,{...p,family:'none'}),selected=curveOutcome(c,c.fixed),difference=out.defender-baseline.defender;
 $('curve-families').innerHTML=CURVE_FAMILIES.map(f=>`<button class="curve-family ${f.id===p.family?'active':''}" data-family="${f.id}" aria-pressed="${f.id===p.family}" style="--curve-color:${f.color}" title="${esc(f.description)}"><i></i>${esc(f.name)}</button>`).join('');
 $('curve-amplitude').value=p.amplitude*100;$('curve-threshold').value=p.threshold*100;$('curve-exponent').value=p.exponent;$('curve-inspect').value=c.fixed*100;
 $('curve-amplitude-value').value=pct(p.amplitude);$('curve-threshold-value').value=pct(p.threshold);$('curve-exponent-value').value=fmt(p.exponent,1);$('curve-inspect-value').value=pct(c.fixed);$('curve-recovery-value').value=pct(c.recovery);
 $('curve-amplitude').disabled=p.family==='none';$('curve-threshold').disabled=p.family==='custom'||p.family==='none';$('curve-exponent').disabled=!['convex','concave'].includes(p.family);$('curve-tie').disabled=c.opponent==='fixed';
 $('curve-order-note').textContent=c.opponent==='best'?'先承诺曲线 → 对手选择收益最高的背叛强度 → 执行反制并结算。':'固定一次背叛强度 → 按曲线反制 → 计算这一次的双方收益。此模式不预测威慑。';
 if(!keepPoints||!$('curve-point-controls').childElementCount)$('curve-point-controls').innerHTML=Array.from({length:6},(_,i)=>`<label>背叛 ${i*20}%<span>反制 <input type="number" data-curve-point="${i}" aria-label="背叛 ${i*20}% 时的反制百分比" min="0" max="${p.amplitude*100}" step="1" value="${fmt(curveValue(p,i/5)*100,1).replace(/,/g,'')}" ${i===0||p.amplitude===0?'disabled':''}>%</span></label>`).join('');
 const declining=p.family==='custom'&&p.points.some((v,i)=>i>0&&v<p.points[i-1]-1e-9);
 $('curve-shape-note').textContent=`${family.description} ${curvePolicyText(p)}。拖动圆点或输入数值会切换为六点连续折线；合作时反制固定为 0。${declining?' 当前存在反制回落区间，对手可能跨过惩罚较重的区域。':''}`;
 $('curve-outcomes').innerHTML=`<article><span>${c.opponent==='best'?'对手的最优回应':'给定背叛强度'}</span><strong>${out.x>0&&out.x<.0005?'＜0.05%':pct(out.x)}</strong><small>${c.opponent==='best'?(out.x===0?'选择不背叛':out.x===1?'选择完全背叛':'选择部分背叛'):'这是固定输入，不是行为预测'}</small></article><article><span>自己的净收益</span><strong>${fmt(out.defender)}<em>分</em></strong><small>比不反制 ${difference>=0?'+':''}${fmt(difference)} 分</small></article><article><span>这次执行与维持成本</span><strong>${fmt(out.execution+out.maintenance)}<em>分</em></strong><small>追回损失 ${fmt(out.recovered)} 分</small></article>`;
 drawResponseCurve(c,out,family.color);drawCurvePayoffs(c,out);
 $('curve-inspection').innerHTML=`<span>反制力度 <strong>${pct(selected.reaction)}</strong></span><span>对方被扣 <strong>${fmt(selected.penalty)}</strong></span><span>自己净得 <strong>${fmt(selected.defender)}</strong></span><span>对方净得 <strong>${fmt(selected.attacker)}</strong></span>`;
 let verdict=c.opponent==='best'?`在公开且能执行承诺、对手最大化本轮收益的假设下，对方会选择 ${pct(out.x)} 的背叛强度，自己净得 ${fmt(out.defender)} 分。`:`当背叛强度固定为 ${pct(c.fixed)} 时，本条曲线使自己净得 ${fmt(out.defender)} 分，对方净得 ${fmt(out.attacker)} 分。`;
 if(out.tied)verdict+=` 对手存在同收益的多种选择（端点 ${pct(out.tieMin)}–${pct(out.tieMax)}），当前按${c.tie==='high'?'更高':'更低'}背叛强度决策。`;
 if(c.opponent==='fixed'&&c.recovery===0)verdict+=' 当前没有损失追回或未来收益，纯惩罚不会提高自己的本轮收益；反制成本需单独权衡。';
 $('curve-verdict').textContent=verdict;
 curveRows=compareCurves(c);
 $('curve-comparison').innerHTML=`<table><thead><tr><th>反制曲线</th><th>背叛强度</th><th>自己净收益</th><th>对方净收益</th><th>双方总收益</th><th></th></tr></thead><tbody>${curveRows.map((row,i)=>`<tr class="${row.id===p.family?'current':''}"><td><span class="legend-dot" style="background:${row.color}"></span><strong>${esc(row.name)}</strong>${i===0?'<em>当前目标领先</em>':''}<small>${esc(curvePolicyText(row.policy))}</small></td><td>${pct(row.outcome.x)}</td><td>${fmt(row.outcome.defender)}</td><td>${fmt(row.outcome.attacker)}</td><td>${fmt(row.outcome.social)}</td><td><button class="small-link" data-use-curve="${i}">应用</button></td></tr>`).join('')}</tbody></table>`;
 $('curve-search-note').textContent=curveSearchNote;$('curve-undo').hidden=!curvePreviousPolicy;
}
const curveLayout={W:780,H:255,L:42,R:16,T:19,B:32};
function responseX(clientX,element){const r=element.getBoundingClientRect(),{W,L,R}=curveLayout;return Math.max(0,Math.min(1,((clientX-r.left)/r.width*W-L)/(W-L-R)));}
function drawResponseCurve(c,out,color){
 const {W,H,L,R,T,B}=curveLayout,pw=W-L-R,ph=H-T-B,x=v=>L+v*pw,y=v=>T+(1-v)*ph;
 let svg=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="反制力度随背叛强度变化的连续曲线"><title>背叛强度与反制力度；六个圆点可拖动，下方数字输入提供等效操作。</title>`;
 for(let i=0;i<=4;i++){const v=i/4;svg+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="#e8eddf" stroke-dasharray="3 4"/><text x="${L-8}" y="${y(v)+3}" text-anchor="end">${pct(v)}</text><text x="${x(v)}" y="${H-11}" text-anchor="middle">${pct(v)}</text>`;}
 const points=Array.from({length:201},(_,i)=>`${x(i/200)},${y(curveValue(c.policy,i/200))}`);
 svg+=`<path d="M${L},${y(0)}L${points.join('L')}L${x(1)},${y(0)}Z" fill="${color}" opacity=".06"/><polyline points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round"/>`;
 svg+=`<line x1="${x(out.x)}" x2="${x(out.x)}" y1="${T}" y2="${H-B}" stroke="#93a77a" stroke-dasharray="5 4"/><line x1="${x(c.fixed)}" x2="${x(c.fixed)}" y1="${T}" y2="${H-B}" stroke="#d5deca"/><circle cx="${x(c.fixed)}" cy="${y(curveValue(c.policy,c.fixed))}" r="4" fill="#d0b353" stroke="white" stroke-width="2"/>`;
 for(let i=0;i<6;i++)svg+=`<circle cx="${x(i/5)}" cy="${y(curveValue(c.policy,i/5))}" r="${i?6:4}" fill="white" stroke="${color}" stroke-width="2" data-point="${i}" class="curve-handle ${i?'':'locked'}"/><circle cx="${x(i/5)}" cy="${y(curveValue(c.policy,i/5))}" r="15" fill="transparent" data-point="${i}" class="curve-hit"/>`;
 svg+=`<text x="${L}" y="10">反制力度 f(d)</text><text x="${W-R}" y="${H-1}" text-anchor="end">背叛强度 d</text></svg><div class="curve-marker-legend"><span><i class="dashed"></i>${c.opponent==='best'?'对手最优回应':'给定背叛'}</span><span><i class="inspect-dot"></i>正在检查的位置</span></div>`;
 $('response-curve').innerHTML=svg;
}
function drawCurvePayoffs(c,out){
 const W=780,H=220,L=42,R=16,T=17,B=30,pw=W-L-R,ph=H-T-B,samples=curveSamples(c),all=samples.flatMap(v=>[v.attacker,v.defender,c.base+c.gain*v.x]);
 let low=Math.min(0,...all),high=Math.max(1,...all);const pad=(high-low)*.06;low-=pad;high+=pad;
 const x=v=>L+v*pw,y=v=>T+(high-v)/(high-low)*ph;
 let svg=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="自己与对方的净收益随背叛强度变化的曲线">`;
 for(let i=0;i<=4;i++){const v=low+(high-low)*i/4;svg+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="#edf1e6" stroke-dasharray="3 4"/><text x="${L-8}" y="${y(v)+3}" text-anchor="end">${fmt(v,1)}</text><text x="${x(i/4)}" y="${H-9}" text-anchor="middle">${pct(i/4)}</text>`;}
 for(const [key,color,dash] of [['defender','#7e9363',''],['attacker','#dd845f',''],['baseline','#b6bfaa','5 4']])svg+=`<polyline points="${samples.map(v=>`${x(v.x)},${y(key==='baseline'?c.base+c.gain*v.x:v[key])}`).join(' ')}" stroke="${color}" stroke-width="2.5" fill="none" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
 svg+=`<line x1="${x(out.x)}" x2="${x(out.x)}" y1="${T}" y2="${H-B}" stroke="#91a877" stroke-dasharray="5 4"/><circle cx="${x(out.x)}" cy="${y(out.defender)}" r="4" fill="#7e9363" stroke="white" stroke-width="1.5"/><circle cx="${x(out.x)}" cy="${y(out.attacker)}" r="4" fill="#dd845f" stroke="white" stroke-width="1.5"/><text x="${L}" y="10">净收益 / 分</text></svg>`;
 $('curve-payoff-chart').innerHTML=svg;
}
function convertCurveToPoints(){const p=state.curve.policy;if(p.family!=='custom'){p.points=Array.from({length:6},(_,i)=>p.amplitude?curveValue(p,i/5)/p.amplitude:0);p.family='custom';p.threshold=0;}}
function editCurvePoint(index,reaction,keepPoints=false){if(index===0)return;const p=state.curve.policy;if(!p.amplitude){toast('先提高反制上限，再调整控制点。');return;}convertCurveToPoints();p.points[index]=Math.max(0,Math.min(1,reaction/p.amplitude));curveChanged(keepPoints);}
$('curve-point-controls').oninput=event=>{const input=event.target.closest('[data-curve-point]');if(!input||input.value.trim()===''||!Number.isFinite(+input.value))return;const value=Math.max(0,Math.min(state.curve.policy.amplitude*100,+input.value));if(value!==+input.value)input.value=value;editCurvePoint(+input.dataset.curvePoint,value/100,true);};
$('curve-point-controls').onfocusout=event=>{const input=event.target.closest('[data-curve-point]');if(input&&input.value.trim()==='')input.value=fmt(curveValue(state.curve.policy,+input.dataset.curvePoint/5)*100,1).replace(/,/g,'');};
$('response-curve').addEventListener('pointerdown',event=>{
 const handle=event.target.closest('[data-point]');if(handle){const index=+handle.dataset.point;if(!index)return;if(!state.curve.policy.amplitude){toast('先提高反制上限，再调整控制点。');return;}curveDragging=index;$('response-curve').setPointerCapture(event.pointerId);moveCurvePoint(event);}
 else {state.curve.fixed=responseX(event.clientX,$('response-curve'));curveChanged();}
});
function moveCurvePoint(event){if(curveDragging===null)return;const rect=$('response-curve').querySelector('svg').getBoundingClientRect(),{H,T,B}=curveLayout,reaction=1-((event.clientY-rect.top)/rect.height*H-T)/(H-T-B);editCurvePoint(curveDragging,reaction);}
$('response-curve').addEventListener('pointermove',moveCurvePoint);
for(const type of ['pointerup','pointercancel'])$('response-curve').addEventListener(type,event=>{curveDragging=null;if($('response-curve').hasPointerCapture(event.pointerId))$('response-curve').releasePointerCapture(event.pointerId);});
$('curve-payoff-chart').onclick=event=>{state.curve.fixed=responseX(event.clientX,$('curve-payoff-chart'));curveChanged();};
$('curve-comparison').onclick=event=>{const button=event.target.closest('[data-use-curve]');if(!button)return;state.curve.policy=clone(curveRows[+button.dataset.useCurve].policy);curveChanged();};
$('curve-search').onclick=()=>{const before=clone(state.curve.policy),found=searchCurves(state.curve);state.curve.policy=clone(found.best.policy);curvePreviousPolicy=before;curveSearchNote=`已搜索 ${found.count} 组有限候选并应用当前评价目标下的领先结果。自己的净收益 ${fmt(found.best.outcome.defender)} 分，对方背叛强度 ${pct(found.best.outcome.x)}。这不是全部连续曲线中的最优证明。`;persist();renderCurve();};
$('curve-undo').onclick=()=>{if(curvePreviousPolicy){state.curve.policy=curvePreviousPolicy;curveChanged();}};
$('curve-save').onclick=()=>{addHistory('curve');toast('反制曲线与收益环境已保存');};
function curveExportData(){const c=clone(state.curve);return {settings:c,selectedOutcome:evaluateCurve(c),noRetaliationOutcome:evaluateCurve(c,{...c.policy,family:'none'}),inspection:curveOutcome(c,c.fixed),samples:curveSamples(c),comparison:compareCurves(c),searchNote:curveSearchNote};}
function curveModel(){showModal('反制曲线的模型与边界',`<div class="modal-copy"><p>这是一次<strong>单方面背叛与反制的连续决策</strong>模型，不沿用四格收益矩阵。d ∈ [0,1] 表示背叛强度，f(d) ∈ [0,1] 表示反制力度，f(0)=0。预设曲线与六点折线均连续。</p><p><strong>知情回应：</strong>先公开并承诺执行曲线，对手知道规则后选择使自己本轮收益最大的 d，再反制和结算。承诺需确实可执行；事后才宣布惩罚，不能直接套用这里的威慑预测。<strong>固定强度：</strong>只计算已给定 d 下的结果，不预测对方行为。</p><div class="help-card">对方收益 = R + Gd − Ef(d)<br>自己收益 = R − Hd + ρ·min(Hd, Ef(d)) − C·f(d)² − M·∫₀¹f(u)²du</div><p>R 是合作基础收益，G 是完全背叛的额外收益，H 是完全被背叛的损失，E 是最大反制扣分，C 是最大执行成本，M 是维持承诺的成本系数，ρ 是追回损失比例。追回金额同时不超过本次伤害与对方被扣分数。</p><p>维持成本在没有背叛时也支付，用于表达保障反制承诺所需的资源。若把维持成本设为 0，一些未实际触发的强硬承诺可能几乎无成本。成本形式是本实验的可调假设，不是现实中的普遍规律。</p><p>最优回应由端点、容忍门槛、折线结点与解析驻点比较得到；数值相同按你选定的更高或更低背叛强度决策。曲线图按 0.5% 间隔采样，采样不用于替代对手最优回应求解。</p><p>搜索只遍历有限候选：反制上限 0–100%（10% 间隔），门槛 0–50%（10% 间隔），弯曲程度 1–5（整数），另包含不反制与当前六点曲线。它不证明全局最优。固定背叛且不追回损失时，纯惩罚无法增加自己的本轮收益；声誉、未来互动和情绪效用均未建模。</p><p>理论背景：<a href="https://ocw.mit.edu/courses/15-040-game-theory-for-managers-spring-2004/pages/lecture-notes/" target="_blank" rel="noopener">MIT：顺序博弈、承诺与可信性</a>。具体收益函数是本工具的建模假设。</p></div>`);}
$('curve-model-button').onclick=curveModel;
function addHistory(mode){
 const summary=mode==='curve'?`反制曲线 · ${CURVE_FAMILIES.find(f=>f.id===state.curve.policy.family).name} · 自己净得 ${fmt(evaluateCurve(state.curve).defender)}`:mode==='duel'?`${state.a.name} × ${state.b.name} · ${fmt(result.avgA)} : ${fmt(result.avgB)}`:mode==='evolution'?`淘汰演化 · ${state.evolution.population} 人 · ${evolutionResult.totalConversions} 次转化`:`循环赛 · ${leagueResult.ranking[0].name} 暂居首位`;
 const entry={id:Date.now(),time:new Date().toISOString(),mode,snapshot:clone(state),summary};history.unshift(entry);history=history.slice(0,15);try{localStorage.setItem('coop-lab-history-v1',JSON.stringify(history));}catch{toast('本地记录空间不足，实验结果仍可导出。');}
}
function showHistory(){
 const metadata=h=>h.mode==='curve'?`一次连续决策 · ${h.snapshot.curve.opponent==='best'?'知情回应':'固定强度'} · 反制上限 ${pct(h.snapshot.curve.policy.amplitude)}`:`${h.mode==='evolution'?`每 ${h.snapshot.evolution.interval} 轮结算 / ${h.snapshot.evolution.generations} 阶段`:h.snapshot.config.rounds.toLocaleString()+' 轮'} · 失误 ${pct(h.snapshot.config.noise)} · SEED ${h.snapshot.config.seed}`;
 showModal('实验记录',`<p class="field-note" style="margin-bottom:17px">保存在当前浏览器，最多保留 15 次。连续曲线可点击“保存这次实验”留档；其他模式计算完成后自动保存。</p>${history.length?history.map(h=>`<article class="history-item"><div><strong>${esc(h.summary)}</strong><p>${esc(new Date(h.time).toLocaleString('zh-CN'))} · ${esc(metadata(h))}</p></div><button data-restore="${h.id}">恢复设置</button></article>`).join(''):'<div class="history-empty">还没有实验记录。</div>'}`);
 $('modal-body').querySelectorAll('[data-restore]').forEach(b=>b.onclick=()=>{const h=history.find(h=>h.id===+b.dataset.restore);try{validateConfig(h.snapshot.config);validStrategy(h.snapshot.a);validStrategy(h.snapshot.b);state={...defaultState(),...clone(h.snapshot),evolution:validateEvolution({...defaultEvolution(),...h.snapshot.evolution}),curve:validateCurve(h.snapshot.curve||defaultCurve())};curveSearchNote='';curvePreviousPolicy=null;dirty();syncSettings();renderPlayers();renderRoster();setMode(state.mode);$('modal').close();toast(state.mode==='curve'?'已恢复反制曲线与收益环境':'已恢复实验设置，点击运行以复现结果');}catch{toast('这条实验记录不可用。');}});
}
$('history-button').onclick=showHistory;
function download(filename,text,mime){const url=URL.createObjectURL(new Blob([text],{type:mime})),a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
function showExport(){
 const mode=state.mode,current=mode==='curve'?curveExportData():mode==='duel'?result:mode==='league'?leagueResult:evolutionResult,available=!!current;
 const detail=mode==='curve'?'曲线参数、连续收益采样、最优回应与曲线比较。':mode==='duel'?'每轮行动、计划概率、失误与得分。':mode==='evolution'?'每阶段人数、个体得分、策略转化和学习对象。':'策略排名、收益区间、参考权重和对阵矩阵。';
 showModal('导出实验',`<p class="field-note" style="margin-bottom:20px">保存完整参数与随机种子。${available?'导出包含本次完整结果，回放进度不会截断数据。':'尚无结果，可以先导出设置。'}</p><div class="export-options"><button class="export-option" id="export-json">${icon('file')}<strong>实验档案 · JSON</strong><span>策略、环境、版本${available?'及完整结果':''}。</span></button><button class="export-option" id="export-csv" ${available?'':'disabled'}>${icon('download')}<strong>分析数据 · CSV</strong><span>${detail}</span></button></div>`);
 $('export-json').onclick=()=>{download('coop-lab-experiment.json',JSON.stringify({schemaVersion:3,engineVersion:'1.2',exportedAt:new Date().toISOString(),state,result:current},null,2),'application/json');toast('实验档案已导出');};
 $('export-csv').onclick=()=>{
  const c=state.config,lines=mode==='curve'?[['共弈实验','模式','一次连续反制']]:[['共弈实验','模式',mode,'失误率',c.noise,'随机种子',c.seed,'R',c.payoffs.R,'S',c.payoffs.S,'T',c.payoffs.T,'P',c.payoffs.P]];
  if(mode==='curve'){
   const data=curveExportData(),v=data.settings;
   lines.push(['参数','值']);for(const key of ['base','gain','harm','effect','cost','maintenance','recovery','opponent','fixed','tie','objective'])lines.push([key,v[key]]);
   lines.push(['policy',JSON.stringify(v.policy)],[],['所选曲线结果','背叛强度','反制力度','自己净收益','对方净收益','执行成本','维持成本','追回损失']);
   const out=data.selectedOutcome;lines.push([v.policy.family,out.x,out.reaction,out.defender,out.attacker,out.execution,out.maintenance,out.recovered]);
   lines.push([],['背叛强度','反制力度','自己净收益','对方净收益','双方总收益','对方被扣分','执行成本','维持成本','追回损失']);
   for(const row of data.samples)lines.push([row.x,row.reaction,row.defender,row.attacker,row.social,row.penalty,row.execution,row.maintenance,row.recovered]);
   lines.push([],['候选曲线','背叛强度','自己净收益','对方净收益','双方总收益','曲线参数']);for(const row of data.comparison)lines.push([row.name,row.outcome.x,row.outcome.defender,row.outcome.attacker,row.outcome.social,JSON.stringify(row.policy)]);
  }else if(mode==='duel'){
   lines.push(['轮数',c.rounds],['玩家1',state.a.name,'参数',JSON.stringify(state.a.p),'规则',state.a.kind],['玩家2',state.b.name,'参数',JSON.stringify(state.b.p),'规则',state.b.kind],[],['轮次','玩家1行动','玩家2行动','玩家1计划合作概率','玩家2计划合作概率','玩家1计划行动','玩家2计划行动','玩家1失误','玩家2失误','玩家1本轮得分','玩家2本轮得分','玩家1累计得分','玩家2累计得分']);
   for(const r of result.records)lines.push([r.t,r.a?'C':'D',r.b?'C':'D',r.pA,r.pB,r.intendedA?'C':'D',r.intendedB?'C':'D',+r.errorA,+r.errorB,r.scoreA,r.scoreB,r.totalA,r.totalB]);
  }else if(mode==='league'){
   lines.push(['轮数',c.rounds],['独立重复次数',leagueResult.reps],[],['排名','策略','平均收益','合作率','近似95%下限','近似95%上限','参数','规则']);
   leagueResult.ranking.forEach((v,i)=>lines.push([i+1,v.name,v.mean,v.coop,v.mean-v.margin,v.mean+v.margin,JSON.stringify(v.p),v.kind]));
   lines.push([],['对阵矩阵',...leagueResult.strategies.map(v=>v.name)],['参考对手权重',...leagueResult.weights]);leagueResult.matrix.forEach((row,i)=>lines.push([leagueResult.strategies[i].name,...row]));
  }else{
   const e=evolutionResult.evolution,strategies=evolutionResult.strategies,name=i=>strategies[i].name;
   lines.push(['人数',e.population,'每阶段轮数',e.interval,'阶段数',e.generations,'转化概率',e.adoption,'转化规则',e.rule],[],['初始策略','初始权重','初始人数','合作概率参数','决策规则']);
   strategies.forEach((v,i)=>lines.push([v.name,evolutionResult.initialWeights[i],evolutionResult.frames[0].counts[i],JSON.stringify(v.p),v.kind]));
   lines.push([],['阶段','阶段人均收益','阶段合作率','转化人数',...strategies.map(v=>v.name+'人数（转化后）')]);
   for(const f of evolutionResult.frames)lines.push([f.stage,f.meanPayoff,f.cooperation,f.events.length,...f.counts]);
   lines.push([],['阶段','参与者','转化前策略','转化后策略','本阶段个人均分','学习对象','榜样均分','实际转化概率']);
   for(const f of evolutionResult.frames)for(let i=0;i<e.population;i++){const event=f.events.find(v=>v.person===i);lines.push([f.stage,i+1,f.playedPopulation?name(f.playedPopulation[i]):'',name(f.population[i]),f.scores?.[i],event?event.model+1:'',event?.modelScore,event?.probability]);}
  }
  const cell=v=>{let str=String(v??'');if(/^[=+@]/.test(str))str="'"+str;return '"'+str.replace(/"/g,'""')+'"';};
  download('coop-lab-results.csv','\uFEFF'+lines.map(row=>row.map(cell).join(',')).join('\r\n'),'text/csv;charset=utf-8');toast('分析数据已导出');
 };
}
$('export-button').onclick=showExport;
function guide(){showModal('开始你的博弈实验',`<div class="modal-copy"><p><strong>01 · 选两个不同的伙伴</strong><br>每个颜色和角色代表一种策略。点击策略卡右侧的调整按钮，可以修改合作概率与角色颜色。</p><p><strong>02 · 定义这个世界的规则</strong><br>调整博弈轮数、双方的收益，以及执行失误率。经典规则下：双方合作各得 3 分；背叛合作者得 5 分，被背叛者得 0 分；双方背叛各得 1 分。</p><div class="help-card"><table><tr><th>自己 / 对方</th><th>合作 C</th><th>背叛 D</th></tr><tr><th>合作 C</th><td>3 / 3</td><td>0 / 5</td></tr><tr><th>背叛 D</th><td>5 / 0</td><td>1 / 1</td></tr></table></div><p><strong>03 · 看清每一次选择</strong><br>开始、暂停或单步观察；拖动进度条回看任意一轮。绿色 C 表示合作，橙色 D 表示背叛，✱ 表示计划行动发生了执行失误。</p><p><strong>04 · 换一个环境再比较</strong><br>切换到策略循环赛，每种策略都会面对同一组参考对手。尝试提高背叛者权重、增加失误率，观察排名是否改变。</p><p><strong>05 · 观察策略如何演化</strong><br>在淘汰演化中，设置每 5 或 10 轮结算、参与人数与转化概率。低分者随机向更高分者学习，每阶段所有人同步更新。可以播放、单步、拖动或查看最终阶段，点击角色查看个体得分与转化原因。</p><p><strong>06 · 用连续曲线研究反制</strong><br>反制曲线模式将背叛与反制设为 0–100% 的连续强度。选择曲线、拖动圆点，调整执行成本与损失追回比例；比较知情对手的最优回应，或固定一次背叛强度。改变评价目标可分别观察自己的净收益、威慑和双方总收益。</p><p>参数修改会清空相关结果。连续曲线点击“保存这次实验”留档；也可以导出 JSON 或 CSV。</p></div>`);}
function assumptions(){showModal('模型与边界',`<div class="modal-copy"><p>这是一个<strong>两两重复互动</strong>的探索工具。两人对局与循环赛固定策略；淘汰演化按阶段更新参与者的策略。双方同时行动，只看到自己与当前对手过去的实际行动，不知道对手的策略名称，也不知道最后一轮何时到来。</p><p>一轮记忆策略使用五个合作概率：首轮、CC、CD、DC、DD，字母顺序为自己在前、对手在后。冷酷触发与两次才报复另有历史状态。</p><p>失误独立地反转计划行动，双方随后观察到实际行动。同策略对局使用独立随机流的两个副本；循环赛的对角线取两位副本的平均收益。</p><p>收益矩阵对双方对称。经典囚徒困境满足 T &gt; R &gt; P &gt; S；当 2R &gt; T + S 时，共同合作的总收益高于轮流背叛。修改矩阵可能得到其他博弈。赢留输换保留经典 CC/DD 后合作、CD/DC 后背叛的规则，不随矩阵自动修改。</p><p><strong>有限模拟不能证明无限期结论。</strong>平均收益使用所有实际轮次，不删除初期过渡。不同长度和失误率可能改变结论。循环赛排名仅适用于参赛策略与当前参考对手分布，不是演化过程、有限人数匹配或纳什均衡证明。</p><p>循环赛区间基于独立重复实验，使用保守 t 近似；筛选冠军后仍需使用独立实验验证，改变随机种子后重跑可作初步复核。</p><p><strong>淘汰演化：</strong>固定人数、全体两两互动，不与自己对局。仅用最近阶段的平均每次收益比较，按阶段末旧策略与分数同时更新。低分者均匀随机选择一位严格更高分者，同分不转化，同策略不改变。固定概率模式直接使用设置值；分差模式乘以均分差与收益最大分差之比。未改变的对局保留历史，发生转化的参与者所涉对局双方记忆重置。无变异，消失的策略不重生。分数与合作率来自转化前阶段，人数图显示转化后分布。一次随机轨迹不说明必然趋势，可更换种子复核。</p><p><strong>反制曲线：</strong>它使用独立的一次连续决策模型：先承诺反制曲线，对方选择背叛强度，然后结算；也可只计算固定背叛强度下的结果。收益函数、执行成本、维持成本和损失追回比例均为可调建模假设。最优回应不等于所有曲线中的最优反制；完整公式见该模式侧栏的“查看公式与模型边界”。</p><p>计算与记录均在当前浏览器完成。记录最多保留 15 次；JSON 包含版本、完整配置与结果，CSV 可用于复核。</p><p>模型参考：<a href="https://doi.org/10.1073/pnas.1206569109" target="_blank" rel="noopener">重复囚徒困境中的一轮记忆策略</a>。</p></div>`);}
$('guide-button').onclick=guide;$('assumptions-button').onclick=assumptions;$('about-button').onclick=e=>{e.preventDefault();assumptions();};
hydrate();syncSettings();renderPlayers();renderRoster();setMode(['duel','league','evolution','curve'].includes(state.mode)?state.mode:'duel');
