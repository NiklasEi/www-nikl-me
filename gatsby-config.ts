export const siteMetadata = {
  title: 'Nikl.me',
  description: 'Personal website with projects (mainly small games), pictures and a blog',
  keywords: 'nikl, nikl.me, gamedev',
  siteUrl: 'https://www.nikl.me',
  author: {
    name: 'Niklas Eicker',
    firstName: 'Niklas',
    email: 'hello@nikl.me',
    social: {
      github: 'NiklasEi',
      gitlab: 'NiklasEi',
      discord: 'WgCrwXF',
      twitter: 'nikl_me',
      linkedin: 'neicker',
      mastodon: 'https://mastodon.online/@nikl_me'
    }
  }
};

export const plugins = [
  'gatsby-plugin-typescript',
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `blog`,
      path: `${__dirname}/blog/`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `projects`,
      path: `${__dirname}/projects/`
    }
  },
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /src\/icons/
      }
    }
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        // {
        //   resolve: 'gatsby-remark-code-buttons',
        //   options: {
        //     buttonContainerClass: `copy-code-button-container`,
        //     buttonClass: `copy-code-button`,
        //     buttonText: ``,
        //     svgIconClass: `copy-code-icon`,
        //     tooltipText: `Copy`,
        //     toasterClass: `copied-toaster`,
        //     // toasterTextClass: ``,
        //     // toasterText: 'Copied',
        //   }
        // },
        {
          resolve: 'gatsby-remark-embed-video',
          options: {
            width: 800,
            ratio: 1.77,
            noIframeBorder: true,
            containerClass: 'embedVideo-container',
            iframeId: false
          }
        },
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            enableCustomId: true,
            offsetY: `100`,
            removeAccents: true
          }
        },
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            inlineCodeMarker: '$',
            languageExtensions: [
              {
                language: 'ron',
                extend: 'yaml',
                definition: {}
              }
            ]
          }
        },
        {
          resolve: 'gatsby-remark-external-links',
          options: {
            target: '_blank'
          }
        },
        `gatsby-plugin-catch-links`
      ]
    }
  },
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-fontawesome-css'
];