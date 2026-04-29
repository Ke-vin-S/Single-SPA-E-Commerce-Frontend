const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_, argv) => {
  const isDev = argv.mode === 'development';
  return {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'shell.[contenthash].js',
      publicPath: '/',
      clean: true,
    },
    devtool: isDev ? 'source-map' : 'hidden-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@miniecommerce-sysco/mfe-design-system': path.resolve(
          __dirname,
          '../mfe-design-system/src'
        ),
        '@miniecommerce-sysco/shared-types': path.resolve(
          __dirname,
          '../../libs/shared-types/src'
        ),
        '@miniecommerce-sysco/shared-code': path.resolve(
          __dirname,
          '../../libs/shared-code/src'
        ),
        '@miniecommerce-sysco/shared-api': path.resolve(
          __dirname,
          '../../libs/shared-api/src'
        ),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devServer: {
      port: 9000,
      historyApiFallback: true,
      hot: true,
      static: { directory: path.resolve(__dirname, 'public') },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        inject: 'body',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public/importmap.json'),
            to: 'importmap.json',
          },
        ],
      }),
    ],
  };
};
