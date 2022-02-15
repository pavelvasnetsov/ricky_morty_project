<template>
    <button 
        class="my-btn"
        @click="$emit('click')"
    ><slot></slot></button>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({})
export default class MyButton extends Vue {

}
</script>

<style lang="less" scoped>
.my-btn{
    width: 100%;
    height: 35px;
    background-color: #28A745;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    transition: 0.3s;

    &:hover{
        background-color: #218835;
        box-shadow: 0 0 5px 5px #98D9A8;
    }

    &:active{
        background-color: #1E7E34;
    }
}
</style>