<img align="right" width="200" src="extension/logo.png">

# k8s-search-extension

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/ennpfpdlaclocpomkiablnmbppdnlhoh.svg)]()
[![Mozilla Add-on](https://img.shields.io/amo/v/k8s-search-extension?color=%2320123A)](https://addons.mozilla.org/firefox/addon/k8s-search-extension/)
[![license-mit](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/huhu/rust-search-extension/blob/master/LICENSE-MIT)
[![license-apache](https://img.shields.io/badge/license-Apache-yellow.svg)](https://github.com/huhu/rust-search-extension/blob/master/LICENSE-APACHE)
[![Discord](https://img.shields.io/discord/711895914494558250?label=chat&logo=discord)](https://discord.gg/Xy4n8EZb6d)

**The ultimate search extension for Kubernetes**

https://k8s.extension.sh

## How to use it

![](/docs/static/k8s-search-extension.gif)

Input keyword **k** in the address bar, press `Space` to activate the search bar. Then enter any keyword
you want to search.

## Contribution

[jsonnet](https://jsonnet.org/) is required before getting started. To install `jsonnet`,
please check `jsonnet`'s [README](https://github.com/google/jsonnet#packages).
For Linux users, the `snap` is a good choice to [install jsonnet](https://snapcraft.io/install/jsonnet/ubuntu).

```bash
$ git clone --recursive https://github.com/huhu/k8s-search-extension
Cloning into 'k8s-search-extension'...
$ cd k8s-search-extension

$ make chrome # For Chrome version

$ make firefox # For Firefox version

$ make edge # For Edge version
```
