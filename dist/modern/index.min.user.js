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

"use strict";window.addEventListener("load",()=>{const l="userscript-configurer",e=window["Store"];if(e){const i=e=>[...e.children].forEach(e=>e.remove());const c=(e,t={})=>{const{classes:s=[],description:n="",parent:a,placeholder:d="",title:r="",value:l=""}=t,i=document.createElement("div"),c=(i.classList.add("d-flex","gs4","gsy","fd-column",...s),document.createElement("div")),o=(c.classList.add("d-flex","ps-relative"),document.createElement("input"));if(o.classList.add("s-input"),o.id=e,o.type="text",o.placeholder=d,o.value=l,c.append(o),i.append(c),r){const p=document.createElement("div"),m=(p.classList.add("flex--item"),document.createElement("label"));if(m.classList.add("d-block","s-label"),m.htmlFor=e,m.textContent=r,n){const u=document.createElement("p");u.classList.add("s-description","mt2"),u.textContent=n,m.append(u)}return p.append(m),i.prepend(p),[i,o,m]}return null!==a&&void 0!==a&&a.append(i),[i,o]},o=(e,t)=>{const{checkboxes:s=[],classes:n=[]}=t,a=document.createElement("fieldset");a.classList.add("mt8",...n),a.id=e;t=s.map(e=>{var{disabled:e=!1,id:t,label:s,name:n,selected:a=!1}=e;const d=document.createElement("div"),r=d["classList"],l=(r.add("d-flex","gs8"),e&&r.add("is-disabled"),document.createElement("div")),i=(l.classList.add("flex--item"),document.createElement("input")),c=(i.classList.add("s-checkbox"),i.disabled=e,i.id=t||n,i.name=n,i.type="checkbox",i.checked=a,document.createElement("label"));return c.classList.add("flex--item","s-label","fw-normal"),c.htmlFor=t||n,c.textContent=s,l.append(i),d.append(l,c),d});return a.append(...t),[a]};class s extends(null===e||void 0===e?void 0:e.default){constructor(e,t){super(e,t),this.name=e,this.storage=t,this.options=new Map}option(e,t,s,n){return this.options.set(e,{name:e,desc:t,def:n,type:s}),this.render(),this}render(){const{name:a,options:e}=this,t=this.container||(this.container=document.createElement("div")),s=(t.classList.add(l+"-userscript","d-flex","fd-column","mb24"),document.createElement("h2")),d=(s.classList.add("mb8"),s.textContent=a,{text:c,checkbox:o});var n=[...e].map(([e,t])=>{var{desc:t,def:s,type:n="text"}=t,[n]=d[n](l+`-${a}-`+e,{checkboxes:[{label:t,name:e,selected:s}],description:t,title:e,value:s});return n});if(i(t),t.append(s,...n),!n.length){const r=document.createElement("div");r.textContent="No configuration options available",t.append(r)}return t}}const n=unsafeWindow.UserScripters||(unsafeWindow.UserScripters={}),a=n.Userscripts||(n.Userscripts={}),d=new class{constructor(e){this.storage=e,this.scripts=new Map}render(){var e={parent:document.body},t=["ps-fixed","r0"],s=[...this.scripts].map(([,e])=>e.render());this.controller||(this.controller=((e,t,{classes:s=[],title:n,danger:a=!1,loading:d=!1,muted:r=!1,parent:l,primary:i=!1,type:c="filled"})=>{const o=document.createElement("button"),p=(o.id=e,o.textContent=t,o.classList.add("s-btn","s-btn__"+c,...s),o.setAttribute("role","button"),o.setAttribute("aria-label",n||t),o)["classList"];return a&&p.add("s-btn__danger"),r&&p.add("s-btn__muted"),i&&p.add("s-btn__primary"),d&&p.add("is-loading"),n&&(o.title=n),null!=l&&l.append(o),o})(l+"-modal-controller","UserScripters",{...e,type:"outlined",muted:!0,classes:[...t,"bar0","t128"]})),this.modal||(this.modal=((e,t,s)=>{const{classes:n=[],content:a=[],contentClasses:d=[],controllerClasses:r,expanded:l=!1,parent:i}=s,c=document.createElement("div"),o=(c.classList.add("s-expandable",...n),c.id=e,l&&c.classList.add("is-expanded"),document.createElement("div")),p=(o.classList.add("s-expandable--content",...d),o.append(...a),t)["dataset"];return p.controller="s-expandable-control",r&&(p.sExpandableControlToggleClass=r.join(" ")),t.setAttribute("aria-controls",e),t.setAttribute("aria-expanded",JSON.stringify(l)),c.append(o),null!==i&&void 0!==i&&i.append(c),c})(l+"-modal",this.controller,{...e,classes:[...t,"z-modal",l+"-modal"],contentClasses:["ba","bar-lg","bc-black-075","bg-white","p16","wmn3"],expanded:!1}));const n=this.modal.querySelector(".s-expandable--content");return n?(i(n),n.append(...s)):console.debug(`[${l}] missing modal content element`),this}hide(){var e;return null!=(e=this.modal)&&e.classList.contains("is-expanded")&&null!=(e=this.controller)&&e.click(),this}get(e){const t=this["scripts"];return t.get(e)}register(e){var t=this["storage"],t=new s(e,t);return this.scripts.set(e,t),this.render(),t}show(){var e;return null!=(e=this.modal)&&e.classList.contains("is-expanded")||null!=(e=this.controller)&&e.click(),this}unregister(e){const t=this["scripts"];var s=t.get(e);return s&&(t.delete(e),this.render()),s}}(e.locateStorage());a.Configurer||(a.Configurer=d);{var t=document.createElement("style");document.head.append(t);const r=t["sheet"];if(r){const p=[`.${l}-modal {
                top: 20vh;
            }`,`.${l}-modal > .s-expandable--content:empty::after {
                content: 'No userscripts to configure';
            }`,`.${l}-userscript:last-child {
                margin-bottom: var(--su2) !important;
            }`];p.forEach(e=>r.insertRule(e))}}d.render()}else console.debug(`[${l}] missing UserScripters storage`)},{once:!0});