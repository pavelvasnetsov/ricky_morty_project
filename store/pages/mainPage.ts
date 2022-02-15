import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

import axios from 'axios';

import { ICharacter } from '~/types/pages/mainPage';
import { IPagination } from '~/types/entities/Pagination';
import { IParams } from '~/types/entities/Params';

@Module({
    name: 'pages/mainPage',
    stateFactory: true,
    namespaced: true,
})
export default class MainPage extends VuexModule {
    charactersList: Array<ICharacter> = [];
    pagination: IPagination = {
        totalPages: 0,
        currentPage: 1
    };
    favorites: Array<number> = [];

    nowName: string = localStorage.getItem('nowName') || '';
    nowGender: string = localStorage.getItem('nowGender') || '';
    nowStatus: string = localStorage.getItem('nowStatus') || '';

    listIsEmpty: boolean = localStorage.getItem('empty') === 'true';

    loading: boolean = false;

    get CHARACTERS_LIST() {
        return this.charactersList;
    }

    get PAGINATION() {
        return this.pagination;
    }

    get NOWNAME() {
        return this.nowName;
    }

    get NOWGENDER() {
        return this.nowGender;
    }

    get NOWSTATUS() {
        return this.nowStatus;
    }

    get LISTISEMPTY() {
        return this.listIsEmpty;
    }

    get FAVORITES() {
        return this.favorites;
    }

    get LOADING() {
        return this.loading;
    }

    @Mutation
    SET_NOWNAME(newName: string) {
        this.nowName = newName;
        localStorage.setItem('nowName', newName);
    }

    @Mutation
    SET_NOWGENDER(newGender: string) {
        this.nowGender = newGender;
        localStorage.setItem('nowGender', newGender);
    }

    @Mutation
    SET_NOWSTATUS(newStatus: string) {
        this.nowStatus = newStatus;
        localStorage.setItem('nowStatus', newStatus)
    }

    @Mutation
    SET_CHARACTERS_LIST(data: {
        pagination: IPagination;
        charactersList: Array<ICharacter>;
    }) {
        this.pagination = data.pagination;
        this.charactersList = data.charactersList;
    }

    @Mutation
    SET_LIST_IS_EMPTY(newValue: boolean) {
        this.listIsEmpty = newValue;
        localStorage.setItem('empty', newValue.toString());
    }

    @Mutation
    ADD_FAVORITE(newId: number) {
        this.favorites.push(newId);
    }

    @Mutation
    REMOVE_FAVORITE(id: number) {
        const position = this.favorites.indexOf(id);
        this.favorites.splice(position, 1);
    }
    
    @Mutation
    WRITE_FAVORITES(favorites: Array<number>) {
        this.favorites = favorites;
    }

    @Mutation
    SET_LOADING(newVal: boolean) {
        this.loading = newVal;
    }

    @Action({rawError: true})
    async LOAD_CHARACTERS_LIST(character: IParams) {
        this.SET_LOADING(true);

        await axios.get('https://rickandmortyapi.com/api/character', {
            params: character
        })
        .then(response => {
            this.SET_LIST_IS_EMPTY(false);
            const data = response.data;
            
            //@ts-ignore 
            const charsArr: Array<any> = data.results.map(item => {
                return {
                    id: item.id,
                    image: item.image,
                    name: item.name,
                    gender: item.gender,
                    status: item.status
                }
            })
    
            this.SET_CHARACTERS_LIST({
                pagination: {
                    totalPages: data.info.pages,
                    currentPage: character.page
                },
                charactersList: charsArr
            })
        })
        .catch(err => {
            if (err.response) {
                this.SET_LIST_IS_EMPTY(true);
            }
        })
        .finally(() => {
            this.SET_LOADING(false);
        });
    }
    
}