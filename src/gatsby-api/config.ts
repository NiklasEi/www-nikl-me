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
      twitter: 'nikl_me',
      linkedin: 'neicker'
    }
  }
};

export const plugins = [
  'gatsby-plugin-typescript',
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `blog`,
      path: `${__dirname}/../../blog/`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `projects`,
      path: `${__dirname}/../../projects/`
    }
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            offsetY: `100`,
            removeAccents: true
          }
        },
        {
          resolve: `gatsby-remark-prismjs`,
        }
      ]
    }
  },
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-fontawesome-css'
];
