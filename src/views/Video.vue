<template>
    <div class="home">

        <div class="h-video" v-for="(each,index) in videoData" :key="index" @click="showList(each)">
            <div class="vlink">{{each.label}}</div>
        </div>

        <div v-show="dialogVisible" class="container-episode">
            <div class="title">{{video.label}}</div>

            <img class="img" src="../assets/h-close.png" @click="handleClose" alt="">
            <div class="episode" v-for="(each,index) in video.mvs" :key=index @click="openWin(each.url)">
                {{each.episode}}
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Home',
        props: {
            winWidth: {
                type: Number
            }
        },
        data() {
            return {
                videoData: [],
                video: {},
                dialogVisible: false,
            }
        },
        methods: {
            openWin(url) {
                window.open(url);
            },

            showList(obj) {
                this.video = obj;
                this.dialogVisible = true;
            },

            handleClose() {
                this.video = {};
                this.dialogVisible = false;
            },

            async loadData() {
                let json = await this.load("data/video.json");
                this.videoData = json;
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
        computed: {
        },
        created() {
            this.loadData();
        }
    }
</script>

<style lang="scss" scoped>

    .home {
        text-align: center;
    }

    .h-video {
        background-color: #309399;
        width: 37%;
        max-width: 162px;
        height: 100px;

        padding: 10px;
        margin: 10px;
        display: inline-table;
        border-radius: 10px;
        box-shadow: 5px 5px 5px #a5a29a;

        color: #e4e7ed;
        font-weight: bold;
        font-size: large;

        transition: all 0.3s; /*图片放大过程的时间*/
        position: relative;
    }

    .h-video:hover {
        cursor: pointer;
        background-color: #226369;
        color: #f0f0f0;
        transform: scale(1.15); /*以y轴为中心旋转*/
    }

    .h-video .vlink {
        padding-top: 10px;
    }

    .container-episode {
        z-index: 10;
        width: 90%;
        max-width: 500px;
        min-height: 200px;
        overflow: auto;
        background-color: #2a2a2a;
        padding: 15px 5px;

        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);

    }

    .container-episode .img {
        cursor: pointer;
        width: 25px;
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .container-episode .img:hover{
        width: 27px;
    }

    .container-episode .title {
        font-weight: bold;
        color: white;
        font-size: large;
        margin-bottom: 10px;
    }

    .episode {
        cursor: pointer;
        color: white;
        font-weight: bold;
        font-size: large;
        width: 50px;
        padding: 10px;
        margin: 5px;
        background-color: #3399ff;
        display: inline-block;
    }

    .episode:hover {
        background-color: #3a3a3a;
    }

</style>
