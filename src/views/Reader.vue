<template>
    <div>
        <div class="header">

            <el-button class="btn" @click="drawer = true" type="text" icon="el-icon-collection"
                       style="margin-left: 16px;">目录
            </el-button>

            <el-dropdown class="fb" trigger="click" @command="getBook">
                <el-button class="btn" type="text" icon="el-icon-notebook-2" :hide-on-click="true">选择书籍</el-button>
                <el-dropdown-menu slot="dropdown">

                    <el-tree :data="ebookData" class="tree" :highlight-current="true" :accordion="true"
                             :props="defaultProps" @node-click="handleNodeClick"></el-tree>

                </el-dropdown-menu>
            </el-dropdown>

            <el-button class="icon" type="text" icon="el-icon-zoom-in" @click="zoomIn"></el-button>
            <el-button class="icon" type="text" icon="el-icon-zoom-out" @click="zoomOut"></el-button>
            <el-button class="icon" type="text" icon="el-icon-sunny" @click="switchColor"></el-button>
        </div>


        <el-drawer class="drawer" v-bind:style="styleObject" size="85%"
                   :visible.sync="drawer" direction="ltr" :show-close="false">
            <div slot="title" class="draw-title">
                <span class="title">目录</span>
                <span class="title">书签</span>
                <span class="title">笔记</span>
            </div>
            <div style="height: 650px;overflow-y: scroll" v-html="indexHtml"></div>
        </el-drawer>

        <div class="reader" v-bind:style="styleObject" ref="container" @mousewheel="myscroll">
            <div v-html="contentHtml"></div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "Reader",

        data() {
            return {
                bookFolder: "",
                contentPath: "",
                indexPath: "",
                chapterPosition: "",


                contentHtml: "",
                indexHtml: "",

                drawer: false,


                baseFontSize: 1.2,
                styleObject: {
                    fontSize: '1.2em',
                    backgroundColor: "white",
                },

                ebookData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }

            }
        },

        methods: {

            //选择书籍
            handleNodeClick(data, node, obj) {
                let file = "";
                let base = "data/";
                let path = "";
                path = this.getParentLabel(node, path);
                if (data.children == null) {
                    if (data.label.endsWith(".")) {
                        file = data.label + "html";
                        let url = base + path + file;
                        this.updateBook(url);
                    } else {
                        file = data.label + "/index.html";
                        let url = base + path + file;
                        this.getBook(url);
                    }
                    // let url = base + path + file;
                    // this.getBook(url);
                }


            },

            //用于获取书籍文件夹
            getParentLabel(node, path) {
                if (node.parent.parent == null) {
                    return path;
                } else {
                    path = node.parent.label + "/" + path;
                    return this.getParentLabel(node.parent, path)
                }
            },

            //切换背景色
            switchColor() {
                if (this.styleObject.backgroundColor == "black") {
                    this.styleObject.color = "black";
                    this.styleObject.backgroundColor = "white";
                } else {
                    this.styleObject.backgroundColor = "black";
                    this.styleObject.color = "gainsboro";
                }

            },
            //字体放大
            zoomIn() {
                this.baseFontSize += 0.05;
                this.styleObject.fontSize = this.baseFontSize + "em";
            },
            //字体缩小
            zoomOut() {
                this.baseFontSize -= 0.05;
                this.styleObject.fontSize = this.baseFontSize + "em";
            },

            //切换章节
            async switchChapter(obj) {
                // console.log(obj)
                if (obj.indexOf("data/") != -1) {
                    this.getBook(obj);
                    return;
                }
                let id = obj.split("#")[1];
                let pos = document.getElementById(id);
                if (obj.indexOf(this.contentPath) == -1) {
                    // console.log("加载新页面")
                    await this.updateBook(this.bookFolder + obj.split("#")[0])
                    // console.log(this.contentHtml)
                    pos = document.getElementById(id);
                    if (pos != null) {
                        pos.scrollIntoView();
                    }
                } else {
                    if (pos != null) {
                        pos.scrollIntoView();
                    }
                }

                this.drawer = false;
            },

            //监听滚动事件
            myscroll() {
                let scrollTop = this.$refs.container.scrollTop;
                // console.log(scrollTop)
            },

            //
            // pScroll() {
            //     pscroll.onscroll = pScroll;
            //     let pscroll = this.$refs.container
            //     var scrollTop = pscroll.scrollTop;//页面上卷的高度
            //
            //     var wholeHeight = pscroll.scrollHeight;//页面底部到顶部的距离
            //
            //     var pHeight = pscroll.clientHeight;//页面可视区域的高度
            //
            //     if (scrollTop + pHeight >= wholeHeight) {
            //         alert('我到底部了');
            //     }
            //     if (scrollTop == 0) {
            //         alert('我到顶部了')
            //     }
            // },


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

            //初始加载书籍
            async getBook(url) {
                // console.log(url)
                var patt = /(.*\/)/g;
                let mdl = url.split(patt);
                this.bookFolder = mdl[1];
                this.contentPath = mdl[2];
                this.indexPath = mdl[2];
                let html = await this.load(url);
                html = this.deleteHead(html);
                this.contentHtml = this.doReplace(html)
                this.indexHtml = this.contentHtml;

                this.$refs.container.scrollTop = 0;
                // this.$refs.container.scrollTop = 0;
                // document.body.scrollTop=document.documentElement.scrollTop=0
                // console.log("滚动到顶部")
                // document.body.scrollIntoView()
            },

            //初始化页面
            async initPage() {
                let json = await this.load("data/data.json");
                this.ebookData = json.ebook2;
                await this.getBook("data/长部/index.html");
            },

            //更新页面html
            async updateBook(url) {
                var patt = /(.*\/)/g;
                let mdl = url.split(patt);
                this.contentPath = mdl[2];
                let html = await this.load(url);
                this.contentHtml = this.deleteHead(html);
                this.$refs.container.scrollTop = 0;
            },

            //删除html头部
            deleteHead(html) {
                html = html.replace(/\r/g, "");
                html = html.replace(/\n/g, "");
                // var pa = /<p class="bodyPic"><img .*?<\/p>/g;
                var pa = /<img .*?>/g;
                var linkList = html.match(pa);
                // console.log(linkList)
                html = html.replace(pa, ""); //删除图片
                var patt = /<!DOCTYPE .*?<\/head>/g
                return html.replace(patt, "")
            },

            //标准化index.html
            doReplace(page) {
                let gg = JSON.stringify(page) //看内容神器
                let outPage = ""
                page = page.replace(/\n/g, "") //去除换行
                page = page.replace(/\r/g, "") //去除空格
                var patt = /<p.*?<a.*?<\/a>.*?<\/p>/g;
                var linkList = page.match(patt);
                if (linkList == null) return "发生错误";
                for (let i = 0; i < linkList.length; i++) {
                    var p = /<a href="(.*?)">(.*?)<\/a>/g
                    var mdl = linkList[i].split(p);
                    var link = mdl[0] + "<a onclick=\"switchChapter('" + mdl[1] + "')\">" + mdl[2] + "</a>" + mdl[3];
                    outPage += link + "\r\n";
                }
                return outPage;
            },
        },

        created() {
            //将方法注册成全局方法 （自己猜的）
            let _this = this;
            window.switchChapter = _this.switchChapter;
            this.initPage()
            // alert(window.innerHeight - 90)
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
        margin: 5px 10px;
        font-size: 20px;
        font-weight: bolder;
        max-height: 500px;
        overflow-y: scroll;
    }

    /deep/ .el-tree-node__label {
        font-size: 18px;
        font-weight: bold;
        /*color: #009d9d;*/
    }

    /deep/ .el-tree-node__content {
        margin: 8px 5px;
    }

    .draw-title {
        text-align: center;
        padding: 10px;
        border-bottom: 1px solid gainsboro;
    }

    .title {
        font-weight: bolder;
        font-size: 17px;
        margin: 0 20px;
        cursor: pointer;
        /*-webkit-user-select:none;*/
        /*user-select:none;*/
    }

    /deep/ .el-drawer__header {
        margin: 0;
        padding: 0;
        color: black;
    }

    .reader {
        margin: 40px 0 0 0;
        padding: 10px 20px;
        height: 630px;
        overflow-y: scroll;
    }

    .drawer {
        max-width: 700px;
    }


    .btn {
        margin-left: 15px;
        font-size: 20px;
        padding: 0;
        line-height: 40px;
        font-weight: bold;
    }


    .icon {
        margin-right: 30px;
        font-size: 25px;
        float: right;
        padding: 0;
        line-height: 40px;
    }

    .header {
        width: 100%;
        height: 40px;
        position: fixed;
        top: 0;
        border-bottom: 1px solid gainsboro;
    }

</style>