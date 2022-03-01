/*
 * @Author: sam
 * @Date: 2021-06-21 10:58:42
 * @LastEditTime: 2021-07-21 16:10:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bagels.2/config-overrides.js
 */

const { override, fixBabelImports, addWebpackAlias, addWebpackPlugin } = require('customize-cra');

const  UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// const HtmlWebpackPlugin = require('html-webpack-plugin');

// // 多页面打包 ---start
// const paths = require('react-scripts/config/paths');
// paths.appIndexJs = `${paths.appSrc}/pages/index.js`;
// paths.servedPath = './';
// /* config-overrides.js */
// const getEntryConfig = env => {
//     const arr = 'development' === env ? [require.resolve('react-dev-utils/webpackHotDevClient')] : [];
//     return entry => {
//         return [...arr, `${paths.appSrc}/pages/${entry}.js`];
//     };
// };

// const removePlugin = (plugins, name) => {
//     const list = plugins.filter(it => !(it.constructor && it.constructor.name && name === it.constructor.name));
//     if (list.length === plugins.length) {
//         throw new Error(`Can not found plugin: ${name}.`);
//     }
//     return list;
// };

// const genHtmlWebpackPlugin = env => {
//     const minify = {
//         removeComments: true,
//         collapseWhitespace: true,
//         removeRedundantAttributes: true,
//         useShortDoctype: true,
//         removeEmptyAttributes: true,
//         removeStyleLinkTypeAttributes: true,
//         keepClosingSlash: true,
//         minifyJS: true,
//         minifyCSS: true,
//         minifyURLs: true,
//     };
//     const config = Object.assign(
//         {},
//         { inject: true, template: paths.appHtml },
//         'development' !== env ? { minify } : undefined,
//     );
//     return entry => {
//         return new HtmlWebpackPlugin({
//             ...config,
//             chunks: ['vendors', `runtime~${entry}.html`, entry],
//             filename: `${entry}.html`,
//         });
//     };
// };

// const supportMultiPage = (config, env) => {
//     const list = ['index', 'login'];
//     config.entry = {};
//     config.plugins = removePlugin(config.plugins, 'HtmlWebpackPlugin');
//     const getEntry = getEntryConfig(env);
//     const getHtmlWebpackPlugin = genHtmlWebpackPlugin(env);
//     list.forEach(it => {
//         config.entry[it] = getEntry(it);
//         config.plugins.push(getHtmlWebpackPlugin(it));
//     });

//     if ('development' === env) {
//         config.output.filename = 'static/js/[name].bundle.js';
//     }
//     return config;
// };
// // 多页面打包 ---end

const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}

const findWebpackPlugin = (plugins, pluginName) => plugins.find(plugin => plugin.constructor.name === pluginName);

// 自定义 webpack
function overrideProcessEnv(value = {}) {
    return config => {
        const definePlugin = findWebpackPlugin(config.plugins, 'DefinePlugin')
        definePlugin.definitions['process.env'] = {
            ...value,
        };
        return config
    }
}

// 查看打包后各包大小
const addAnalyzer = () => config => {
    if (process.env.ANALYZER) {
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};

const addCustom = () => config => {
    let plugins = []

    config.plugins = [...config.plugins, ...plugins]
    return config
}


module.exports = override(
    // supportMultiPage,
    addCustom(),
    addWebpackPlugin(
        // 终端进度条显示
        new ProgressBarPlugin()
    ),
    addAnalyzer(),
    fixBabelImports("import", [
        {
        libraryName: "@material-ui/core",
        libraryDirectory: "esm",
        camel2DashComponentName: false
        }
    ]),
    // 注意是production环境启动该plugin
    process.env.NODE_ENV === 'production' && addWebpackPlugin(
        new UglifyJsPlugin({
        // 开启打包缓存
        cache: true,
        // 开启多线程打包
        parallel: true,
        uglifyOptions: {
        // 删除警告
        warnings: false,
        // 压缩
        compress: {
        // 移除console
        drop_console: true,
        // 移除debugger
        drop_debugger: true
        }
        }
        })
    ),
    // fixBabelImports('import', {
    //   libraryName: 'antd-mobile',
    //   style: 'css',
    // }),
    addWebpackAlias({
        '@': resolve('src')
    }),
    overrideProcessEnv({
        VCONSOLE: process.env.VCONSOLE
    })
);
