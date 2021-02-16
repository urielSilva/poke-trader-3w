const axios = require('axios');

const url_base = "https://pokeapi.co/api/v2/";

//-- Retornar de lista de todos os Pokemons
async function retornarLista()
{
    const response = await axios.get( 'https://pokeapi.co/api/v2/pokemon/' );
    return response.data;
}

//-- Retornar dados de apenas um Pokemon
async function retornarUm(id)
{
    const response = await axios.get( 'https://pokeapi.co/api/v2/pokemon/'+id );
    return response.data;
}

module.exports = { retornarLista, retornarUm };