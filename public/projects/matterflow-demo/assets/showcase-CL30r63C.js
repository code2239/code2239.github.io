var I=Uint8Array,B=Uint16Array,Se=Int32Array,be=new I([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ae=new I([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Fe=new I([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ze=function(e,r){for(var n=new B(31),t=0;t<31;++t)n[t]=r+=1<<e[t-1];for(var s=new Se(n[30]),t=1;t<30;++t)for(var o=n[t];o<n[t+1];++o)s[o]=o-n[t]<<5|t;return{b:n,r:s}},Ge=ze(be,2),Qe=Ge.b,ve=Ge.r;Qe[28]=258,ve[258]=28;var er=ze(Ae,0),Ne=er.r,ke=new B(32768);for(var y=0;y<32768;++y){var K=(y&43690)>>1|(y&21845)<<1;K=(K&52428)>>2|(K&13107)<<2,K=(K&61680)>>4|(K&3855)<<4,ke[y]=((K&65280)>>8|(K&255)<<8)>>1}var ie=(function(e,r,n){for(var t=e.length,s=0,o=new B(r);s<t;++s)e[s]&&++o[e[s]-1];var a=new B(r);for(s=1;s<r;++s)a[s]=a[s-1]+o[s-1]<<1;var l;if(n){l=new B(1<<r);var i=15-r;for(s=0;s<t;++s)if(e[s])for(var f=s<<4|e[s],u=r-e[s],c=a[e[s]-1]++<<u,d=c|(1<<u)-1;c<=d;++c)l[ke[c]>>i]=f}else for(l=new B(t),s=0;s<t;++s)e[s]&&(l[s]=ke[a[e[s]-1]++]>>15-e[s]);return l}),Q=new I(288);for(var y=0;y<144;++y)Q[y]=8;for(var y=144;y<256;++y)Q[y]=9;for(var y=256;y<280;++y)Q[y]=7;for(var y=280;y<288;++y)Q[y]=8;var le=new I(32);for(var y=0;y<32;++y)le[y]=5;var rr=ie(Q,9,0),nr=ie(le,5,0),Le=function(e){return(e+7)/8|0},Ue=function(e,r,n){return(n==null||n>e.length)&&(n=e.length),new I(e.subarray(r,n))},tr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],fe=function(e,r,n){var t=new Error(r||tr[e]);if(t.code=e,Error.captureStackTrace&&Error.captureStackTrace(t,fe),!n)throw t;return t},j=function(e,r,n){n<<=r&7;var t=r/8|0;e[t]|=n,e[t+1]|=n>>8},se=function(e,r,n){n<<=r&7;var t=r/8|0;e[t]|=n,e[t+1]|=n>>8,e[t+2]|=n>>16},we=function(e,r){for(var n=[],t=0;t<e.length;++t)e[t]&&n.push({s:t,f:e[t]});var s=n.length,o=n.slice();if(!s)return{t:qe,l:0};if(s==1){var a=new I(n[0].s+1);return a[n[0].s]=1,{t:a,l:1}}n.sort(function(A,C){return A.f-C.f}),n.push({s:-1,f:25001});var l=n[0],i=n[1],f=0,u=1,c=2;for(n[0]={s:-1,f:l.f+i.f,l,r:i};u!=s-1;)l=n[n[f].f<n[c].f?f++:c++],i=n[f!=u&&n[f].f<n[c].f?f++:c++],n[u++]={s:-1,f:l.f+i.f,l,r:i};for(var d=o[0].s,t=1;t<s;++t)o[t].s>d&&(d=o[t].s);var h=new B(d+1),_=ye(n[u-1],h,0);if(_>r){var t=0,k=0,O=_-r,T=1<<O;for(o.sort(function(C,S){return h[S.s]-h[C.s]||C.f-S.f});t<s;++t){var b=o[t].s;if(h[b]>r)k+=T-(1<<_-h[b]),h[b]=r;else break}for(k>>=O;k>0;){var D=o[t].s;h[D]<r?k-=1<<r-h[D]++-1:++t}for(;t>=0&&k;--t){var E=o[t].s;h[E]==r&&(--h[E],++k)}_=r}return{t:new I(h),l:_}},ye=function(e,r,n){return e.s==-1?Math.max(ye(e.l,r,n+1),ye(e.r,r,n+1)):r[e.s]=n},Ie=function(e){for(var r=e.length;r&&!e[--r];);for(var n=new B(++r),t=0,s=e[0],o=1,a=function(i){n[t++]=i},l=1;l<=r;++l)if(e[l]==s&&l!=r)++o;else{if(!s&&o>2){for(;o>138;o-=138)a(32754);o>2&&(a(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(a(s),--o;o>6;o-=6)a(8304);o>2&&(a(o-3<<5|8208),o=0)}for(;o--;)a(s);o=1,s=e[l]}return{c:n.subarray(0,t),n:r}},oe=function(e,r){for(var n=0,t=0;t<r.length;++t)n+=e[t]*r[t];return n},je=function(e,r,n){var t=n.length,s=Le(r+2);e[s]=t&255,e[s+1]=t>>8,e[s+2]=e[s]^255,e[s+3]=e[s+1]^255;for(var o=0;o<t;++o)e[s+o+4]=n[o];return(s+4+t)*8},Me=function(e,r,n,t,s,o,a,l,i,f,u){j(r,u++,n),++s[256];for(var c=we(s,15),d=c.t,h=c.l,_=we(o,15),k=_.t,O=_.l,T=Ie(d),b=T.c,D=T.n,E=Ie(k),A=E.c,C=E.n,S=new B(19),w=0;w<b.length;++w)++S[b[w]&31];for(var w=0;w<A.length;++w)++S[A[w]&31];for(var p=we(S,7),R=p.t,v=p.l,g=19;g>4&&!R[Fe[g-1]];--g);var $=f+5<<3,N=oe(s,Q)+oe(o,le)+a,M=oe(s,d)+oe(o,k)+a+14+3*g+oe(S,R)+2*S[16]+3*S[17]+7*S[18];if(i>=0&&$<=N&&$<=M)return je(r,u,e.subarray(i,i+f));var G,P,z,q;if(j(r,u,1+(M<N)),u+=2,M<N){G=ie(d,h,0),P=d,z=ie(k,O,0),q=k;var de=ie(R,v,0);j(r,u,D-257),j(r,u+5,C-1),j(r,u+10,g-4),u+=14;for(var w=0;w<g;++w)j(r,u+3*w,R[Fe[w]]);u+=3*g;for(var L=[b,A],te=0;te<2;++te)for(var ee=L[te],w=0;w<ee.length;++w){var U=ee[w]&31;j(r,u,de[U]),u+=R[U],U>15&&(j(r,u,ee[w]>>5&127),u+=ee[w]>>12)}}else G=rr,P=Q,z=nr,q=le;for(var w=0;w<l;++w){var F=t[w];if(F>255){var U=F>>18&31;se(r,u,G[U+257]),u+=P[U+257],U>7&&(j(r,u,F>>23&31),u+=be[U]);var re=F&31;se(r,u,z[re]),u+=q[re],re>3&&(se(r,u,F>>5&8191),u+=Ae[re])}else se(r,u,G[F]),u+=P[F]}return se(r,u,G[256]),u+P[256]},sr=new Se([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),qe=new I(0),or=function(e,r,n,t,s,o){var a=o.z||e.length,l=new I(t+a+5*(1+Math.ceil(a/7e3))+s),i=l.subarray(t,l.length-s),f=o.l,u=(o.r||0)&7;if(r){u&&(i[0]=o.r>>3);for(var c=sr[r-1],d=c>>13,h=c&8191,_=(1<<n)-1,k=o.p||new B(32768),O=o.h||new B(_+1),T=Math.ceil(n/3),b=2*T,D=function(he){return(e[he]^e[he+1]<<T^e[he+2]<<b)&_},E=new Se(25e3),A=new B(288),C=new B(32),S=0,w=0,p=o.i||0,R=0,v=o.w||0,g=0;p+2<a;++p){var $=D(p),N=p&32767,M=O[$];if(k[N]=M,O[$]=N,v<=p){var G=a-p;if((S>7e3||R>24576)&&(G>423||!f)){u=Me(e,i,0,E,A,C,w,R,g,p-g,u),R=S=w=0,g=p;for(var P=0;P<286;++P)A[P]=0;for(var P=0;P<30;++P)C[P]=0}var z=2,q=0,de=h,L=N-M&32767;if(G>2&&$==D(p-L))for(var te=Math.min(d,G)-1,ee=Math.min(32767,p),U=Math.min(258,G);L<=ee&&--de&&N!=M;){if(e[p+z]==e[p+z-L]){for(var F=0;F<U&&e[p+F]==e[p+F-L];++F);if(F>z){if(z=F,q=L,F>te)break;for(var re=Math.min(L,F-2),Pe=0,P=0;P<re;++P){var me=p-L+P&32767,Ze=k[me],xe=me-Ze&32767;xe>Pe&&(Pe=xe,M=me)}}}N=M,M=k[N],L+=N-M&32767}if(q){E[R++]=268435456|ve[z]<<18|Ne[q];var Ce=ve[z]&31,Re=Ne[q]&31;w+=be[Ce]+Ae[Re],++A[257+Ce],++C[Re],v=p+z,++S}else E[R++]=e[p],++A[e[p]]}}for(p=Math.max(p,v);p<a;++p)E[R++]=e[p],++A[e[p]];u=Me(e,i,f,E,A,C,w,R,g,p-g,u),f||(o.r=u&7|i[u/8|0]<<3,u-=7,o.h=O,o.p=k,o.i=p,o.w=v)}else{for(var p=o.w||0;p<a+f;p+=65535){var pe=p+65535;pe>=a&&(i[u/8|0]=f,pe=a),u=je(i,u+1,e.subarray(p,pe))}o.i=a}return Ue(l,0,t+Le(u)+s)},ir=(function(){for(var e=new Int32Array(256),r=0;r<256;++r){for(var n=r,t=9;--t;)n=(n&1&&-306674912)^n>>>1;e[r]=n}return e})(),ar=function(){var e=-1;return{p:function(r){for(var n=e,t=0;t<r.length;++t)n=ir[n&255^r[t]]^n>>>8;e=n},d:function(){return~e}}},lr=function(e,r,n,t,s){if(!s&&(s={l:1},r.dictionary)){var o=r.dictionary.subarray(-32768),a=new I(o.length+e.length);a.set(o),a.set(e,o.length),e=a,s.w=o.length}return or(e,r.level==null?6:r.level,r.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+r.mem,n,t,s)},Ke=function(e,r){var n={};for(var t in e)n[t]=e[t];for(var t in r)n[t]=r[t];return n},x=function(e,r,n){for(;n;++r)e[r]=n,n>>>=8};function cr(e,r){return lr(e,r||{},0,0)}var We=function(e,r,n,t){for(var s in e){var o=e[s],a=r+s,l=t;Array.isArray(o)&&(l=Ke(t,o[1]),o=o[0]),ArrayBuffer.isView(o)?n[a]=[o,l]:(n[a+="/"]=[new I(0),l],We(o,a,n,t))}},He=typeof TextEncoder<"u"&&new TextEncoder,ur=typeof TextDecoder<"u"&&new TextDecoder,fr=0;try{ur.decode(qe,{stream:!0}),fr=1}catch{}function _e(e,r){var n;if(He)return He.encode(e);for(var t=e.length,s=new I(e.length+(e.length>>1)),o=0,a=function(f){s[o++]=f},n=0;n<t;++n){if(o+5>s.length){var l=new I(o+8+(t-n<<1));l.set(s),s=l}var i=e.charCodeAt(n);i<128||r?a(i):i<2048?(a(192|i>>6),a(128|i&63)):i>55295&&i<57344?(i=65536+(i&1047552)|e.charCodeAt(++n)&1023,a(240|i>>18),a(128|i>>12&63),a(128|i>>6&63),a(128|i&63)):(a(224|i>>12),a(128|i>>6&63),a(128|i&63))}return Ue(s,0,o)}var Ee=function(e){var r=0;if(e)for(var n in e){var t=e[n].length;t>65535&&fe(9),r+=t+4}return r},Te=function(e,r,n,t,s,o,a,l){var i=t.length,f=n.extra,u=l&&l.length,c=Ee(f);x(e,r,a!=null?33639248:67324752),r+=4,a!=null&&(e[r++]=20,e[r++]=n.os),e[r]=20,r+=2,e[r++]=n.flag<<1|(o<0&&8),e[r++]=s&&8,e[r++]=n.compression&255,e[r++]=n.compression>>8;var d=new Date(n.mtime==null?Date.now():n.mtime),h=d.getFullYear()-1980;if((h<0||h>119)&&fe(10),x(e,r,h<<25|d.getMonth()+1<<21|d.getDate()<<16|d.getHours()<<11|d.getMinutes()<<5|d.getSeconds()>>1),r+=4,o!=-1&&(x(e,r,n.crc),x(e,r+4,o<0?-o-2:o),x(e,r+8,n.size)),x(e,r+12,i),x(e,r+14,c),r+=16,a!=null&&(x(e,r,u),x(e,r+6,n.attrs),x(e,r+10,a),r+=14),e.set(t,r),r+=i,c)for(var _ in f){var k=f[_],O=k.length;x(e,r,+_),x(e,r+2,O),e.set(k,r+4),r+=4+O}return u&&(e.set(l,r),r+=u),r},dr=function(e,r,n,t,s){x(e,r,101010256),x(e,r+8,n),x(e,r+10,n),x(e,r+12,t),x(e,r+16,s)};function mr(e,r){r||(r={});var n={},t=[];We(e,"",n,r);var s=0,o=0;for(var a in n){var l=n[a],i=l[0],f=l[1],u=f.level==0?0:8,c=_e(a),d=c.length,h=f.comment,_=h&&_e(h),k=_&&_.length,O=Ee(f.extra);d>65535&&fe(11);var T=u?cr(i,f):i,b=T.length,D=ar();D.p(i),t.push(Ke(f,{size:i.length,crc:D.d(),c:T,f:c,m:_,u:d!=a.length||_&&h.length!=k,o:s,compression:u})),s+=30+d+O+b,o+=76+2*(d+O)+(k||0)+b}for(var E=new I(o+22),A=s,C=o-s,S=0;S<t.length;++S){var c=t[S];Te(E,c.o,c,c.f,c.u,c.c.length);var w=30+c.f.length+Ee(c.extra);E.set(c.c,c.o+w),Te(E,s,c,c.f,c.u,c.c.length,c.o,c.m),s+=16+w+(c.m?c.m.length:0)}return dr(E,s,t.length,C,A),E}const Z={relax:{title:"优化结构",description:"找到当前物理模型下更稳定的原子与晶胞排列。"},scf:{title:"静态自洽计算",description:"计算总能量与自洽电荷密度。"},bands:{title:"生成能带",description:"基于自洽电荷密度沿高对称路径计算。"},dos:{title:"生成态密度",description:"基于自洽电荷密度在均匀网格上计算。"},custom:{title:"专业计算步骤",description:"待接入专用执行器；当前只规划，不实际执行。"}};function H(e){const r=Je(e.goal||""),n="目标涉及超出常规非磁性 PBE 的物理协议，需接入对应执行器后才能执行。";if(e.workflow){const t=structuredClone(e.workflow);return r&&!t.questions.includes(n)&&t.questions.push(n),t}return{summary:e.goal,assumptions:["常规非磁性 PBE；参数与数值精度待验证。"],questions:r?[n]:[],source:"template",tasks:[{id:"relax",kind:"relax",title:"优化结构",description:Z.relax.description,dependsOn:[],estimatedHours:e.settings.hours.relax},{id:"scf",kind:"scf",title:"计算电子分布",description:Z.scf.description,dependsOn:["relax"],estimatedHours:e.settings.hours.scf},{id:"bands",kind:"bands",title:"生成能带",description:Z.bands.description,dependsOn:["scf"],estimatedHours:e.settings.hours.bands},...e.includeDos?[{id:"dos",kind:"dos",title:"生成态密度",description:Z.dos.description,dependsOn:["scf"],estimatedHours:e.settings.hours.dos}]:[]]}}function Y(e){if(!e||!Array.isArray(e.tasks)||!e.tasks.length||e.tasks.length>20)throw new Error("方案需包含 1–20 个任务。");const r=e.tasks.map(i=>{if(!i||typeof i.id!="string"||!/^[a-z][a-z0-9_-]{0,39}$/.test(i.id)||i.id==="structure"||!Object.hasOwn(Z,i.kind))throw new Error("任务标识或类型无效。");if(typeof i.title!="string"||!i.title.trim()||i.title.length>80||typeof i.description!="string"||i.description.length>1600||!Array.isArray(i.dependsOn)||i.dependsOn.length>20||i.dependsOn.some(u=>typeof u!="string"))throw new Error("任务名称、说明或依赖无效。");const f=i.estimatedHours??null;if(f!==null&&(typeof f!="number"||!Number.isFinite(f)||f<.001||f>1e4))throw new Error("任务耗时应为有效小时数或待估算。");return{id:i.id,kind:i.kind,title:i.title.trim(),description:i.description,dependsOn:[...new Set(i.dependsOn)],estimatedHours:f}}),n=new Map(r.map(i=>[i.id,i]));if(n.size!==r.length)throw new Error("任务标识不能重复。");for(const i of r){for(const f of i.dependsOn)if(!n.has(f)||f===i.id)throw new Error("依赖的任务不存在或指向自身。");if(["bands","dos"].includes(i.kind)&&i.dependsOn.filter(f=>{var u;return((u=n.get(f))==null?void 0:u.kind)==="scf"}).length!==1)throw new Error(`${i.title} 必须直接依赖唯一提供电荷密度的 SCF 任务。`);if(["relax","scf"].includes(i.kind)&&i.dependsOn.some(f=>["bands","dos"].includes(n.get(f).kind)))throw new Error("结构或自洽任务不能依赖性质计算的输出。");if(["relax","scf"].includes(i.kind)&&i.dependsOn.length>1)throw new Error("结构来源不唯一，请明确一个结构上游。")}const t=[],s=new Set,o=new Set,a=i=>{if(s.has(i.id))throw new Error("方案存在循环依赖。");o.has(i.id)||(s.add(i.id),i.dependsOn.forEach(f=>a(n.get(f))),s.delete(i.id),o.add(i.id),t.push(i))};r.forEach(a);const l=(i,f)=>{if(i===void 0)return[];if(!Array.isArray(i)||i.length>f||i.some(u=>typeof u!="string"||u.length>1600))throw new Error("方案假设或待确认问题无效。");return i};return{summary:String(e.summary||"").slice(0,2e3),assumptions:l(e.assumptions,12),questions:l(e.questions,12),source:["demo","codex","claude","template","manual"].includes(e.source)?e.source:"manual",tasks:t}}function pr(e,r){let n=H(e);if(r.type==="set_workflow"&&(n=Y(r.value)),r.type==="add_task"){if(!r.value)throw new Error("缺少任务信息。");n.tasks.push(r.value)}if(r.type==="remove_task"){if(!n.tasks.some(o=>o.id===r.id))throw new Error("任务不存在。");const t=new Set([r.id]);let s=!0;for(;s;){s=!1;for(const o of n.tasks)if(o.dependsOn.some(a=>t.has(a))&&!t.has(o.id)){if(!r.cascade)throw new Error("仍有下游依赖，请先调整依赖，或选择连同下游移除。");t.add(o.id),s=!0}}n.tasks=n.tasks.filter(o=>!t.has(o.id))}if(r.type==="set_dependency"){const t=n.tasks.find(s=>s.id===r.id);if(!t)throw new Error("目标任务不存在。");if(typeof r.source!="string"||typeof r.enabled!="boolean")throw new Error("连线参数无效。");t.dependsOn=r.enabled?[...new Set([...t.dependsOn,r.source])]:t.dependsOn.filter(s=>s!==r.source)}if(r.type==="edit_task"){const t=n.tasks.find(i=>i.id===r.id);if(!t)throw new Error("任务不存在。");const{title:s,description:o,dependsOn:a,estimatedHours:l}=r.value||{};Object.assign(t,{...s!==void 0?{title:s}:{},...o!==void 0?{description:o}:{},...a!==void 0?{dependsOn:a}:{},...l!==void 0?{estimatedHours:l}:{}})}return e.workflow=Y(n),e.includeDos=e.workflow.tasks.some(t=>t.kind==="dos"),e}function hr(e){const r=[],n=(u,c,d=[])=>r.push({id:u,kind:c,title:Z[c].title,description:Z[c].description,dependsOn:d,estimatedHours:null}),t=/不(?:做|需要|进行)?(?:结构)?(?:优化|弛豫)|跳过(?:结构)?(?:优化|弛豫)|保持.*结构|固定.*结构/.test(e)||/单点|静态/.test(e)&&!/优化|弛豫/.test(e),s=/只(?:做|计算|要)?(?:静态|单点|自洽)/.test(e),o=!s&&/能带|band/i.test(e)&&!/不(?:做|计算|需要)?能带|不要.*能带/i.test(e),a=!s&&/态密度|\bDOS\b/i.test(e)&&!/不(?:做|计算|需要)?(?:态密度|DOS)|不要.*(?:态密度|DOS)/i.test(e),l=[];for(const[u,c,d]of[[/声子|phonon/i,"phonon","声子计算"],[/弹性|elastic/i,"elastic","弹性常数计算"],[/收敛|convergence/i,"convergence","数值收敛测试"],[/状态方程|\bEOS\b/i,"eos","状态方程计算"],[/缺陷|defect/i,"defect","缺陷模型与能量计算"],[/吸附|adsorp/i,"adsorption","吸附结构与能量计算"],[/\bNEB\b|迁移路径|扩散势垒/i,"neb","迁移路径与势垒计算"]])u.test(e)&&l.push({id:c,kind:"custom",title:d,description:"依据研究目标细化协议、参数扫描与后处理；尚未接入专用执行器。",dependsOn:[],estimatedHours:null});t||n("relax","relax"),(o||a||l.length||/能量|自洽|单点|SCF|静态/i.test(e))&&n("scf","scf",t?[]:["relax"]),o&&n("bands","bands",["scf"]),a&&n("dos","dos",["scf"]);for(const u of l)u.dependsOn=["scf"],r.push(u);const i=!o&&!a&&!l.length&&!/优化|弛豫|能量|自洽|单点|SCF|静态/i.test(e);i&&(r.length||n("scf","scf"),r.push({id:"research-task",kind:"custom",title:"明确目标性质与计算协议",description:e,dependsOn:[r.at(-1).id],estimatedHours:null})),r.length||n("relax","relax");const f=Je(e);return Y({summary:`根据需求拆解为 ${r.length} 个步骤，生成后可编辑节点与依赖。`,assumptions:["人工规则演示，未调用模型。","结构与目标性质需审核；耗时均待人工填写。"],questions:[...l.length?["专业计算步骤目前仅为规划草案，需接入并审核执行器。"]:[],...i?["请明确希望得到的性质或结果。"]:[],...f?["该需求涉及扩展物理协议，常规 PBE 执行器不能覆盖；请确认后补充实现。"]:[]],source:"demo",tasks:r})}function Je(e){return/HSE|SOC|磁性|自旋|DFT\s*\+\s*U|杂化|激发态/i.test(e.replace(/(?:不考虑|忽略|无|非)(?:磁性|自旋)/g,""))}const wr=`Si primitive cell — MatterFlow sample
1.0
0.000000 2.715000 2.715000
2.715000 0.000000 2.715000
2.715000 2.715000 0.000000
Si
2
Direct
0.000000 0.000000 0.000000
0.250000 0.250000 0.250000
`;function gr(){return{revision:1,name:"硅的电子能带",goal:"计算硅的常规 PBE 能带，了解电子结构。",structure:{name:"Si · 金刚石结构",formula:"Si",atoms:2,species:["Si"],format:"poscar",text:wr,builtin:!0},includeDos:!1,settings:{cores:32,rate:.08,budget:50,encut:520,kmesh:8,hours:{relax:.8,scf:.35,bands:.2,dos:.3}},positions:{}}}const De={scf:"计算电子分布",dos:"生成态密度"};function ne(e){const{hours:r,cores:n,rate:t,budget:s}=e.settings,o=Y(H(e)),a=new Map,l=o.tasks.map(d=>({id:d.id,kind:d.kind,name:d.title,hours:d.estimatedHours,known:d.estimatedHours!==null,coreHours:(d.estimatedHours||0)*n,cost:(d.estimatedHours||0)*n*t}));for(const d of o.tasks)a.set(d.id,Math.max(0,...d.dependsOn.map(h=>a.get(h)))+(d.estimatedHours||0));const i=l.filter(d=>!d.known).length,f=i?null:Math.max(...a.values()),u=l.reduce((d,h)=>d+h.coreHours,0),c=u*t;return{items:l,computeHours:f,coreHours:u,cost:c,budget:s,overBudget:c>s,low:c*.75,high:c*1.5,source:i?"部分任务待估算":"人工填写 / 示例估算",queueHours:null,parallel:e.includeDos,complete:!i,unknownCount:i}}function Oe(e){return[{label:"结构与步骤依赖",status:"pass",detail:`${e.structure.atoms} 个原子；后续结构和电荷密度将在运行时传递。`},{label:"计算协议与执行器",status:H(e).tasks.some(r=>r.kind==="custom")||H(e).questions.length?"warn":"pass",detail:H(e).tasks.some(r=>r.kind==="custom")?"包含尚未接入的专业步骤；可继续编排，但不能作为完整 VASP 计算执行。":H(e).questions.join("；")||"任务均可映射到常规 PBE 输入模板；不代表数值精度已验证。"},{label:"预算范围",status:ne(e).high>e.settings.budget?"warn":"pass",detail:"按分配核时估算；区间为经验范围，排队时间与 Agent 费用未计入。"},{label:"数值收敛",status:"pending",detail:"尚未真实计算；需针对材料验证截断能和 k 点收敛。"},{label:"VASP 与势库",status:"pending",detail:"未连接 VASP；导出后需在用户授权环境组装 POTCAR。"}]}function $e(e,r,n,t,s=!1){if(typeof e!="number"||!Number.isFinite(e)||e<r||e>n||s&&!Number.isInteger(e))throw new Error(`${t}需为 ${r}–${n} 范围内的${s?"整数":"数字"}。`);return e}function Xe(e,r,n){if(n!==e.revision)throw new Error("方案已更新，请基于最新版本重新操作。");if(!Array.isArray(r)||!r.length||r.length>8)throw new Error("修改内容为空或过多。");const t=structuredClone(e);for(const s of r)switch(s.type){case"set_dos":if(typeof s.value!="boolean")throw new Error("DOS 设置必须为布尔值。");if(t.workflow){const o=H(t);if(s.value&&!o.tasks.some(a=>a.kind==="dos")){let a=o.tasks.find(i=>i.kind==="scf");a||(a={id:"scf",kind:"scf",title:De.scf,description:"计算自洽电荷密度。",dependsOn:o.tasks.filter(i=>i.kind==="relax").slice(-1).map(i=>i.id),estimatedHours:null},o.tasks.push(a));let l="dos";for(;o.tasks.some(i=>i.id===l);)l+="-new";o.tasks.push({id:l,kind:"dos",title:De.dos,description:"均匀网格态密度计算。",dependsOn:[a.id],estimatedHours:null})}if(!s.value){const a=new Set(o.tasks.filter(l=>l.kind==="dos").map(l=>l.id));if(o.tasks.some(l=>!a.has(l.id)&&l.dependsOn.some(i=>a.has(i))))throw new Error("DOS 存在下游依赖，请先调整后再移除。");o.tasks=o.tasks.filter(l=>!a.has(l.id))}t.workflow=Y(o)}t.includeDos=s.value;break;case"set_setting":{const a={cores:[1,512,"核数",!0],rate:[0,100,"单价"],budget:[0,1e7,"预算"],encut:[200,1500,"截断能",!0],kmesh:[1,40,"k 点网格",!0]}[s.key];if(!a)throw new Error("不支持的参数。");t.settings[s.key]=$e(s.value,...a);break}case"set_hours":if(!H(t).tasks.some(o=>o.id===s.key))throw new Error("未知计算步骤。");t.settings.hours[s.key]=$e(s.value,.001,1e4,"运行小时"),t.workflow&&(t.workflow.tasks.find(o=>o.id===s.key).estimatedHours=s.value);break;case"set_workflow":case"add_task":case"remove_task":case"set_dependency":case"edit_task":pr(t,s),t.positions={};break;case"set_goal":if(typeof s.value!="string"||!s.value.trim()||s.value.length>2e3)throw new Error("请输入 1–2000 字的计算目标。");t.goal=s.value.trim();break;case"set_structure":t.structure=ce(s.text,s.name),t.name=`${t.structure.formula} 的电子能带`,t.positions={};break;case"set_position":if(!["structure",...H(t).tasks.map(o=>o.id)].includes(s.id)||!s.value||!Number.isFinite(s.value.x)||!Number.isFinite(s.value.y)||Math.abs(s.value.x)>1e4||Math.abs(s.value.y)>1e4)throw new Error("节点位置无效。");t.positions[s.id]={x:s.value.x,y:s.value.y};break;default:throw new Error("不支持的修改操作。")}return t.revision++,t}function vr(e){const[r,n,t]=e;return r[0]*(n[1]*t[2]-n[2]*t[1])-r[1]*(n[0]*t[2]-n[2]*t[0])+r[2]*(n[0]*t[1]-n[1]*t[0])}function ce(e,r="POSCAR"){if(typeof e!="string"||e.length>5e5)throw new Error("结构文件需为小于 500 KB 的文本。");const n=e.trim().split(/\r?\n/).map(c=>c.trim());if(/^data_/m.test(e)||/\.cif$/i.test(r))return kr(e,r);if(n.length<9)throw new Error("POSCAR 内容不完整，请上传带元素名称的 VASP 5 格式文件。");const t=Number(n[1]);if(!Number.isFinite(t)||t<=0)throw new Error("本 demo 支持正数缩放系数的 POSCAR，请先转换该结构。");const s=n.slice(2,5).map(c=>c.split(/\s+/).map(Number));if(s.some(c=>c.length!==3||c.some(d=>!Number.isFinite(d)))||Math.abs(vr(s))<1e-9)throw new Error("晶格向量无效或体积为零。");const o=n[5].split(/\s+/);if(o.some(c=>!/^[A-Z][a-z]?$/.test(c)))throw new Error("请使用带元素名称的 VASP 5 POSCAR。");const a=n[6].split(/\s+/).map(Number);if(a.length!==o.length||a.some(c=>!Number.isInteger(c)||c<=0))throw new Error("元素与原子数不匹配。");const l=a.reduce((c,d)=>c+d,0);if(l>1e3)throw new Error("演示版最多支持 1000 个原子。");let i=/^s/i.test(n[7])?8:7;if(!/^[dck]/i.test(n[i]))throw new Error("缺少 Direct 或 Cartesian 坐标类型。");const f=n.slice(i+1,i+1+l);if(f.length!==l||f.some(c=>{const d=c.split(/\s+/).slice(0,3).map(Number);return d.length!==3||d.some(h=>!Number.isFinite(h))}))throw new Error("原子坐标不完整或包含非数字。");const u=o.map((c,d)=>`${c}${a[d]===1?"":a[d]}`).join("");return{name:r.slice(0,100),formula:u,atoms:l,species:o,format:"poscar",text:e.trim()+`
`,builtin:!1}}function kr(e,r){var p,R;const n=v=>{const g=e.match(new RegExp(`^${v}\\s+([^\\s#]+)`,"mi"));return g==null?void 0:g[1].replace(/["']/g,"").replace(/\([^)]*\)/g,"")},t=n("_space_group_IT_number")||n("_symmetry_Int_Tables_number"),s=n("_space_group_name_H-M_alt")||n("_symmetry_space_group_name_H-M");if(t!=="1"&&!(s&&s.replace(/\s/g,"")==="P1"))throw new Error("CIF 导入目前仅支持明确标注的 P1 完整晶胞。其他对称结构请先转换为 POSCAR，以免遗漏对称原子。");const o=Number(n("_cell_length_a")),a=Number(n("_cell_length_b")),l=Number(n("_cell_length_c")),i=Number(n("_cell_angle_alpha"))*Math.PI/180,f=Number(n("_cell_angle_beta"))*Math.PI/180,u=Number(n("_cell_angle_gamma"))*Math.PI/180;if(![o,a,l].every(v=>Number.isFinite(v)&&v>0)||![i,f,u].every(v=>Number.isFinite(v)&&v>0&&v<Math.PI))throw new Error("CIF 晶胞参数缺失或无效。");const c=e.split(/\r?\n/);let d=[],h=[];for(let v=0;v<c.length;v++)if(c[v].trim()==="loop_"){let g=v+1,$=[];for(;g<c.length&&c[g].trim().startsWith("_");)$.push(c[g++].trim().split(/\s+/)[0]);if($.includes("_atom_site_fract_x")){for(d=$;g<c.length&&c[g].trim()&&!/^(_|loop_|data_)/.test(c[g].trim());)c[g].trim().startsWith("#")||h.push(c[g].trim().split(/\s+/)),g++;break}}const _=d.indexOf("_atom_site_fract_x"),k=d.indexOf("_atom_site_fract_y"),O=d.indexOf("_atom_site_fract_z"),T=d.includes("_atom_site_type_symbol")?d.indexOf("_atom_site_type_symbol"):d.indexOf("_atom_site_label");if(_<0||k<0||O<0||T<0||!h.length)throw new Error("CIF 缺少完整分数坐标。");const b=new Map,D=d.indexOf("_atom_site_occupancy");for(const v of h){if(D>=0&&Number(v[D])!==1)throw new Error("不支持部分占位结构，请先构造有序模型。");const g=(R=(p=v[T])==null?void 0:p.replace(/["']/g,"").match(/^[A-Z][a-z]?/))==null?void 0:R[0],$=[_,k,O].map(N=>{var M;return Number((M=v[N])==null?void 0:M.replace(/\([^)]*\)/g,""))});if(!g||$.some(N=>!Number.isFinite(N)))throw new Error("CIF 坐标或元素无法解析。");b.has(g)||b.set(g,[]),b.get(g).push($)}const E=l*Math.cos(f),A=l*(Math.cos(i)-Math.cos(f)*Math.cos(u))/Math.sin(u),C=l*l-E*E-A*A;if(C<=0)throw new Error("CIF 晶胞角度不构成有效晶胞。");const S=[[o,0,0],[a*Math.cos(u),a*Math.sin(u),0],[E,A,Math.sqrt(C)]],w=`${r}
1.0
${S.map(v=>v.join(" ")).join(`
`)}
${[...b.keys()].join(" ")}
${[...b.values()].map(v=>v.length).join(" ")}
Direct
${[...b.values()].flat().map(v=>v.join(" ")).join(`
`)}
`;return{...ce(w,r.replace(/\.cif$/i,".vasp")),name:r,sourceFormat:"cif"}}const yr=[{id:"vasp-bands",name:"常规能带计算",description:"非磁性周期体系的 PBE 能带流程与输入检查。",version:"1.0.0",enabled:!0,content:`---
name: vasp-bands
description: 为常规非磁性周期体系规划 PBE 弛豫、自洽和高对称路径能带。
---
先确认结构与目标。弛豫后使用最终结构。SCF 使用均匀网格，路径能带读取同一结构的 CHGCAR。DOS 是独立均匀网格分支。不要将 HSE、SOC 或磁性任务当作本模板已支持。所有未运行的结果须标明未验证。`},{id:"cost-review",name:"计算成本核算",description:"区分运行时间、排队时间和分配核时，解释费用来源。",version:"1.0.0",enabled:!0,content:`---
name: cost-review
description: 解释材料计算工作流的时间、资源和预算。
---
费用必须读取应用核算结果，不编造耗时。分配核时等于核数乘运行小时。并行分支费用累计、运行时间取关键路径。排队未知时明确说明。人工示例估算不是预测模型，经验区间不是 P90。Agent 费用未知时不记作零。`},{id:"run-diagnosis",name:"运行诊断",description:"依据日志给出失败原因、恢复建议和预算影响。",version:"1.0.0",enabled:!0,content:`---
name: run-diagnosis
description: 阅读实际日志并给出有依据的计算恢复建议。
---
引用真实错误证据；没有日志时不得声称已完成诊断。模拟回放不是 VASP 实测。进程结束不代表数值收敛。重试可能产生费用，修改协议需说明对下游的影响。`}];function _r(e){if(!e||typeof e.name!="string"||!e.name.trim()||e.name.length>60||typeof e.content!="string"||e.content.length>3e4||!/^---\s*\n[\s\S]*?\n---/.test(e.content)||!/^name:\s*\S+/m.test(e.content)||!/^description:\s*\S+/m.test(e.content))throw new Error("技能需包含名称，以及带 name、description 的 SKILL.md 元数据；内容最多 30 KB。");return{name:e.name.trim(),description:String(e.description||"自定义专业技能").slice(0,200),version:String(e.version||"1.0.0").slice(0,30),content:e.content,enabled:!!e.enabled}}function Er(e,r,n){var u;const t=e.trim();let s=[];/(加|增加|添加|补|顺便|也|需要|计算|生成|看看).*(DOS|态密度)|(DOS|态密度).*(加上|加入)/i.test(t)&&!/(不要|不用|取消|移除|删除)/.test(t)&&s.push({type:"set_dos",value:!0}),/(取消|移除|删除|不要|不用).*(DOS|态密度)/i.test(t)&&s.push({type:"set_dos",value:!1});const o=t.match(/(?:预算|不超过|最多)[^\d]{0,8}(\d+(?:\.\d+)?)\s*(?:元|块|人民币)?/);o&&s.push({type:"set_setting",key:"budget",value:Number(o[1])});const a=t.match(/(?:改成|改为|使用|用|设为)?\s*(\d+)\s*核/);a&&s.push({type:"set_setting",key:"cores",value:Number(a[1])});const l=ne(r),i=H(r).tasks;let f=`当前方案包含：${i.map(c=>c.title).join("、")}。连线表示数据依赖，可以点击步骤修改说明、依赖和耗时。`;return s.length?f="我整理了下面的方案修改。应用后会同步更新流程和费用；这里调整预算或核数，不代表已经验证计算精度或并行加速。":!l.complete&&/费用|预算|成本|便宜|耗时|多久|时间/.test(t)?f=`当前有 ${l.unknownCount} 个任务尚未填写耗时，不能给出完整报价。已知部分为 ¥${l.cost.toFixed(2)}；可在节点详情填写人工耗时，或先做实际标定。`:/费用|预算|成本|便宜|耗时|多久|时间/.test(t)?f=`按目前填写的人工示例耗时，累计 ${l.coreHours.toFixed(1)} 核时，计算费约 ¥${l.cost.toFixed(2)}。经验费用范围为 ¥${l.low.toFixed(2)}–${l.high.toFixed(2)}，不含排队、Agent 和存储费用。先标定实际耗时，再据此优化资源配置会更可靠。`:/失败|报错|日志/.test(t)?f="当前只有模拟回放，没有真实 VASP 日志。接入实际日志后，可以根据电子收敛、内存或超时证据定位问题；现在不能声称已经诊断真实计算。":/DOS|态密度/i.test(t)?f="态密度统计每个能量附近的电子态，帮助理解能带以外的电子分布。它通常使用均匀 k 点网格，可从 SCF 后分出一个任务，与路径能带共享上游结构和电荷密度。":((u=i.find(c=>c.id===n))==null?void 0:u.kind)==="custom"?f="这个步骤属于尚未接入执行器的专业草案。可以继续编辑方法、依赖和验证要求，但当前不能把它作为完整 VASP 计算执行。"+i.find(c=>c.id===n).description:n==="relax"||/弛豫|优化结构/.test(t)?f="优化结构就是让原子和晶胞在给定模型下找到更稳定的排列。后面的计算使用优化后的结构，而不是继续使用最初上传的坐标。默认设置需要通过该体系的收敛检查。":n==="scf"||/自洽|电子分布/.test(t)?f="这一步反复更新电子密度，直到输入与计算出的电子分布足够一致。它生成后续能带与 DOS 需要的 CHGCAR。程序结束还需要检查是否真正收敛。":n==="bands"||/能带/.test(t)?f="能带展示电子能量随晶体动量的变化。常规 PBE 路径计算使用前一步的自洽电荷密度，在高对称路径取样。PBE 带隙不应直接当作准确实验带隙。":/k点|k 点|网格/i.test(t)&&(f="k 点网格描述我们在布里渊区采样的密度。更密通常增加计算工作量；要比较目标性质在不同网格下的变化，才能判断是否足够。当前网格是示例设置，尚未做收敛测试。"),{reply:f,actions:s,source:"demo",usage:null}}function Sr(e,r){e={...e,workflow:Y(H(e))};const n=e.settings,t=e.workflow.tasks.filter(o=>o.kind==="custom").map(o=>`${o.title}：执行器待接入`);t.push(...e.workflow.questions);const s=e.workflow.tasks.filter(o=>!o.dependsOn.length&&["relax","scf"].includes(o.kind));return{"workflow.json":JSON.stringify(e,null,2),"cost-estimate.json":JSON.stringify({...ne(e),checks:Oe(e),note:"人工示例估算；不是模型预测，不含排队、Agent 和存储费用。"},null,2),"structure.vasp":e.structure.text,"potcar.spec":e.structure.species.join(`
`)+`
`,"requirements.txt":`# Validated with Python 3.12
pymatgen==2026.10.24
pymatgen-core==2026.10.16
`,"execution-readiness.json":JSON.stringify({executable:!t.length,blockedReasons:t,note:"导出不提交作业；有待确认事项或专业草案时运行器会拒绝执行。"},null,2),...Object.fromEntries(s.flatMap(o=>[[`inputs/${o.id}/POSCAR`,e.structure.text],[`inputs/${o.id}/KPOINTS`,`MatterFlow uniform mesh
0
Gamma
${n.kmesh} ${n.kmesh} ${n.kmesh}
0 0 0
`],[`inputs/${o.id}/INCAR`,`SYSTEM = MatterFlow ${o.kind} template
GGA = PE
ISPIN = 1
ENCUT = ${n.encut}
EDIFF = 1e-6
EDIFFG = -0.02
PREC = Accurate
ISMEAR = 0
SIGMA = 0.05
IBRION = ${o.kind==="relax"?2:-1}
ISIF = 3
NSW = ${o.kind==="relax"?150:0}
NELM = 120
LREAL = .FALSE.
LASPH = .TRUE.
LCHARG = .TRUE.
LWAVE = .FALSE.
LMAXMIX = 6
`],[`inputs/${o.id}/potcar.spec`,e.structure.species.join(`
`)+`
`]])),"README.md":`# MatterFlow 导出包

方案版本：${e.revision}
目标：${e.goal}

## 范围
这是待验证的常规 PBE 模板；没有运行 VASP，也没有验证数值收敛。导出不会提交作业。复杂磁性、SOC、HSE 需另行制定协议。任务与依赖以 workflow.json 为准；execution-readiness.json 列出当前执行限制。

## 在授权计算环境运行
1. 安装 requirements.txt 中的依赖，记录并固定实际软件版本。
2. 将 VASP_PP_PATH 指向含 Si/POTCAR 等元素子目录的授权 PBE 势库（多版本势库先选择同一版本根目录）。检查 potcar.spec 的势选择，必要时按研究协议修改。
3. 设置 VASP_COMMAND 为你在已有资源分配内运行 VASP 的命令，如 srun vasp_std。
4. python run_workflow.py --prepare-only 仅准备根任务输入并组装 POTCAR。
5. python run_workflow.py --run 依次运行，后续步骤使用实际输出；本脚本不申请计算资源。

四件套使用 pymatgen 生成；SCF 与非自洽输入须等待上游结构和 CHGCAR。运行每一步后检查电子/离子收敛，不通过则停止。只有已填写的耗时参与估价，待估算任务不会记作免费；示例费用不能当作该体系实测时间。
`,"assemble_potcar.py":`"""在用户授权的本地 PBE 势库组装 POTCAR，不下载或生成新赝势。"""
from pathlib import Path
import os

def assemble(target, symbols):
    root = os.environ.get("VASP_PP_PATH")
    if not root:
        raise RuntimeError("请设置 VASP_PP_PATH 指向已获授权的同一版本 PBE 势库")
    paths = [Path(root) / symbol / "POTCAR" for symbol in symbols]
    for symbol, path in zip(symbols, paths):
        if not path.is_file():
            raise RuntimeError(f"缺少势文件：{symbol}，请核对 potcar.spec 与势库版本")
        head = path.read_bytes()[:1000].decode(errors="replace")
        if "PBE" not in head:
            raise RuntimeError(f"{symbol} 势头未标识 PBE，请人工核查兼容性")
    Path(target).write_bytes(b"".join(path.read_bytes() for path in paths))

if __name__ == "__main__":
    symbols = [s.strip() for s in Path("potcar.spec").read_text().splitlines() if s.strip()]
    assemble("POTCAR", symbols)
`,"run_workflow.py":r}}const br=`"""常规非磁性 PBE 工作流模板，需用户自己的 VASP、势库和资源分配。

没有自动提交集群。模板只支持与路径标准原胞一致的输入晶胞，避免混用坐标。
"""
from pathlib import Path
import argparse
import json
import os
import shlex
import shutil
import subprocess
import re

import numpy as np
from pymatgen.core import Structure
from pymatgen.io.vasp import Incar, Poscar, Kpoints, Vasprun
from pymatgen.symmetry.bandstructure import HighSymmKpath
from assemble_potcar import assemble

ROOT = Path(__file__).resolve().parent
PLAN = json.loads((ROOT / "workflow.json").read_text())
CONFIG = PLAN["settings"]
SPEC = [s.strip() for s in (ROOT / "potcar.spec").read_text().splitlines() if s.strip()]


def checked_path(structure):
    path = HighSymmKpath(structure)
    if len(path.prim) != len(structure) or not np.allclose(
        path.prim.lattice.matrix, structure.lattice.matrix, atol=1e-5, rtol=1e-5
    ):
        raise RuntimeError(
            "输入晶胞与路径标准原胞不同。本模板不会混用路径坐标；"
            "请先明确并标准化原胞，然后重新生成、审阅整个流程。"
        )
    return path


def prepare(name, structure, previous=None, kind=None):
    kind = kind or name
    if not re.fullmatch(r"[a-z][a-z0-9_-]{0,39}", name):
        raise RuntimeError("无效的任务目录标识")
    folder = ROOT / "calculations" / name
    folder.mkdir(parents=True, exist_ok=True)
    structure = structure.get_sorted_structure()
    Poscar(structure).write_file(folder / "POSCAR")
    species = [str(s) for s in Poscar(structure).site_symbols]
    mapping = dict(zip(PLAN["structure"]["species"], SPEC))
    if len(mapping) != len(SPEC) or any(s not in mapping for s in species):
        raise RuntimeError("potcar.spec 元素数或顺序与输入结构不一致")
    assemble(folder / "POTCAR", [mapping[s] for s in species])
    incar = {
        "ENCUT": CONFIG["encut"], "EDIFF": 1e-6, "PREC": "Accurate",
        "GGA": "PE", "ISPIN": 1, "ISMEAR": 0, "SIGMA": 0.05,
        "LREAL": False, "LASPH": True, "LCHARG": True, "LWAVE": False,
        "LMAXMIX": 6, "NELM": 120,
    }
    mesh = [CONFIG["kmesh"]] * 3
    if kind == "relax":
        incar.update({"IBRION": 2, "ISIF": 3, "NSW": 150, "EDIFFG": -0.02})
    else:
        incar.update({"IBRION": -1, "NSW": 0})
    if kind in ("bands", "dos"):
        if previous is None or not (previous / "CHGCAR").is_file():
            raise RuntimeError("非自洽步骤需要已收敛 SCF 的 CHGCAR")
        shutil.copy2(previous / "CHGCAR", folder / "CHGCAR")
        incar.update({"ICHARG": 11, "ISYM": 0, "LCHARG": False})
        if kind == "bands":
            points, labels = checked_path(structure).get_kpoints(
                line_density=25, coords_are_cartesian=False
            )
            kpoints = Kpoints(
                comment="High symmetry path in the verified input cell",
                num_kpts=len(points), style=Kpoints.supported_modes.Reciprocal,
                kpts=points, kpts_weights=[1.0] * len(points), labels=labels,
            )
        else:
            mesh = [max(12, CONFIG["kmesh"])] * 3
            incar.update({"NEDOS": 2001})
            kpoints = Kpoints.gamma_automatic(mesh)
    else:
        kpoints = Kpoints.gamma_automatic(mesh)
    Incar(incar).write_file(folder / "INCAR")
    kpoints.write_file(folder / "KPOINTS")
    return folder


def execute(folder, kind=None):
    kind = kind or folder.name
    command = os.environ.get("VASP_COMMAND")
    if not command:
        raise RuntimeError("请设置 VASP_COMMAND，并在已有资源分配内运行")
    with (folder / "vasp.stdout").open("w") as log:
        subprocess.run(
            shlex.split(command), cwd=folder, check=True,
            stdout=log, stderr=subprocess.STDOUT,
        )
    result = Vasprun(folder / "vasprun.xml", parse_projected_eigen=False)
    if not result.converged_electronic or (
        kind == "relax" and not result.converged_ionic
    ):
        raise RuntimeError(f"{folder.name} 未通过收敛检查，已停止下游计算")
    return result.final_structure


def main():
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--prepare-only", action="store_true")
    group.add_argument("--run", action="store_true")
    args = parser.parse_args()
    structure = Structure.from_file(ROOT / "structure.vasp")
    workflow = PLAN.get("workflow")
    if not workflow or not workflow.get("tasks"):
        raise RuntimeError("缺少显式工作流，请从更新后的应用重新导出。")
    tasks = workflow["tasks"]
    if workflow.get("questions") or any(t["kind"] == "custom" for t in tasks):
        raise RuntimeError("此方案仍有待确认事项或缺失执行器，仅可规划，不能直接执行。")
    ids = [t["id"] for t in tasks]
    if len(set(ids)) != len(ids) or any(not re.fullmatch(r"[a-z][a-z0-9_-]{0,39}", i) for i in ids):
        raise RuntimeError("任务标识重复或无效。")
    completed, folders = {}, {}
    pending = list(tasks)
    if any(t["kind"] == "bands" for t in tasks):
        checked_path(structure)
    while pending:
        ready = [t for t in pending if all(i in completed for i in t["dependsOn"])]
        if args.prepare_only:
            roots = [t for t in tasks if not t["dependsOn"]]
            for task in roots:
                if task["kind"] not in ("relax", "scf"):
                    raise RuntimeError("非自洽任务不能缺少 SCF。")
                prepare(task["id"], structure, kind=task["kind"])
            print("已准备所有根任务输入；下游会在上游实际运行结束后生成。")
            return
        if not ready:
            raise RuntimeError("工作流有循环或缺失依赖，已停止。")
        for task in ready:
            if task["kind"] not in ("relax", "scf", "bands", "dos"):
                raise RuntimeError("未知执行器，已停止。")
            upstream = [t for t in tasks if t["id"] in task["dependsOn"]]
            if task["kind"] in ("bands", "dos"):
                parents = [t for t in upstream if t["kind"] == "scf"]
                if len(parents) != 1:
                    raise RuntimeError("性质任务需要唯一的 SCF 电荷密度来源。")
                parent = parents[0]["id"]
                folder = prepare(task["id"], completed[parent], folders[parent], kind=task["kind"])
            else:
                if len(upstream) > 1:
                    raise RuntimeError("结构来源不唯一，请明确上游结构。")
                source = completed[upstream[0]["id"]] if upstream else structure
                folder = prepare(task["id"], source, kind=task["kind"])
            completed[task["id"]] = execute(folder, task["kind"])
            folders[task["id"]] = folder
            pending.remove(task)
    print("流程已结束；请继续检查目标性质与数值收敛。")


if __name__ == "__main__":
    main()
`,Ye="matterflow-showcase-v1",Ar=()=>({project:gr(),history:[],runs:[],messages:[],skills:structuredClone(yr),config:{engine:"demo"}});let m=Ar(),ue="";try{const e=localStorage.getItem(Ye);if(e){const r=JSON.parse(e);Y(H(r.project)),m=r,m.config.engine="demo"}}catch{ue="浏览器存储不可用或存档无效；当前会话仍可使用。"}for(const e of m.runs)e.status==="running"&&(e.status="interrupted",e.endedAt=new Date().toISOString());const ge=new Map,J=()=>new Date().toISOString(),X=()=>{try{localStorage.setItem(Ye,JSON.stringify(m))}catch{ue="浏览器存储空间不足；请先导出方案，当前修改仅保留在此页面。"}},W=()=>({...structuredClone(m),project:{...structuredClone(m.project),workflow:H(m.project)},cost:ne(m.project),checks:[...Oe(m.project),...ue?[{label:"浏览器存档",status:"warn",detail:ue}]:[]]}),V=(e,r=200)=>new Response(JSON.stringify(e),{status:r,headers:{"Content-Type":"application/json"}}),Be=e=>new Response(`event: result
data: ${JSON.stringify(e)}

`,{headers:{"Content-Type":"text/event-stream"}}),ae=e=>{if(e!==m.project.revision)throw new Error("方案已改变，请刷新后再试。")},Ve=e=>{if(e!=="demo")throw new Error("在线展示版仅提供离线规则演示。请下载本机完整版连接 Codex / Claude Code。")};function Or(e,r,n){const t=Xe(m.project,e,r);m.history.push({id:crypto.randomUUID(),at:J(),label:n||"调整方案",before:m.project}),m.history=m.history.slice(-30),m.project=t,X()}function Pr(e){if(ae(e.revision),m.runs.some(l=>l.status==="running"))throw new Error("已有回放正在进行。");const r=ne(m.project);if(r.complete&&r.high>m.project.settings.budget)throw new Error("费用经验上界超过预算，请先调整。");const n={...structuredClone(m.project),workflow:Y(H(m.project))},t={id:crypto.randomUUID(),revision:n.revision,project:n,status:"running",stage:"",activeTasks:[],completed:[],logs:["[模拟回放] 浏览器演示，不调用 VASP，不产生计算费用。"],startedAt:J(),endedAt:null},s=()=>n.workflow.tasks.filter(l=>!t.completed.includes(l.id)&&l.dependsOn.every(i=>t.completed.includes(i))),o=()=>{t.activeTasks=s().map(l=>l.id),t.stage=t.activeTasks[0]||"complete"};o(),m.runs.unshift(t),m.runs=m.runs.slice(0,8),X();const a=setInterval(()=>{if(t.status!=="running"){clearInterval(a);return}const l=s();if(e.scenario==="scf-error"&&l.some(i=>i.kind==="scf"))t.status="failed",t.logs.push("[模拟错误] SCF 未收敛，阻止下游。这是演示日志。");else{for(const i of l)t.completed.push(i.id),t.logs.push(`[回放] ${i.title} 结束（模拟）。`);o(),t.completed.length===n.workflow.tasks.length&&(t.status="completed",t.logs.push("[回放] 结束；不代表真实计算或科学验证。"))}t.status!=="running"&&(t.endedAt=J(),clearInterval(a)),X()},1500)}async function xr(e,r={}){var t;if((t=r.signal)!=null&&t.aborted)throw new DOMException("已停止","AbortError");const n=e.split("?")[0].replace(/^\/api\//,"");try{const s=typeof r.body=="string"?JSON.parse(r.body):{};if(n==="state")return V(W());if(n==="agents")return V({agents:["codex","claude"].map(o=>({engine:o,installed:!1,loggedIn:!1,version:null,callVerified:!1})),claudeApiConfigured:!1});if(n==="config")return Ve(s.engine),V(W());if(n==="project")return Or(s.actions,s.revision,s.label),V(W());if(n==="undo"){ae(s.revision);const o=m.history.pop();if(!o)throw new Error("没有可撤销的修改。");return m.project={...o.before,revision:m.project.revision+1},o.messages&&(m.messages=o.messages),X(),V(W())}if(n==="skills"){const o=_r(s),a=m.skills.findIndex(i=>i.id===s.id),l={...o,id:a<0?crypto.randomUUID():s.id};return a<0?m.skills.push(l):m.skills[a]=l,X(),V(W())}if(n==="structure")return V({structure:ce(s.text,s.name)});if(n==="plan"){if(Ve(s.engine),ae(s.revision),typeof s.goal!="string"||!s.goal.trim()||s.goal.length>2e3)throw new Error("请用 1–2000 字描述需求。");const o=s.useCurrent?m.project.structure:ce(s.text,s.name),a=Xe({...m.project,structure:o},[{type:"set_workflow",value:hr(s.goal)}],s.revision);a.name=`${o.formula} · ${s.goal.slice(0,24)}`,a.goal=s.goal.trim(),a.planning={source:"demo",usage:null,at:J(),skills:m.skills.filter(i=>i.enabled).map(i=>({id:i.id,name:i.name,version:i.version}))};const l=crypto.randomUUID();return ge.set(l,{project:a,baseRevision:s.revision,at:Date.now()}),Be({token:l,project:a,cost:ne(a),checks:Oe(a)})}if(n==="plan/apply"){ae(s.revision);const o=ge.get(s.token);if(!o||Date.now()-o.at>18e5)throw new Error("草案已过期，请重新生成。");if(o.baseRevision!==m.project.revision)throw new Error("生成期间方案已改变，请重新生成。");return m.history.push({id:crypto.randomUUID(),at:J(),label:"采用新方案",before:m.project,messages:m.messages}),m.history=m.history.slice(-30),m.project=o.project,m.messages=[],ge.delete(s.token),X(),V(W())}if(n==="chat"){if(typeof s.message!="string"||!s.message.trim()||s.message.length>6e3)throw new Error("请输入 1–6000 字的消息。");const o=Er(s.message,m.project,s.nodeId),a={id:crypto.randomUUID(),role:"assistant",text:o.reply,actions:o.actions,revision:m.project.revision,source:"demo",usage:null,at:J(),skills:[]};return m.messages.push({id:crypto.randomUUID(),role:"user",text:s.message,at:J()},a),m.messages=m.messages.slice(-40),X(),Be(a)}if(n==="chat/stop")return V({ok:!0});if(n==="replay")return Pr(s),V(W());if(n==="replay/stop"){for(const o of m.runs)o.status==="running"&&(o.status="cancelled",o.endedAt=J(),o.logs.push("[模拟回放] 用户停止。"));return X(),V(W())}if(n==="export"){const o=Sr(m.project,br);return o["README.md"]=`# 在线交互演示导出

来自离线规则演示，未调用真实模型、未执行 VASP。参数与专业协议需独立验证。

`+o["README.md"],new Response(mr(Object.fromEntries(Object.entries(o).map(([a,l])=>[a,_e(l)]))),{headers:{"Content-Type":"application/zip"}})}throw new Error("在线版未实现此操作，请使用本机完整版。")}catch(s){return V({error:s.message},400)}}export{xr as browserRequest};
