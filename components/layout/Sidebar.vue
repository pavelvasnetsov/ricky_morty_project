<template>
    <div class="sidebar">
        <SearchInput
            v-model.trim="name"
            class="sidebar__input"
        />
        <RadioInput
            v-model="gender"
            class="sidebar__radio"
            :btnName="'Пол'"
            :radioItems="genders"
        />
        <RadioInput
            v-model="status"
            class="sidebar__radio"
            :btnName="'Статус'"
            :radioItems="statuses"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import SearchInput from '@/components/sidebar/SearchInput.vue';
import RadioInput from '@/components/sidebar/RadioInput.vue';

import { mainPageStore } from '@/store'

import { IParams } from '@/types/entities/Params'

interface radioItem {
        value: string;
        label: string;        
}

@Component({
    components: {
        SearchInput,
        RadioInput
    }
})
export default class Sidebar extends Vue {
    name: string = this.nowName;
    gender: string = this.nowGender;
    status: string = this.nowStatus;

    get genders(): Array<radioItem> {
        return [
            {
                value: 'any',
                label: 'Не выбрано'
            },
            {
                value: 'female',
                label: 'Женский'
            },
            {
                value: 'male',
                label: 'Мужской'
            },
            {
                value: 'genderless',
                label: 'Бесполый'
            },
            {
                value: 'unknown',
                label: 'Неизвестно'
            },
        ]
    };

    get statuses(): Array<radioItem> {
        return [
            {
                value: 'any',
                label: 'Не выбрано'
            },
            {
                value: 'alive',
                label: 'Жив'
            },
            {
                value: 'dead',
                label: 'Мертв'
            },
            {
                value: 'unknown',
                label: 'Неизвестно'
            },
        ]
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

    @Watch("name")
    async onNameChanged(newValue: string) {
        mainPageStore.SET_NOWNAME(newValue.toLowerCase());
        const params: IParams = newValue ? {
            page: 1,
            name: newValue.toLowerCase(),
        } : {
            page: 1
        };


        if (this.nowGender !== 'any') params.gender = this.nowGender;
        if (this.nowStatus !== 'any') params.status = this.nowStatus;

        await mainPageStore.LOAD_CHARACTERS_LIST(params);
    }

    @Watch("gender")
    async onGenderChanged(newValue: string) {
        mainPageStore.SET_NOWGENDER(newValue);
        const params: IParams = newValue !== 'any' ? {
            page: 1,
            gender: newValue,
        } : {
            page: 1
        };

        if (this.nowName !== '') params.name = this.nowName;
        if (this.nowStatus !== 'any') params.status = this.nowStatus;

        await mainPageStore.LOAD_CHARACTERS_LIST(params);
    }

    @Watch("status")
    async onStatusChanged(newValue: string) {
        mainPageStore.SET_NOWSTATUS(newValue);
        const params: IParams = newValue !== 'any' ? {
            page: 1,
            status: newValue,
        } : {
            page: 1
        };

        if (this.nowName !== '') params.name = this.nowName;
        if (this.nowGender !== 'any') params.gender = this.nowGender;

        await mainPageStore.LOAD_CHARACTERS_LIST(params);
    }

}
</script>

<style lang="less" scoped>
.sidebar{
    padding: 15px 25px;

    &__input{
        margin-bottom: 20px;
    }

    &__radio{
        margin-bottom: 15px;
    }
}
</style>