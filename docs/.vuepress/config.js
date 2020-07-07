const base = process.env.NODE_ENV === 'production' ? '/blog/' : '/'
module.exports = {
  title: 'kkc-技术总结',
  description: 'Welcome',
  base: base,
  displayAllHeaders: true,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    displayAllHeaders: true,
    sidebarDepth: 2,
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Guide', link: '/guide/'},
    ],
    sidebar: [
      {
        title: '技术总结',
        path: '/guide/'
      },
      {
        title: 'Vue源码分析',
        path: '/vuePrinciple/'
      }, {
        title: 'css相关',
        path: '/cssSummary/'
      }
    ],
  },
  plugins: ['@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor'
  }]
}
