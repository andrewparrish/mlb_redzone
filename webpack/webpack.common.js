const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: {
        // popup: path.join(__dirname, '../src/popup.ts'),
        options: path.join(__dirname, '../src/options.tsx'),
        background: path.join(__dirname, '../src/background.ts'),
        // content_script: path.join(__dirname, '../src/content_script.ts')
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },

    devtool: "sourcemap",

    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [
            {
                test: /^(?!.*\.spec\.ts$).*\.ts$/,
                use: 'ts-loader',
                exclude: [/node_modules/, /.+\.spec/]
            },
            { test: /\.tsx$/, loader: "awesome-typescript-loader"  },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader"  }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    plugins: [
        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
};
