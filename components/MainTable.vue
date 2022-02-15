<template>
    <div>
        <table class="table">
            <thead class="table__head">
                <tr class="table__row">
                    <th class="table__item" v-for="head in heads" :key="head">
                        {{ head }}
                    </th>
                </tr>
            </thead>
            <tbody class="table__body">
                <tr
                    class="table__row"
                    v-for="item in charactersList"
                    :key="item.id"
                >
                    <td class="table__item">
                        <img :src="item.image" alt="" height="100px" />
                    </td>
                    <td class="table__item">{{ item.name }}</td>
                    <td class="table__item">{{ item.gender }}</td>
                    <td class="table__item">{{ item.status }}</td>
                    <td class="table__item">
                        <MyButton
                            style="max-width: 100px"
                            @click="addFavorite(item)"
                            v-if="!isFavorite(item.id)"
                            >Добавить</MyButton
                        >
                        <MyButton
                            class="remove"
                            @click="removeFavorite(item)"
                            v-else
                            >Удалить</MyButton
                        >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import MyButton from '@/components/UI/MyButton.vue';

import { IParams } from '@/types/entities/Params';
import { ICharacter } from '@/types/pages/mainPage';

import { mainPageStore } from '@/store';

@Component({
    components: {
        MyButton,
    },
})
export default class MainTable extends Vue {
    heads: Array<string> = [
        'Изображение',
        'Имя',
        'Пол',
        'Статус',
        'В избранное',
    ];

    add: boolean = true;

    get charactersList() {
        return mainPageStore.CHARACTERS_LIST;
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

    isFavorite(id: number): boolean {
        return mainPageStore.FAVORITES.includes(id);
    }

    addFavorite(item: ICharacter): void {
        localStorage.setItem(item.id.toString(), 'true');
        mainPageStore.ADD_FAVORITE(item.id);
        this.$notification.success({
            message: 'Действие выполнено',
            description: `Персонаж ${item.name} был добавлен в избранное`,
        });
    }

    removeFavorite(item: ICharacter): void {
        localStorage.removeItem(item.id.toString());
        mainPageStore.REMOVE_FAVORITE(item.id);
        this.$notification.error({
            message: 'Удалено',
            description: `Персонаж ${item.name} был удален из избранного`,
        });
    }

    async mounted() {
        const params: IParams = {
            page: 1,
        };

        if (this.nowName !== '') params.name = this.nowName;
        if (this.nowGender !== 'any') params.gender = this.nowGender;
        if (this.nowStatus !== 'any') params.status = this.nowStatus;

        await mainPageStore.LOAD_CHARACTERS_LIST(params);

        mainPageStore.WRITE_FAVORITES(
            mainPageStore.CHARACTERS_LIST.reduce((acc, item) => {
                if (localStorage.getItem(item.id.toString())) {
                    //@ts-ignore
                    acc.push(item.id);
                }
                return acc;
            }, []),
        );
    }

    beforeUpdate() {
        mainPageStore.WRITE_FAVORITES(
            mainPageStore.CHARACTERS_LIST.reduce((acc, item) => {
                if (localStorage.getItem(item.id.toString())) {
                    //@ts-ignore
                    acc.push(item.id);
                }
                return acc;
            }, []),
        );
    }
}
</script>

<style lang="less" scoped>
.table {
    min-width: 100%;

    &__head {
        border-top: 1px solid #dee2e6;
        border-bottom: 1px solid #dee2e6;
        background-color: white;
    }

    &__row {
        display: flex;
        border-bottom: 1px solid #dee2e6;

        &:last-child {
            border: none;
        }
    }

    &__item {
        padding: 20px 10px;
        color: black;
        font-size: 16px;
        flex-basis: 20%;

        &:first-child {
            flex-basis: 133px;
        }

        &:nth-child(n) {
            align-self: center;
        }

        &:nth-child(2) {
            flex: 1 1 auto;
        }

        &:nth-child(3),
        &:nth-child(4) {
            flex-basis: 15%;
        }

        &:last-child {
            flex-basis: 20%;
        }
    }
}

.remove {
    background-color: #dc3545;
    max-width: 100px;

    &:hover {
        background-color: #dc3545;
        box-shadow: 0 0 5px 5px #f7a5b0;
    }

    &:active {
        background-color: #bc212e;
    }
}
</style>