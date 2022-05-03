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

"use strict";window.addEventListener("load",()=>{const d="userscript-configurer",e=window["Store"];if(e){const o=e=>[...e.children].forEach(e=>e.remove());class s extends(null===e||void 0===e?void 0:e.default){constructor(e,t){super(e,t),this.name=e,this.storage=t,this.options=new Map}option(e,t,s){return this.options.set(e,{name:e,desc:t,def:s}),this.render(),this}render(){const{name:n,options:e}=this,t=this.container||(this.container=document.createElement("div")),s=(t.classList.add(d+"-userscript","d-flex","fd-column","mb24"),document.createElement("h2"));s.classList.add("mb8"),s.textContent=n;var a=[...e].map(([e,t])=>{var{desc:t,def:s}=t,[t]=((e,t)=>{const{classes:s=[],description:n="",parent:a,placeholder:r="",title:d="",value:o=""}=t,i=document.createElement("div"),l=(i.classList.add("d-flex","gs4","gsy","fd-column",...s),document.createElement("div")),c=(l.classList.add("d-flex","ps-relative"),document.createElement("input"));if(c.classList.add("s-input"),c.id=e,c.type="text",c.placeholder=r,c.value=o,l.append(c),i.append(l),d){const p=document.createElement("div"),u=(p.classList.add("flex--item"),document.createElement("label"));if(u.classList.add("d-block","s-label"),u.htmlFor=e,u.textContent=d,n){const m=document.createElement("p");m.classList.add("s-description","mt2"),m.textContent=n,u.append(m)}return p.append(u),i.prepend(p),[i,c,u]}return null!==a&&void 0!==a&&a.append(i),[i,c]})(d+`-${n}-`+e,{description:t,title:e,value:s});return t});if(o(t),t.append(s,...a),!a.length){const r=document.createElement("div");r.textContent="No configuration options available",t.append(r)}return t}}const n=unsafeWindow.UserScripters||(unsafeWindow.UserScripters={}),a=n.Userscripts||(n.Userscripts={}),r=new class{constructor(e){this.storage=e,this.scripts=new Map}render(){var e={parent:document.body},t=["ps-fixed","r0"],s=[...this.scripts].map(([,e])=>e.render());this.controller||(this.controller=((e,t,{classes:s=[],title:n,danger:a=!1,loading:r=!1,muted:d=!1,parent:o,primary:i=!1,type:l="filled"})=>{const c=document.createElement("button"),p=(c.id=e,c.textContent=t,c.classList.add("s-btn","s-btn__"+l,...s),c.setAttribute("role","button"),c.setAttribute("aria-label",n||t),c)["classList"];return a&&p.add("s-btn__danger"),d&&p.add("s-btn__muted"),i&&p.add("s-btn__primary"),r&&p.add("is-loading"),n&&(c.title=n),null!=o&&o.append(c),c})(d+"-modal-controller","UserScripters",{...e,type:"outlined",muted:!0,classes:[...t,"bar0","t128"]})),this.modal||(this.modal=((e,t,s)=>{const{classes:n=[],content:a=[],contentClasses:r=[],controllerClasses:d,expanded:o=!1,parent:i}=s,l=document.createElement("div"),c=(l.classList.add("s-expandable",...n),l.id=e,o&&l.classList.add("is-expanded"),document.createElement("div")),p=(c.classList.add("s-expandable--content",...r),c.append(...a),t)["dataset"];return p.controller="s-expandable-control",d&&(p.sExpandableControlToggleClass=d.join(" ")),t.setAttribute("aria-controls",e),t.setAttribute("aria-expanded",JSON.stringify(o)),l.append(c),null!==i&&void 0!==i&&i.append(l),l})(d+"-modal",this.controller,{...e,classes:[...t,"z-modal",d+"-modal"],contentClasses:["ba","bar-lg","bc-black-075","bg-white","p16","wmn3"],expanded:!1}));const n=this.modal.querySelector(".s-expandable--content");return n?(o(n),n.append(...s)):console.debug(`[${d}] missing modal content element`),this}hide(){var e;return null!=(e=this.modal)&&e.classList.contains("is-expanded")&&null!=(e=this.controller)&&e.click(),this}get(e){const t=this["scripts"];return t.get(e)}register(e){var t=this["storage"],t=new s(e,t);return this.scripts.set(e,t),this.render(),t}show(){var e;return null!=(e=this.modal)&&e.classList.contains("is-expanded")||null!=(e=this.controller)&&e.click(),this}}(e.locateStorage());a.Configurer||(a.Configurer=r);{var t=document.createElement("style");document.head.append(t);const i=t["sheet"];if(i){const l=[`.${d}-modal {
                top: 20vh;
            }`,`.${d}-modal > .s-expandable--content:empty::after {
                content: 'No userscripts to configure';
            }`,`.${d}-userscript:last-child {
                margin-bottom: var(--su2) !important;
            }`];l.forEach(e=>i.insertRule(e))}}r.render()}else console.debug(`[${d}] missing UserScripters storage`)},{once:!0});