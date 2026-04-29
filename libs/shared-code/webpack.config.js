const path = require('path');

module.exports = (_, argv) => {
  const isDev = argv.mode === 'development';
  return {
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'miniecommerce-sysco-shared-code.js',
      libraryTarget: 'module',
      chunkFormat: 'module',
      publicPath: isDev ? 'http://localhost:9102/' : '/',
      clean: false,
    },
    experiments: { outputModule: true },
    devtool: isDev ? 'source-map' : 'hidden-source-map',
    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
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
    externals: ['react', 'react-dom', /^@miniecommerce-sysco\//],
    devServer: {
      port: 9102,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: false,
      liveReload: false,
      static: false,
      client: false,
      webSocketServer: false,
    },
  };
};
