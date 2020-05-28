module.exports = {
    // runtimeCompiler: true,
    // publicPath: './',  //输出的根路径  默认是/ 如果你的网站是app.com/vue 这更改此配置项

    publicPath: './', //根路径
    outputDir: 'dist', //构建输出目录
    assetsDir: 'static', //静态资源目录（js，css，img，fonts）
    lintOnSave: false, //是否开启eslint保存检测，有效值： true||false||error
    devServer: {
        // host: '127.0.0.1',
        port: 80, //端口
        open: true, //启动是否打开
        https: false,
        // proxy: {
        //     //设置跨域
        //     '/api': {
        //         target: 'http//locathost:5000/api',
        //         ws: true,
        //     }
        // }
    },

};