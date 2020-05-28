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
                        name: '《佛陀传》',
                        url: 'data/佛陀传/Text/text00002.html'
                    },
                    {
                        name: '《中阿含经》',
                        url: 'data/中阿含经/toc.xhtml'
                    },
                    {
                        name: '《古文观止》',
                        url: 'data/古文观止/text/part0000.html'
                    },
                    {
                        name: '《定慧之路》',
                        url: 'data/定慧之路/Text/TOC.xhtml'
                    },
                    {
                        name: '《中阿含—白话》',
                        url: 'data/中阿含_白话/zahj.html'
                    },
                    {
                        name: '《长阿含—白话》',
                        url: 'data/长阿含经_白话/cahj.html'
                    },
                    {
                        name: '《杂阿含—白话》',
                        url: 'data/杂阿含_白话/zahj.html'
                    },
                    {
                        name: '《增一阿含—白话》',
                        url: 'data/增一阿含_白话/zyahj.html'
                    },
                    {
                        name: '《佛遗教经》',
                        url: 'data/经/Text/佛遗教经.xhtml'
                    },
                    {
                        name: '《八大人觉经》',
                        url: 'data/经/Text/八大人觉经.xhtml'
                    },
                    {
                        name: '《大念处经》',
                        url: 'data/经/Text/大念处经.xhtml'
                    },
                    {
                        name: '《佛说稻芉经》',
                        url: 'data/经/Text/佛说稻芉经.xhtml'
                    },
                    {
                        name: '《印光法师文钞》',
                        url: 'data/印光法师文钞/Text/text00000.html'
                    },
                    {
                        name: '《人体使用手册》',
                        url: 'data/人体使用手册/Text/part0000.html'
                    },
                    {
                        name: '《十法界概述》',
                        url: 'data/十法界概述/Text/TOC.xhtml'
                    },

                ],

                url: "",
                urltemp: "",
                drawer: false,
            };
        },
        created() {
            this.url = "data/佛陀传/Text/text00002.html";
            this.urltemp = "data/佛陀传/Text/text00002.html"
        },
        updated() {
            console.log("我刷新了")
        },
        methods: {
            tohome() {
                this.font.size = 1.1;
                this.getBook(this.urltemp).then(val => {
                    if (val) {
                        setTimeout(() => {
                            // this.resetFront()
                        }, 0);

                    }
                });

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

                this.font.size -= 0.1;
                docc.body.style.fontSize = (this.font.size) + "em";
                // docc.getElementById('Chapter3_00007').scrollIntoView()

                pos = this.ScollPostion(docc);

                docc.documentElement.scrollTop = parseInt(rate * pos.height * 0.99);


            },
            zoomIn() {
                var docc = document.getElementById('reader').contentWindow.document;
                let pos = this.ScollPostion(docc);
                let rate = pos.top / pos.height;
                this.font.size += 0.1;
                docc.body.style.fontSize = (this.font.size) + "em";
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
                    top: t, left: l, width: w, height: h
                };
            }
        },

    };
</script>

<style scoped>

    #reader {
        max-width: 600px;
        width: 90%;
        height: 87%;
        /*padding: 0 5%;*/
        padding-left: 10px;
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