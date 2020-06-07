<template>
    <div>
        <div class="header" v-show="catlogSwitch">
            <el-dropdown class="fb" trigger="click" @command="getBook">
                <el-button class="btn" type="text" icon="el-icon-notebook-2">选择书籍</el-button>
                <el-dropdown-menu slot="dropdown" class="h-scroll" style="max-height: 500px; overflow-y: scroll;">
                    <el-dropdown-item class="tip" v-for="(each,key) in books" :key=key :command="each.url">{{each.name}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button class="btn" style="margin-left: 20px" @click="tohome" type="text">目录</el-button>
            <el-button class="icon" type="text" icon="el-icon-zoom-in" @click="zoomIn"></el-button>
            <el-button class="icon" type="text" icon="el-icon-zoom-out" @click="zoomOut"></el-button>
        </div>
        <iframe id="reader" :src="url" frameborder="0"/>


        <el-button class="floatButton" icon="el-icon-s-fold" circle @click="showContent"></el-button>
        <!--        以下是非用户功能区    -->
        <watcher v-model="closeWin" :current="winWidth" :base="1450"></watcher>

    </div>
</template>

<script>
    export default {
        props: {
            winWidth: {
                type: Number
            },
        },

        data() {
            return {
                closeWin: true,
                catlogSwitch: false,

                font: {
                    size: 1
                },
                books: [
                    {
                        name: '《佛陀传》',
                        url: 'data/佛陀传/Text/text00002.html'
                    },
                    {
                        name: '《印光法师文钞》',
                        url: 'data/印光法师文钞/Text/text00000.html'
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

                ],

                url: "",
                urltemp: "",
            };
        },
        created() {
            this.url = "data/佛陀传/Text/text00002.html";
            this.urltemp = "data/佛陀传/Text/text00002.html"
        },
        updated() {
            // console.log("我刷新了")
        },
        methods: {
            showContent() {
                this.catlogSwitch = !this.catlogSwitch;
                // this.setPadding();
                // console.log("点击了一下")
            },


            tohome() {
                this.font.size = 1.1;
                this.getBook(this.urltemp).then(val => {
                    if (val) {
                        setTimeout(() => {
                            var docc = document.getElementById('reader').contentWindow.document;
                            // this.resetFront()
                        }, 1000);

                    }
                });

            },

            setPadding() {
                var docc = document.getElementById('reader').contentWindow.document;
                docc.body.style.padding = "0 10px";
            },

            getBook(url) {
                this.urltemp = url;
                //iframe 的地址不改变是不会刷新的
                this.url = this.urltemp + "?time=" + new Date().getTime();
                document.getElementById("reader").contentWindow.location.reload(true);
                return Promise.resolve(true);
            },

            zoomOut() {
                // console.log("字体缩小");
                var docc = document.getElementById('reader').contentWindow.document;
                let win = document.getElementById('reader').contentWindow;
                let element = this.getTopElement(docc);
                this.font.size -= 0.1;
                docc.body.style.fontSize = (this.font.size) + "em";
                this.scrollToElement(element, 80, win);
            },
            zoomIn() {
                let docc = document.getElementById('reader').contentWindow.document;
                let win = document.getElementById('reader').contentWindow;
                let element = this.getTopElement(docc);
                this.font.size += 0.1;
                docc.body.style.fontSize = (this.font.size) + "em";
                this.scrollToElement(element, 80, win);
            },


            getTopElement(docc) {
                let x = 100;
                let element = null;
                for (let i = 51; i < 500; i++) {
                    element = docc.elementFromPoint(x, i);
                    if (element.tagName === "H1" || element.tagName === "P") {
                        break;
                    }
                }
                return element;
            },


            scrollToElement(element, offset, win) {
                setTimeout(() => {
                    if (element) {
                        let pose = this.getElementTop(element) - offset;
                        win.scrollTo({
                            top: pose,
                        });
                    }
                }, 0);
            },


            getElementTop(element) {
                var actualTop = element.offsetTop;    //这是获取元素距父元素顶部的距离
                var current = element.offsetParent;   //这是获取父元素
                while (current !== null) {      //当它上面有元素时就继续执行
                    actualTop += current.offsetTop;   //这是获取父元素距它的父元素顶部的距离累加起来
                    current = current.offsetParent;//继续找父元素
                }
                return actualTop;
            },

            getScollPostion(document) {
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
        width: 100%;
        height: 94%;
        position: absolute;
    }

    .btn {
        font-size: 20px;
        padding: 0;
        line-height: 50px;
        font-weight: bold;
    }

    .tip {
        font-size: 16px;
        font-weight: bold;
        padding: 5px 10px;
    }

    .icon {
        margin-left: 30px;
        font-size: 25px;
        padding: 0;
        line-height: 50px;
    }

    .header {
        z-index: 1;
        width: 300px;
        height: 50px;
        position: fixed;
        top: 50px;
        right: 0;
        padding-right: 60px;
        border-radius: 10px;
        background-color: rgba(41, 41, 41, 0.12);
    }

    .floatButton {
        z-index: 2;
        font-size: 23px;
        position: fixed;
        right: 10px;
        top: 50px;
    }
</style>