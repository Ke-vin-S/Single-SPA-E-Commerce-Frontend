const path = require('path');

module.exports = (_, argv) => {
  const isDev = argv.mode === 'development';
  return {
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'miniecommerce-sysco-shared-types.js',
      libraryTarget: 'module',
      chunkFormat: 'module',
      publicPath: isDev ? 'http://localhost:9101/' : '/',
      clean: false,
    },
    experiments: { outputModule: true },
    devtool: isDev ? 'source-map' : 'hidden-source-map',
    resolve: { extensions: ['.ts', '.js'] },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
            compilerOptions: {
              declaration: false,
              declarationMap: false,
              emitDeclarationOnly: false,
            },
          },
        },
      ],
    },
    devServer: {
      port: 9101,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: false,
      liveReload: false,
      static: false,
      client: false,
      webSocketServer: false,
    },
  };
};
