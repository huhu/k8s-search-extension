class DocsSearcher {
    constructor(searchIndex) {
        this.docs = Object.create(null);
        for (let [title, path, anchor, children] of searchIndex) {
            this.buildSearchItem({ title, parentTitles: [], path, anchor, children, });
        }
        this.titles = Object.keys(this.docs);
    }

    buildSearchItem({ title, parentTitles, path, anchor, children }) {
        let cleanedTitle = cleanChapterTitle(title);
        if (!(cleanedTitle in this.docs)) {
            this.docs[cleanedTitle] = [];
        }

        this.docs[cleanedTitle].push({
            title, path, anchor, parentTitles: [...parentTitles],
        });

        if (children === null || children.length === 0) {
            return;
        }

        parentTitles.push(title);
        for (let [childTitle, childPath, childAnchor, childChildren] of children) {
            let item = {
                title: childTitle,
                parentTitles: [...parentTitles],
                path: [path, childPath].join("/"),
                anchor: childAnchor,
            };
            this.buildSearchItem({ ...item, children: childChildren });
        }
    }

    // Search the docs by title.
    // The search is case-insensitive and supports pipe operation.
    // If search keywords separated by space, the search result of 
    // the latter keyword will be filtered from result of the former keyword.
    // e.g. "pod create" will match ["Create Pods", "Delete Pods"] first, 
    // then narrow down to ["Create Pods"].
    search(query) {
        let titles = this.titles;
        let results = [];
        query.split(" ").forEach(keyword => {
            results = this.searchTitle(titles, keyword);
            titles = results.map(item => item.title);
        });

        return results.sort((a, b) => a.title.length - b.title.length)
            .flatMap(item => {
                return this.docs[item.title];
            });
    }

    searchTitle(titles, keyword) {
        let results = [];
        keyword = keyword.replace(/[%\s]/ig, "").toLowerCase();
        for (let title of titles) {
            if (title.length < keyword.length) continue;
            let index = title.indexOf(keyword);
            if (index > -1) {
                results.push({ title, matchIndex: index });
            }
        }

        return results;
    }
}

function cleanChapterTitle(title) {
    return title.toLowerCase().replace(/[0-9.]/g, "").trim();
}