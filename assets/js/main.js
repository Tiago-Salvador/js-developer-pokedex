document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemonList');
    const loadMoreButton = document.getElementById('loadMoreButton');
    let offset = 0;
    const limit = 10;

    function loadPokemons(offset, limit) {
        pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>
            `).join('');
            pokemonList.innerHTML += newHtml;
        });
    }

    loadMoreButton.addEventListener('click', () => {
        offset += limit;
        loadPokemons(offset, limit);
    });

    loadPokemons(offset, limit);
});
