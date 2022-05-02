const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    // mode: "production",
    entry: {
        index: "./src/js/index.js",
        test: "./src/js/test.js",
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            chunks: ["index"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/test.html",
            filename: "test.html",
            chunks: ["test"],
        }),
    ],
};
