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
    var makeStacksCheckbox = function (id, options) {
        var _a;
        var _b = options.items, items = _b === void 0 ? [] : _b, _c = options.classes, classes = _c === void 0 ? [] : _c;
        var wrapper = document.createElement("fieldset");
        (_a = wrapper.classList).add.apply(_a, __spreadArray(["mt8"], __read(classes), false));
        wrapper.id = id;
        var boxes = items.map(function (box) {
            var _a = box.disabled, disabled = _a === void 0 ? false : _a, id = box.id, label = box.label, name = box.name, _b = box.selected, selected = _b === void 0 ? false : _b;
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
    var makeStacksSelect = function (id, options) {
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
    var isInputLike = function (elem) {
        return [HTMLInputElement, HTMLSelectElement].some(function (t) { return elem instanceof t; });
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
        Userscript.prototype.option = function (name, config) {
            this.options.set(name, __assign({ name: name }, config));
            this.render();
            return this;
        };
        Userscript.prototype.render = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, name, options, container, header, handlerMap, inputPromises, inputs, empty;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this, name = _a.name, options = _a.options;
                            container = this.container || (this.container = document.createElement("div"));
                            container.classList.add("".concat(scriptName, "-userscript"), "d-flex", "fd-column", "mb24");
                            header = document.createElement("h2");
                            header.classList.add("mb8");
                            header.textContent = name;
                            handlerMap = {
                                "text": makeStacksTextInput,
                                "select": makeStacksSelect,
                                "checkbox": makeStacksCheckbox
                            };
                            inputPromises = __spreadArray([], __read(options), false).map(function (_a) {
                                var _b = __read(_a, 2), key = _b[0], option = _b[1];
                                return __awaiter(_this, void 0, void 0, function () {
                                    var desc, def, _c, items, _d, type, value, _e, inputWrapper;
                                    var _this = this;
                                    return __generator(this, function (_f) {
                                        switch (_f.label) {
                                            case 0:
                                                desc = option.desc, def = option.def, _c = option.items, items = _c === void 0 ? [] : _c, _d = option.type, type = _d === void 0 ? "text" : _d;
                                                return [4, this.load(key, def)];
                                            case 1:
                                                value = _f.sent();
                                                _e = __read(handlerMap[type]("".concat(scriptName, "-").concat(name, "-").concat(key), {
                                                    items: items.map(function (item, idx) { return (__assign(__assign({}, item), { name: item.name || "".concat(scriptName, "-").concat(name, "-").concat(key, "-item-").concat(idx) })); }),
                                                    description: desc,
                                                    title: key,
                                                    value: value
                                                }), 1), inputWrapper = _e[0];
                                                inputWrapper.addEventListener("change", function (_a) {
                                                    var target = _a.target;
                                                    return __awaiter(_this, void 0, void 0, function () {
                                                        return __generator(this, function (_b) {
                                                            switch (_b.label) {
                                                                case 0:
                                                                    if (!isInputLike(target))
                                                                        return [2];
                                                                    return [4, this.save(key, target.value)];
                                                                case 1:
                                                                    _b.sent();
                                                                    return [2];
                                                            }
                                                        });
                                                    });
                                                });
                                                return [2, inputWrapper];
                                        }
                                    });
                                });
                            });
                            return [4, Promise.all(inputPromises)];
                        case 1:
                            inputs = _b.sent();
                            clear(container);
                            container.append.apply(container, __spreadArray([header], __read(inputs), false));
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
    }((Store === null || Store === void 0 ? void 0 : Store.default)));
    var Configurer = (function () {
        function Configurer(storage) {
            this.storage = storage;
            this.scripts = new Map();
        }
        Configurer.prototype.render = function () {
            return __awaiter(this, void 0, void 0, function () {
                var common, commonClasses, contentPromises, contentElem, content;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            common = { parent: document.body };
                            commonClasses = ["ps-fixed", "r0"];
                            contentPromises = __spreadArray([], __read(this.scripts), false).map(function (_a) {
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
                            contentElem = this.modal.querySelector(".s-expandable--content");
                            if (!contentElem) {
                                console.debug("[".concat(scriptName, "] missing modal content element"));
                                return [2, this];
                            }
                            return [4, Promise.all(contentPromises)];
                        case 1:
                            content = _a.sent();
                            clear(contentElem);
                            contentElem.append.apply(contentElem, __spreadArray([], __read(content), false));
                            return [2, this];
                    }
                });
            });
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
    var userscripters = unsafeWindow.UserScripters || (unsafeWindow.UserScripters = {});
    var userscripts = userscripters.Userscripts || (userscripters.Userscripts = {});
    var storage = Store.locateStorage();
    var configurer = new Configurer(storage);
    userscripts.Configurer || (userscripts.Configurer = configurer);
    appendStyles();
    configurer.render();
}, { once: true });
