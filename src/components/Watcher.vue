<template>
    <div style="display: none">{{this.changer}}</div>
</template>

<script>
    export default {
        name: "Watcher",

        model: {
            prop: 'outVal',
            event: 'cc',
        },

        props: {
            outVal: {
                type: Boolean,
            },
            current: {
                type: Number,
            },
            base: {
                type: Number,
                default: 600
            }
        },

        computed: {
            changer: {
                get() {
                    this.$emit('cc', this.base > this.current);
                    return "";
                }
            }
        },
    }

</script>
