module.exports = {
  title: 'Keyfactor Integration Guidelines',
  tagline: 'How to integrate Keyfactor with Kubernetes / Isio',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'thedemodrive', // Usually your GitHub org/user name.
  projectName: 'keyfactor-integration-guidelines', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '',
      logo: {
        alt: 'Keyfactor',
        src: 'https://www.keyfactor.com/wp-content/themes/keyfactor/img/logos/kyf-logo-corporate-color.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Guidelines',
          position: 'left',
        },
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Integrate With Istio',
          position: 'left',
        },
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Integrate With Kubernetes',
          position: 'left',
        },
        {
          href: 'https://www.keyfactor.com/',
          label: 'Keyfactor Platform',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Keyfactor, Inc. Built with Keyfactor Team.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/thedemodrive/keyfactor-integration-guidelines',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/thedemodrive/keyfactor-integration-guidelinesblog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
