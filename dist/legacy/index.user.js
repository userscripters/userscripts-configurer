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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
;
;
window.addEventListener("load", function () {
    var scriptName = "userscript-configurer";
    var Store = window.Store;
    if (!Store) {
        console.debug("[".concat(scriptName, "] missing UserScripters storage"));
        return;
    }
    var clear = function (elem) { return __spreadArray([], __read(elem.children), false).forEach(function (c) { return c.remove(); }); };
    var appendStyles = function () {
        var style = document.createElement("style");
        document.head.append(style);
        var sheet = style.sheet;
        if (!sheet)
            return;
        var rules = [
            ".".concat(scriptName, "-modal {\n                top: 20vh;\n            }"),
            ".".concat(scriptName, "-modal > .s-expandable--content:empty::after {\n                content: 'No userscripts to configure';\n            }"),
            ".".concat(scriptName, "-userscript:last-child {\n                margin-bottom: var(--su2) !important;\n            }"),
        ];
        rules.forEach(function (rule) { return sheet.insertRule(rule); });
    };
    var makeStacksButton = function (id, text, _a) {
        var _b;
        var _c = _a === void 0 ? {} : _a, _d = _c.classes, classes = _d === void 0 ? [] : _d, title = _c.title, _e = _c.danger, danger = _e === void 0 ? false : _e, _f = _c.loading, loading = _f === void 0 ? false : _f, _g = _c.muted, muted = _g === void 0 ? false : _g, parent = _c.parent, _h = _c.primary, primary = _h === void 0 ? false : _h, _j = _c.type, type = _j === void 0 ? "filled" : _j;
        var btn = document.createElement("button");
        btn.id = id;
        btn.textContent = text;
        (_b = btn.classList).add.apply(_b, __spreadArray(["s-btn", "s-btn__".concat(type)], __read(classes), false));
        btn.setAttribute("role", "button");
        btn.setAttribute("aria-label", title || text);
        var classList = btn.classList;
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
    var makeStacksExpandable = function (id, controller, options) {
        var _a, _b;
        if (options === void 0) { options = {}; }
        var _c = options.classes, classes = _c === void 0 ? [] : _c, _d = options.content, content = _d === void 0 ? [] : _d, _e = options.contentClasses, contentClasses = _e === void 0 ? [] : _e, controllerClasses = options.controllerClasses, _f = options.expanded, expanded = _f === void 0 ? false : _f, parent = options.parent;
        var containerElem = document.createElement("div");
        (_a = containerElem.classList).add.apply(_a, __spreadArray(["s-expandable"], __read(classes), false));
        containerElem.id = id;
        if (expanded)
            containerElem.classList.add("is-expanded");
        var contentElem = document.createElement("div");
        (_b = contentElem.classList).add.apply(_b, __spreadArray(["s-expandable--content"], __read(contentClasses), false));
        contentElem.append.apply(contentElem, __spreadArray([], __read(content), false));
        var dataset = controller.dataset;
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
    var makeStacksTextInput = function (id, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var _b = options.classes, classes = _b === void 0 ? [] : _b, _c = options.description, description = _c === void 0 ? "" : _c, parent = options.parent, _d = options.placeholder, placeholder = _d === void 0 ? "" : _d, _e = options.title, title = _e === void 0 ? "" : _e, _f = options.value, value = _f === void 0 ? "" : _f;
        var wrap = document.createElement("div");
        (_a = wrap.classList).add.apply(_a, __spreadArray(["d-flex", "gs4", "gsy", "fd-column"], __read(classes), false));
        var inputWrap = document.createElement("div");
        inputWrap.classList.add("d-flex", "ps-relative");
        var input = document.createElement("input");
        input.classList.add("s-input");
        input.id = id;
        input.type = "text";
        input.placeholder = placeholder;
        input.value = value;
        inputWrap.append(input);
        wrap.append(inputWrap);
        if (title) {
            var lblWrap = document.createElement("div");
            lblWrap.classList.add("flex--item");
            var label = document.createElement("label");
            label.classList.add("d-block", "s-label");
            label.htmlFor = id;
            label.textContent = title;
            if (description) {
                var desc = document.createElement("p");
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
    var Userscript = (function (_super) {
        __extends(Userscript, _super);
        function Userscript(name, storage) {
            var _this = _super.call(this, name, storage) || this;
            _this.name = name;
            _this.storage = storage;
            _this.options = new Map();
            return _this;
        }
        Userscript.prototype.option = function (key, desc, def) {
            this.options.set(key, { name: key, desc: desc, def: def });
            this.render();
            return this;
        };
        Userscript.prototype.render = function () {
            var _a = this, name = _a.name, options = _a.options;
            var container = this.container || (this.container = document.createElement("div"));
            container.classList.add("".concat(scriptName, "-userscript"), "d-flex", "fd-column", "mb24");
            var header = document.createElement("h2");
            header.classList.add("mb8");
            header.textContent = name;
            var inputs = __spreadArray([], __read(options), false).map(function (_a) {
                var _b = __read(_a, 2), key = _b[0], option = _b[1];
                var desc = option.desc, def = option.def;
                var _c = __read(makeStacksTextInput("".concat(scriptName, "-").concat(name, "-").concat(key), {
                    description: desc,
                    title: key,
                    value: def
                }), 1), inputWrapper = _c[0];
                return inputWrapper;
            });
            clear(container);
            container.append.apply(container, __spreadArray([header], __read(inputs), false));
            if (!inputs.length) {
                var empty = document.createElement("div");
                empty.textContent = "No configuration options available";
                container.append(empty);
            }
            return container;
        };
        return Userscript;
    }((Store === null || Store === void 0 ? void 0 : Store.default)));
    var Configurer = (function () {
        function Configurer(storage) {
            this.storage = storage;
            this.scripts = new Map();
        }
        Configurer.prototype.render = function () {
            var common = { parent: document.body };
            var commonClasses = ["ps-fixed", "r0"];
            var content = __spreadArray([], __read(this.scripts), false).map(function (_a) {
                var _b = __read(_a, 2), _ = _b[0], s = _b[1];
                return s.render();
            });
            this.controller || (this.controller = makeStacksButton("".concat(scriptName, "-modal-controller"), "UserScripters", __assign(__assign({}, common), { type: "outlined", muted: true, classes: __spreadArray(__spreadArray([], __read(commonClasses), false), [
                    "bar0", "t128"
                ], false) })));
            this.modal || (this.modal = makeStacksExpandable("".concat(scriptName, "-modal"), this.controller, __assign(__assign({}, common), { classes: __spreadArray(__spreadArray([], __read(commonClasses), false), [
                    "z-modal",
                    "".concat(scriptName, "-modal"),
                ], false), contentClasses: ["ba", "bar-lg", "bc-black-075", "bg-white", "p16", "wmn3"], expanded: false })));
            var contentElem = this.modal.querySelector(".s-expandable--content");
            if (!contentElem) {
                console.debug("[".concat(scriptName, "] missing modal content element"));
                return this;
            }
            clear(contentElem);
            contentElem.append.apply(contentElem, __spreadArray([], __read(content), false));
            return this;
        };
        Configurer.prototype.hide = function () {
            var _a, _b;
            if ((_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.contains("is-expanded")) {
                (_b = this.controller) === null || _b === void 0 ? void 0 : _b.click();
            }
            return this;
        };
        Configurer.prototype.get = function (name) {
            var scripts = this.scripts;
            return scripts.get(name);
        };
        Configurer.prototype.register = function (name) {
            var storage = this.storage;
            var script = new Userscript(name, storage);
            this.scripts.set(name, script);
            this.render();
            return script;
        };
        Configurer.prototype.show = function () {
            var _a, _b;
            if (!((_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.contains("is-expanded"))) {
                (_b = this.controller) === null || _b === void 0 ? void 0 : _b.click();
            }
            return this;
        };
        return Configurer;
    }());
    var userscripters = unsafeWindow.UserScripters || (unsafeWindow.UserScripters = {});
    var userscripts = userscripters.Userscripts || (userscripters.Userscripts = {});
    var storage = Store.locateStorage();
    var configurer = new Configurer(storage);
    userscripts.Configurer || (userscripts.Configurer = configurer);
    appendStyles();
    configurer.render();
}, { once: true });
