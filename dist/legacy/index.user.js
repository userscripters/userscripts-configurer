// ==UserScript==
// @name           Userscripts Configurer
// @author         Oleg Valter <oleg.a.valter@gmail.com>
// @description    One script to configure them all
// @exclude        https://chat.meta.stackexchange.com/*
// @exclude        https://chat.stackexchange.com/*
// @exclude        https://stackexchange.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          unsafeWindow
// @homepage       https://github.com/userscripters/userscripts-configurer#readme
// @match          https://stackoverflow.com/*
// @match          https://serverfault.com/*
// @match          https://superuser.com/*
// @match          https://*.stackexchange.com/*
// @match          https://askubuntu.com/*
// @match          https://stackapps.com/*
// @match          https://mathoverflow.net/*
// @match          https://pt.stackoverflow.com/*
// @match          https://ja.stackoverflow.com/*
// @match          https://ru.stackoverflow.com/*
// @match          https://es.stackoverflow.com/*
// @match          https://meta.stackoverflow.com/*
// @match          https://meta.serverfault.com/*
// @match          https://meta.superuser.com/*
// @match          https://meta.askubuntu.com/*
// @match          https://meta.mathoverflow.net/*
// @match          https://pt.meta.stackoverflow.com/*
// @match          https://ja.meta.stackoverflow.com/*
// @match          https://ru.meta.stackoverflow.com/*
// @match          https://es.meta.stackoverflow.com/*
// @namespace      userscripters
// @require        https://github.com/userscripters/storage/raw/master/dist/browser.js
// @run-at         document-start
// @source         git+https://github.com/userscripters/userscripts-configurer.git
// @supportURL     https://github.com/userscripters/userscripts-configurer/issues
// @version        2.1.0
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
;
;
;
window.addEventListener("load", function () { return __awaiter(void 0, void 0, void 0, function () {
    var scriptName, Store, clear, appendStyles, makeStacksButton, makeStacksExpandable, makeStacksTextInput, makeStacksCheckbox, makeStacksSelect, makeStacksIcon, makeStacksToggle, makeStacksToast, toggleToast, hideToast, showToast, isInputLike, isCheckedBox, scase, prettifyName, makeTopNavItem, makeSVGRect, makeSVGText, makeConfigurerTopNavItem, UserscriptOption, Userscript, Controller, Configurer, userscripters, userscripts, storage, configurer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                scriptName = "userscript-configurer";
                Store = window.Store;
                if (!Store) {
                    console.debug("[".concat(scriptName, "] missing UserScripters storage"));
                    return [2];
                }
                clear = function (elem) { return __spreadArray([], __read(elem.children), false).forEach(function (c) { return c.remove(); }); };
                appendStyles = function () {
                    var style = document.createElement("style");
                    document.head.append(style);
                    var sheet = style.sheet;
                    if (!sheet)
                        return;
                    var rules = [
                        ".".concat(scriptName, "-modal {\n                top: 20vh;\n            }"),
                        ".".concat(scriptName, "-modal > .s-expandable--content:empty::after {\n                content: 'No userscripts to configure';\n            }"),
                        ".".concat(scriptName, "-userscript:last-child {\n                margin-bottom: var(--su2) !important;\n            }"),
                        ".".concat(scriptName, "-userscript-toast {\n                top: 20vh;\n                left: unset;\n            }"),
                        ".".concat(scriptName, "-userscript-option:last-child {\n                margin-bottom: 0 !important;\n            }")
                    ];
                    rules.forEach(function (rule) { return sheet.insertRule(rule); });
                };
                makeStacksButton = function (id, text, _a) {
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
                makeStacksExpandable = function (id, controller, options) {
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
                makeStacksTextInput = function (id, options) {
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
                makeStacksCheckbox = function (id, options) {
                    var _a;
                    var _b = options.items, items = _b === void 0 ? [] : _b, _c = options.classes, classes = _c === void 0 ? [] : _c;
                    var wrapper = document.createElement("fieldset");
                    (_a = wrapper.classList).add.apply(_a, __spreadArray([], __read(classes), false));
                    wrapper.id = id;
                    var boxes = items.map(function (box) {
                        var _a = box.disabled, disabled = _a === void 0 ? false : _a, id = box.id, label = box.label, name = box.name, _b = box.selected, selected = _b === void 0 ? false : _b, _c = box.value, value = _c === void 0 ? "" : _c;
                        var wrapper = document.createElement("div");
                        var classList = wrapper.classList;
                        classList.add("d-flex", "gs8");
                        if (disabled)
                            classList.add("is-disabled");
                        var item = document.createElement("div");
                        item.classList.add("flex--item");
                        var input = document.createElement("input");
                        input.classList.add("s-checkbox");
                        input.disabled = disabled;
                        input.id = id || name;
                        input.name = name;
                        input.type = "checkbox";
                        input.checked = selected;
                        input.value = value;
                        var labelElem = document.createElement("label");
                        labelElem.classList.add("flex--item", "s-label", "fw-normal");
                        labelElem.htmlFor = id || name;
                        labelElem.textContent = label;
                        item.append(input);
                        wrapper.append(item, labelElem);
                        return wrapper;
                    });
                    wrapper.append.apply(wrapper, __spreadArray([], __read(boxes), false));
                    return [wrapper];
                };
                makeStacksSelect = function (id, options) {
                    var _a;
                    var _b = options.classes, classes = _b === void 0 ? [] : _b, _c = options.description, description = _c === void 0 ? "" : _c, _d = options.disabled, disabled = _d === void 0 ? false : _d, _e = options.items, items = _e === void 0 ? [] : _e, _f = options.title, title = _f === void 0 ? "" : _f, _g = options.value, value = _g === void 0 ? "" : _g;
                    var wrapper = document.createElement("div");
                    (_a = wrapper.classList).add.apply(_a, __spreadArray(["d-flex", "gs4", "gsy", "fd-column"], __read(classes), false));
                    if (title) {
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
                        wrapper.append(label);
                    }
                    var selectWrapper = document.createElement("div");
                    selectWrapper.classList.add("flex--item", "s-select");
                    var select = document.createElement("select");
                    select.id = id;
                    select.disabled = disabled;
                    var opts = items.map(function (item) {
                        var _a = item.disabled, disabled = _a === void 0 ? false : _a, label = item.label, _b = item.selected, selected = _b === void 0 ? false : _b, _c = item.value, value = _c === void 0 ? "" : _c;
                        var option = document.createElement("option");
                        option.selected = selected;
                        option.value = value;
                        option.textContent = label;
                        option.disabled = disabled;
                        return option;
                    });
                    select.append.apply(select, __spreadArray([], __read(opts), false));
                    select.value = value;
                    selectWrapper.append(select);
                    wrapper.append(selectWrapper);
                    return [wrapper, select];
                };
                makeStacksIcon = function (name, pathConfig, options) {
                    var _a;
                    if (options === void 0) { options = {}; }
                    var _b = options.classes, classes = _b === void 0 ? [] : _b, _c = options.width, width = _c === void 0 ? 14 : _c, _d = options.height, height = _d === void 0 ? width : _d;
                    var ns = "http://www.w3.org/2000/svg";
                    var svg = document.createElementNS(ns, "svg");
                    (_a = svg.classList).add.apply(_a, __spreadArray(["svg-icon", name], __read(classes), false));
                    svg.setAttribute("width", width.toString());
                    svg.setAttribute("height", height.toString());
                    svg.setAttribute("viewBox", "0 0 ".concat(width, " ").concat(height));
                    svg.setAttribute("aria-hidden", "true");
                    var path = document.createElementNS(ns, "path");
                    path.setAttribute("d", pathConfig);
                    svg.append(path);
                    return [svg, path];
                };
                makeStacksToggle = function (id, options) {
                    var _a;
                    var _b = options.classes, classes = _b === void 0 ? [] : _b, description = options.description, _c = options.disabled, disabled = _c === void 0 ? false : _c, _d = options.direction, direction = _d === void 0 ? "right" : _d, _e = options.selected, selected = _e === void 0 ? false : _e, title = options.title;
                    var wrapper = document.createElement("div");
                    (_a = wrapper.classList).add.apply(_a, __spreadArray(["d-flex", "ai-center", "gs8"], __read(classes), false));
                    wrapper.classList.toggle("disabled-area", disabled);
                    var lbl = document.createElement("label");
                    lbl.classList.add("flex--item", "s-label");
                    lbl.htmlFor = id;
                    lbl.textContent = title;
                    if (description) {
                        var desc = document.createElement("p");
                        desc.classList.add("s-description", "mt2");
                        desc.textContent = description;
                        lbl.append(desc);
                    }
                    var toggleWrapper = document.createElement("div");
                    toggleWrapper.classList.add("flex--item", "s-toggle-switch");
                    var input = document.createElement("input");
                    input.type = "checkbox";
                    input.id = id;
                    input.checked = selected;
                    var lever = document.createElement("div");
                    lever.classList.add("s-toggle-switch--indicator");
                    toggleWrapper.append(input, lever);
                    wrapper.append.apply(wrapper, __spreadArray([], __read((direction === "right" ?
                        [lbl, toggleWrapper] :
                        [toggleWrapper, lbl])), false));
                    return [wrapper, input];
                };
                makeStacksToast = function (id, text, options) {
                    var _a, _b;
                    if (options === void 0) { options = {}; }
                    var _c = options.buttons, buttons = _c === void 0 ? [] : _c, _d = options.classes, classes = _d === void 0 ? [] : _d, _e = options.important, important = _e === void 0 ? false : _e, _f = options.msgClasses, msgClasses = _f === void 0 ? [] : _f, parent = options.parent, _g = options.type, type = _g === void 0 ? "none" : _g;
                    var wrap = document.createElement("div");
                    (_a = wrap.classList).add.apply(_a, __spreadArray(["s-toast"], __read(classes), false));
                    wrap.setAttribute("aria-hidden", "true");
                    wrap.setAttribute("role", "alertdialog");
                    wrap.setAttribute("aria-labelledby", "notice-message");
                    wrap.id = id;
                    var aside = document.createElement("aside");
                    aside.classList.add("s-notice", "p8", "pl16");
                    if (type !== "none")
                        aside.classList.add("s-notice__".concat(type));
                    if (important)
                        aside.classList.add("s-notice__important");
                    var msgWrap = document.createElement("div");
                    (_b = msgWrap.classList).add.apply(_b, __spreadArray(["d-flex",
                        "gs16",
                        "gsx",
                        "ai-center",
                        "jc-space-between"], __read(msgClasses), false));
                    var message = document.createElement("div");
                    message.classList.add("flex--item");
                    message.textContent = text;
                    var btnWrap = document.createElement("div");
                    btnWrap.classList.add("d-flex");
                    var dismissBtn = document.createElement("button");
                    dismissBtn.type = "button";
                    dismissBtn.classList.add("s-btn", "s-notice--btn");
                    dismissBtn.setAttribute("aria-label", "Dismiss");
                    buttons.push(dismissBtn);
                    var _h = __read(makeStacksIcon("iconClearSm", "M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z"), 1), dismissIcon = _h[0];
                    dismissBtn.append(dismissIcon);
                    btnWrap.append.apply(btnWrap, __spreadArray([], __read(buttons), false));
                    msgWrap.append(message, btnWrap);
                    aside.append(msgWrap);
                    wrap.append(aside);
                    if (parent)
                        parent.append(wrap);
                    return wrap;
                };
                toggleToast = function (target, show) {
                    var toast = typeof target === "string" ? document.querySelector(target) : target;
                    if (!toast)
                        throw new ReferenceError("missing toast: ".concat(target));
                    var isShown = (toast === null || toast === void 0 ? void 0 : toast.getAttribute("aria-hidden")) !== "true";
                    toast.setAttribute("aria-hidden", (show !== void 0 ? !show : isShown).toString());
                    return toast;
                };
                hideToast = function (target, hideFor) {
                    var toast = toggleToast(target, false);
                    if (hideFor)
                        setTimeout(function () { return showToast(toast); }, hideFor * 1e3);
                };
                showToast = function (target, showFor) {
                    var toast = toggleToast(target, true);
                    if (showFor)
                        setTimeout(function () { return hideToast(toast); }, showFor * 1e3);
                };
                isInputLike = function (elem) {
                    return [HTMLInputElement, HTMLSelectElement].some(function (t) { return elem instanceof t; });
                };
                isCheckedBox = function (elem) {
                    return elem instanceof HTMLInputElement && elem.checked;
                };
                scase = function (text) { return text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase(); };
                prettifyName = function (name) { return name.split(/[-.]/).map(scase).join(" "); };
                makeTopNavItem = function (id, text, options) {
                    var _a;
                    var _b = options.classes, classes = _b === void 0 ? [] : _b, _c = options.iconContent, iconContent = _c === void 0 ? [] : _c, _d = options.linkClickable, linkClickable = _d === void 0 ? true : _d, parent = options.parent;
                    var wrapper = document.createElement("li");
                    wrapper.classList.toggle("c-pointer", !linkClickable);
                    wrapper.id = id;
                    wrapper.setAttribute("role", "none");
                    var link = document.createElement(linkClickable ? "a" : "div");
                    (_a = link.classList).add.apply(_a, __spreadArray(["s-topbar--item"], __read(classes), false));
                    link.title = text;
                    var ns = "http://www.w3.org/2000/svg";
                    var icon = document.createElementNS(ns, "svg");
                    icon.classList.add("svg-icon", "native");
                    icon.setAttribute("height", "18");
                    icon.setAttribute("width", "18");
                    icon.setAttribute("viewBox", "0 0 18 18");
                    icon.append.apply(icon, __spreadArray([], __read(iconContent), false));
                    link.append(icon);
                    wrapper.append(link);
                    parent === null || parent === void 0 ? void 0 : parent.append(wrapper);
                    return wrapper;
                };
                makeSVGRect = function (top, left, options) {
                    var _a = options.width, width = _a === void 0 ? 1 : _a, _b = options.height, height = _b === void 0 ? 1 : _b, _c = options.color, color = _c === void 0 ? "black" : _c;
                    var ns = "http://www.w3.org/2000/svg";
                    var rect = document.createElementNS(ns, "rect");
                    rect.setAttribute("fill", color);
                    rect.setAttribute("height", height.toFixed(0));
                    rect.setAttribute("width", width.toFixed(0));
                    rect.setAttribute("x", left.toFixed(0));
                    rect.setAttribute("y", top.toFixed(0));
                    return rect;
                };
                makeSVGText = function (top, left, options) {
                    var _a;
                    var _b = options.classes, classes = _b === void 0 ? [] : _b, _c = options.color, color = _c === void 0 ? "black" : _c, _d = options.halign, halign = _d === void 0 ? "start" : _d, _e = options.size, size = _e === void 0 ? 12 : _e, _f = options.text, text = _f === void 0 ? "" : _f, _g = options.valign, valign = _g === void 0 ? "top" : _g, _h = options.weight, weight = _h === void 0 ? "normal" : _h;
                    var ns = "http://www.w3.org/2000/svg";
                    var fontSize = typeof size === "number" ? "".concat(size.toFixed(0), "px") : size;
                    var fontWeight = typeof weight === "number" ? weight.toFixed(0) : weight;
                    var baseline = valign === "middle" ? "central" : "text-".concat(valign);
                    var x = typeof left === "number" ? left.toFixed(0) : left;
                    var y = typeof top === "number" ? top.toFixed(0) : top;
                    var element = document.createElementNS(ns, "text");
                    (_a = element.classList).add.apply(_a, __spreadArray([], __read(classes), false));
                    element.setAttribute("fill", color);
                    element.setAttribute("dominant-baseline", baseline);
                    element.setAttribute("font-size", fontSize);
                    element.setAttribute("font-weight", fontWeight);
                    element.setAttribute("text-anchor", halign);
                    element.setAttribute("x", x);
                    element.setAttribute("y", y);
                    element.textContent = text;
                    return element;
                };
                makeConfigurerTopNavItem = function (id, text, options) {
                    var commonRectOpts = { height: 9, width: 9, };
                    var topLeftRect = makeSVGRect(0, 0, __assign({ color: "#66d9ef" }, commonRectOpts));
                    var topRightRect = makeSVGRect(0, 9, __assign({ color: "#f92342" }, commonRectOpts));
                    var bottomRightRect = makeSVGRect(9, 9, __assign({ color: "#99e227" }, commonRectOpts));
                    var bottomLeftRect = makeSVGRect(9, 0, __assign({ color: "#8d81ff" }, commonRectOpts));
                    var commonTextOpts = {
                        family: "Helvetica, Arial, sans-serif",
                        halign: "middle",
                        size: 5,
                        valign: "middle",
                        weight: 600,
                    };
                    var u = makeSVGText("25%", "25%", __assign({ color: "#f92342", text: "U" }, commonTextOpts));
                    var s = makeSVGText("25%", "75%", __assign({ color: "#66d9ef", text: "S" }, commonTextOpts));
                    var e = makeSVGText("75%", "25%", __assign({ color: "#99e227", text: "E" }, commonTextOpts));
                    var r = makeSVGText("75%", "75%", __assign({ color: "#8d81ff", text: "R" }, commonTextOpts));
                    return makeTopNavItem(id, text, __assign(__assign({}, options), { linkClickable: false, iconContent: [
                            topLeftRect,
                            topRightRect,
                            bottomRightRect,
                            bottomLeftRect,
                            u, s, e, r,
                        ] }));
                };
                UserscriptOption = (function () {
                    function UserscriptOption(script, name, config) {
                        this.script = script;
                        this.name = name;
                        this.config = config;
                    }
                    UserscriptOption.prototype.shouldDisable = function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a, config, script, conditions, conditions_1, conditions_1_1, _b, name_1, disableValue, option, value, e_1_1;
                            var e_1, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        _a = this, config = _a.config, script = _a.script;
                                        conditions = Object.entries(config.disabledWhen || {});
                                        _d.label = 1;
                                    case 1:
                                        _d.trys.push([1, 6, 7, 8]);
                                        conditions_1 = __values(conditions), conditions_1_1 = conditions_1.next();
                                        _d.label = 2;
                                    case 2:
                                        if (!!conditions_1_1.done) return [3, 5];
                                        _b = __read(conditions_1_1.value, 2), name_1 = _b[0], disableValue = _b[1];
                                        option = script.get(name_1);
                                        if (!option)
                                            return [3, 4];
                                        return [4, script.load(name_1, config.def)];
                                    case 3:
                                        value = _d.sent();
                                        if (disableValue === value)
                                            return [2, true];
                                        _d.label = 4;
                                    case 4:
                                        conditions_1_1 = conditions_1.next();
                                        return [3, 2];
                                    case 5: return [3, 8];
                                    case 6:
                                        e_1_1 = _d.sent();
                                        e_1 = { error: e_1_1 };
                                        return [3, 8];
                                    case 7:
                                        try {
                                            if (conditions_1_1 && !conditions_1_1.done && (_c = conditions_1.return)) _c.call(conditions_1);
                                        }
                                        finally { if (e_1) throw e_1.error; }
                                        return [7];
                                    case 8: return [2, false];
                                }
                            });
                        });
                    };
                    UserscriptOption.prototype.render = function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a, config, name, script, handlerMap, desc, def, _b, disabledWhen, _c, items, _d, title, _e, type, rest, values, isArr, isBool, inputName, options, _f, _g, inputWrapper;
                            var _h;
                            var _this = this;
                            return __generator(this, function (_j) {
                                switch (_j.label) {
                                    case 0:
                                        _a = this, config = _a.config, name = _a.name, script = _a.script;
                                        handlerMap = {
                                            "toggle": makeStacksToggle,
                                            "text": makeStacksTextInput,
                                            "select": makeStacksSelect,
                                            "checkbox": makeStacksCheckbox
                                        };
                                        desc = config.desc, def = config.def, _b = config.disabledWhen, disabledWhen = _b === void 0 ? {} : _b, _c = config.items, items = _c === void 0 ? [] : _c, _d = config.title, title = _d === void 0 ? "" : _d, _e = config.type, type = _e === void 0 ? "text" : _e, rest = __rest(config, ["desc", "def", "disabledWhen", "items", "title", "type"]);
                                        return [4, script.load(name, def)];
                                    case 1:
                                        values = _j.sent();
                                        isArr = Array.isArray(values);
                                        isBool = typeof values === "boolean";
                                        inputName = "".concat(scriptName, "-").concat(script.name, "-").concat(name);
                                        _f = [__assign({}, rest)];
                                        _h = { classes: ["".concat(scriptName, "-userscript-option"), "mb16"] };
                                        return [4, this.shouldDisable()];
                                    case 2:
                                        options = __assign.apply(void 0, _f.concat([(_h.disabled = _j.sent(), _h.items = items.map(function (item, idx) {
                                                var value = item.value, name = item.name, selected = item.selected, rest = __rest(item, ["value", "name", "selected"]);
                                                return __assign(__assign({}, rest), { name: name || "".concat(inputName, "-item-").concat(idx), selected: isArr && value !== void 0 ? values.includes(value) : selected, value: value });
                                            }), _h.description = desc, _h.title = title || prettifyName(name), _h)]));
                                        if (!isArr && !isBool) {
                                            options.value = values;
                                        }
                                        if (type === "toggle") {
                                            options.selected = !!values;
                                        }
                                        _g = __read(handlerMap[type](inputName, options), 1), inputWrapper = _g[0];
                                        this.container = inputWrapper;
                                        inputWrapper.addEventListener("change", function (_a) {
                                            var currentTarget = _a.currentTarget, target = _a.target;
                                            return __awaiter(_this, void 0, void 0, function () {
                                                var oldValue, actualTarget, value, optionChangeEvent;
                                                var _b;
                                                return __generator(this, function (_c) {
                                                    switch (_c.label) {
                                                        case 0:
                                                            if (!isInputLike(target))
                                                                return [2];
                                                            return [4, script.load(name)];
                                                        case 1:
                                                            oldValue = _c.sent();
                                                            actualTarget = currentTarget instanceof HTMLFieldSetElement ?
                                                                { value: __spreadArray([], __read(currentTarget.elements), false).filter(isCheckedBox).map(function (e) { return e.value; }) } :
                                                                target;
                                                            value = type === "toggle" && actualTarget instanceof HTMLInputElement ?
                                                                actualTarget.checked :
                                                                actualTarget.value;
                                                            return [4, script.save(name, value)];
                                                        case 2:
                                                            _c.sent();
                                                            optionChangeEvent = new CustomEvent("".concat(scriptName, "-change"), {
                                                                bubbles: true,
                                                                detail: {
                                                                    name: name,
                                                                    oldValue: oldValue,
                                                                    script: script.name,
                                                                    value: value
                                                                }
                                                            });
                                                            (_b = script.container) === null || _b === void 0 ? void 0 : _b.dispatchEvent(optionChangeEvent);
                                                            return [2];
                                                    }
                                                });
                                            });
                                        });
                                        return [2, inputWrapper];
                                }
                            });
                        });
                    };
                    return UserscriptOption;
                }());
                Userscript = (function (_super) {
                    __extends(Userscript, _super);
                    function Userscript(name, storage) {
                        var _this = _super.call(this, name, storage) || this;
                        _this.name = name;
                        _this.storage = storage;
                        _this.opts = new Map();
                        return _this;
                    }
                    Userscript.prototype.get = function (name) {
                        var opts = this.opts;
                        return opts.get(name);
                    };
                    Userscript.prototype.has = function (name) {
                        var opts = this.opts;
                        return opts.has(name);
                    };
                    Userscript.prototype.option = function (name, config) {
                        this.opts.set(name, new UserscriptOption(this, name, config));
                        this.render();
                        return this;
                    };
                    Userscript.prototype.options = function (configs, common) {
                        var _this = this;
                        var opts = this.opts;
                        var sharedConfig = common || {};
                        Object.entries(configs).forEach(function (_a) {
                            var _b = __read(_a, 2), name = _b[0], config = _b[1];
                            opts.set(name, new UserscriptOption(_this, name, __assign(__assign({}, sharedConfig), config)));
                        });
                        this.render();
                        return this;
                    };
                    Userscript.prototype.render = function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a, userscriptName, opts, container, header, inputPromises, inputs, empty;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = this, userscriptName = _a.name, opts = _a.opts;
                                        container = this.container || (this.container = document.createElement("div"));
                                        container.classList.add("".concat(scriptName, "-userscript"), "d-flex", "fd-column", "mb24");
                                        header = document.createElement("h2");
                                        header.textContent = prettifyName(userscriptName);
                                        inputPromises = __spreadArray([], __read(opts), false).map(function (_a) {
                                            var _b = __read(_a, 2), _ = _b[0], option = _b[1];
                                            return option.render();
                                        });
                                        if (!inputPromises.length) {
                                            header.classList.add("mb8");
                                        }
                                        this.toast || (this.toast = makeStacksToast("".concat(scriptName, "-toast"), "Updated ".concat(scriptName, " config"), {
                                            classes: [
                                                "".concat(scriptName, "-userscript-toast"),
                                                "wmn3", "r0", "jc-end"
                                            ],
                                            type: "success"
                                        }));
                                        container.addEventListener("".concat(scriptName, "-change"), function () {
                                            var toast = _this.toast;
                                            if (toast)
                                                showToast(toast, 1);
                                            _this.render();
                                        });
                                        return [4, Promise.all(inputPromises)];
                                    case 1:
                                        inputs = _b.sent();
                                        clear(container);
                                        container.append.apply(container, __spreadArray([this.toast, header], __read(inputs), false));
                                        if (!inputs.length) {
                                            empty = document.createElement("div");
                                            empty.textContent = "No configuration options available";
                                            container.append(empty);
                                        }
                                        return [2, container];
                                }
                            });
                        });
                    };
                    return Userscript;
                }(Store.default));
                Controller = (function () {
                    function Controller(text) {
                        this.text = text;
                        this.position = "sidebar";
                    }
                    Object.defineProperty(Controller.prototype, "footerParent", {
                        get: function () {
                            return document.querySelector(".site-footer--categories-nav ul");
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Object.defineProperty(Controller.prototype, "navParent", {
                        get: function () {
                            return document.querySelector(".js-top-bar .s-topbar--content");
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Object.defineProperty(Controller.prototype, "sidebarParent", {
                        get: function () {
                            return document.body;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Object.defineProperty(Controller.prototype, "parent", {
                        get: function () {
                            var position = this.position;
                            return this["".concat(position, "Parent")];
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Controller.prototype.setPosition = function (position) {
                        this.position = position;
                        return this;
                    };
                    Controller.prototype.toggle = function () {
                        var _a;
                        (_a = this.container) === null || _a === void 0 ? void 0 : _a.click();
                        return this;
                    };
                    Controller.prototype.render = function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var controllerClasses, controllerBuilders, _a, parent, position, text;
                            return __generator(this, function (_b) {
                                controllerClasses = {
                                    footer: ["s-btn__link"],
                                    sidebar: ["ps-fixed", "r0", "t128"],
                                };
                                controllerBuilders = {
                                    "footer": makeStacksButton,
                                    "nav": makeConfigurerTopNavItem,
                                    "sidebar": makeStacksButton,
                                };
                                _a = this, parent = _a.parent, position = _a.position, text = _a.text;
                                return [2, this.container || (this.container = controllerBuilders[position]("".concat(scriptName, "-modal-controller"), text, {
                                        parent: parent,
                                        type: "outlined",
                                        muted: true,
                                        classes: __spreadArray(__spreadArray([], __read(controllerClasses[position] || []), false), ["bar0"], false)
                                    }))];
                            });
                        });
                    };
                    return Controller;
                }());
                Configurer = (function () {
                    function Configurer(storage) {
                        this.storage = storage;
                        this.controller = new Controller("UserScripters");
                        this.scripts = new Map();
                    }
                    Configurer.prototype.render = function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var contentPromises, self, controller, position, controllerElement, contentElem, content;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        contentPromises = __spreadArray([], __read(this.scripts), false).map(function (_a) {
                                            var _b = __read(_a, 2), _ = _b[0], s = _b[1];
                                            return s.render();
                                        });
                                        self = this.get(scriptName);
                                        controller = this.controller;
                                        return [4, (self === null || self === void 0 ? void 0 : self.load("button-position"))];
                                    case 1:
                                        position = (_a.sent()) || "sidebar";
                                        controller.setPosition(position);
                                        return [4, controller.render()];
                                    case 2:
                                        controllerElement = _a.sent();
                                        this.modal || (this.modal = makeStacksExpandable("".concat(scriptName, "-modal"), controllerElement, {
                                            classes: ["ps-fixed", "r0", "z-modal", "".concat(scriptName, "-modal"),],
                                            contentClasses: ["ba", "bar-lg", "bc-black-075", "bg-white", "p16", "wmn3"],
                                            expanded: false,
                                            parent: document.body,
                                        }));
                                        contentElem = this.modal.querySelector(".s-expandable--content");
                                        if (!contentElem) {
                                            console.debug("[".concat(scriptName, "] missing modal content element"));
                                            return [2, this];
                                        }
                                        return [4, Promise.all(contentPromises)];
                                    case 3:
                                        content = _a.sent();
                                        clear(contentElem);
                                        contentElem.append.apply(contentElem, __spreadArray([], __read(content), false));
                                        return [2, this];
                                }
                            });
                        });
                    };
                    Configurer.prototype.has = function (name) {
                        var scripts = this.scripts;
                        return scripts.has(name);
                    };
                    Configurer.prototype.hide = function () {
                        var _a, _b;
                        if ((_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.contains("is-expanded")) {
                            (_b = this.controller) === null || _b === void 0 ? void 0 : _b.toggle();
                        }
                        return this;
                    };
                    Configurer.prototype.get = function (name) {
                        var scripts = this.scripts;
                        return scripts.get(name);
                    };
                    Configurer.prototype.register = function (name, storage) {
                        var script = new Userscript(name, storage || this.storage);
                        this.scripts.set(name, script);
                        this.render();
                        return script;
                    };
                    Configurer.prototype.show = function () {
                        var _a, _b;
                        if (!((_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.contains("is-expanded"))) {
                            (_b = this.controller) === null || _b === void 0 ? void 0 : _b.toggle();
                        }
                        return this;
                    };
                    Configurer.prototype.unregister = function (name) {
                        var scripts = this.scripts;
                        var script = scripts.get(name);
                        if (script) {
                            scripts.delete(name);
                            this.render();
                        }
                        return script;
                    };
                    return Configurer;
                }());
                userscripters = unsafeWindow.UserScripters || (unsafeWindow.UserScripters = {});
                userscripts = userscripters.Userscripts || (userscripters.Userscripts = {});
                storage = Store.locateStorage();
                configurer = new Configurer(storage);
                userscripts.Configurer || (userscripts.Configurer = configurer);
                appendStyles();
                configurer.register(scriptName, storage).options({
                    "button-position": {
                        def: "sidebar",
                        desc: "Changes where the \"UserScripters\" button appears in the UI",
                        items: [
                            { label: "Footer", value: "footer" },
                            { label: "Navigation", value: "nav" },
                            { label: "Sidebar", value: "sidebar" },
                        ],
                        title: "Button Placement",
                        type: "select",
                    }
                });
                return [4, configurer.render()];
            case 1:
                _a.sent();
                unsafeWindow.dispatchEvent(new CustomEvent("".concat(scriptName, "-load")));
                return [2];
        }
    });
}); }, { once: true });
