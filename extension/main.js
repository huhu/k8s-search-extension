const c = new Compat();
(async () => {
    const commandManager = new CommandManager(
        new HistoryCommand(),
    );

    const defaultSuggestion = `The ultimate search extension for Kubernetes.`;
    const omnibox = new Omnibox(defaultSuggestion, c.omniboxPageSize());

    omnibox.bootstrap({
        onSearch: (query) => {
            return searcher.search(query);
        },
        onFormat: (index, item) => {
            return {
                content: ``,
                description: ``,
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