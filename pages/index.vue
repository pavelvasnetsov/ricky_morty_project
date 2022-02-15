<template>
    <div class="index-page" style="width: 100%;">
        <EmptyList
            v-if="empty"
        />
            <a-spin
                :spinning="false"
                v-else
            >
                <MainTable
                    @changeLoading="loading = !loading"
                />
                <div class="index-page__pagination">
                    <a-pagination
                        v-if="total > 10 && !empty"
                        :default-current="currentPage"
                        :total="total"
                        @change="changePage"
                    />
                </div>
            </a-spin>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

import MainTable from '@/components/MainTable.vue'

import { mainPageStore } from '@/store';
import { IParams } from '~/types/entities/Params';
import EmptyList from '~/components/EmptyList.vue';

@Component({
    components: {
        MainTable,
        EmptyList
    },
})
export default class IndexPage extends Vue {

    get empty(): boolean {
        return mainPageStore.LISTISEMPTY;
    }

    get currentPage(): number {
        return mainPageStore.pagination.currentPage;
    }

    get total(): number {
        return mainPageStore.pagination.totalPages * 10;
    }

    get nowName(): string {
        return mainPageStore.NOWNAME;
    }

    get nowGender(): string {
        return mainPageStore.NOWGENDER;
    }

    get nowStatus(): string {
        return mainPageStore.NOWSTATUS;
    }

    // get loading(): boolean {
    //     return mainPageStore.LOADING;
    // }
    
    async changePage(page: number) {
        const params: IParams = {
            page: page,
        };

        if (this.nowName !== '') params.name = this.nowName;
        if (this.nowGender !== 'any') params.gender = this.nowGender;
        if (this.nowStatus !== 'any') params.status = this.nowStatus;

        await mainPageStore.LOAD_CHARACTERS_LIST(params);
    }
}
</script>

<style lang="less">
.index-page {

    &__pagination{
        display: flex;
        justify-content: space-around;
    }

    padding-bottom: 20px;
}
</style>
