<template>
    <div id="app">

        <router-view/>

        <div id="footer">

            <el-dropdown class="fb" trigger="click">
                <el-button class="btn" type="text" icon="el-icon-s-home">主页</el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <router-link class="tip" to="/">主页</router-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown class="fb" trigger="click">
                <el-button class="btn" type="text" icon="el-icon-film">视频</el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <router-link class="tip" to="/Video">视频列表</router-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown class="fb" trigger="click">
                <el-button class="btn" type="text" icon="el-icon-reading">阅读</el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <router-link class="tip" to="/Reader">最新增加</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link class="tip" to="/Book">其他阅读</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link class="tip" to="/Way">南部经典</router-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown class="fb" trigger="click">
                <el-button class="btn" type="text" icon="el-icon-document">需知</el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="tip">
                        <router-link class="tip" to="/Notice">布告</router-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>

    </div>
</template>

<style scoped>
    .fb {
        text-align: center;
        width: 25%;
    }

    .btn {
        font-size: 20px;
    }

    .tip {
        color: #008080;
        font-size: 20px;
        font-weight: bold;
        text-decoration: none;
        margin: 10px 5px;

    }

    #footer {
        width: 100%;
        max-width: 600px;
        height: 50px;
        background-color: black;
        color: dodgerblue;
        position: fixed;
        bottom: 0;
    }
</style>
