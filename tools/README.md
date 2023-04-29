Parse kubernetes docs to generate search index.

## Get started

1. Cloning the kubernetes docs repo into local, check the [kubernetes website repo](https://github.com/kubernetes/website) to learn more.

   ```bash
   $ git clone git@github.com:kubernetes/website.git k8s-website

   $ make init-module

   $ npm ci

   $ make build
   ```

2. Run the script to generate search index.

   ```bash
   $ go run main.go /path/to/kubernetes-website/public
   ```
