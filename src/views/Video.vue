<template>
    <div class="home">

        <p style="color: dodgerblue">点击标题展开视频列表</p>

        <div class="title" @click="dgj = !dgj">《佛说稻芉经》</div>
        <a v-show="dgj" href="https://mp.weixin.qq.com/s/8OXhYAlahCdNoVE0-xLSGg">佛说稻芉经(带字幕)</a>
        <a v-show="dgj" v-for="each in dgjList" :key=each.key :href="`${each.key}`">{{each.name}}</a>

        <div class="title" @click="amtj = !amtj">《阿弥陀经》要义</div>
        <a v-show="amtj" v-for="each in amtjList" :key=each.key :href="`${each.key}`">{{each.name}}</a>

        <div class="title" @click="wlsj = !wlsj">《无量寿经》要义</div>
        <a v-show="wlsj" v-for="each in wlsjList" :key=each.key :href="`${each.key}`">{{each.name}}</a>

        <div class="title" @click="ftzg = !ftzg">《佛陀》(国语中字)</div>
        <a v-show="ftzg" v-for="each in ftzgList" :key=each.key :href="`${each.key}`">{{each.name}}</a>
        <a v-show="ftzg" href="https://pan.baidu.com/s/13kl0iSot6nSenWzQ96dxhw">佛陀_原音中字下载_提取码：6h3h</a>

        <div class="title" @click="wcj = !wcj">《无常经》(音频)</div>
        <a v-show="wcj" v-for="each in wcjList" :key="each.key"
           :href="`http://dahangfashi.zbyt.net/mp3/02经论集/15无常经/无常经${each.key}.mp3`">无常经{{each.key}}</a>

        <div class="title" @click="xzzl = !xzzl">《玄奘之路》</div>
        <a v-show="xzzl" v-for="each in xzzlList" :key=each.url :href="`${each.url}`">{{each.name}}</a>

        <div class="title" @click="wym = !wym">《五百年来王阳明》</div>
        <a v-show="wym" href="https://www.bilibili.com/bangumi/play/ep308318">五百年来王阳明</a>

        <div class="title" @click="lfsx = !lfsx">《了凡四训讲解》</div>
        <a v-show="lfsx" v-for="each in lfsxList" :key=each.url :href="`${each.url}`">{{each.name}}</a>

        <div class="title" @click="lfmv = !lfmv">《了凡四训电视剧》</div>
        <a v-show="lfmv" v-for="each in lfmvList" :key=each.url :href="`${each.url}`">{{each.name}}</a>

        <div class="title" @click="dh = !dh">动画</div>
        <a v-show="dh"
           href="https://m.v.qq.com/play.html?vid=v08279huxba&ptag=v_qq_com%23v.play.adaptor%233&from=singlemessage&isappinstalled=0">释迦牟尼佛的故事一</a>
        <a v-show="dh"
           href="https://m.v.qq.com/play.html?vid=d0852bv0yva&ptag=v_qq_com%23v.play.adaptor%233&from=singlemessage&isappinstalled=0">释迦牟尼佛的故事二</a>
        <a v-show="dh"
           href="https://m.v.qq.com/play.html?vid=t0783wz53wo&ptag=v_qq_com%23v.play.adaptor%233&from=singlemessage&isappinstalled=0">金刚经的故事</a>

        <div class="footer"/>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        components: {},
        data() {
            const generateWuchang = _ => {
                const data = [];
                for (let i = 1; i <= 26; i++) {
                    let j = ''
                    if (i < 10) {
                        j = "0" + i;
                    } else {
                        j = "" + i;
                    }
                    data.push({
                        key: j,
                        name: `无常经 ${j}`,
                    });
                }
                return data;
            };


            return {
                wym: false,
                dh: false,
                dgj: false,
                dgjList: [],
                amtj: false,
                amtjList: [],
                wlsj: false,
                wlsjList: [],
                ftzg: false,
                ftzgList: ["MTUwOTU3MTM1", "MTUwOTU3MzM3", "MTUwOTU3NDg0", "MTUwOTU3NzAz", "MTUwOTU3ODkw", "MTUwOTU4MDA4",
                    "MTUwOTU4MDQ3", "MTUwOTU4MTI5", "MTUwOTU4MTc3", "MTUwOTU4MTc5", "MTUwOTU4NDg4", "MTUwOTU4NDky",
                    "MTUwOTU4NTA5", "MTUwOTU4Njgx", "MTUwOTU4NzI2", "MTUwOTU5Mzg4", "MTUwOTU5NTQy", "MTUwOTU5NTQ0",
                    "MTUwOTc2NDgx", "MTUwOTc2NTE4", "MTUwOTc2NTIz", "MTUwOTc2NTY4", "MTUwOTc2NTg3", "MTUwOTc2NzQ0",
                    "MTUxMDM5MzA3", "MTUwOTc2ODM0", "MTUwOTc2ODY2"],
                xzzl: false,
                xzzlList: [
                    {url: "https://www.mgtv.com/b/9329/4581703.html", name: "《玄奘之路》01"},
                    {url: "https://www.mgtv.com/b/9329/4581704.html", name: "《玄奘之路》02"},
                    {url: "https://www.mgtv.com/b/9329/4581705.html", name: "《玄奘之路》03"},
                    {url: "https://www.mgtv.com/b/9329/4581706.html", name: "《玄奘之路》04"},
                    {url: "https://www.mgtv.com/b/9329/4581707.html", name: "《玄奘之路》05"},
                    {url: "https://www.mgtv.com/b/9329/4581725.html", name: "《玄奘之路》06"},
                    {url: "https://www.mgtv.com/b/9329/4581726.html", name: "《玄奘之路》07"},
                    {url: "https://www.mgtv.com/b/9329/4581730.html", name: "《玄奘之路》08"},
                    {url: "https://www.mgtv.com/b/9329/4581743.html", name: "《玄奘之路》09"},
                    {url: "https://www.mgtv.com/b/9329/4581744.html", name: "《玄奘之路》10"},
                    {url: "https://www.mgtv.com/b/9329/4581745.html", name: "《玄奘之路》11"},
                    {url: "https://www.mgtv.com/b/9329/4581746.html", name: "《玄奘之路》12"}
                ],
                lfsx: false,
                lfsxList: [
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0Mjk2NDU0LnNodG1s.html", name: "了凡四训_讲解01"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0Mjk2NDUzLnNodG1s.html", name: "了凡四训_讲解02"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0Mjk2NDUyLnNodG1s.html", name: "了凡四训_讲解03"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0Mjk4NTg5LnNodG1s.html", name: "了凡四训_讲解04"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0Mjk4OTI2LnNodG1s.html", name: "了凡四训_讲解05"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzAzNDU3LnNodG1s.html", name: "了凡四训_讲解06"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzAzNDU2LnNodG1s.html", name: "了凡四训_讲解07"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzAzNDU4LnNodG1s.html", name: "了凡四训_讲解08"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzI4OTI4LnNodG1s.html", name: "了凡四训_讲解09"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzA1NDA4LnNodG1s.html", name: "了凡四训_讲解10"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzE3NDY0LnNodG1s.html", name: "了凡四训_讲解11"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzA4MTIyLnNodG1s.html", name: "了凡四训_讲解12"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzA4MjMzLnNodG1s.html", name: "了凡四训_讲解13"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzA4MjQ2LnNodG1s.html", name: "了凡四训_讲解14"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzExNzEyLnNodG1s.html", name: "了凡四训_讲解15"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzE3NDY1LnNodG1s.html", name: "了凡四训_讲解16"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzIxMzczLnNodG1s.html", name: "了凡四训_讲解17"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzIzMjM4LnNodG1s.html", name: "了凡四训_讲解18"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzI0OTI4LnNodG1s.html", name: "了凡四训_讲解19"},
                    {url: "https://tv.sohu.com/v/dXMvMTQ1MzU2MzAyLzU0MzE3NDY2LnNodG1s.html", name: "了凡四训_讲解20"},
                    {url: "https://www.iqiyi.com/w_19rtxnw859.html", name: "了凡四训_电影"},
                ],
                lfmv: false,
                lfmvList: [
                    {url: "https://v.youku.com/v_show/id_XMjI5ODMyNDA=.html", name: "了凡四训电视剧01"},
                    {url: "https://v.youku.com/v_show/id_XMjI5ODI4MjA=.html", name: "了凡四训电视剧02"},
                    {url: "https://v.youku.com/v_show/id_XMjI5ODc1NjA=.html", name: "了凡四训电视剧03"},
                    {url: "https://v.youku.com/v_show/id_XMjI5ODc2MjA=.html", name: "了凡四训电视剧04"},
                    {url: "https://v.youku.com/v_show/id_XMjI4MzI2MjQ=.html", name: "了凡四训电视剧05"},
                    {url: "https://v.youku.com/v_show/id_XMjI5Mjg1NjQ=.html", name: "了凡四训电视剧06"},
                    {url: "https://v.youku.com/v_show/id_XMjI5MzE5MDg=.html", name: "了凡四训电视剧07"},
                    {url: "https://v.youku.com/v_show/id_XMjI5MzM5NDg=.html", name: "了凡四训电视剧08"},
                    {url: "https://v.youku.com/v_show/id_XMjI5MzI3MzY=.html", name: "了凡四训电视剧09"},
                    {url: "https://v.youku.com/v_show/id_XMjI5MzQ3NzY=.html", name: "了凡四训电视剧10"},
                    {url: "https://v.youku.com/v_show/id_XMjI5Mzg3NDA=.html", name: "了凡四训电视剧11"},
                    {url: "https://v.youku.com/v_show/id_XMjI5Mzk5ODg=.html", name: "了凡四训电视剧12"},
                    {url: "https://v.youku.com/v_show/id_XMjI5Mzk4MzI=.html", name: "了凡四训电视剧13"},
                    {url: "https://v.youku.com/v_show/id_XMjI5NDIzMDg=.html", name: "了凡四训电视剧14"},
                    {url: "https://v.youku.com/v_show/id_XMjI5NDI3NDA=.html", name: "了凡四训电视剧15"},
                    {url: "https://v.youku.com/v_show/id_XMjI5NzIzNjg=.html", name: "了凡四训电视剧16"},
                    {url: "https://v.youku.com/v_show/id_XMTEwMjU0NjE2.html", name: "了凡四训电视剧17"},
                    {url: "https://v.youku.com/v_show/id_XMTkyMDg2OTc2.html", name: "了凡四训电视剧18"},
                    {url: "https://v.youku.com/v_show/id_XMTEwMjU1MjEy.html", name: "了凡四训电视剧19"},
                    {url: "https://v.youku.com/v_show/id_XMTkyMDI4MDM2.html", name: "了凡四训电视剧20"},
                    {url: "https://v.youku.com/v_show/id_XMTkyMDE4Njcy.html", name: "了凡四训电视剧21"},
                    {url: "https://v.youku.com/v_show/id_XMjI5Nzc2ODA=.html", name: "了凡四训电视剧22"},
                    {url: "https://v.youku.com/v_show/id_XMTkxOTQxMjcy.html", name: "了凡四训电视剧23"}
                ],
                wcj: false,
                wcjList: generateWuchang()
            }
        },
        methods: {
            getFtzgList() {
                let list = [];
                for (let i = 0; i < this.ftzgList.length; i++) {
                    let index = "" + (i * 2 + 1) + "-" + (i * 2 + 2);
                    let cope = {
                        key: "https://www.56.com/w11/play_album-aid-14492315_vid-" + this.ftzgList[i] + ".html",
                        name: "《佛陀》第" + index + "集"
                    };
                    list.push(cope)
                }
                this.ftzgList = list;
            },
            getVedioList(start, end, title, url, urlend) {
                let outList = [];
                for (let i = start; i <= end; i++) {
                    let key = url + i + urlend;
                    let j = i - start + 1;
                    if (j < 10) {
                        j = "0" + j
                    }
                    let name = title + j
                    outList.push({
                        key: key,
                        name: name
                    })
                }
                return outList;
            },
            initList() {
                this.wlsjList = this.getVedioList(4790, 4809, "《无量寿经》要义", "http://www.dahangfashi.com/newsshow.asp?classid=7&id=310&videoid=");
                this.amtjList = this.getVedioList(4740, 4747, "《阿弥陀经》要义", "http://www.dahangfashi.com/newsshow.asp?classid=7&id=302&videoid=");
                this.dgjList = this.getVedioList(4074, 4078, "佛说稻芉经", "http://www.dahangfashi.com/newsshow.asp?classid=6&id=265&videoid=");
            }
        },
        created() {
            this.getFtzgList();
            this.initList();
        }
    }
</script>

<style lang="scss" scoped>

    .home {
        text-align: center;
        padding-top: 50px;
    }

    .footer {
        margin: 0 0 20% 0;
    }


    a {
        color: darkblue;
        text-decoration: none;
        font-size: 20PX;
        display: inline-block;
        margin: 10px 0;
        width: 50%;
    }

    /*正常的未被访问过的链接*/
    a:link {
        text-decoration: none;
    }

    /*已经访问过的链接*/
    a:visited {
        text-decoration: none;
    }

    /*鼠标划过(停留)的链接*/
    a:hover {
        text-decoration: none;
    }

    /* 正在点击的链接，鼠标在元素上按下还没有松开*/
    a:active {
        text-decoration: none;
    }

    /* 获得焦点的时候 鼠标松开时显示的颜色*/
    a:focus {
        text-decoration: none;
    }

    .title {
        margin-top: 35px;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        color: #ff2c1d;
    }
</style>
