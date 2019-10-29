module.exports = {
  title: 'RAWG the Docs',
  description: 'Community-powered documentation for rawg.io',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/api/' },
      { text: 'rawg.io', link: 'https://rawg.io' }
    ],
    sidebar: ['/api/', '/api/users/', '/api/auth/', '/api/games/', '/api/collections/'],
    lastUpdated: 'Last Updated',
    repo: 'orels1/rawgthedocs',
    repoLabel: 'Contribute!',
    docsRepo: 'orels1/rawgthedocs',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Found an issue? Edit this page!',
    displayAllHeaders: true
  },
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/atom-one-dark.css'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/override.css'
      }
    ]
  ],
  plugins: [
    ['container', {
      type: 'info',
      defaultTitle: '',
    }]
  ]
};
