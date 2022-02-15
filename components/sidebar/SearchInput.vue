<template>
    <div class="search">
        <div class="search__title">Поиск:</div>
        <div class="search__input"><a-input
            :value="value"
            @change="$emit('input', $event.target.value)"
            placeholder="Поиск по имени"
        /></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class SearchInput extends Vue {

    @Prop()
    value: number
}
</script>

<style scoped>
.search{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.search__title{
    margin-right: 5px;
    font-size: 16px;
}
.search__input{
    flex: 1 0 auto;
}
</style>