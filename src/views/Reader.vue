<template>
    <div>
        <div class="reader" v-bind:style="styleObject">
            <div v-html="contentHtml"></div>
        </div>

        <div v-show="toolSwitch">
            <div class="header">
                <div style="float: right">
                    <el-dropdown trigger="click" style="margin-right: 30px">
                        <el-button class="btn" type="text" icon="el-icon-notebook-2" :hide-on-click="true">选择书籍
                        </el-button>
                        <el-dropdown-menu slot="dropdown" ref="bookMenu">
                            <el-tree :data="ebookData" class="tree h-scroll" :highlight-current="true" :accordion="true"
                                     :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button class="icon" type="text" icon="el-icon-zoom-in" @click="zoomIn"></el-button>
                    <el-button class="icon" type="text" icon="el-icon-zoom-out" @click="zoomOut"></el-button>
                    <el-button v-show="false" class="icon" type="text" icon="el-icon-sunny"
                               @click="switchColor"></el-button>
                </div>
            </div>
            <div class="chapterContent h-scroll" ref="container" @mousewheel="myscroll">
                <h1 style="text-align: center">目录</h1>
                <div v-html="indexHtml"></div>
            </div>
        </div>

        <el-button v-show="closeWin" class="floatButton" icon="el-icon-s-fold" circle @click="showContent"></el-button>
        <!--        以下是非用户功能区    -->
        <watcher v-model="closeWin" :current="winWidth" :base="1450"></watcher>
        <watcher v-model="closeWin2" :current="winWidth" :base="800"></watcher>
    </div>
</template>

