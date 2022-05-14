Userscripts Configurer - One script to configure them all

script posts


<!-- thumbnail: https://i.stack.imgur.com/Rdcrd.png -->
<!-- version: 1.0.1 -->
<!-- tag: script -->
<!-- excerpt: UserScripts Configurer provides a shared UI and controls configuration options for UserScripters' userscripts. -->

## Screenshot

![Configurer UI with example options for several test userscripts](https://i.stack.imgur.com/8OxKN.png)

## About

UserScripts Configurer is a shared configuration controller for UserScripters' userscripts.

### How to use

Configurer is exposed as a global accessible via `UserScripters.Userscripts.Configurer`.
To ensure the Configurer is done loading, including scripts are encouraged to listen to a `userscript-configurer-load` event on `unsafeWindow` before hooking.

To hook to the Configurer, call its `register` method with the name of the userscript as its single parameter:

```lang-ts
const configurer = UserScripters.Userscripts.Configurer;
const script = configurer.register("Auto Review Comments");
```

The method will return an instance of `Userscript` to which options (if any) can be added by calling its `option` method with 2 parameters. The 1<sup>st</sup> is the option's name, the 2<sup>nd</sup> is its configuration. The configurer currently supports 4 types of options (`type` field):

- text input
- checkboxes
- toggle switch
- select

Option config interface (as well as the interface of the Configurer itself) is described by our [Global Types](https://github.com/userscripters/global-types) type definitions package.

```lang-ts
// text input option
script.option(
    "welcome-text",
    {
        def: "Welcome to Stack Overflow",
        title: "Greeting text",
        type: "text"
    }
);

// checkbox option
script.option("prefer-diff-view", {
    type: "checkbox",
    items: [{
        label: "Use diff view",
        value: true
    }]
});

//toggle option
script.option("prefer-diff-view", {
    type: "toggle",
    selected: true,
    title: "Prefer diff view"
});

// select option
script.option("style", {
    type: "select",
    title: "Reference style",
    items: [
        { label: "Simple", value: "simple" },
        { label: "Full", value: "full", selected: true }
    ]
});
```

The Configurer uses a [userscript manager-agnostic storage](https://github.com/userscripters/storage) that also works with `localStorage` if manager storages are inaccessible.


### License

The script is licensed under the [GPL-3.0-or-later](https://spdx.org/licenses/GPL-3.0-or-later) license.

### Download

Latest version: 1.0.1

[Install](https://github.com/userscripters/userscripts-configurer/raw/master/dist/modern/index.user.js) | [Minified](https://github.com/userscripters/userscripts-configurer/raw/master/dist/modern/index.min.user.js)

### Platform

Version number means "last tested on":

| Chrome | Edge | Explorer | Firefox | Opera |
| - | - | - | - | - |
| ✔ 100.0.4896.127 | - | - | - | - |

Supported userscript managers:

- Greasemonkey
- Tampermonkey
- Violentmonkey

## Change log

| Version    | Description |
| ---------- | ----------- |
| 1.0.1 |             |

## Contact

Author: Oleg Valter
<br>Organization: [UserScripters](https://github.com/userscripters)

Please, submit bug reports [on the source repository](https://github.com/userscripters/userscripts-configurer/issues).
<br>Before adding a new one, please check if it hasn't been raised before.

You can also [drop by to chat](https://chat.stackoverflow.com/rooms/214345), we are a friendly bunch.

## Code

[Source code](https://github.com/userscripters/userscripts-configurer/blob/master/src/index.ts) is written in TypeScript.

Contributions are welcome, you can always [submit a PR here](https://github.com/userscripters/userscripts-configurer/pulls).