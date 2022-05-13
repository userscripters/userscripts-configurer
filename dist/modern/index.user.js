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

"use strict";
;
;
window.addEventListener("load", () => {
    const scriptName = "userscript-configurer";
    const { Store } = window;
    if (!Store) {
        console.debug(`[${scriptName}] missing UserScripters storage`);
        return;
    }
    const clear = (elem) => [...elem.children].forEach((c) => c.remove());
    const appendStyles = () => {
        const style = document.createElement("style");
        document.head.append(style);
        const { sheet } = style;
        if (!sheet)
            return;
        const rules = [
            `.${scriptName}-modal {
                top: 20vh;
            }`,
            `.${scriptName}-modal > .s-expandable--content:empty::after {
                content: 'No userscripts to configure';
            }`,
            `.${scriptName}-userscript:last-child {
                margin-bottom: var(--su2) !important;
            }`,
        ];
        rules.forEach((rule) => sheet.insertRule(rule));
    };
    const makeStacksButton = (id, text, { classes = [], title, danger = false, loading = false, muted = false, parent, primary = false, type = "filled", } = {}) => {
        const btn = document.createElement("button");
        btn.id = id;
        btn.textContent = text;
        btn.classList.add("s-btn", `s-btn__${type}`, ...classes);
        btn.setAttribute("role", "button");
        btn.setAttribute("aria-label", title || text);
        const { classList } = btn;
        if (danger)
            classList.add("s-btn__danger");
        if (muted)
            classList.add("s-btn__muted");
        if (primary)
            classList.add("s-btn__primary");
        if (loading)
            classList.add("is-loading");
        if (title)
            btn.title = title;
        parent === null || parent === void 0 ? void 0 : parent.append(btn);
        return btn;
    };
    const makeStacksExpandable = (id, controller, options = {}) => {
        const { classes = [], content = [], contentClasses = [], controllerClasses, expanded = false, parent } = options;
        const containerElem = document.createElement("div");
        containerElem.classList.add("s-expandable", ...classes);
        containerElem.id = id;
        if (expanded)
            containerElem.classList.add("is-expanded");
        const contentElem = document.createElement("div");
        contentElem.classList.add("s-expandable--content", ...contentClasses);
        contentElem.append(...content);
        const { dataset } = controller;
        dataset.controller = "s-expandable-control";
        if (controllerClasses) {
            dataset.sExpandableControlToggleClass = controllerClasses.join(" ");
        }
        controller.setAttribute("aria-controls", id);
        controller.setAttribute("aria-expanded", JSON.stringify(expanded));
        containerElem.append(contentElem);
        parent === null || parent === void 0 ? void 0 : parent.append(containerElem);
        return containerElem;
    };
    const makeStacksTextInput = (id, options = {}) => {
        const { classes = [], description = "", parent, placeholder = "", title = "", value = "", } = options;
        const wrap = document.createElement("div");
        wrap.classList.add("d-flex", "gs4", "gsy", "fd-column", ...classes);
        const inputWrap = document.createElement("div");
        inputWrap.classList.add("d-flex", "ps-relative");
        const input = document.createElement("input");
        input.classList.add("s-input");
        input.id = id;
        input.type = "text";
        input.placeholder = placeholder;
        input.value = value;
        inputWrap.append(input);
        wrap.append(inputWrap);
        if (title) {
            const lblWrap = document.createElement("div");
            lblWrap.classList.add("flex--item");
            const label = document.createElement("label");
            label.classList.add("d-block", "s-label");
            label.htmlFor = id;
            label.textContent = title;
            if (description) {
                const desc = document.createElement("p");
                desc.classList.add("s-description", "mt2");
                desc.textContent = description;
                label.append(desc);
            }
            lblWrap.append(label);
            wrap.prepend(lblWrap);
            return [wrap, input, label];
        }
        parent === null || parent === void 0 ? void 0 : parent.append(wrap);
        return [wrap, input];
    };
    const makeStacksCheckbox = (id, options) => {
        const { items = [], classes = [], } = options;
        const wrapper = document.createElement("fieldset");
        wrapper.classList.add("mt8", ...classes);
        wrapper.id = id;
        const boxes = items.map((box) => {
            const { disabled = false, id, label, name, selected = false } = box;
            const wrapper = document.createElement("div");
            const { classList } = wrapper;
            classList.add("d-flex", "gs8");
            if (disabled)
                classList.add("is-disabled");
            const item = document.createElement("div");
            item.classList.add("flex--item");
            const input = document.createElement("input");
            input.classList.add("s-checkbox");
            input.disabled = disabled;
            input.id = id || name;
            input.name = name;
            input.type = "checkbox";
            input.checked = selected;
            const labelElem = document.createElement("label");
            labelElem.classList.add("flex--item", "s-label", "fw-normal");
            labelElem.htmlFor = id || name;
            labelElem.textContent = label;
            item.append(input);
            wrapper.append(item, labelElem);
            return wrapper;
        });
        wrapper.append(...boxes);
        return [wrapper];
    };
    const makeStacksSelect = (id, options) => {
        const { classes = [], description = "", disabled = false, items = [], title = "" } = options;
        const wrapper = document.createElement("div");
        wrapper.classList.add("d-flex", "gs4", "gsy", "fd-column", ...classes);
        if (title) {
            const label = document.createElement("label");
            label.classList.add("d-block", "s-label");
            label.htmlFor = id;
            label.textContent = title;
            if (description) {
                const desc = document.createElement("p");
                desc.classList.add("s-description", "mt2");
                desc.textContent = description;
                label.append(desc);
            }
            wrapper.append(label);
        }
        const selectWrapper = document.createElement("div");
        selectWrapper.classList.add("flex--item", "s-select");
        const select = document.createElement("select");
        select.id = id;
        select.disabled = disabled;
        const opts = items.map((item) => {
            const { disabled = false, label, selected = false, value = "" } = item;
            const option = document.createElement("option");
            option.selected = selected;
            option.value = value;
            option.textContent = label;
            option.disabled = disabled;
            return option;
        });
        select.append(...opts);
        selectWrapper.append(select);
        wrapper.append(selectWrapper);
        return [wrapper, select];
    };
    class Userscript extends (Store === null || Store === void 0 ? void 0 : Store.default) {
        constructor(name, storage) {
            super(name, storage);
            this.name = name;
            this.storage = storage;
            this.options = new Map();
        }
        option(key, desc, type, def) {
            this.options.set(key, { name: key, desc, def, type });
            this.render();
            return this;
        }
        render() {
            const { name, options } = this;
            const container = this.container || (this.container = document.createElement("div"));
            container.classList.add(`${scriptName}-userscript`, "d-flex", "fd-column", "mb24");
            const header = document.createElement("h2");
            header.classList.add("mb8");
            header.textContent = name;
            const handlerMap = {
                "text": makeStacksTextInput,
                "select": makeStacksSelect,
                "checkbox": makeStacksCheckbox
            };
            const inputs = [...options].map(([key, option]) => {
                const { desc, def, type = "text" } = option;
                const [inputWrapper] = handlerMap[type](`${scriptName}-${name}-${key}`, {
                    items: [{
                            label: desc,
                            name: key,
                            selected: def
                        }],
                    description: desc,
                    title: key,
                    value: def
                });
                return inputWrapper;
            });
            clear(container);
            container.append(header, ...inputs);
            if (!inputs.length) {
                const empty = document.createElement("div");
                empty.textContent = "No configuration options available";
                container.append(empty);
            }
            return container;
        }
    }
    class Configurer {
        constructor(storage) {
            this.storage = storage;
            this.scripts = new Map();
        }
        render() {
            const common = { parent: document.body };
            const commonClasses = ["ps-fixed", "r0"];
            const content = [...this.scripts].map(([_, s]) => s.render());
            this.controller || (this.controller = makeStacksButton(`${scriptName}-modal-controller`, "UserScripters", {
                ...common,
                type: "outlined",
                muted: true,
                classes: [
                    ...commonClasses,
                    "bar0", "t128"
                ]
            }));
            this.modal || (this.modal = makeStacksExpandable(`${scriptName}-modal`, this.controller, {
                ...common,
                classes: [
                    ...commonClasses,
                    "z-modal",
                    `${scriptName}-modal`,
                ],
                contentClasses: ["ba", "bar-lg", "bc-black-075", "bg-white", "p16", "wmn3"],
                expanded: false
            }));
            const contentElem = this.modal.querySelector(".s-expandable--content");
            if (!contentElem) {
                console.debug(`[${scriptName}] missing modal content element`);
                return this;
            }
            clear(contentElem);
            contentElem.append(...content);
            return this;
        }
        hide() {
            var _a, _b;
            if ((_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.contains("is-expanded")) {
                (_b = this.controller) === null || _b === void 0 ? void 0 : _b.click();
            }
            return this;
        }
        get(name) {
            const { scripts } = this;
            return scripts.get(name);
        }
        register(name) {
            const { storage } = this;
            const script = new Userscript(name, storage);
            this.scripts.set(name, script);
            this.render();
            return script;
        }
        show() {
            var _a, _b;
            if (!((_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.contains("is-expanded"))) {
                (_b = this.controller) === null || _b === void 0 ? void 0 : _b.click();
            }
            return this;
        }
        unregister(name) {
            const { scripts } = this;
            const script = scripts.get(name);
            if (script) {
                scripts.delete(name);
                this.render();
            }
            return script;
        }
    }
    const userscripters = unsafeWindow.UserScripters || (unsafeWindow.UserScripters = {});
    const userscripts = userscripters.Userscripts || (userscripters.Userscripts = {});
    const storage = Store.locateStorage();
    const configurer = new Configurer(storage);
    userscripts.Configurer || (userscripts.Configurer = configurer);
    appendStyles();
    configurer.render();
}, { once: true });
