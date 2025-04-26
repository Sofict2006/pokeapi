import axios from "axios"


export interface pokemon {
    name: string,
    sprite: string,
}

export const funcionApi = async() : Promise<pokemon> => {
    // Genera id paara pokemon
    const id = Math.floor(Math.random() * 151) + 1;
    const respuestaApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const {data} = respuestaApi;
    console.log(respuestaApi);

    let pokecosita: pokemon = {
        name: data.name, 
        sprite: data.sprites.other['official-artwork'].front_default
    }

    return pokecosita;

}