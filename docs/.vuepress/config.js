module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",
  // 注入到当前页面的 HTML <head> 中的标签
  base: "/", // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: false, // 代码块显示行号
  },
  themeConfig: {
    navbar: false,
    search: false,
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    
    sidebar: {
      "/": ["/v-if VS v-show","/Functional","/LocalVariables"],
      // "/": commonSidebar,
    },
  },
};
