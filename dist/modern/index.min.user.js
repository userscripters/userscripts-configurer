// ==UserScript==
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     One configurer to setup them all
// @grant           GM_deleteValue
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           unsafeWindow
// @homepage        https://github.com/userscripters/userscripts-configurer#readme
// @match           https://*.stackexchange.com/*
// @match           https://askubuntu.com/*
// @match           https://es.meta.stackoverflow.com/*
// @match           https://es.stackoverflow.com/*
// @match           https://ja.meta.stackoverflow.com/*
// @match           https://ja.stackoverflow.com/*
// @match           https://mathoverflow.net/*
// @match           https://meta.askubuntu.com/*
// @match           https://meta.mathoverflow.net/*
// @match           https://meta.serverfault.com/*
// @match           https://meta.stackoverflow.com/*
// @match           https://meta.superuser.com/*
// @match           https://pt.meta.stackoverflow.com/*
// @match           https://pt.stackoverflow.com/*
// @match           https://ru.meta.stackoverflow.com/*
// @match           https://ru.stackoverflow.com/*
// @match           https://serverfault.com/*
// @match           https://stackapps.com/*
// @match           https://stackoverflow.com/*
// @match           https://superuser.com/*
// @name            Userscripts Configurer
// @namespace       userscripters
// @require         https://github.com/userscripters/storage/raw/master/dist/browser.js
// @run-at          document-start
// @source          git+https://github.com/userscripters/userscripts-configurer.git
// @supportURL      https://github.com/userscripters/userscripts-configurer/issues
// @version         0.1.0
// ==/UserScript==

