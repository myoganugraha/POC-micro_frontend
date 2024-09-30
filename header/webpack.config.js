const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

const deps = require("./package.json").dependencies;

const printCompilationMessage = require('./compilation.config.js');

const configs = {
  appName: "header",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3001/",
    CONTAINER_PATH: "container@http://localhost:3000/remoteEntry.js",
    PORT: 3001,
  },
  production: {
    PUBLIC_PATH: "http://localhost:3001/",
    CONTAINER_PATH: "container@http://localhost:3000/remoteEntry.js",
    PORT: 3001,
  },
};

module.exports = (_, argv) => ({
  output: {
    publicPath: configs[argv.mode].PUBLIC_PATH,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: configs[argv.mode].PORT,
    historyApiFallback: true,
    allowedHosts: "all",
    watchFiles: [path.resolve(__dirname, "src")],
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    onListening: function (devServer) {
      const port = devServer.server.address().port

      printCompilationMessage('compiling', port)

      devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage('failure', port)
          } else {
            printCompilationMessage('success', port)
          }
        })
      })
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: configs.appName,
      filename:  configs.appFileName,
      remotes: {
        container: configs[argv.mode].CONTAINER_PATH,
      },
      exposes: {
        './Components': './src/components/header.tsx'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
});