<script>
    export default {
        name: "Reader",
        props: {
            winWidth: {
                type: Number
            }
        },

        data() {
            return {
                closeWin: true,
                closeWin2: false,
                toolSwitch: true,

                // 当前所在书籍文件夹
                bookFolder: "",
                // 页面名称，如 text001.html
                contentPath: "",
                // 页面内容
                contentHtml: "",
                // 目录内容
                indexHtml: "",

                baseFontSize: 1.2,
                styleObject: {
                    fontSize: '1.2em',
                    backgroundColor: "",
                },

                ebookData: [],

                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },

        methods: {

            showContent() {
                this.toolSwitch = !this.toolSwitch;
            },

            //选择书籍
            handleNodeClick(data, node, obj) {
                let base = "data/ebook";
                if (!data.children) {
                    let bookUrl = data.contents ? base + data.contents : base + data.url;
                    this.getBook(bookUrl);
                    // 关闭功能
                    this.$refs.bookMenu.dropdown.visible = false;
                    if (this.closeWin) {
                        this.toolSwitch = false;
                    }
                }
            },

            //切换背景色
            switchColor() {
                if (this.styleObject.backgroundColor == "#161616") {
                    this.styleObject.color = "#161616";
                    this.styleObject.backgroundColor = "#fbfaf5";
                } else {
                    this.styleObject.backgroundColor = "#161616";
                    this.styleObject.color = "gainsboro";
                }
            },

            //字体放大
            zoomIn() {
                let element = this.getTopElement(document);
                this.baseFontSize += 0.05;
                this.styleObject.fontSize = this.baseFontSize + "em";
                this.scrollToElement(element, 50, window);
            },

            //字体缩小
            zoomOut() {
                let element = this.getTopElement(document);
                this.baseFontSize -= 0.05;
                this.styleObject.fontSize = this.baseFontSize + "em";
                this.scrollToElement(element, 50, window)
            },

            //切换章节
            async switchChapter(obj) {
                let id = obj.split("#")[1];
                let element = document.getElementById(id);
                if (obj.indexOf(this.contentPath) == -1) {
                    await this.getBook(this.bookFolder + obj.split("#")[0]);
                    element = document.getElementById(id);
                }
                if (element != null) {
                    element.scrollIntoView();
                    scrollBy(0, -50)
                }
                if (this.closeWin) {
                    this.toolSwitch = false;
                }
            },

            //加载书籍
            async getBook(url) {
                var patt = /(.*\/)/g;
                let modules = url.split(patt);
                let isSameBook = this.bookFolder === modules[1];
                this.bookFolder = modules[1];
                this.contentPath = modules[2];

                let html = await this.load(url);
                html = this.deleteHead(html);

                if (this.contentPath === "index.html") {
                    this.contentHtml = this.doReplace(html);
                    this.indexHtml = this.contentHtml;
                } else {
                    this.contentHtml = html;
                    if (!isSameBook) {
                        this.indexHtml = "<p style='text-align: center'>该文章还没有目录哦！</p>"
                    }
                }
                // 回到页面顶部
                window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = 0;
            },

            //初始化页面
            async initPage() {
                let json = await this.load("data/data.json");
                this.ebookData = json;
                await this.getBook("data/ebook/佛经选读/佛典选读.html");
            },


            //删除html头部
            deleteHead(html) {
                html = html.replace(/\r/g, "");
                html = html.replace(/\n/g, "");
                // var pa = /<p class="bodyPic"><img .*?<\/p>/g;
                var pa = /<img .*?>/g;
                var linkList = html.match(pa);
                html = html.replace(pa, ""); //删除图片
                var patt = /<!DOCTYPE .*?<\/head>/g;
                return html.replace(patt, "")
            },

            //标准化index.html
            doReplace(page) {
                let gg = JSON.stringify(page); //看内容神器
                let outPage = "";
                page = page.replace(/\n/g, ""); //去除换行
                page = page.replace(/\r/g, ""); //去除空格
                var patt = /<p.*?<a.*?<\/a>.*?<\/p>/g;
                var linkList = page.match(patt);
                if (linkList == null) return "发生错误";
                for (let i = 0; i < linkList.length; i++) {
                    var p = /<a href="(.*?)">(.*?)<\/a>/g;
                    var mdl = linkList[i].split(p);
                    var link = mdl[0] + "<a onclick=\"switchChapter('" + mdl[1] + "')\">" + mdl[2] + "</a>" + mdl[3];
                    outPage += link + "\r\n";
                }
                return outPage;
            },

            // 获取内容顶端的 h1、p元素
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

            // 跳转到元素 offset为y轴偏移
            scrollToElement(element, offset, win) {
                setTimeout(() => {
                    if (element) {
                        let pose = this.getElementTop(element) - offset;
                        win.scrollTo({
                            top: pose,
                            behavior: "smooth"
                        });
                    }
                }, 10);
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

            //监听滚动事件
            myscroll() {
                // let scrollTop = this.$refs.container.scrollTop;
                // let that = this;
                // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                // that.scrollTop = scrollTop
            },

            async load(url) {
                let param = {
                    accept: 'text/html, text/plain'
                };
                let temp = "";
                await this.$http.get(url, param).then((response) => {
                    temp = response.data;
                }).catch(() => {
                    temp = '加载失败';
                });
                return temp;
            },
        },

        watch: {
            closeWin(val, oldVal) {
                if (val) {
                    this.toolSwitch = false;
                    this.styleObject.marginRight = "0";
                } else {
                    this.styleObject.marginRight = "20%";
                    this.toolSwitch = true;
                }
            },
        },


        created() {
            //将方法注册成全局方法 （自己猜的）
            let _this = this;
            window.switchChapter = _this.switchChapter;
            this.initPage();
            // alert(window.innerHeight - 90)
            if (this.winWidth < 1400) {
                this.toolSwitch = false;
                this.styleObject.marginRight = "0";
            }
        },


        mounted: function () {
            //在mounted钩子函数绑定滚动条事件
            this.$refs.container.addEventListener('scroll', this.myscroll);
        }


    }
</script>

<style scoped>
    @import "../assets/ebook.css";

    .tree {
        max-height: 500px;
        overflow-y: scroll;
    }

    /deep/ .el-tree-node__label {
        /*color: #008080;*/
        font-size: 16px;
        line-height: 20px;
    }

    /deep/ .el-tree-node__content {
        font-weight: bold;
        padding: 6px 10px;
    }

    .reader {
        font-family: 宋体;
        margin-top: 40px;
        margin-right: 20%;
        padding: 0 20px;
    }


    .btn {
        font-size: 20px;
        padding: 0;
        line-height: 50px;
        font-weight: bold;
    }


    .icon {
        margin-right: 20px;
        font-size: 25px;
        padding: 0;
        line-height: 50px;
    }

    .header {
        width: 250px;
        height: 50px;
        position: fixed;
        top: 50px;
        right: 0;
        padding-right: 60px;
        background-color: rgba(251, 250, 245, 0.95);
        border-radius: 10px;
    }

    .chapterContent {
        z-index: 1;
        position: fixed;
        top: 120px;
        right: 0;
        height: 75%;
        width: 300px;
        overflow: auto;
        padding: 3px;
        background-color: #fbfaf5;
        border-radius: 10px;
        box-shadow: -2px 2px 5px #b6b3ab;
    }


    .floatButton {
        font-size: 23px;
        position: fixed;
        right: 10px;
        top: 50px;
    }
</style>