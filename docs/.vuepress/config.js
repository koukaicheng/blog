const base = process.env.NODE_ENV === 'production' ? '/Interview-blog/' : '/'
module.exports = {
  base: '/blog/',
  title: '面试总结',
  description: '',
  themeConfig: {
    displayAllHeaders: true,
    sidebar: [
      {
        title: '浏览器渲染页面得过程',
        path: '/'
      }, {
        title: '虚拟DOM',
        path: '/guide/'
      }
    ],
  },
  markdown: {
    lineNumbers: true
  },
  plugins: ['@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor'
  }]
}
