const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const { HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    return {
        context: __dirname,
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "main.js",
            publicPath: "/"
        },
        devServer: {
            historyApiFallback: true,
            open: true,
            hot: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    include: path.resolve(__dirname, "src"),
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {importLoaders: 1}
                        },
                      "postcss-loader"
                    ],
                },
                {
                    test: /\.(png|j?g|svg|gif)?$/,
                    use: 'file-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                filename: "index.html"
            }),
            new HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: 'styles.css',
                chunkFilename: 'styles.css'
            }),
        ]
    }
};