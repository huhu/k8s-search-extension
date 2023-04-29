const c = new Compat();
(async () => {
    const commandManager = new CommandManager(
        new HistoryCommand(),
    );

    const defaultSuggestion = `The ultimate search extension for Kubernetes.`;
    const omnibox = new Omnibox(defaultSuggestion, c.omniboxPageSize());
    const searcher = new DocsSearcher(docsIndex);

    omnibox.bootstrap({
        onSearch: (query) => {
            return searcher.search(query);
        },
        onFormat: (_, item) => {
            return {
                content: `https://kubernetes.io/docs/${item.path}#${item.anchor}`,
                description: `${[...item.parentTitles.map(t => c.escape(t)), c.match(c.escape(item.title))].join(" > ")}`,
            };
        },
        afterNavigated: (query, result) => {
            // Ignore the command history
            if (query && query.startsWith(":")) return;

            HistoryCommand.record(query, result);
        },
        onEmptyNavigate: (content, disposition) => {
            commandManager.handleCommandEnterEvent(content, disposition);
        },
    });

    omnibox.addPrefixQueryEvent(":", {
        onSearch: (query) => {
            return commandManager.execute(query);
        },
    });
})();