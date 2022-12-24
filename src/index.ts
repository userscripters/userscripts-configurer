interface StacksCommonOptions {
    classes?: string[];
    parent?: Element | null;
}

type ControllerPosition = "footer" | "nav" | "sidebar";

type ControllerElementFactory = (id: string, text: string, options: StacksButtonOptions) => HTMLElement;

type StacksToastType =
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "none";

interface StacksToastOptions extends StacksCommonOptions {
    buttons?: HTMLButtonElement[];
    msgClasses?: string[];
    important?: boolean;
    type?: StacksToastType;
}

interface StacksIconOptions extends StacksCommonOptions {
    width?: number;
    height?: number;
};

interface StacksExpandableOptions extends StacksCommonOptions {
    content?: Array<string | Node>;
    contentClasses?: string[];
    controllerClasses?: string[];
    expanded?: boolean;
}

interface StacksButtonOptions extends StacksCommonOptions {
    danger?: boolean;
    loading?: boolean;
    muted?: boolean;
    primary?: boolean;
    title?: string;
    type?: "outlined" | "filled";
};

interface StacksTextInputOptions extends StacksCommonOptions {
    description?: string;
    placeholder?: string;
    title?: string;
    value?: string;
};

interface StacksCheckboxConfig {
    disabled?: boolean;
    id?: string;
    label: string;
    name: string;
    selected?: boolean;
    value?: string;
}

interface StacksCheckboxOptions extends StacksCommonOptions {
    items?: StacksCheckboxConfig[];
}

interface StacksSelectItem {
    disabled?: boolean;
    label: string;
    selected?: boolean;
    value?: string;
}

interface StacksSelectOptions extends StacksCommonOptions {
    disabled?: boolean;
    description?: string;
    items?: StacksSelectItem[];
    title?: string;
    value?: string;
}

interface StacksToggleOptions extends StacksCommonOptions {
    description?: string;
    disabled?: boolean;
    direction?: "left" | "right";
    selected?: boolean;
    title: string;
}

interface TopNavItemOptions extends StacksCommonOptions {
    iconContent: SVGElement[];
    linkClickable?: boolean;
}

interface SVGTextOptions extends StacksCommonOptions {
    color?: string;
    family?: string;
    halign?: "start" | "middle" | "end";
    size?: number | string;
    text?: string;
    valign?: "top" | "middle" | "bottom";
    weight?: number | "bold" | "bolder" | "lighter" | "normal";
}

interface SVGRectOptions {
    color?: string;
    height?: number;
    width?: number;
}

