<template>
    <div>{{this.screenWidth}}</div>
</template>

<script>
    export default {
        name: "WindowWatch",

        props: {
            value: {
                type: Boolean,
                default: false,
            },
            width: {
                type: Number,
                default: 600
            }
        },
        created() {
            this.screenWidth = document.body.clientWidth;
        },

        data() {
            return {
                screenWidth: 1000
            }
        },
        methods: {
            changeStatus() {
                this.$emit('input', this.changer)
            }
        },

        mounted() {
            //监听窗口改变
            window.onresize = () => {
                this.screenWidth = document.body.clientWidth;
                this.changeStatus();
            }
        },
        computed: {
            changer: {
                get() {
                    return this.screenWidth < this.width;
                }
            }
        },
    }

</script>
