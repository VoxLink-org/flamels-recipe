const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginTOC = require("eleventy-plugin-toc")
const lucideIcons = require("@grimlink/eleventy-plugin-lucide-icons");

const { buildSiteHeader } = require("./webcomponent-esbuild");

const md = new markdownIt({ html: true });


module.exports = function(eleventyConfig) {

  // 使用 eleventy.before 事件钩子，在 11ty 构建开始前执行 esbuild 打包
  eleventyConfig.on('eleventy.before', buildSiteHeader);
  // 👇 新增：配置 11ty 开发服务器
  eleventyConfig.setServerOptions({
    // 配置中间件
    middleware: [
      function(req, res, next) {
        // 为所有响应添加 CORS 头部
        res.setHeader('Access-Control-Allow-Origin', '*'); // 或者更安全地设置为 'http://localhost:5173'
        next();
      }
    ]
  });


  eleventyConfig.addPassthroughCopy({
     "src/media": "/media",
     "src/assets": "/",
     "node_modules/alpinejs/dist/cdn.min.js": "js/alpine.js",
     "node_modules/htmx.org/dist/htmx.min.js": "js/htmx.js"
  });

  eleventyConfig.addShortcode("now", () => `${Date.now()}`);

  eleventyConfig.addPlugin(lucideIcons);

  eleventyConfig.setLibrary("md", markdownIt({ html: true }).use(markdownItAnchor, { tabIndex: false }));

  eleventyConfig.addFilter("markdown", (content) => {
    return md.render(content);
  });
  
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
  });

  eleventyConfig.addFilter("sortByOrderAndTitle", (values) => {
    let vals = [...values];
    return vals.sort((a, b) => {
      // Sort by order first
      const aOrder = typeof a.data.order === 'number' ? a.data.order : 0;
      const bOrder = typeof b.data.order === 'number' ? b.data.order : 0;
      const orderDiff = aOrder - bOrder;
      if (orderDiff !== 0) return orderDiff;
    
      // If order is the same, sort by title
      return a.data.title.localeCompare(b.data.title);
    })
  });

  eleventyConfig.addFilter("sortByUrl", (values) => {
    let vals = [...values];
    return vals.sort((a, b) => Math.sign(a.url.localeCompare(b.url)));
  });

  eleventyConfig.addNunjucksFilter("getNextPrevMenu", function(menu, currentUrl) {
    let flatMenu = [];
    menu.forEach(item => {
      flatMenu.push(item);
      if (item.children) {
        item.children.forEach(child => {
          flatMenu.push(child);
        });
      }
    });
  
    const currentIndex = flatMenu.findIndex(item => item.url === currentUrl);
    const previousItem = currentIndex > 0 ? flatMenu[currentIndex - 1] : null;
    const nextItem = currentIndex < flatMenu.length - 1 ? flatMenu[currentIndex + 1] : null;
  
    return { previous: previousItem, next: nextItem };
  });
  
  eleventyConfig.addCollection("menu", function(collectionApi) {
    const docs = collectionApi.getFilteredByGlob("src/docs/**/*.md");
    let menu = [];

    docs.sort((a, b) => {
      // Sort by order first
      const aOrder = typeof a.data.order === 'number' ? a.data.order : 0;
      const bOrder = typeof b.data.order === 'number' ? b.data.order : 0;
      const orderDiff = aOrder - bOrder;
      if (orderDiff !== 0) return orderDiff;
    
      // If order is the same, sort by title
      return a.data.title.localeCompare(b.data.title);
    })
    .forEach(doc => {
      const urlSegments = doc.url.split('/').filter(Boolean);
    
      // Add top-level items
      if (urlSegments.length === 1 || urlSegments.length === 2) {
        let menuItem = {
          title: doc.data.title,
          url: doc.url,
          children: []
        };
    
        // Add children
        docs.forEach(subDoc => {
          const subUrlSegments = subDoc.url.split('/').filter(Boolean);
          if (subUrlSegments.length === 3 && subUrlSegments[1] === urlSegments[1]) {
            menuItem.children.push({
              title: subDoc.data.title,
              url: subDoc.url
            });
          }
        });
    
        menu.push(menuItem);
      }
    });

    return menu;
  });
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/docs/posts/**/*.md").sort(function(a, b) {
      return b.date - a.date;
    });
  });
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  }
};