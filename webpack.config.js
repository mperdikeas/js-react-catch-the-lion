'use strict';
const path = require('path');

const APPDIR = 'app/';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, APPDIR, 'index.html'),
    filename: 'index.html',
    inject: 'body'
});

const config = {
    context: path.resolve(__dirname, APPDIR),
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve_I_AM_NOT_SURE_WHY_I_HAD_THAT_IT_DOESNT_SEEM_NECESSARY: {
        root: path.resolve('./build'),
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: [
                    path.resolve(__dirname, 'app/'),
                    path.resolve(__dirname, 'modules/')
                ]
            },{
                test: /\.css$/,
                loaders: ['style', 'css']
            },{
                test: /\.(png|jpg|jpeg|gif|woff)$/,
                loader: 'url-loader?limit=9999&name=[path][name].[ext]'
            },{
                test: /\.README$/, loader: 'null'
            }
        ]
    },
    plugins: [HTMLWebpackPluginConfig],
    node: {
        fs: 'empty'
    },
    node_README: 'https://github.com/josephsavona/valuable/issues/9'
};

module.exports = config;
