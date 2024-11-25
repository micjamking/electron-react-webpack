const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.tsx', // Entry point of the React app
    output: {
      path: path.resolve(__dirname, 'dist'), // Output directory
      filename: 'bundle.js', // Bundled JavaScript file
      clean: true, // Clean the output directory before each build
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader', // Transpile TypeScript
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            'style-loader', // Injects styles into DOM
            'css-loader',   // Translates CSS into CommonJS
            'sass-loader',  // Compiles Sass to CSS
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve these extensions
      fallback: {
        fs: false,
        path: false,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html', // Reference to the base HTML file
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000, // Development server port
      client: {
        logging: 'warn', // Reduce console logging
      },
    },
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  };
};