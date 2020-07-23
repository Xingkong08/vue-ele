<template>
    <div>
        <div style="margin-top: 60px">
            <div style="text-align: center;font-size: x-large;font-weight: bold">网站声明</div>
            <p class="xuzhi">本站仅方便视频链接跳转和文档阅读使用。部分摘引的信息和资料，可能转载自其它网站，它们的版权属原作者或出版人所有。
                不代表本站故意侵犯原作者或出版人的版权和利益。</p>
        </div>

        <div class="h-box"><a target="_blank" href="http://www.cbeta.org/node/116">CBETA佛典集成</a></div>
        <div class="h-box"><a target="_blank" href="http://dhamma.sutta.org/index7.htm">南传佛教典籍</a></div>
        <div class="h-box"><a target="_blank"
                              href="https://pan.baidu.com/s/13kl0iSot6nSenWzQ96dxhw">佛陀_原音中字_提取码：6h3h</a></div>
    </div>
</template>

<script>
    export default {
        name: "Notice"
    }
</script>

<style scoped>
    .xuzhi {
        text-indent: 2em;
        line-height: 1.5em;
        font-size: large;
        padding: 0 20px;
    }

    .h-box {
        background-color: #e0e9d0;
        width: 200px;
        padding: 15px 10px;
        margin: 20px;
        display: inline-block;
        text-align: center;
        border-radius: 10px;
        box-shadow: 2px 2px 5px #b6b3ab;
    }

    a {
        color: black;
        font-weight: bold;
        display: block;
        text-decoration: none;
    }
</style>