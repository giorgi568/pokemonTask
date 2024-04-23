import { useEffect, useState } from 'react';

function Game() {
  const getRandomPokemon = async () => {
    try {
      const pokemonsFetch = await fetch('https://pokeapi.co/api/v2/pokemon');
      const pokemons = await pokemonsFetch.json();
      const randomNumber = Math.floor(Math.random() * 20);
      const randomPokemon = pokemons.results[randomNumber];
      return randomPokemon;
    } catch (err) {
      console.error(err);
    }
  };
  getRandomPokemon();
  // let pokemon = useRef('');
  const [pokemon, setPokemon] = useState(false);
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const name = await getRandomPokemon();
        const pokemonFetch = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.name}`
        );
        const pokemonToSet = await pokemonFetch.json();
        setPokemon(pokemonToSet);
        console.log(pokemon.sprites.front_default);
        return pokemon;
      } catch (err) {
        console.log(err);
      }
    };
    fetchPokemon();
    
    const getRandomOptions = async () => {
      try {
        let options = []
        for(let i = 0; i <= 3; i++){
          const typeRes = await fetch('https://pokeapi.co/api/v2/type');
          const type = await typeRes.json();
          console.log(type)
        }
      } catch (err) {
        console.log(err);
      }
    };
  }, []);
  return (
    <div className='box'>
      <h1>PokeTypes</h1>
      <p>Guess the type of this pokemon</p>
      <div className='gameBox'>
        <div className='sprites'>
          {console.log(pokemon)}
          {pokemon !== false && (
            <div>
              <img src={pokemon.sprites.front_default} alt='' />
              <img src={pokemon.sprites.back_default} alt='' />
            </div>
          )}
        </div>
        <h3 className='name'>{pokemon.name}</h3>
        <div className='abilities'>
          <h4>Abilities</h4>
          {pokemon !== false &&
            pokemon.abilities.forEach((ability) => {
              // console.log(ability.ability.name, 45555)
              return <div>{ability.ability.name}</div>;
            })}

          {console.log(pokemon.abilities)}
        </div>
      </div>
      <div className='options'></div>
    </div>
  );
}

export default Game;
