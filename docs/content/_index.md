+++
title = "K8S Search Extension"
sort_by = "weight"
+++

# Searching

**K8S Search Extension** provides a convenient way to search Kubernetes resources on the address bar. We build a search index for all Kubernetes docs from [kubernetes.io](https://kubernetes.io/docs/home/). 

![](/searching.png)

You can input multiple keywords separated by `Space` to narrow down the result, this is similar to the Linux *pipe* (`|`) operation. The search result of the latter keyword will be filtered from the result of the former keyword. For example, the keywords `"pod create"` will match `["Create Pods", "Delete Pods"]` first, then narrow down to `["Create Pods"]`.

# Command systems

The command system brings a handy set of useful and convenient commands to you. Each command starts with a **:** (colon), followed by the name, and function differently in individual. Those commands including but not limited to:

- `:history` - show your local search history

# Miscellaneous

## Page down/up easily

You can press `space` after the keyword, then increase or decrease the number of **-** (hyphen) to page down or page up.