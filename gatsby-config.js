import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: 'Slicks Slices',
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza in Atlanta',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      // this is the name of the plugin youre adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'i8pmz3lb',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
