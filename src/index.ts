interface UserscriptOption {
    name: string;
    desc: string;
    def?: unknown;
}

interface StacksCommonOptions {
    classes?: string[];
    parent?: Element;
}

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

window.addEventListener("load", () => {
    const scriptName = "userscript-configurer";

    const { Store } = window;
    if (!Store) {
        console.debug(`[${scriptName}] missing UserScripters storage`);
        return;
    }

    const clear = (elem: Element) => [...elem.children].forEach((c) => c.remove());

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

    class Userscript<T extends Storage | UserScripters.AsyncStorage> extends Store?.default {

        private container?: HTMLElement;
        private options = new Map<string, UserscriptOption>();

        constructor(public name: string, public storage: T) {
            super(name, storage);
        }

        /**
         * @summary registers a {@link UserscriptOption}
         * @param key option key
         * @param desc option description
         * @param def optional default
         */
        option(key: string, desc: string, def?: unknown) {
            this.options.set(key, { name: key, desc, def });
            this.render();
            return this;
        }

        /**
         * @summary renders the userscript item
         */
        render() {
            const { name, options } = this;

            const container = this.container ||= document.createElement("div");
            container.classList.add(
                `${scriptName}-userscript`,
                "d-flex", "fd-column", "mb24"
            );

            const header = document.createElement("h2");
            header.classList.add("mb8");
            header.textContent = name;

            const inputs = [...options].map(([key, option]) => {
                const { desc, def } = option;

                const [inputWrapper] = makeStacksTextInput(
                    `${scriptName}-${name}-${key}`,
                    {
                        description: desc,
                        title: key,
                        value: def as string // TODO different input types
                    }
                );

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

    class Configurer<T extends Storage | UserScripters.AsyncStorage> {

        /**
         * @summary modal controller element
         */
        private controller?: HTMLElement;

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
        render() {
            const common: StacksCommonOptions = { parent: document.body };
            const commonClasses = ["ps-fixed", "r0"];

            const content = [...this.scripts].map(([_, s]) => s.render());

            this.controller ||= makeStacksButton(
                `${scriptName}-modal-controller`,
                "UserScripters",
                {
                    ...common,
                    type: "outlined",
                    muted: true,
                    classes: [
                        ...commonClasses,
                        "bar0", "t128"
                    ]
                }
            );

            this.modal ||= makeStacksExpandable(
                `${scriptName}-modal`,
                this.controller,
                {
                    ...common,
                    classes: [
                        ...commonClasses,
                        "z-modal",
                        `${scriptName}-modal`,
                    ],
                    contentClasses: ["ba", "bar-lg", "bc-black-075", "bg-white", "p16", "wmn3"],
                    expanded: false
                }
            );

            const contentElem = this.modal.querySelector(".s-expandable--content");
            if (!contentElem) {
                console.debug(`[${scriptName}] missing modal content element`);
                return this;
            }

            clear(contentElem);
            contentElem.append(...content);

            return this;
        }

        /**
         * @summary hides the configuration modal
         */
        hide() {
            if (this.modal?.classList.contains("is-expanded")) {
                this.controller?.click();
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
         */
        register(name: string) {
            const { storage } = this;

            const script = new Userscript(name, storage);
            this.scripts.set(name, script);
            this.render();

            return script;
        }

        /**
         * @summary opens the configuration modal
         */
        show() {
            if (!this.modal?.classList.contains("is-expanded")) {
                this.controller?.click();
            }
            return this;
        }
    }

    const userscripters = unsafeWindow.UserScripters ||= {};
    const userscripts = userscripters.Userscripts ||= {};

    const storage = Store.locateStorage();
    const configurer = new Configurer(storage);

    userscripts.Configurer ||= configurer;

    appendStyles();

    configurer.render();

}, { once: true });