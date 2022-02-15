<template>
    <div>
        <a-layout 
            style="margin-right: 25px; background: white;"
        >
            <a-layout-sider theme="light" width="300" :style="{heightn: '100vh', position: 'fixed', left: 0}">
                <Sidebar/>
            </a-layout-sider>
            <a-layout style="margin-left: 300px; background: white;">
                <Nuxt />
            </a-layout>
        </a-layout>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Sidebar from '@/components/layout/Sidebar.vue';

@Component({
    components: {
        Sidebar
    },
})
export default class Default extends Vue {}
</script>


<style lang="less">
</style>
