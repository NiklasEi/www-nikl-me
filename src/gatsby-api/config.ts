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
  `gatsby-transformer-remark`,
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-fontawesome-css'
];
