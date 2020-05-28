<template>
    <div>
        <div class="header">
            <el-dropdown class="fb" trigger="click" @command="getBook">
                <el-button class="btn" type="text" icon="el-icon-notebook-2">选择书籍</el-button>
                <el-dropdown-menu slot="dropdown" style="max-height: 500px; overflow-y: scroll;">
                    <el-dropdown-item class="tip" v-for="(each,key) in books" :key=key :command="each.url">{{each.name}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button class="btn" @click="tohome" type="text">回到目录</el-button>
            <el-button class="icon" type="text" icon="el-icon-zoom-in" @click="zoomIn"></el-button>
            <el-button class="icon" type="text" icon="el-icon-zoom-out" @click="zoomOut"></el-button>

        </div>
        <iframe id="reader" :src="url" frameborder="0"/>
    </div>
</template>

<script>
    export default {
        props: {
            //从父组件接收的参数
            bookUrl: String,
            words: {
                type: Array
            }
        },

        data() {
            return {
                font: {
                    size: 1
                },
                books: [
                    {
                        name: 'N0004 长部经典',
                        url: 'data/南部经典/N0004 长部经典/toc.xhtml'
                    },
                    {
                        name: 'N0005 中部经典',
                        url: 'data/南部经典/N0005 中部经典/toc.xhtml'
                    },
                    {
                        name: 'N0006 相应部经典',
                        url: 'data/南部经典/N0006 相应部经典/toc.xhtml'
                    },
                    {
                        name: 'N0007 增支部经典',
                        url: 'data/南部经典/N0007 增支部经典/toc.xhtml'
                    },
                    {
                        name: 'N0008 小诵经',
                        url: 'data/南部经典/N0008 小诵经/toc.xhtml'
                    },
                    {
                        name: 'N0009 法句经',
                        url: 'data/南部经典/N0009 法句经/toc.xhtml'
                    },
                    {
                        name: 'N0010 自说经',
                        url: 'data/南部经典/N0010 自说经/toc.xhtml'
                    },
                    {
                        name: 'N0011 如是语经',
                        url: 'data/南部经典/N0011 如是语经/toc.xhtml'
                    },
                    {
                        name: 'N0012 经集',
                        url: 'data/南部经典/N0012 经集/toc.xhtml'
                    },
                    {
                        name: 'N0013 天宫事经',
                        url: 'data/南部经典/N0013 天宫事经/toc.xhtml'
                    },
                    {
                        name: 'N0014 饿鬼事经',
                        url: 'data/南部经典/N0014 饿鬼事经/toc.xhtml'
                    },
                    {
                        name: 'N0015 长老偈经',
                        url: 'data/南部经典/N0015 长老偈经/toc.xhtml'
                    },
                    {
                        name: 'N0016 长老尼偈经',
                        url: 'data/南部经典/N0016 长老尼偈经/toc.xhtml'
                    },
                    {
                        name: 'N0017 譬喻经',
                        url: 'data/南部经典/N0017 譬喻经/toc.xhtml'
                    },
                    {
                        name: 'N0018 本生经',
                        url: 'data/南部经典/N0018 本生经/toc.xhtml'
                    },

                ],

                url: "",
                urltemp: "",
                drawer: false,
            };
        },
        created() {
            this.url = "data/南部经典/N0004 长部经典/toc.xhtml";
            this.urltemp = "data/南部经典/N0004 长部经典/toc.xhtml"
        },
        methods: {
            tohome() {
                this.font.size = 1.1;
                this.getBook(this.urltemp)
            },

            getBook(url) {
                this.urltemp = url;
                //iframe 的地址不改变是不会刷新的
                this.url = this.urltemp + "?time=" + new Date().getTime();
                document.getElementById("reader").contentWindow.location.reload(true);
                return Promise.resolve(true);
            },

            zoomOut() {
                console.log("字体缩小");
                var docc = document.getElementById('reader').contentWindow.document;
                let pos = this.ScollPostion(docc);
                let rate = pos.top / pos.height;

                var body = docc.body;
                this.font.size -= 0.1;
                body.style.fontSize = (this.font.size) + "em";
                // docc.getElementById('Chapter3_00007').scrollIntoView()

                pos = this.ScollPostion(docc);

                docc.documentElement.scrollTop = parseInt(rate * pos.height * 0.99);


            },
            zoomIn() {
                console.log("字体放大");

                var docc = document.getElementById('reader').contentWindow.document;
                let pos = this.ScollPostion(docc);
                let rate = pos.top / pos.height;

                var body = docc.body;
                this.font.size += 0.1;
                body.style.fontSize = (this.font.size) + "em";
                // docc.getElementById('Chapter3_00007').scrollIntoView()


                pos = this.ScollPostion(docc);

                docc.documentElement.scrollTop = parseInt(rate * pos.height * 0.995);


            },
            resetFront() {
            },
            ScollPostion(document) {
                var t, l, w, h;
                if (document.documentElement && document.documentElement.scrollTop) {
                    t = document.documentElement.scrollTop;
                    l = document.documentElement.scrollLeft;
                    w = document.documentElement.scrollWidth;
                    h = document.documentElement.scrollHeight;
                } else if (document.body) {
                    t = document.body.scrollTop;
                    l = document.body.scrollLeft;
                    w = document.body.scrollWidth;
                    h = document.body.scrollHeight;
                }
                return {
                    top: t,
                    left: l,
                    width: w,
                    height: h
                };
            }

        },

    };
</script>

<style scoped>

    #reader {
        width: 90%;
        height: 87%;
        padding: 0 5%;
        font-size: 50px;
        position: absolute;
        top: 40px;
        bottom: 80px;
    }

    .btn {
        margin-left: 15px;
        font-size: 20px;
        padding: 0;
        line-height: 40px;
        font-weight: bold;
    }

    .tip {
        color: #008080;
        font-size: 16px;
        margin: 10px 5px;
    }

    .icon {
        margin-right: 30px;
        font-size: 25px;
        float: right;
        padding: 0;
        line-height: 40px;
    }

    .header {
        /*background-color: white;*/
        width: 100%;
        height: 40px;
        position: fixed;
        top: 0;
        border-bottom: 1px solid gainsboro;
    }
</style>