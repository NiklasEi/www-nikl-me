export const siteMetadata = {
  title: 'Nikl.me',
  description: 'Personal website with programming projects and related blog posts',
  keywords: 'nikl, nikl.me, gamedev, Bevy, rust',
  siteUrl: 'https://www.nikl.me',
  author: {
    name: 'Niklas Eicker',
    firstName: 'Niklas',
    email: 'hello@nikl.me',
    social: {
      github: 'NiklasEi',
      gitlab: 'NiklasEi',
      discord: 'WgCrwXF',
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
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.nodes.map((node) => {
              return Object.assign({}, node.frontmatter, {
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }]
              });
            });
          },
          query: `
              {
                allMarkdownRemark(
                  sort: {frontmatter: {date: DESC}},
                  filter: { fields: { group: { eq: "blog" } }, frontmatter: { hidden: { ne: true } } }
                ) {
                  nodes {
                    excerpt
                    html
                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
          output: '/rss.xml',
          title: "Nikl's Blog"
        }
      ]
    }
  },
  'gatsby-plugin-react-helmet'
];
