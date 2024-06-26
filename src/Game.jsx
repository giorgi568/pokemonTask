import { useEffect, useState } from 'react';
import { getRandomPokemon, getPokemon, getPokemonTypes } from './pokeFetchFn';

function Game() {
  const [pokemon, setPokemon] = useState(false);
  const [pokemonType, setPokemonType] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  // useEffect(() => {
    const buildLevel = async () => {
      // get pokemon data
      const randomPokemonRes = await getRandomPokemon();
      const pokemon = await getPokemon(randomPokemonRes[0].name);
      console.log(pokemon);
      setPokemon(pokemon);

      // get type data
      // const pokemonTypeRes = await getPokemonTypes();
      // setPokemonType(pokemonTypeRes);
      // console.log(pokemonType);
    };
    buildLevel();
  }, [pokemon, pokemonType, questionNumber]);
  return (
    <div className='box'>
      <h1>PokeTypes</h1>
      <p>Guess the type of this pokemon</p>
      <div className='gameBox'>
        <div className='sprites'>
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
        </div>
      </div>
      <div className='options'></div>
    </div>
  );
}

export default Game;
