generate-stackapps \
    --about "UserScripts Configurer is a shared configuration controller for UserScripters' userscripts.

### How to use

Configurer is exposed as a global accessible via \`UserScripters.Userscripts.Configurer\`.
To ensure the Configurer is done loading, including scripts are encouraged to listen to a \`userscript-configurer-load\` event on \`unsafeWindow\` before hooking:

\`\`\`lang-ts
unsafeWindow.addEventListener(\"userscript-configurer-load\", () => {
    // it is safe to hook into the configurer now
});
\`\`\`

To hook to the Configurer, call its \`register\` method with the name of the userscript as its single parameter:

\`\`\`lang-ts
const configurer = UserScripters.Userscripts.Configurer;
const script = configurer.register(\"Auto Review Comments\");
\`\`\`

The method will return an instance of \`Userscript\` to which options (if any) can be added by calling its \`option\` method with 2 parameters. The 1<sup>st</sup> is the option's name, the 2<sup>nd</sup> is its configuration. The configurer currently supports 4 types of options (\`type\` field):

- text input
- checkboxes
- toggle switch
- select

If you want to ensure a \`Userscript\` or an \`Option\` is registered only once, both classes have a \`has\` method that accepts a \`name\` and returns a \`boolean\`:

\`\`\`lang-ts
// ensure the script hasn't been registered
if(!configurer.has(\"my-script\")) {
    configurer.register(\"my-script\");
}

// ensure the option hasn't been registered
if(!script.has(\"my-option\") {
    script.option(\"my-option\", { type: \"text\" });
}
\`\`\`

Option config interface (as well as the interface of the Configurer itself) is described by our [Global Types](https://github.com/userscripters/global-types) type definitions package.

\`\`\`lang-ts
// text input option
script.option(
    \"welcome-text\",
    {
        def: \"Welcome to Stack Overflow\",
        title: \"Greeting text\",
        type: \"text\",
    }
);

// checkbox option
script.option(\"prefer-diff-view\", {
    items: [{
        label: \"Use diff view\",
        value: true
    }],
    type: \"checkbox\",
});

//toggle option
script.option(\"prefer-diff-view\", {
    direction: \"left\", // aligns levers to the left of the title
    selected: true,
    title: \"Prefer diff view\",
    type: \"toggle\",
});

// select option
script.option(\"style\", {
    items: [
        { label: \"Simple\", value: \"simple\" },
        { label: \"Full\", value: \"full\", selected: true }
    ],
    title: \"Reference style\",
    type: \"select\",
});
\`\`\`

Options can be added in bulk as a record of name-config pairs via the \`options\` method:

\`\`\`lang-ts
script.options({
    welcome: {
        def: \"Welcome to Stack Overflow\",
        title: \"Greeting text\",
        type: \"text\",
    },
});
\`\`\`

On value change, the Configurer dispatches a custom event on the registered script's \`container\` with the following \`detail\`:

\`\`\`lang-ts
interface ChangeEventDetail {
    name: string,
    script: string,
    value: string | boolean | string[]
}
\`\`\`

The Configurer uses a [userscript manager-agnostic storage](https://github.com/userscripters/storage) that also works with \`localStorage\` if manager storages are inaccessible.
" \
    --chrome "100.0.4896.127" \
    --excerpt "UserScripts Configurer provides a shared UI and controls configuration options for UserScripters' userscripts." \
    --install "https://github.com/userscripters/userscripts-configurer/raw/master/dist/modern/index.user.js" \
    --minified "https://github.com/userscripters/userscripts-configurer/raw/master/dist/modern/index.min.user.js" \
    --language "TypeScript" \
    --works-with "greasemonkey" "tampermonkey" "violentmonkey" \
    --org-name "UserScripters" \
    --org-url "https://github.com/userscripters" \
    --room "https://chat.stackoverflow.com/rooms/214345" \
    --screenshot-alt "Configurer UI with example options for several test userscripts" \
    --screenshot-url "https://i.stack.imgur.com/8OxKN.png" \
    --thumbnail "https://i.stack.imgur.com/Rdcrd.png" \
    --tag "script" \
    --tag "posts"
