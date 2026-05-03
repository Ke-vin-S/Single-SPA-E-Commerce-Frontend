const path = require('path');

module.exports = (_, argv) => {
  const isDev = argv.mode === 'development';
  return {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'miniecommerce-sysco-mfe-orders.js',
      libraryTarget: 'module',
      chunkFormat: 'module',
      publicPath: isDev ? 'http://localhost:9008/' : '/',
      clean: true,
    },
    experiments: { outputModule: true },
    devtool: isDev ? 'source-map' : 'hidden-source-map',
    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
    module: {
      rules: [
        { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      ],
    },
    externals: [
      'react',
      'react-dom',
      'react-redux',
      'single-spa',
      /^@miniecommerce-sysco\//,
      /^@shared\//,
    ],
    devServer: {
      port: 9008,
      headers: { 'Access-Control-Allow-Origin': '*' },
      historyApiFallback: true,
      hot: false,
      liveReload: false,
      client: false,
      webSocketServer: false,
    },
  };
};
