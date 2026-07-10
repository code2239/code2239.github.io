function e(t){const r=document.createElement("div");return r.textContent=t,r.innerHTML}function $(t,r){if(r<=7)return Array.from({length:r},(n,d)=>d+1);const a=[];a.push(1),t>3&&a.push("...");for(let n=Math.max(2,t-1);n<=Math.min(r-1,t+1);n++)a.push(n);return t<r-2&&a.push("..."),a.push(r),a}function w(t,r,a,n){if(a<=1){t.innerHTML="",t.style.display="none";return}t.style.display="";const d=$(r,a);let c="";c+=`<button class="page-btn" data-page="${r-1}"${r<=1?" disabled":""} aria-label="上一页">←</button>`;for(const s of d)s==="..."?c+='<span class="page-ellipsis">…</span>':c+=`<button class="page-btn${s===r?" active":""}" data-page="${s}">${s}</button>`;c+=`<button class="page-btn" data-page="${r+1}"${r>=a?" disabled":""} aria-label="下一页">→</button>`,t.innerHTML=c,t.querySelectorAll(".page-btn:not([disabled])").forEach(s=>{s.addEventListener("click",()=>{const x=parseInt(s.getAttribute("data-page"));x>=1&&x<=a&&n(x)})})}function k(t){const{items:r,pageSize:a=10,filterDefs:n={},onStateChange:d}=t;let c={},s=1;const x=new URLSearchParams(window.location.search);for(const o of Object.keys(n)){const l=x.get(o);l&&(c[o]=l)}const p=x.get("search");p&&(c.search=p);const u=parseInt(x.get("page"));u>=1&&(s=u);function g(){return r.filter(o=>{for(const[l,i]of Object.entries(c))if(i){if(n[l]){if(!n[l](o,i))return!1}else if(l==="search"&&![o.title||"",o.summary||"",(o.tags||[]).join(" ")].join(" ").toLowerCase().includes(i.toLowerCase()))return!1}return!0})}function h(){const o=new URL(window.location.href);for(const l of[...Object.keys(n),"search","page"])o.searchParams.delete(l);for(const[l,i]of Object.entries(c))i&&o.searchParams.set(l,i);s>1&&o.searchParams.set("page",String(s)),window.history.replaceState({},"",o.toString())}function f(){const o=g(),l=Math.max(1,Math.ceil(o.length/a));s>l&&(s=l),s<1&&(s=1);const i=(s-1)*a,v=o.slice(i,i+a);h(),d&&d({pageItems:v,currentPage:s,totalPages:l,filteredCount:o.length,activeFilters:{...c},start:i,end:Math.min(i+a,o.length)})}function m(o,l){l?c[o]=l:delete c[o],s=1,f()}function b(o){s=o,f();const l=document.getElementById("blog-list")||document.getElementById("notes-list")||document.getElementById("resources-list")||document.getElementById("projects-list");l&&l.scrollIntoView({behavior:"smooth",block:"start"})}function y(){c={},s=1}return f(),{setFilter:m,goToPage:b,getFilteredItems:g,notify:f,destroy:y}}function j(t){const r=t.tags.map((a,n)=>`<span>${e(a)}${n<t.tags.length-1?'<span class="mx-1">·</span>':""}</span>`).join("");return`
    <article class="card-hover p-6 h-full">
      <a href="${e(t.href)}" class="no-underline flex flex-col h-full group">
        <h3 class="text-lg font-semibold mb-1.5 text-[var(--color-text)] line-clamp-2">
          ${e(t.title)}
        </h3>
        <p class="text-sm text-[var(--color-text-tertiary)] mb-2">${e(t.date)}</p>
        <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-3 line-clamp-2">
          ${e(t.summary)}
        </p>
        <div class="mt-auto">
          <span class="text-sm text-[var(--color-text-tertiary)]">${r}</span>
        </div>
      </a>
    </article>`}function C(t){const r=t.tags.map((a,n)=>`<span>${e(a)}${n<t.tags.length-1?'<span class="mx-1">·</span>':""}</span>`).join("");return`
    <article class="card-hover p-6 h-full">
      <a href="${e(t.href)}" class="no-underline flex flex-col h-full group">
        <h3 class="text-lg font-semibold mb-1.5 text-[var(--color-text)] line-clamp-2">
          ${e(t.title)}
        </h3>
        <p class="text-sm text-[var(--color-text-tertiary)] mb-2">${e(t.date)}</p>
        <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-3 line-clamp-2">
          ${e(t.summary)}
        </p>
        <div class="mt-auto">
          <span class="text-sm text-[var(--color-text-tertiary)]">${r}</span>
        </div>
      </a>
    </article>`}function H(t){const r=t.tags.map((d,c)=>`<span>${e(d)}${c<t.tags.length-1?'<span class="mx-1">·</span>':""}</span>`).join(""),a=t.image?`<div class="aspect-[16/9] overflow-hidden bg-[var(--color-bg-tertiary)]">
         <img src="${e(t.image)}" alt="${e(t.title)}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
       </div>`:`<div class="aspect-[16/9] bg-gradient-to-br from-[var(--color-accent-soft)] to-[var(--color-bg-tertiary)] flex items-center justify-center">
         <svg class="w-10 h-10 text-[var(--color-text-tertiary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
           <rect x="2" y="3" width="20" height="14" rx="2" />
           <path d="M8 21h8M12 17v4" />
         </svg>
       </div>`,n=t.github||t.demo?`<div class="px-5 pb-4 flex items-center gap-3 border-t border-[var(--color-border)] pt-3">
         ${t.github?`<a href="${e(t.github)}" target="_blank" rel="noopener noreferrer" class="text-xs text-[var(--color-text-tertiary)] no-underline hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>GitHub</a>`:""}
         ${t.demo?`<a href="${e(t.demo)}" target="_blank" rel="noopener noreferrer" class="text-xs text-[var(--color-text-tertiary)] no-underline hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Live Demo</a>`:""}
       </div>`:"";return`
    <article class="card-hover overflow-hidden h-full flex flex-col">
      <a href="${e(t.href)}" class="no-underline flex flex-col h-full group">
        ${a}
        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-base font-semibold mb-1 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">
            ${e(t.title)}
          </h3>
          <p class="text-sm text-[var(--color-text-tertiary)] mb-2">${e(t.date)}</p>
          <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-3 line-clamp-2">
            ${e(t.summary)}
          </p>
          <div class="mt-auto">
            <span class="text-sm text-[var(--color-text-tertiary)]">${r}</span>
          </div>
        </div>
      </a>
      ${n}
    </article>`}function M(t){const r=t.fileCount||0,a=t.tags.slice(0,4).map(n=>`<span class="text-xs px-2 py-0.5 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)] font-mono">${e(n)}</span>`).join("");return`
    <article class="card-hover overflow-hidden h-full flex flex-col">
      <a href="${e(t.href)}" class="no-underline flex flex-col h-full group">
        <div class="aspect-[16/9] bg-gradient-to-br from-[var(--color-accent-soft)] to-[var(--color-bg-tertiary)] flex items-center justify-center relative">
          <svg class="w-14 h-14 text-[var(--color-accent)]/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="14 2 14 8 20 8" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${r>0?`<span class="absolute bottom-4 right-4 text-xs font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg)]/80 px-2 py-1 rounded">${r} 个文件</span>`:""}
        </div>
        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-base font-semibold mb-1 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
            ${e(t.title)}
          </h3>
          <p class="text-xs text-[var(--color-text-tertiary)] mb-2">${e(t.date)}</p>
          <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2 mb-3">
            ${e(t.summary)}
          </p>
          <div class="flex flex-wrap gap-1.5 mt-auto">
            ${a}
          </div>
        </div>
      </a>
    </article>`}function B(t){return(t.tags||[]).slice(0,5).map(r=>`<span class="text-xs px-2 py-0.5 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)] font-mono">${e(r)}</span>`).join(""),`
    <article class="card-hover overflow-hidden h-full flex flex-col">
      <a href="${e(t.href)}" class="no-underline flex flex-col h-full group">
        <div class="aspect-[16/9] bg-gradient-to-br from-[var(--color-accent-soft)] to-[var(--color-bg-tertiary)] flex items-center justify-center relative">
          <svg class="w-14 h-14 text-[var(--color-accent)]/30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
          </svg>
          <span class="absolute bottom-4 right-4 text-xs font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg)]/80 px-2 py-1 rounded">
            ${t.itemCount||0} 个资源
          </span>
        </div>
        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-base font-semibold mb-1 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors capitalize">
            ${e(t.title)}
          </h3>
          <p class="text-xs text-[var(--color-text-tertiary)] mb-2">${e(t.dateRange||t.date)}</p>
          <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2">
            ${e(t.summary)}
          </p>
        </div>
      </a>
    </article>`}export{w as a,C as b,k as c,H as d,B as e,M as f,j as r};
