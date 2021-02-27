// We register the TypeScript evaluator in gatsby-config so we don't need to do
// it in any other .js file. It automatically reads the TypeScript config from
// tsconfig.json.
require('ts-node').register();

// Use a TypeScript version of gatsby-config.js.
module.exports = require('./src/gatsby-api/config.ts');
