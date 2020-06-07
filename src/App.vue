<template>
    <div id="app">

        <div id="header">
            <span class="web-title">长夜安隐</span>

            <div style="float: right; margin-right: 10%" v-show="!closeWin">
                <span v-for="(each,index) in router" :key="index">
                    <router-link class="tip" :to="each.link">{{each.name}}</router-link>
                </span>
            </div>

            <div class="menu-btn">
                <el-dropdown trigger="click" v-show="closeWin">
                    <el-button type="text" class="menu-btn-in">菜单</el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(each,index) in router" :key="index">
                            <router-link class="tip2" :to="each.link">{{each.name}}</router-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <router-view class="per-page" :winWidth="win_width"/>

    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                router: [
                    {name: "主页", link: "/"},
                    {name: "视频列表", link: "/Video"},
                    {name: "阅读模块", link: "/Reader"},
                    {name: "其他阅读", link: "/Book"},
                    {name: "布告", link: "/Notice"},
                ],
                win_width: document.documentElement.clientWidth
            }
        },
        methods: {},
        created() {
        },
        mounted() {
            //监听窗口改变
            window.onresize = () => {
                return (() => {
                    this.win_width = document.documentElement.clientWidth;
                })()
            }
        },

        computed: {
            closeWin: {
                get() {
                    return this.win_width < 600;
                }
            }
        }

    }

</script>

<style scoped>
    .tip {
        color: #d0d0d0;
        font-size: 14px;
        font-weight: bold;
        margin: 0 15px;
        text-decoration: none;
        line-height: 40px;
    }

    .tip:hover, .web-title:hover {
        color: #ffffff;
    }

    .tip2 {
        color: black;
        font-size: 18px;
        font-weight: bold;
        line-height: 40px;
        text-decoration: none;
    }

    .menu-btn {
        float: right;
        margin-right: 10%;
    }

    .menu-btn-in {
        font-weight: bold;
        color: #d0d0d0;
        font-size: 17px;
    }

    .per-page {
        margin-top: 40px;
    }

    #header {
        width: 100%;
        z-index: 10;
        /*max-width: 600px;*/
        height: 40px;
        background-color: rgba(19, 19, 19, .99);
        position: fixed;
        top: 0;
    }

    .web-title {
        color: #d0d0d0;
        font-size: 20px;
        font-weight: bold;
        margin-left: 10%;
        line-height: 40px;
    }


</style>
