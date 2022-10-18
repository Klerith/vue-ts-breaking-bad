import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import type { Character } from '@/characters/interfaces/character';
import breakingBadApi from '@/api/breakingBadApi';

const characterSet = ref<{ [id: string]: Character }>({});
const hasError     = ref<boolean>(false);
const errorMessage = ref<string|null>(null);


const getCharacter = async( id: string ): Promise<Character> => {
    if ( characterSet.value[id] ) 
        return characterSet.value[id];
    
    try {
        const { data } = await breakingBadApi.get<Character[]>(`/characters/${ id }`);

        if ( data.length > 0 ) return data[0];
        
        throw new Error(`No se encontro un persona con el id ${ id }`);
        
    } catch ( error: any ) {
        throw new Error(error);
    }
}

const loadedCharacter = ( character: Character ) => {
    
    hasError.value     = false;
    errorMessage.value = null;

    characterSet.value[character.char_id] = character;
}

const loadedWithError = (error: string) => {
    hasError.value     = true;
    errorMessage.value = error;
}



const useCharacter = ( id: string ) => {
    
    const { isLoading } = useQuery(
        [ 'characters', id ],
        () => getCharacter(id),
        {
            onSuccess:loadedCharacter,
            onError: loadedWithError,
        }
    )   

    return {
        // Properties
        errorMessage,
        hasError,
        isLoading,
        list: characterSet,

        // Getters
        character: computed<Character | null>( () => characterSet.value[id] ),

        // Methods
        
    }
}


export default useCharacter;