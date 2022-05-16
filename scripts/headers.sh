#!/bin/bash

dist="dist"
output=$dist"/headers.js"

generate-headers tampermonkey \
    -o $output \
    -m all meta \
    -g get set delete unsafe \
    -q "https://github.com/userscripters/storage/raw/master/dist/browser.js" \
    -x "https://chat.meta.stackexchange.com/*" \
    -x "https://chat.stackexchange.com/*" \
    -x "https://stackexchange.com/*" \
    --collapse \
    --pretty

userscript="$(find -iwholename "./$dist/*\.js" -type f -not -iname "*headers\.js")"

sed -i -e "{1e cat $output; echo; echo" -e "; N}" $userscript
