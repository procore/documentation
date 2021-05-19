## What is this project

This repository contains the source code for the "Docs" section of the
[Procore Developers](https://developers.procore.com) website.

The documents in this project are written in Markdown and then rendered as
HTML pages at https://developers.procore.com/documentation

The documents are meant to help third-party developers who wish to integrate
the Procore API into their projects.

## How to run the project locally

- Clone this repository on your machine and `cd` into its folder
- Run `bundle install`. If your machine already has the needed dependencies (up-to-date Ruby, OpenSSL), the command should just work.
- If you see any error, follow the instructions on [how to install Jekyll](https://jekyllrb.com/docs/installation/)
- Type `bundle exec jekyll serve`
- Open `http://127.0.0.1:4000/documentation/introduction` in your browser
- As you edit the source code and save, the HTML is regenerated automatically

## How to fix an error

Did you find a typo? Would you like to rephrase a sentence?
Please create a Pull Request on GitHub with the suggested change.
The authors will review it, approve it, and include the fix.

## How to add a new page

- Decide which section the new page should live in (e.g.: "OAuth")
- Add a new .md file in the matching folder (e.g.: "oauth/advanced.md")
- Add a [YAML front matter](https://jekyllrb.com/docs/front-matter/) at the top:
    - `permalink:` => the URL you want for this page
    - `title:` => the `<h1>` and `<title>` for the page
    - `layout:` => set to `default`
    - `section_title:` => the title of the section you picked (e.g.: "OAuth")
- Use markdown to write the rest of the page and save
- Add the page to `_data/navigation.yml` so it shows up in the sidebar

## How to write in Markdown

Pages are written in [GitHub flavored markdown](https://github.github.com/gfm/)
which means that, for instance, `**bold text**` renders as **bold text**.

External links are created simply with `[caption](url)`. Internal links, on
the other hand, should use the `link` method provided by Jekyll, which ensures
that links are valid and work both locally and remotely:

```
[Workflow API]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_workflows.md %})
````

External images are embedded simply with `![alt text](url)`. Internal images
should be stored in the `assets/guides` folder and embedded from there, e.g.:

```
![Install Architecture]({{ site.baseurl }}/assets/guides/iframe-install-arch.png)
```

## How to change the layout and CSS

The style for each page comes from the `_layouts/default.html` template,
which is designed to follow [Procore’s CORE design system](https://core.procore.com).

If something is off with the style, or if an element doesn't render correctly
on a certain device, open a Pull Request to update the default layout, and
indicate, with a reference to the CORE design system rule you are adding.






