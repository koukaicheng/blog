module.exports = {
    title: "寇凯成的博客",
    description: 'Welcome',
    base: '/blog/',
    displayAllHeaders: true,
    markdown: {
        lineNumbers: true
    },
    themeConfig:{
        displayAllHeaders: true,
        sidebarDepth:2,
        nav:[
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
        ],
        sidebar: [
            {
                title: '技术总结',
                path: '/guide/'
            },
            {
                title:'Vue源码分析',
                path: '/vuePrinciple/'
            }
        ],
    },
    plugins: ['@vuepress/active-header-links', {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor'
    }]
}
