const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
const pokemonImg = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}`;

const generatePokemonPromisses = () => Array(150).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(response => response.json()));

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {

        let elementTypes = types.map(typeinfo => typeinfo.type.name);

        accumulator += `
            <li class="card ${elementTypes[0]}">
                <img class="card-image" alt="${name}" src="${pokemonImg(id)}.png">
                <h2 class="card-title">${id} . ${name}</h2>
                <p class="card-subtitle">${elementTypes.join(' | ')}</p>
            </li>
        `;
        return accumulator;
    }, '');

const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons;
};

const pokemonPromisses = generatePokemonPromisses();

Promise.all(pokemonPromisses)
    .then(generateHTML)
    .then(insertPokemonIntoPage);