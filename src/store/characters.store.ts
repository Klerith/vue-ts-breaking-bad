import { reactive } from 'vue';
import breakingBadApi from '@/api/breakingBadApi';
import type { Character } from '@/characters/interfaces/character';

interface Store {
    characters: {
        list: Character[];
        count: number;
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },
    ids: {
        list: {
            [id: string]: Character;
        };
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },

    // Métodos de Characters
    startLoadingCharacters: () => void;
    loadedCharacters: ( data: Character[] ) => void;
    loadCharactersFailed: ( error: string ) => void;

    // Métodos de Characters por IDs
    startLoadingCharacter: () => void;
    checkIdInStore: (id: string) => boolean;
    loadedCharacter: (character: Character) => void;
}

// Initial State
const characterStore = reactive<Store>({
    characters: {
        count: 0,
        errorMessage: null,
        hasError: false,
        isLoading: true,
        list: []
    },

    ids: {
        list: {},
        isLoading: false,
        hasError: false,
        errorMessage: null
    },

    // Métodos
    async startLoadingCharacters() {
        const { data } = await breakingBadApi.get<Character[]>('/characters');
        this.loadedCharacters( data );
    },
    loadedCharacters( data: Character[] | string ) {
        
        if ( typeof data === 'string' ) {
            return this.loadCharactersFailed('La respuesta no es un arreglo de personajes.')
        }

        const characters = data.filter( character => ![14, 17, 39].includes(character.char_id));
        
        this.characters = {
            count: characters.length,
            errorMessage: null,
            hasError: false,
            isLoading: false,
            list: characters,
        }
    },
    loadCharactersFailed( error: string ) {
        this.characters = {
            count: 0,
            errorMessage: error,
            hasError: true,
            isLoading: false,
            list: []
        }
    },

    // Métodos de Characters por IDs
    startLoadingCharacter(){
        this.ids = {
            ...this.ids,
            isLoading: true,
            hasError: false,
            errorMessage: null,
        }
    },
    checkIdInStore(id: string) {
        return !!this.ids.list[id];
    },
    loadedCharacter(character: Character) {
        this.ids.isLoading = false;
        this.ids.list[character.char_id] = character;
    }
});


characterStore.startLoadingCharacters();


export default characterStore;