"use strict";window.addEventListener("load",()=>{const i="userscript-configurer",e=window["Store"];if(e){const d=e=>[...e.children].forEach(e=>e.remove());const c=(e,t={})=>{const{classes:s=[],description:n="",parent:a,placeholder:d="",title:l="",value:r=""}=t,i=document.createElement("div"),c=(i.classList.add("d-flex","gs4","gsy","fd-column",...s),document.createElement("div")),o=(c.classList.add("d-flex","ps-relative"),document.createElement("input"));if(o.classList.add("s-input"),o.id=e,o.type="text",o.placeholder=d,o.value=r,c.append(o),i.append(c),l){const p=document.createElement("div"),m=(p.classList.add("flex--item"),document.createElement("label"));if(m.classList.add("d-block","s-label"),m.htmlFor=e,m.textContent=l,n){const u=document.createElement("p");u.classList.add("s-description","mt2"),u.textContent=n,m.append(u)}return p.append(m),i.prepend(p),[i,o,m]}return null!==a&&void 0!==a&&a.append(i),[i,o]},o=(e,t)=>{const{items:s=[],classes:n=[]}=t,a=document.createElement("fieldset");a.classList.add("mt8",...n),a.id=e;t=s.map(e=>{var{disabled:e=!1,id:t,label:s,name:n,selected:a=!1}=e;const d=document.createElement("div"),l=d["classList"],r=(l.add("d-flex","gs8"),e&&l.add("is-disabled"),document.createElement("div")),i=(r.classList.add("flex--item"),document.createElement("input")),c=(i.classList.add("s-checkbox"),i.disabled=e,i.id=t||n,i.name=n,i.type="checkbox",i.checked=a,document.createElement("label"));return c.classList.add("flex--item","s-label","fw-normal"),c.htmlFor=t||n,c.textContent=s,r.append(i),d.append(r,c),d});return a.append(...t),[a]},p=(e,t)=>{const{classes:s=[],description:n="",disabled:a=!1,items:d=[],title:l=""}=t,r=document.createElement("div");if(r.classList.add("d-flex","gs4","gsy","fd-column",...s),l){const o=document.createElement("label");if(o.classList.add("d-block","s-label"),o.htmlFor=e,o.textContent=l,n){const p=document.createElement("p");p.classList.add("s-description","mt2"),p.textContent=n,o.append(p)}r.append(o)}const i=document.createElement("div"),c=(i.classList.add("flex--item","s-select"),document.createElement("select"));c.id=e,c.disabled=a;t=d.map(e=>{var{disabled:e=!1,label:t,selected:s=!1,value:n=""}=e;const a=document.createElement("option");return a.selected=s,a.value=n,a.textContent=t,a.disabled=e,a});return c.append(...t),i.append(c),r.append(i),[r,c]};class s extends(null===e||void 0===e?void 0:e.default){constructor(e,t){super(e,t),this.name=e,this.storage=t,this.options=new Map}option(e,t){return this.options.set(e,{name:e,...t}),this.render(),this}render(){const{name:l,options:e}=this,t=this.container||(this.container=document.createElement("div")),s=(t.classList.add(i+"-userscript","d-flex","fd-column","mb24"),document.createElement("h2")),r=(s.classList.add("mb8"),s.textContent=l,{text:c,select:p,checkbox:o});var n=[...e].map(([s,e])=>{const{desc:t,def:n,items:a=[],type:d="text"}=e;var[e]=r[d](i+`-${l}-`+s,{items:a.map((e,t)=>({...e,name:e.name||i+`-${l}-${s}-item-`+t})),description:t,title:s,value:n});return e});if(d(t),t.append(s,...n),!n.length){const a=document.createElement("div");a.textContent="No configuration options available",t.append(a)}return t}}const n=unsafeWindow.UserScripters||(unsafeWindow.UserScripters={}),a=n.Userscripts||(n.Userscripts={}),l=new class{constructor(e){this.storage=e,this.scripts=new Map}render(){var e={parent:document.body},t=["ps-fixed","r0"],s=[...this.scripts].map(([,e])=>e.render());this.controller||(this.controller=((e,t,{classes:s=[],title:n,danger:a=!1,loading:d=!1,muted:l=!1,parent:r,primary:i=!1,type:c="filled"})=>{const o=document.createElement("button"),p=(o.id=e,o.textContent=t,o.classList.add("s-btn","s-btn__"+c,...s),o.setAttribute("role","button"),o.setAttribute("aria-label",n||t),o)["classList"];return a&&p.add("s-btn__danger"),l&&p.add("s-btn__muted"),i&&p.add("s-btn__primary"),d&&p.add("is-loading"),n&&(o.title=n),null!=r&&r.append(o),o})(i+"-modal-controller","UserScripters",{...e,type:"outlined",muted:!0,classes:[...t,"bar0","t128"]})),this.modal||(this.modal=((e,t,s)=>{const{classes:n=[],content:a=[],contentClasses:d=[],controllerClasses:l,expanded:r=!1,parent:i}=s,c=document.createElement("div"),o=(c.classList.add("s-expandable",...n),c.id=e,r&&c.classList.add("is-expanded"),document.createElement("div")),p=(o.classList.add("s-expandable--content",...d),o.append(...a),t)["dataset"];return p.controller="s-expandable-control",l&&(p.sExpandableControlToggleClass=l.join(" ")),t.setAttribute("aria-controls",e),t.setAttribute("aria-expanded",JSON.stringify(r)),c.append(o),null!==i&&void 0!==i&&i.append(c),c})(i+"-modal",this.controller,{...e,classes:[...t,"z-modal",i+"-modal"],contentClasses:["ba","bar-lg","bc-black-075","bg-white","p16","wmn3"],expanded:!1}));const n=this.modal.querySelector(".s-expandable--content");return n?(d(n),n.append(...s)):console.debug(`[${i}] missing modal content element`),this}hide(){var e;return null!=(e=this.modal)&&e.classList.contains("is-expanded")&&null!=(e=this.controller)&&e.click(),this}get(e){const t=this["scripts"];return t.get(e)}register(e){var t=this["storage"],t=new s(e,t);return this.scripts.set(e,t),this.render(),t}show(){var e;return null!=(e=this.modal)&&e.classList.contains("is-expanded")||null!=(e=this.controller)&&e.click(),this}unregister(e){const t=this["scripts"];var s=t.get(e);return s&&(t.delete(e),this.render()),s}}(e.locateStorage());a.Configurer||(a.Configurer=l);{var t=document.createElement("style");document.head.append(t);const r=t["sheet"];if(r){const m=[`.${i}-modal {
                top: 20vh;
            }`,`.${i}-modal > .s-expandable--content:empty::after {
                content: 'No userscripts to configure';
            }`,`.${i}-userscript:last-child {
                margin-bottom: var(--su2) !important;
            }`];m.forEach(e=>r.insertRule(e))}}l.render()}else console.debug(`[${i}] missing UserScripters storage`)},{once:!0});