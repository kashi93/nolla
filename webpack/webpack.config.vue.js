module.exports = () => {
  const path = require("path");
  const { VueLoaderPlugin } = require("vue-loader");
  return {
    entry: `${process.cwd()}/lib/resources/js/app.js`,
    output: {
      path: path.resolve(process.cwd(), "public"),
      filename: "app.js",
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["css-loader", "sass-loader"],
        },
        {
          test: /\.css$/i,
          use: ["vue-style-loader", "css-loader"],
        },
        {
          test: /\.m?(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-url-loader",
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    plugins: [new VueLoaderPlugin()],
  };
};
