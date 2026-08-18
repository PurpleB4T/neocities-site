// this function creates the category layout needed for the nested tag display (see art-gallery)
function getCategories(collections, requiredTag) {
  // create an <object> variable to store all categories
  const categories = {};

  // Fetch all posts and loop through them
  for (const item of collections.getAll()) {
    // get all tags of a post or an empty list (in case there are no tags defined)
    const tagList = item.data.tags || [];
    // if the tags dont include the broad category (eg. the art tag), ignore the post and move to the next
    if (!tagList.includes(requiredTag)) {
      // programming lingo: skips the execution of the current control block
      continue;
    }
    // loop through each tag of a post
    for (const tag of tagList) {
      //If a tag contains a '/' we process it, otherwise we'll skip
      // this is just a definition thing from my side: all tags for this display have the format `category/value`
      if (!tag || !tag.includes("/")) {
        continue;
      }
      // Here we defide the tag into category and value
      const slashIndex = tag.indexOf('/'); // get index of our category/value sepparator
      const mainTag = tag.substring(0, slashIndex); // mainTag (or category) is first part
      const subTag = tag.substring(slashIndex + 1, tag.length) // subtag (or value) is second

      // we create a dictonary (python term), map (java term)
      // format:
      /**
       * {
       *    category1: ["sub1", "sub2"],
       *    category2: ["sub2", "banana"]
       * }
       */
      // if a category is already known skip this, otherwise add a set
      if (!categories[mainTag]) {
        // programming lingo: A Set is a list of unique things
        categories[mainTag] = new Set();
      }
      // add the category/value pair to the categories structure
      categories[mainTag].add(subTag);
    }
  }


  // Njk cant read Objects, so we format the categories as a nested list
  // format: (sets are also formatted to a list, the json below just doesnt show it)
      /**
       * [
       *    category1: ["sub1", "sub2"],
       *    category2: ["sub2", "banana"]
       * ]
       */
  //
  for (const category in categories) {
    categories[category] = [...categories[category]];
  }
  return categories;
};


module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("_data");
  eleventyConfig.addTemplateFormats("html");

  // This defines which files will be copied
  eleventyConfig.setTemplateFormats(["html", "njk", "txt", "js", "css", "xml", "json", "md",]);

  // Exclude certain tags from displaying
  eleventyConfig.addFilter("exclude", (arr, exclude) => arr.filter((el) => el !== exclude));
  eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));
  eleventyConfig.addCollection("tagList", (collections) => {
    const tags = collections
      .getAll()
      .reduce((tags, item) => tags.concat(item.data.tags), [])
      .filter((tag) => !!tag && !["post", "featured", "popular", "opinion", "all"].includes(tag))
      .sort();
    return Array.from(new Set(tags)).map((tag) => ({
      tag,
      count: collections.getFilteredByTag(tag).length
    }));
  });
  eleventyConfig.addFilter("findTagCount", (tagList, findTag) => tagList.find(({ tag }) => tag === findTag)?.count);

  // This defines the art collection
  // to add a new collection copy the below snippet and change "art" to your new broad category
  // and change "artTags" to a different name
  eleventyConfig.addCollection("artTags", (collections) =>{
    return getCategories(collections, "art");
  });

  //----------------------------------------------
  // ADD new collections here:
  eleventyConfig.addCollection("somethinTags", (collections) =>{
    return getCategories(collections, "ass");
  });

  //----------------------------------------------


  return {
    passthroughFileCopy: true,
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
};