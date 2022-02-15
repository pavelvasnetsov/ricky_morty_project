<template>
    <div class="radio">
        <div class="radio__btn">
            <MyButton 
                @click="show = !show"
            >{{ btnName }}</MyButton>
        </div>
        <div 
            class="radio__list"
            v-if="show"
        >
            <a-radio-group
                :value="value"
            >
                <a-radio
                    v-for="item in radioItems"
                    :key="item.value"
                    style="display: block"
                    :value="item.value"
                    @click="$emit('input', item.value)"
                    >{{ item.label }}</a-radio
                >
            </a-radio-group>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import MyButton from '@/components/UI/MyButton.vue';

interface radioItem {
    value: string;
    label: string;
}

@Component({
    components: {
        MyButton,
    },
})
export default class RadioInpit extends Vue {
    show: boolean = true;

    @Prop()
    radioItems!: Array<radioItem>;

    @Prop()
    btnName!: string;

    @Prop()
    value: string

}
</script>

<style lang="less" scoped>
.radio {
    border: 2px solid #dfdfdf;
    border-radius: 5px;
    overflow: hidden;

    &__btn {
        padding: 3px;
        background: #f7f7f7;
        border-bottom: 1px solid #dfdfdf;
    }

    &__list {
        padding: 20px;
    }
}
</style>