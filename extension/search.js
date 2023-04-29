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

    search(query) {
        query = query.replace(/[%\s]/ig, "").toLowerCase();
        let results = [];
        for (let title of this.titles) {
            if (title.length < query.length) continue;
            let index = title.indexOf(query);
            if (index > -1) {
                results.push({ title, matchIndex: index });
            }
        }
        return results.sort((a, b) => a.title.length - b.title.length)
            .flatMap(item => {
                return this.docs[item.title];
            });
    }
}

function cleanChapterTitle(title) {
    return title.toLowerCase().replace(/[0-9.]/g, "").trim();
}