window.addEventListener("load", async () => {
    const scriptName = "userscript-configurer";

    const { Store } = window;
    if (!Store) {
        console.debug(`[${scriptName}] missing UserScripters storage`);
        return;
    }

    /**
     * @summary clears an {@link Element} of all children
     * @param elem element to clear
     */
    const clear = (elem: Element) => [...elem.children].forEach((c) => c.remove());

    /**
     * @summary injects script-specific styles into the page
     */
    const appendStyles = () => {
        const style = document.createElement("style");
        document.head.append(style);
        const { sheet } = style;
        if (!sheet) return;

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

    /**
     * @see https://stackoverflow.design/product/components/buttons/
     *
     * @summary creates a stacks button
     * @param id id of the button
     * @param text text of the button
     * @param options configuration
     */
    const makeStacksButton = (
        id: string,
        text: string,
        {
            classes = [],
            title,
            danger = false,
            loading = false,
            muted = false,
            parent,
            primary = false,
            type = "filled",
        }: StacksButtonOptions = {}
    ) => {
        const btn = document.createElement("button");
        btn.id = id;
        btn.textContent = text;
        btn.classList.add("s-btn", `s-btn__${type}`, ...classes);
        btn.setAttribute("role", "button");
        btn.setAttribute("aria-label", title || text);

        const { classList } = btn;
        if (danger) classList.add("s-btn__danger");
        if (muted) classList.add("s-btn__muted");
        if (primary) classList.add("s-btn__primary");
        if (loading) classList.add("is-loading");

        if (title) btn.title = title;

        parent?.append(btn);
        return btn;
    };

    /**
     * @see https://stackoverflow.design/product/components/expandable/
     *
     * @summary creates a Stacks expandable element
     * @param id expandable id
     * @param controller toggling element
     * @param options expandable configuration
     */
    const makeStacksExpandable = (
        id: string,
        controller: HTMLElement,
        options: StacksExpandableOptions = {}
    ) => {
        const {
            classes = [],
            content = [],
            contentClasses = [],
            controllerClasses,
            expanded = false,
            parent
        } = options;

        const containerElem = document.createElement("div");
        containerElem.classList.add("s-expandable", ...classes);
        containerElem.id = id;

        if (expanded) containerElem.classList.add("is-expanded");

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
        parent?.append(containerElem);
        return containerElem;
    };

    /**
     * @see https://stackoverflow.design/product/components/inputs/
     *
     * @summary makes Stacks text input
     * @param id input id
     * @param options input configuration
     */
    const makeStacksTextInput = (
        id: string,
        options: StacksTextInputOptions = {}
    ): [HTMLDivElement, HTMLInputElement, HTMLLabelElement?] => {
        const {
            classes = [],
            description = "",
            parent,
            placeholder = "",
            title = "",
            value = "",
        } = options;

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

        parent?.append(wrap);
        return [wrap, input];
    };

    /**
     * @see https://stackoverflow.design/product/components/checkbox/
     *
     * @summary makes a Stacks checkbox group
     * @param id id of the checkbox container
     * @param options configuration options
     */
    const makeStacksCheckbox = (
        id: string,
        options: StacksCheckboxOptions
    ): [HTMLFieldSetElement] => {
        const {
            items = [],
            classes = [],
        } = options;

        const wrapper = document.createElement("fieldset");
        wrapper.classList.add(...classes);
        wrapper.id = id;

        const boxes = items.map((box) => {
            const {
                disabled = false,
                id,
                label,
                name,
                selected = false,
                value = ""
            } = box;

            const wrapper = document.createElement("div");
            const { classList } = wrapper;
            classList.add("d-flex", "gs8");

            if (disabled) classList.add("is-disabled");

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

    /**
     * @see https://stackoverflow.design/product/components/select/
     *
     * @summary makes a Stacks select
     * @param id select id
     * @param options configuration options
     */
    const makeStacksSelect = (
        id: string,
        options: StacksSelectOptions,
    ): [HTMLDivElement, HTMLSelectElement] => {
        const {
            classes = [],
            description = "",
            disabled = false,
            items = [],
            title = "",
            value = ""
        } = options;

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
            const {
                disabled = false,
                label,
                selected = false,
                value = ""
            } = item;

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

    /**
     * @see https://stackoverflow.design/product/resources/icons/
     *
     * @summary makes Stacks 18 x 18 icon
     * @param name icon class name
     * @param pathConfig <path> element `d` attribute
     * @param options configuration options
     */
    const makeStacksIcon = (
        name: string,
        pathConfig: string,
        options: StacksIconOptions = {}
    ) => {
        const {
            classes = [],
            width = 14,
            height = width,
        } = options;

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

    /**
     * @see https://stackoverflow.design/product/components/toggle-switch/
     *
     * @summary creates a Stacks toggle
     * @param id toggle id
     * @param options configuration options
     */
    const makeStacksToggle = (
        id: string,
        options: StacksToggleOptions,
    ): [HTMLDivElement, HTMLInputElement] => {
        const {
            classes = [],
            description,
            disabled = false,
            direction = "right",
            selected = false,
            title,
        } = options;

        const wrapper = document.createElement("div");
        wrapper.classList.add("d-flex", "ai-center", "gs8", ...classes);
        wrapper.classList.toggle("disabled-area", disabled);

        const lbl = document.createElement("label");
        lbl.classList.add("flex--item", "s-label");
        lbl.htmlFor = id;
        lbl.textContent = title;

        if (description) {
            const desc = document.createElement("p");
            desc.classList.add("s-description", "mt2");
            desc.textContent = description;
            lbl.append(desc);
        }

        const toggleWrapper = document.createElement("div");
        toggleWrapper.classList.add("flex--item", "s-toggle-switch");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = id;
        input.checked = selected;

        const lever = document.createElement("div");
        lever.classList.add("s-toggle-switch--indicator");

        toggleWrapper.append(input, lever);

        wrapper.append(...(direction === "right" ?
            [lbl, toggleWrapper] :
            [toggleWrapper, lbl]
        ));

        return [wrapper, input];
    };

    /**
     * @see https://stackoverflow.design/product/components/notices/
     *
     * @summary builder for Stacks notifications
     * @param id toast id
     * @param text text to display
     * @param options configuration options
     */
    const makeStacksToast = (
        id: string,
        text: string,
        options: StacksToastOptions = {}
    ) => {
        const {
            buttons = [],
            classes = [],
            important = false,
            msgClasses = [],
            parent,
            type = "none",
        } = options;

        const wrap = document.createElement("div");
        wrap.classList.add("s-toast", ...classes);
        wrap.setAttribute("aria-hidden", "true");
        wrap.setAttribute("role", "alertdialog");
        wrap.setAttribute("aria-labelledby", "notice-message");
        wrap.id = id;

        const aside = document.createElement("aside");
        aside.classList.add("s-notice", "p8", "pl16");
        if (type !== "none") aside.classList.add(`s-notice__${type}`);
        if (important) aside.classList.add("s-notice__important");

        const msgWrap = document.createElement("div");
        msgWrap.classList.add(
            "d-flex",
            "gs16",
            "gsx",
            "ai-center",
            "jc-space-between",
            ...msgClasses
        );

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

        const [dismissIcon] = makeStacksIcon(
            "iconClearSm",
            "M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z"
        );
        dismissBtn.append(dismissIcon);

        btnWrap.append(...buttons);
        msgWrap.append(message, btnWrap);
        aside.append(msgWrap);
        wrap.append(aside);

        if (parent) parent.append(wrap);
        return wrap;
    };

    /**
     * @summary toggles the Stacks toast visibility
     * @param target toast to toggle the state of
     * @param show optional current toast state
     */
    const toggleToast = (target: string | Element, show?: boolean) => {
        const toast =
            typeof target === "string" ? document.querySelector(target) : target;

        if (!toast) throw new ReferenceError(`missing toast: ${target}`);

        const isShown = toast?.getAttribute("aria-hidden") !== "true";
        toast.setAttribute(
            "aria-hidden",
            (show !== void 0 ? !show : isShown).toString()
        );

        return toast;
    };

    /**
     * @summary hides the Stacks toast
     * @param target toast to hide
     * @param hideFor seconds to hide the toast for
     */
    const hideToast = (target: string | Element, hideFor?: number) => {
        const toast = toggleToast(target, false);
        if (hideFor) setTimeout(() => showToast(toast), hideFor * 1e3);
    };

    /**
     * @summary shows the Stacks toast
     * @param target toast to show
     * @param showFor seconds to show the toast for
     */
    const showToast = (target: string | Element, showFor?: number) => {
        const toast = toggleToast(target, true);
        if (showFor) setTimeout(() => hideToast(toast), showFor * 1e3);
    };

    /**
     * @summary checks if {@link EventTarget} is input-like
     * @param elem {@link EventTarget} to check
     */
    const isInputLike = (elem: EventTarget | null): elem is HTMLInputElement | HTMLSelectElement => {
        return [HTMLInputElement, HTMLSelectElement].some((t) => elem instanceof t);
    };

    /**
     * @summary checks if {@link EventTarget} is a checked checkbox
     * @param elem {@link EventTarget} to check
     */
    const isCheckedBox = (elem: EventTarget | null): elem is HTMLInputElement & { checked: true; } => {
        return elem instanceof HTMLInputElement && elem.checked;
    };

    /**
     * @summary sentence-cases a string
     * @param text text to sentence-case
     */
    const scase = (text: string) => text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase();

    /**
     * @summary prettifies a given name
     * @param name name to prettify
     */
    const prettifyName = (name: string) => name.split(/[-.]/).map(scase).join(" ");

    /**
     * @summary creates a top navigation bar item
     * @param id item id
     * @param text item text
     * @param options configuration options
     */
    const makeTopNavItem = (id: string, text: string, options: TopNavItemOptions) => {
        const {
            classes = [],
            iconContent = [],
            linkClickable = true,
            parent,
        } = options;

        const wrapper = document.createElement("li");
        wrapper.classList.toggle("c-pointer", !linkClickable);
        wrapper.id = id;
        wrapper.setAttribute("role", "none");

        const link = document.createElement(linkClickable ? "a" : "div");
        link.classList.add("s-topbar--item", ...classes);
        link.title = text;

        const ns = "http://www.w3.org/2000/svg";

        const icon = document.createElementNS(ns, "svg");
        icon.classList.add("svg-icon", "native");
        icon.setAttribute("height", "18");
        icon.setAttribute("width", "18");
        icon.setAttribute("viewBox", "0 0 18 18");
        icon.append(...iconContent);

        link.append(icon);
        wrapper.append(link);
        parent?.append(wrapper);
        return wrapper;
    };

    /**
     * @summary makes an SVG <rect> element
     * @param top vertical starting position
     * @param left horizontal starting position
     * @param options configuration options
     */
    const makeSVGRect = (top: number, left: number, options: SVGRectOptions) => {
        const { width = 1, height = 1, color = "black" } = options;

        const ns = "http://www.w3.org/2000/svg";

        const rect = document.createElementNS(ns, "rect");
        rect.setAttribute("fill", color);
        rect.setAttribute("height", height.toFixed(0));
        rect.setAttribute("width", width.toFixed(0));
        rect.setAttribute("x", left.toFixed(0));
        rect.setAttribute("y", top.toFixed(0));

        return rect;
    };

    /**
     * @summary makes an SVG <text> element
     * @param top vertical starting position
     * @param left horizontal starting position
     * @param options configuration options
     */
    const makeSVGText = (top: number|string, left: number|string, options: SVGTextOptions) => {
        const {
            classes = [],
            color = "black",
            halign = "start",
            size = 12,
            text = "",
            valign = "top",
            weight = "normal",
        } = options;

        const ns = "http://www.w3.org/2000/svg";

        const fontSize = typeof size === "number" ? `${size.toFixed(0)}px` : size;
        const fontWeight = typeof weight === "number" ? weight.toFixed(0) : weight;
        const baseline = valign === "middle" ? "central" : `text-${valign}`;
        const x = typeof left === "number" ? left.toFixed(0) : left;
        const y = typeof top === "number" ? top.toFixed(0) : top;

        const element = document.createElementNS(ns, "text");
        element.classList.add(...classes);
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

    /**
     * @summary makes a top navigation bar item for the Configurer
     * @param id item id
     * @param text item text
     * @param options configuration options
     */
    const makeConfigurerTopNavItem: ControllerElementFactory = (id, text, options) => {
        const commonRectOpts: SVGRectOptions = { height: 9, width: 9, };

        const topLeftRect = makeSVGRect(0, 0, { color: "#66d9ef", ...commonRectOpts, });
        const topRightRect = makeSVGRect(0, 9, { color: "#f92342", ...commonRectOpts, });
        const bottomRightRect = makeSVGRect(9, 9, { color: "#99e227", ...commonRectOpts, });
        const bottomLeftRect = makeSVGRect(9, 0, { color: "#8d81ff", ...commonRectOpts, });

        const commonTextOpts: SVGTextOptions = {
            family: "Helvetica, Arial, sans-serif",
            halign: "middle",
            size: 5,
            valign: "middle",
            weight: 600,
        };

        const u = makeSVGText("25%", "25%", {color: "#f92342", text: "U", ...commonTextOpts, });
        const s = makeSVGText("25%", "75%", {color: "#66d9ef", text: "S", ...commonTextOpts, });
        const e = makeSVGText("75%", "25%", {color: "#99e227", text: "E", ...commonTextOpts, });
        const r = makeSVGText("75%", "75%", {color: "#8d81ff", text: "R", ...commonTextOpts, });

        return makeTopNavItem(id, text, {
            ...options,
            linkClickable: false,
            iconContent: [
                topLeftRect,
                topRightRect,
                bottomRightRect,
                bottomLeftRect,
                u, s, e, r,
            ]
        });
    };

    class UserscriptOption<
        T extends Storage | UserScripters.AsyncStorage,
        U extends UserScripters.UserscriptOptionConfig,
        > {

        /**
         * @summary container element
         */
        public container?: HTMLElement;

        /**
         * @param script containing {@link Userscript}
         * @param name option name
         * @param config configuration options
         */
        constructor(
            private script: Userscript<T>,
            public name: string,
            private config: U
        ) { }

        /**
         * @summary checks if the option should be disabled
         */
        async shouldDisable() {
            const { config, script } = this;

            const conditions = Object.entries(config.disabledWhen || {});

            for (const [name, disableValue] of conditions) {
                const option = script.get(name);
                if (!option) continue;

                const value = await script.load(name, config.def);

                if (disableValue === value) return true;
            }

            return false;
        }

        /**
         * @summary renders the option
         */
        async render() {
            const { config, name, script } = this;

            const handlerMap = {
                "toggle": makeStacksToggle,
                "text": makeStacksTextInput,
                "select": makeStacksSelect,
                "checkbox": makeStacksCheckbox
            };

            const { desc, def, disabledWhen = {}, items = [], title = "", type = "text", ...rest } = config;

            const values = await script.load(name, def) as boolean | string | string[];

            const isArr = Array.isArray(values);
            const isBool = typeof values === "boolean";

            const inputName = `${scriptName}-${script.name}-${name}`;

            const options: StacksSelectOptions & StacksTextInputOptions & StacksCheckboxOptions & StacksToggleOptions = {
                ...rest,
                classes: [`${scriptName}-userscript-option`, "mb16"],
                disabled: await this.shouldDisable(),
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

            this.container = inputWrapper; //TODO: partial rerender

            inputWrapper.addEventListener("change", async ({ currentTarget, target }) => {
                if (!isInputLike(target)) return;

                const oldValue = await script.load(name);

                const actualTarget = currentTarget instanceof HTMLFieldSetElement ?
                    { value: [...currentTarget.elements].filter(isCheckedBox).map((e) => e.value) } :
                    target;

                const value = type === "toggle" && actualTarget instanceof HTMLInputElement ?
                    actualTarget.checked :
                    actualTarget.value;

                await script.save(name, value);

                const optionChangeEvent = new CustomEvent(`${scriptName}-change`, {
                    bubbles: true,
                    detail: {
                        name,
                        oldValue,
                        script: script.name,
                        value
                    }
                });

                script.container?.dispatchEvent(optionChangeEvent);
            });

            return inputWrapper;
        }
    }

    class Userscript<T extends Storage | UserScripters.AsyncStorage> extends Store.default {

        public container?: HTMLElement;
        private opts = new Map<string, UserscriptOption<T, UserScripters.UserscriptOptionConfig>>();
        private toast?: HTMLElement;

        constructor(public name: string, public storage: T) {
            super(name, storage);
        }

        /**
         * @summary gets a {@link UserscriptOption}
         * @param name option name
         */
        get(name: string) {
            const { opts } = this;
            return opts.get(name);
        }

        /**
         * @summary checks if a {@link UserscriptOption} is already registered
         * @param name option name
         */
        has(name: string) {
            const { opts } = this;
            return opts.has(name);
        }

        /**
         * @summary registers a {@link UserscriptOption}
         * @param name option name
         * @param config configuration options
         */
        option<U extends UserScripters.UserscriptOptionConfig>(name: string, config: U) {
            this.opts.set(name, new UserscriptOption(this, name, config));
            this.render();
            return this;
        }

        /**
         * @summary registers {@link UserScriptOption}s in bulk
         * @param configs a map of option names to config
         */
        options<U extends Record<string, UserScripters.UserscriptOptionConfig>>(configs: U): Userscript<T>;
        options<
            U extends Record<string, UserScripters.UserscriptOptionConfig>,
            V extends Partial<UserScripters.UserscriptOptionConfig>
            >(configs: UserScripters.UserscriptOptionConfigRecord<U, V>, common: V): Userscript<T>;
        options<
            U extends Record<string, UserScripters.UserscriptOptionConfig>,
            V extends Partial<UserScripters.UserscriptOptionConfig>
        >(configs: UserScripters.UserscriptOptionConfigRecord<U, V>, common?: V) {
            const { opts } = this;

            const sharedConfig = common || {};

            Object.entries(configs).forEach(([name, config]) => {
                opts.set(name, new UserscriptOption(this, name, {
                    ...sharedConfig,
                    ...config
                }));
            });

            this.render();
            return this;
        }

        /**
         * @summary renders the userscript item
         */
        async render() {
            const { name: userscriptName, opts } = this;

            const container = this.container ||= document.createElement("div");
            container.classList.add(
                `${scriptName}-userscript`,
                "d-flex", "fd-column", "mb24"
            );

            const header = document.createElement("h2");
            header.textContent = prettifyName(userscriptName);

            const inputPromises = [...opts].map(([_, option]) => option.render());

            if (!inputPromises.length) {
                header.classList.add("mb8");
            }

            this.toast ||= makeStacksToast(
                `${scriptName}-toast`,
                `Updated ${scriptName} config`,
                {
                    classes: [
                        `${scriptName}-userscript-toast`,
                        "wmn3", "r0", "jc-end"
                    ],
                    type: "success"
                }
            );

            container.addEventListener(`${scriptName}-change`, () => {
                const { toast } = this;
                if (toast) showToast(toast, 1);
                this.render();
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

    class Controller {
        public container?: HTMLElement;
        private position: ControllerPosition = "sidebar";

        constructor(private text: string) {}

        /**
         * @summary gets parent element for the "sidebar" position
         */
        get footerParent() {
            return document.querySelector(".site-footer--categories-nav ul");
        }

        /**
         * @summary gets parent element for the "nav" position
         */
        get navParent() {
            return document.querySelector(".js-top-bar .s-topbar--content");
        }

        /**
         * @summary gets parent element for the "sidebar" position
         */
        get sidebarParent() {
            return document.body;
        }

        /**
         * @summary gets the controller parent by position
         */
        get parent() {
            const { position } = this;
            return this[`${position}Parent`];
        }

        /**
         * @summary sets the controller position
         * @param position new position
         */
        setPosition(position: ControllerPosition) {
            this.position = position;
            return this;
        }

        /**
         * @summary toggles controller state
         */
        toggle() {
            this.container?.click();
            return this;
        }

        /**
         * @summary renders the controller button
         */
        async render() {
            const controllerClasses: Partial<Record<ControllerPosition, string[]>> = {
                footer: ["s-btn__link"],
                sidebar: ["ps-fixed", "r0", "t128"],
            };

            const controllerBuilders: Record<ControllerPosition, ControllerElementFactory> = {
                "footer": makeStacksButton,
                "nav": makeConfigurerTopNavItem,
                "sidebar": makeStacksButton,
            };

            const { parent, position, text } = this;

            return this.container ||= controllerBuilders[position](
                `${scriptName}-modal-controller`,
                text,
                {
                    parent,
                    type: "outlined",
                    muted: true,
                    classes: [...controllerClasses[position] || [], "bar0"]
                }
            );
        }
    }

    class Configurer<T extends Storage | UserScripters.AsyncStorage> {

        /**
         * @summary modal controller
         */
        private controller = new Controller("UserScripters");

        /**
         * @summary modal element
         */
        private modal?: HTMLDivElement;

        /**
         * @summary registered {@link Userscript}s
         */
        private scripts = new Map<string, Userscript<T>>();

        /**
         * @param storage {@link Storage} to use
         */
        constructor(private storage: T) { }

        /**
         * @summary renders the configurer
         */
        async render() {
            const contentPromises = [...this.scripts].map(([_, s]) => s.render());

            const self = this.get(scriptName);

            const { controller } = this;

            const position = await self?.load<ControllerPosition>("button-position") || "sidebar";

            controller.setPosition(position);

            const controllerElement = await controller.render();

            this.modal ||= makeStacksExpandable(
                `${scriptName}-modal`,
                controllerElement,
                {
                    classes: ["ps-fixed", "r0", "z-modal", `${scriptName}-modal`,],
                    contentClasses: ["ba", "bar-lg", "bc-black-075", "bg-white", "p16", "wmn3"],
                    expanded: false,
                    parent: document.body,
                }
            );

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

        /**
         * @summary checks if a {@link Userscript} is already registered
         * @param name userscript name
         */
        has(name: string) {
            const { scripts } = this;
            return scripts.has(name);
        }

        /**
         * @summary hides the configuration modal
         */
        hide() {
            if (this.modal?.classList.contains("is-expanded")) {
                this.controller?.toggle();
            }
            return this;
        }

        /**
         * @summary gets a registered {@link Userscript}
         * @param name userscript name
         */
        get(name: string) {
            const { scripts } = this;
            return scripts.get(name);
        }

        /**
         * @summary registers a {@link Userscript}
         * @param name userscript name
         * @param storage {@link Storage} to use
         */
        register(name: string, storage?: T) {
            const script = new Userscript(name, storage || this.storage);
            this.scripts.set(name, script);
            this.render();

            return script;
        }

        /**
         * @summary opens the configuration modal
         */
        show() {
            if (!this.modal?.classList.contains("is-expanded")) {
                this.controller?.toggle();
            }
            return this;
        }

        /**
         * @summary unregisters a {@link Userscript}
         * @param name userscript name
         */
        unregister(name: string) {
            const { scripts } = this;

            const script = scripts.get(name);
            if (script) {
                scripts.delete(name);
                this.render();
            }

            return script;
        }
    }

    const userscripters = unsafeWindow.UserScripters ||= {};
    const userscripts = userscripters.Userscripts ||= {};

    const storage = Store.locateStorage();
    const configurer = new Configurer(storage);

    userscripts.Configurer ||= configurer;

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

    await configurer.render();

    // done loading, notify subscribers it is safe to use the configurer now
    unsafeWindow.dispatchEvent(new CustomEvent(`${scriptName}-load`));

}, { once: true });