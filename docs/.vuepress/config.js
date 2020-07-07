module.exports = {
    title: "寇凯成的博客",
    description: 'Welcome',
    markdown: {
        lineNumbers: true
    },
    themeConfig:{
        displayAllHeaders: true,
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
