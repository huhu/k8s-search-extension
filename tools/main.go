package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

type SearchItem struct {
	Title    string       `json:"title"`
	Href     string       `json:"href"`
	Path     string       `json:"path"`
	Anchor   string       `json:"anchor"`
	Children []SearchItem `json:"children"`
}

var docsPath = ""

func main() {
	// Receive path to docs directory as argument
	if len(os.Args) < 2 {
		log.Fatal("Please provide path to docs directory")
	}

	docsPath = os.Args[1]

	f, err := os.Open(docsPath + "docs/index.html")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	doc, err := goquery.NewDocumentFromReader(f)
	if err != nil {
		log.Fatal(err)
	}

	items := traverseSidebarList(1, doc.Find("#m-docs-li>ul.ul-1"))

	// marshal items to json
	json, err := json.Marshal(items)
	if err != nil {
		log.Fatal(err)
	}
	// write json data to file
	err = ioutil.WriteFile("data.json", json, os.ModePerm)
	if err != nil {
		log.Fatal(err)
	}
}

func traverseSidebarList(depth int, s *goquery.Selection) []SearchItem {
	if s == nil {
		return []SearchItem{}
	}

	items := []SearchItem{}
	s.ChildrenFiltered("li").Each(func(i int, child *goquery.Selection) {
		// title := child.Text()
		title := ""
		path := ""
		href := ""
		label := child.ChildrenFiltered("label")
		if label != nil {
			title = label.Text()
			link := label.ChildrenFiltered("a")
			if h, exists := link.Attr("href"); exists {
				// Get the last part of href pat
				href = strings.TrimSuffix(h, "/")

				index := strings.LastIndex(href, "/")
				path = href[index+1:]
			}
		}

		var children []SearchItem
		next := child.ChildrenFiltered(fmt.Sprintf("ul.ul-%v", depth+1))
		children = traverseSidebarList(depth+1, next)
		if len(children) == 0 {
			fmt.Println("Parsing toc", path)
			var err error
			children, err = parseToc(fmt.Sprintf("%s/%s/index.html", docsPath, href))
			if err != nil {
				log.Fatal(err)
			}
		}

		items = append(items, SearchItem{Title: title, Href: href, Path: path, Children: children})
	})

	return items
}

func parseToc(filepath string) ([]SearchItem, error) {
	f, err := os.Open(filepath)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	doc, err := goquery.NewDocumentFromReader(f)
	if err != nil {
		return nil, err
	}

	items := []SearchItem{}
	doc.Find("nav#TableOfContents>ul a").Each(func(i int, s *goquery.Selection) {
		anchor := s.AttrOr("href", "")
		if anchor == "#what-s-next" || anchor == "#whats-next" {
			// Ignore "what's next" section
			return
		}
		title := s.Contents().Text()
		items = append(items, SearchItem{Title: title, Anchor: anchor})
	})
	return items, nil
}