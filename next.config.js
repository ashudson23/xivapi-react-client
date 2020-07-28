const { parsed } = require('dotenv-flow').config();

// filter out any none public environment variables
const env = Object.entries(parsed)
  .filter(([key]) => !/(secret|private)/gi.test(key))
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
console.log('Public variables:', env)

module.exports = {
  poweredByHeader: false,
  env,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|webp)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: "/_next/static/images/",
          outputPath: "static/images/",
          name: "[hash].[ext]"
        },
      },
    });

    config.module.rules.push({
      test: /\.(svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: "/_next/static/images/",
          outputPath: "static/images/",
          name: "[hash].[ext]"
        }
      }
    });

    return config;
  },
}