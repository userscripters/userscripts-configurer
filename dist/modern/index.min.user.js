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

"use strict";window.addEventListener("load",()=>{const r="userscript-configurer",e=window["Store"];if(e){const c=e=>[...e.children].forEach(e=>e.remove());const i=(e,t={})=>{const{classes:s=[],description:n="",parent:a,placeholder:d="",title:l="",value:r=""}=t,c=document.createElement("div"),i=(c.classList.add("d-flex","gs4","gsy","fd-column",...s),document.createElement("div")),o=(i.classList.add("d-flex","ps-relative"),document.createElement("input"));if(o.classList.add("s-input"),o.id=e,o.type="text",o.placeholder=d,o.value=r,i.append(o),c.append(i),l){const p=document.createElement("div"),m=(p.classList.add("flex--item"),document.createElement("label"));if(m.classList.add("d-block","s-label"),m.htmlFor=e,m.textContent=l,n){const u=document.createElement("p");u.classList.add("s-description","mt2"),u.textContent=n,m.append(u)}return p.append(m),c.prepend(p),[c,o,m]}return null!==a&&void 0!==a&&a.append(c),[c,o]},o=(e,t)=>{const{items:s=[],classes:n=[]}=t,a=document.createElement("fieldset");a.classList.add("mt8",...n),a.id=e;t=s.map(e=>{var{disabled:e=!1,id:t,label:s,name:n,selected:a=!1}=e;const d=document.createElement("div"),l=d["classList"],r=(l.add("d-flex","gs8"),e&&l.add("is-disabled"),document.createElement("div")),c=(r.classList.add("flex--item"),document.createElement("input")),i=(c.classList.add("s-checkbox"),c.disabled=e,c.id=t||n,c.name=n,c.type="checkbox",c.checked=a,document.createElement("label"));return i.classList.add("flex--item","s-label","fw-normal"),i.htmlFor=t||n,i.textContent=s,r.append(c),d.append(r,i),d});return a.append(...t),[a]},p=(e,t)=>{const{classes:s=[],description:n="",disabled:a=!1,items:d=[],title:l=""}=t,r=document.createElement("div");if(r.classList.add("d-flex","gs4","gsy","fd-column",...s),l){const o=document.createElement("label");if(o.classList.add("d-block","s-label"),o.htmlFor=e,o.textContent=l,n){const p=document.createElement("p");p.classList.add("s-description","mt2"),p.textContent=n,o.append(p)}r.append(o)}const c=document.createElement("div"),i=(c.classList.add("flex--item","s-select"),document.createElement("select"));i.id=e,i.disabled=a;t=d.map(e=>{var{disabled:e=!1,label:t,selected:s=!1,value:n=""}=e;const a=document.createElement("option");return a.selected=s,a.value=n,a.textContent=t,a.disabled=e,a});return i.append(...t),c.append(i),r.append(c),[r,i]};class s extends(null===e||void 0===e?void 0:e.default){constructor(e,t){super(e,t),this.name=e,this.storage=t,this.options=new Map}option(e,t,s,n){return this.options.set(e,{name:e,desc:t,def:n,type:s}),this.render(),this}render(){const{name:a,options:e}=this,t=this.container||(this.container=document.createElement("div")),s=(t.classList.add(r+"-userscript","d-flex","fd-column","mb24"),document.createElement("h2")),d=(s.classList.add("mb8"),s.textContent=a,{text:i,select:p,checkbox:o});var n=[...e].map(([e,t])=>{var{desc:t,def:s,type:n="text"}=t,[n]=d[n](r+`-${a}-`+e,{items:[{label:t,name:e,selected:s}],description:t,title:e,value:s});return n});if(c(t),t.append(s,...n),!n.length){const l=document.createElement("div");l.textContent="No configuration options available",t.append(l)}return t}}const n=unsafeWindow.UserScripters||(unsafeWindow.UserScripters={}),a=n.Userscripts||(n.Userscripts={}),d=new class{constructor(e){this.storage=e,this.scripts=new Map}render(){var e={parent:document.body},t=["ps-fixed","r0"],s=[...this.scripts].map(([,e])=>e.render());this.controller||(this.controller=((e,t,{classes:s=[],title:n,danger:a=!1,loading:d=!1,muted:l=!1,parent:r,primary:c=!1,type:i="filled"})=>{const o=document.createElement("button"),p=(o.id=e,o.textContent=t,o.classList.add("s-btn","s-btn__"+i,...s),o.setAttribute("role","button"),o.setAttribute("aria-label",n||t),o)["classList"];return a&&p.add("s-btn__danger"),l&&p.add("s-btn__muted"),c&&p.add("s-btn__primary"),d&&p.add("is-loading"),n&&(o.title=n),null!=r&&r.append(o),o})(r+"-modal-controller","UserScripters",{...e,type:"outlined",muted:!0,classes:[...t,"bar0","t128"]})),this.modal||(this.modal=((e,t,s)=>{const{classes:n=[],content:a=[],contentClasses:d=[],controllerClasses:l,expanded:r=!1,parent:c}=s,i=document.createElement("div"),o=(i.classList.add("s-expandable",...n),i.id=e,r&&i.classList.add("is-expanded"),document.createElement("div")),p=(o.classList.add("s-expandable--content",...d),o.append(...a),t)["dataset"];return p.controller="s-expandable-control",l&&(p.sExpandableControlToggleClass=l.join(" ")),t.setAttribute("aria-controls",e),t.setAttribute("aria-expanded",JSON.stringify(r)),i.append(o),null!==c&&void 0!==c&&c.append(i),i})(r+"-modal",this.controller,{...e,classes:[...t,"z-modal",r+"-modal"],contentClasses:["ba","bar-lg","bc-black-075","bg-white","p16","wmn3"],expanded:!1}));const n=this.modal.querySelector(".s-expandable--content");return n?(c(n),n.append(...s)):console.debug(`[${r}] missing modal content element`),this}hide(){var e;return null!=(e=this.modal)&&e.classList.contains("is-expanded")&&null!=(e=this.controller)&&e.click(),this}get(e){const t=this["scripts"];return t.get(e)}register(e){var t=this["storage"],t=new s(e,t);return this.scripts.set(e,t),this.render(),t}show(){var e;return null!=(e=this.modal)&&e.classList.contains("is-expanded")||null!=(e=this.controller)&&e.click(),this}unregister(e){const t=this["scripts"];var s=t.get(e);return s&&(t.delete(e),this.render()),s}}(e.locateStorage());a.Configurer||(a.Configurer=d);{var t=document.createElement("style");document.head.append(t);const l=t["sheet"];if(l){const m=[`.${r}-modal {
                top: 20vh;
            }`,`.${r}-modal > .s-expandable--content:empty::after {
                content: 'No userscripts to configure';
            }`,`.${r}-userscript:last-child {
                margin-bottom: var(--su2) !important;
            }`];m.forEach(e=>l.insertRule(e))}}d.render()}else console.debug(`[${r}] missing UserScripters storage`)},{once:!0});