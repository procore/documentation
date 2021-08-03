## About the Documentation Repository

The **Documentation** repository contains the source code for the **Docs** section of the
[Procore Developers](https://developers.procore.com) website.

The documents in this project are written in Markdown and then rendered as
HTML pages at https://developers.procore.com/documentation.

The **Procore Developers** website aims at helping third-party developers and integrators with integrating the Procore API into their projects.

## Before you begin

Verify the system requirements for the Jekyll installation:

- Check the version of Ruby that is installed on your system by issuing the following command: `ruby -v`
- Check the versions of RubyGems by issuing the following command: `gem -v`
- Check the versions of GCC and Make by issuing the following commands:
  - `gcc -v`
  - `g++ -v`
  - `make -v`

You will also need an active [Github account](https://github.com/login), a source code text editor ([VSCode](https://code.visualstudio.com/download), [Atom](https://atom.io/), etc.), and basic familiarity with markdown syntax.

- [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
- [Basic writing and formatting syntax](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

The project source files follow the [Github Flavored Markdown](https://github.github.com/gfm/) specification.

## How to run the project locally

To run the project locally complete the following steps:

1. Clone the **documentation** Repository to your Local Environment.
  * Navigate to the https://github.com/procore/documentation repository.
  * Click **Code** and copy the repository path to your clipboard.
  * Open a terminal session and navigate to a working directory of your choice.
  * Run git clone by typing the following command in your terminal:
  > `git clone git@github.com:procore/documentation.git`

2. Install the Jekyll Framework.
  * Navigate to the *documentation* folder by typing `cd documentation` in a terminal session.
  *  Install the Jekyll framework and other dependent ruby gems by issuing the following command in a terminal session:
  > `bundle install`

  If your computer already has the needed dependencies (up-to-date Ruby, OpenSSL), the command should just work. If you see any error, follow the instructions on [how to install Jekyll](https://jekyllrb.com/docs/installation/).
  
3. Test your Local Environment.
  * Start the Jekyll server running locally by typing the following commnand in your terminal:
  > `bundle exec jekyll serve`
  * Open your browser and navigate to
  > `http://127.0.0.1:4000/documentation/introduction`

As you edit the source code and save your changes, the HTML output is regenerated automatically.

## How to contribute to the **documentation** repository

Did you find a typo, or some incorrect or missing information? You can update the content for the **Procore Developer Center** by doing the following:

1.  First, check out your ‘main’ branch to ensure that it is set as your current branch by issuing the following command:
  > `git checkout main`

2. Then pull down the changes to your local environment by issuing the following command:
  > `git pull origin main`

3. Check out a feature branch in your local environment. From the root of your local project, run git checkout to create a new feature branch. **Note**: Use the -b flag and include the Jira ticket number in your branch name. Example:
> `git checkout -b DOCS-123_new_tutorial`

4. Modify the source files. Open your source code editor to make your changes. Update existing files or create new files as needed. Make sure to save your changes.

5. Add your changes. Once you have completed your changes and saved your work locally, you can add those changes to your local feature branch. First, stage your changes for commit by issuing the following command:
> `git add .`

- Note: You can use the '.' notation as a wildcard to include all changes, or you can specify individual files.

6. Next, commit the changes to your feature branch, using the -m flag with a commit message in quotes as shown in the following example:
>  `git commit -m "adding some new content"`

7. Push your feature branch to the remote repository by issuing a command like the following example:
> `git push origin DOCS-123_new_tutorial`

8. Finally, submit a pull request to the remote repository. In GitHub, navigate to the ‘Branches’ screen and click **New pull request**. From the list of reviewers select a person who will review your content.

After you have submitted your pull request, the content owner will review your pull request. The reviewer will add comments if there are any questions or issues. Once all issues have been resolved, the reviewer will merge your content into the **main** branch and your changes will appear live on the Procore Developer Center.

## How to add a new page

In addition to updating existing content, you can also add new pages to the **documentation** repostitory.

To add a new page, do the following:

1. First, decide which section the new page should live in (e.g.: "OAuth").
2.  Add a new .md file in the appropriate folder (e.g.: "oauth/advanced.md").
3.  Add a [YAML front matter](https://jekyllrb.com/docs/front-matter/) at the top of the page:
    - `permalink:` => the URL you want for this page
    - `title:` => the `<h1>` and `<title>` for the page
    - `layout:` => set to `default`
    - `section_title:` => the title of the section you picked (e.g.: "OAuth")
4. Use markdown to write the rest of the page and make sure to save your changes.
5. Add the page to `_data/navigation.yml` so it shows up in the sidebar.

## How to author content in Markdown

The pages that appear in the **Procore Developer Center** are authored in [GitHub flavored markdown](https://github.github.com/gfm/).

There are many helpful online resources for learning markdown. Here are a few to get you started.

- [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
- [Basic writing and formatting syntax](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

The project source files follow the [Github Flavored Markdown](https://github.github.com/gfm/) specification.

* To add an external link, use the following syntax:`[caption](url)`.
* To add an internal link, use the `link` method provided by Jekyll, which ensures
that links are valid and work both locally and remotely:

```
[Workflow API]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_workflows.md %})
````

* To embed an external image, use the following syntax: `![alt text](url)`.
* To embed an internal image, first save the image to the `assets/guides` folder and then embed them using a syntax like the following:
```
![Install Architecture]({{ site.baseurl }}/assets/guides/iframe-install-arch.png)
```

## How to change the layout and CSS

The style for each page comes from the `_layouts/default.html` template,
which is designed to follow [Procore’s CORE design system](https://core.procore.com).

If you notice any discrepancies with the style, or if an element doesn't render correctly
on a certain device, open a Pull Request to update the default layout, and add a reference to the CORE design system rule you are adding to the description.
