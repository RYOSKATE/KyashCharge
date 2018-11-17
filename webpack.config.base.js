const path = require('path');                             // 絶対パスに変換するために
const htmlWebpackPlugin = require('html-webpack-plugin'); // index.htmlをビルドチェインの中で作っちゃう

const isProduction = process.env.NODE_ENV === 'prod';

module.exports = {
    entry: './src/index.tsx',  // エントリポイントの指定、src下に書いていくので　src/index.tsxにしとく
    mode: isProduction ? 'production' : 'development',
    module: {
        rules: [
            {                             // Linterを走らせる
                enforce: 'pre',           // ビルド前処理だよってこと
                loader: 'tslint-loader',  // tslint-loaderを使う
                test: /\.tsx?$/,          // tslint-loaderに渡すファイルの正規表現。xxx.tsとxxx.tsxの正規表現。
                exclude: [                // 渡さないファイル
                    /node_modules/
                ],
                options: {
                    fix: true,
                    typeCheck: true,  // これがないとtslint-config-airbnbが'no-boolean-literal-compare'エラーを出す。
                    emitErrors: true,      // これ設定しとくとTSLintが出してくれたwarningをエラーとして扱ってくれる、要するに-Wall
                    tsConfigFile: `tsconfig.${isProduction ? 'prod' : 'dev'}.json`,
                }
            },
            {
                test: /\.tsx?$/,
                exclude: [
                    /node_modules/
                ],
                use: [                 
                    {
                        loader: 'cache-loader',
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: require('os').cpus().length + 1,
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: `tsconfig.${isProduction ? 'prod' : 'dev'}.json`,
                            happyPackMode: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',//cssを<link>タグに展開する
                    'css-loader',//cssをjsにバンドルする
                ],
            },
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js','.json' ]    // importの時に、これらの拡張子は解決してもらえる、要するにHoge.tsxをimport Hoge from './Hoge'みたいに書ける
    },
    output: {
        filename: 'static/js/bundle.js',        // 仕上がりファイルの置き場
        path: path.resolve(__dirname, 'docs')   // 出力ディレクトリの指定の絶対パス
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "src/index.html"    // 同じ階層にあるindex.htmlを元に、デプロイ用のindex.htmlを作って出力ディレクトリに配置してくれる
        })
    ]
};
