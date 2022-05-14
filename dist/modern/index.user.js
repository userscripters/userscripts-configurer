// ==UserScript==
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     One script to configure them all
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
// @version         1.1.0
// ==/UserScript==

"use strict";
;
;
;
window.addEventListener("load", async () => {
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
            `.${scriptName}-userscript-toast {
                top: 20vh;
                left: unset;
            }`,
            `.${scriptName}-userscript-option:last-child {
                margin-bottom: 0 !important;
            }`
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
        wrapper.classList.add(...classes);
        wrapper.id = id;
        const boxes = items.map((box) => {
            const { disabled = false, id, label, name, selected = false, value = "" } = box;
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
            input.value = value;
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
        const { classes = [], description = "", disabled = false, items = [], title = "", value = "" } = options;
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
        select.value = value;
        selectWrapper.append(select);
        wrapper.append(selectWrapper);
        return [wrapper, select];
    };
    const makeStacksIcon = (name, pathConfig, options = {}) => {
        const { classes = [], width = 14, height = width, } = options;
        const ns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(ns, "svg");
        svg.classList.add("svg-icon", name, ...classes);
        svg.setAttribute("width", width.toString());
        svg.setAttribute("height", height.toString());
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.setAttribute("aria-hidden", "true");
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", pathConfig);
        svg.append(path);
        return [svg, path];
    };
    const makeStacksToggle = (id, options) => {
        const { classes = [], selected = false, title, } = options;
        const wrapper = document.createElement("div");
        wrapper.classList.add("d-flex", "ai-center", "gs8", ...classes);
        const lbl = document.createElement("label");
        lbl.classList.add("flex--item", "s-label");
        lbl.htmlFor = id;
        lbl.textContent = title;
        const toggleWrapper = document.createElement("div");
        toggleWrapper.classList.add("flex--item", "s-toggle-switch");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = id;
        input.checked = selected;
        const lever = document.createElement("div");
        lever.classList.add("s-toggle-switch--indicator");
        toggleWrapper.append(input, lever);
        wrapper.append(lbl, toggleWrapper);
        return [wrapper, input];
    };
    const makeStacksToast = (id, text, options = {}) => {
        const { buttons = [], classes = [], important = false, msgClasses = [], parent, type = "none", } = options;
        const wrap = document.createElement("div");
        wrap.classList.add("s-toast", ...classes);
        wrap.setAttribute("aria-hidden", "true");
        wrap.setAttribute("role", "alertdialog");
        wrap.setAttribute("aria-labelledby", "notice-message");
        wrap.id = id;
        const aside = document.createElement("aside");
        aside.classList.add("s-notice", "p8", "pl16");
        if (type !== "none")
            aside.classList.add(`s-notice__${type}`);
        if (important)
            aside.classList.add("s-notice__important");
        const msgWrap = document.createElement("div");
        msgWrap.classList.add("d-flex", "gs16", "gsx", "ai-center", "jc-space-between", ...msgClasses);
        const message = document.createElement("div");
        message.classList.add("flex--item");
        message.textContent = text;
        const btnWrap = document.createElement("div");
        btnWrap.classList.add("d-flex");
        const dismissBtn = document.createElement("button");
        dismissBtn.type = "button";
        dismissBtn.classList.add("s-btn", "s-notice--btn");
        dismissBtn.setAttribute("aria-label", "Dismiss");
        buttons.push(dismissBtn);
        const [dismissIcon] = makeStacksIcon("iconClearSm", "M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z");
        dismissBtn.append(dismissIcon);
        btnWrap.append(...buttons);
        msgWrap.append(message, btnWrap);
        aside.append(msgWrap);
        wrap.append(aside);
        if (parent)
            parent.append(wrap);
        return wrap;
    };
    const toggleToast = (target, show) => {
        const toast = typeof target === "string" ? document.querySelector(target) : target;
        if (!toast)
            throw new ReferenceError(`missing toast: ${target}`);
        const isShown = (toast === null || toast === void 0 ? void 0 : toast.getAttribute("aria-hidden")) !== "true";
        toast.setAttribute("aria-hidden", (show !== void 0 ? !show : isShown).toString());
        return toast;
    };
    const hideToast = (target, hideFor) => {
        const toast = toggleToast(target, false);
        if (hideFor)
            setTimeout(() => showToast(toast), hideFor * 1e3);
    };
    const showToast = (target, showFor) => {
        const toast = toggleToast(target, true);
        if (showFor)
            setTimeout(() => hideToast(toast), showFor * 1e3);
    };
    const isInputLike = (elem) => {
        return [HTMLInputElement, HTMLSelectElement].some((t) => elem instanceof t);
    };
    const isCheckedBox = (elem) => {
        return elem instanceof HTMLInputElement && elem.checked;
    };
    const scase = (text) => text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase();
    const prettifyName = (name) => name.split(/[-.]/).map(scase).join(" ");
    class UserscriptOption {
        constructor(script, config) {
            this.script = script;
            this.config = config;
        }
        async render() {
            const { config, script } = this;
            const handlerMap = {
                "toggle": makeStacksToggle,
                "text": makeStacksTextInput,
                "select": makeStacksSelect,
                "checkbox": makeStacksCheckbox
            };
            const { desc, def, name, items = [], title = "", type = "text" } = config;
            const values = await script.load(name, def);
            const isArr = Array.isArray(values);
            const isBool = typeof values === "boolean";
            const inputName = `${scriptName}-${script.name}-${name}`;
            const options = {
                classes: [`${scriptName}-userscript-option`, "mb16"],
                items: items.map((item, idx) => {
                    const { value, name, selected, ...rest } = item;
                    return {
                        ...rest,
                        name: name || `${inputName}-item-${idx}`,
                        selected: isArr && value !== void 0 ? values.includes(value) : selected,
                        value
                    };
                }),
                description: desc,
                title: title || prettifyName(name),
            };
            if (!isArr && !isBool) {
                options.value = values;
            }
            if (type === "toggle") {
                options.selected = !!values;
            }
            const [inputWrapper] = handlerMap[type](inputName, options);
            this.container = inputWrapper;
            inputWrapper.addEventListener("change", async ({ currentTarget, target }) => {
                var _a;
                if (!isInputLike(target))
                    return;
                const actualTarget = currentTarget instanceof HTMLFieldSetElement ?
                    { value: [...currentTarget.elements].filter(isCheckedBox).map((e) => e.value) } :
                    target;
                const value = type === "toggle" && actualTarget instanceof HTMLInputElement ?
                    actualTarget.checked :
                    actualTarget.value;
                await script.save(name, value);
                (_a = script.container) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent(`${scriptName}-success`, {
                    bubbles: true,
                    detail: {
                        name,
                        script: scriptName,
                        value
                    }
                }));
            });
            return inputWrapper;
        }
    }
    class Userscript extends (Store === null || Store === void 0 ? void 0 : Store.default) {
        constructor(name, storage) {
            super(name, storage);
            this.name = name;
            this.storage = storage;
            this.options = new Map();
        }
        option(name, config) {
            this.options.set(name, new UserscriptOption(this, { name, ...config }));
            this.render();
            return this;
        }
        async render() {
            const { name: userscriptName, options } = this;
            const container = this.container || (this.container = document.createElement("div"));
            container.classList.add(`${scriptName}-userscript`, "d-flex", "fd-column", "mb24");
            const header = document.createElement("h2");
            header.textContent = prettifyName(userscriptName);
            const inputPromises = [...options].map(([_, option]) => option.render());
            if (!inputPromises.length) {
                header.classList.add("mb8");
            }
            this.toast || (this.toast = makeStacksToast(`${scriptName}-toast`, `Updated ${scriptName} config`, {
                classes: [
                    `${scriptName}-userscript-toast`,
                    "wmn3", "r0", "jc-end"
                ],
                type: "success"
            }));
            container.addEventListener(`${scriptName}-success`, () => {
                const { toast } = this;
                if (toast)
                    showToast(toast, 1);
            });
            const inputs = await Promise.all(inputPromises);
            clear(container);
            container.append(this.toast, header, ...inputs);
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
        async render() {
            const common = { parent: document.body };
            const commonClasses = ["ps-fixed", "r0"];
            const contentPromises = [...this.scripts].map(([_, s]) => s.render());
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
            const content = await Promise.all(contentPromises);
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
    await configurer.render();
    unsafeWindow.dispatchEvent(new CustomEvent(`${scriptName}-load`));
}, { once: true });
