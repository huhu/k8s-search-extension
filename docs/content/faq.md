+++
title = "FAQ"
description = "Frequently asked questions"
weight = 2
+++

# Platform

### Any plans to support Safari?

Unfortunately, no. According to MDN's web extension [compatibility chart](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs#omnibox):
Safari doesn't support omnibox API, which is essential to this extension.

### Is it possible to customize the number of suggestions shown in address bar?

The number of suggestions is limited to the browser API, currently we can't customize it. Also, each browser have [a different limit number](https://github.com/huhu/search-extension-core/blob/7629fe7a5f896abf630a2b7dc00e9e6141c36c5c/src/compat.js#L18).