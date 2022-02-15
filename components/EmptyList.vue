<template>
    <div>
        <a-alert 
            message="Таких персонажей нет"
            type="warning"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
    components: {},
})
export default class EmptyList extends Vue {

}


</script>

<style lang="less" scoped>

</style>