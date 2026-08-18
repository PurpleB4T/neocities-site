# Notes
## Wiki
base on this https://44x50.neocities.org/sites/character-wiki-template/charactertemplate

- Table of Contents https://css-tricks.com/a-perfect-table-of-contents-with-html-css/

## Gen
### TOOLTIPS
based on this https://www.w3schools.com/howto/howto_css_tooltip.asp


# Art Gallery Explanations
- [post_layout.njk](src/_includes/layout/post_layout.njk)
  - full html file layout for the page (including the sidebars, etc, basically just a copy of the main "base.njk")
  - potentially replace with main.njk and merge the CSS files so we are back to the basics... 
- [art.njk](src/_includes/layout/art.njk)
  - where the contents of the "art post" live (pagination, and the date as well as the tags)
- [art.json](src/art/art.json)
  - auto assigns the art tag to all .md files within the [art](src/art) folder
    - in that folder all posts of the *art.collection* live (posts tagged with "art")
- [paginate.njk](src/_includes/partials/paginate.njk)
  - partial for **art.njk**, the "navlinks" on the top of the posts
- [gallery.html](src/gallery.html)
  - the layout for the gallery subpage, using the **base.njk** overall template
  - [gallery_tags.html](src/gallery_tags.html)
    - the automated page that links every post of a certain tag

## Gallery ToDo's
- navbar to the gallery page top/ take out of the sidebar
    