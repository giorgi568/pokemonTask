export async function getRandomPokemon() {
  try {
    const randomNum = Math.floor(Math.random() * 1000);
    const pokemonRaw = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${randomNum}`
    );
    const pokemon = await pokemonRaw.json();
    if (pokemon.results) {
      return pokemon.results;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getPokemonTypes() {
  try {
    const randomNum = Math.floor(Math.random() * 16);
    const typeRaw = await fetch(
      `https://pokeapi.co/api/v2/type?limit=4&offset=${randomNum}`
    );
    const type = await typeRaw.json();
    if (type.results) {
      return type.results;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getPokemon(name) {
  try {
    const pokemonRaw = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await pokemonRaw.json();
    if (pokemon) {
      return pokemon;
    }
  } catch (err) {
    console.log(err);
  }
}
