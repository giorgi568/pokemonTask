import { useEffect, useState, useRef } from 'react';
import { getRandomPokemon, getPokemon, getPokemonTypes } from './pokeFetchFn';
import getFormattedTime from './getFormattedTime';
import { useNavigate } from 'react-router-dom';

function Game() {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(false);
  const [pokemonType, setPokemonType] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timer, setTimer] = useState(480);
  const numberOfQuestions = 15;
  const correctAnswer = useRef(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    (async () => {
      // get pokemon data
      const randomPokemonRes = await getRandomPokemon();
      const pokemonRes = await getPokemon(randomPokemonRes[0].name);
      setPokemon(pokemonRes);
      // console.log(pokemonRes);

      // get type data
      let pokemonTypeRes = await getPokemonTypes();
      //injecting correct answer
      const random = Math.floor(Math.random() * pokemonTypeRes.length);
      const correctAnsw = { name: pokemonRes.types[0].type.name };
      let correctAnswerIsInOptions = false;
      pokemonTypeRes.forEach((type) => {
        if (type.name === correctAnsw.name) {
          correctAnswerIsInOptions = true;
        }
      });
      if (!correctAnswerIsInOptions) {
        pokemonTypeRes.splice(random, 1, correctAnsw);
      }
      setPokemonType(pokemonTypeRes);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNumber]);

  if (questionNumber === numberOfQuestions || timer <= 0) {
    return (
      <div className='result'>
        <p>you got {correctAnswer.current} questions right</p>
        <button onClick={() => navigate('/')}>Try Again</button>
      </div>
    );
  }

  return (
    <div className='content'>
      <h1>PokeTypes</h1>
      <p className='guess'>Guess the type of this pokemon</p>
      <div className='box'>
        <div className='sprites'>
          {pokemon !== false ? (
            <div>
              <img
                className='pokeImg'
                src={pokemon.sprites.front_default}
                alt=''
              />
              {pokemon.sprites.back_default && (
                <img
                  className='pokeImg'
                  src={pokemon.sprites.back_default}
                  alt=''
                />
              )}
            </div>
          ) : (
            <svg
              className='container'
              viewBox='0 0 40 40'
              height='40'
              width='40'
            >
              <circle
                className='track'
                cx='20'
                cy='20'
                r='17.5'
                pathLength='100'
                strokeWidth='5px'
                fill='none'
              />
              <circle
                className='car'
                cx='20'
                cy='20'
                r='17.5'
                pathLength='100'
                strokeWidth='5px'
                fill='none'
              />
            </svg>
          )}
        </div>

        <h3 className='name'>{pokemon.name}</h3>
        <div className='abilities'>
          <h4>Abilities</h4>
          <div className='abilitiesWrapper'>
            {pokemon !== false &&
              pokemon.abilities.map((ability, index) => {
                return <div key={index}>{ability.ability.name}</div>;
              })}
          </div>
        </div>
      </div>

      <div className='info'>
        <div className='timer'>
          <img src='/clock.png' alt='' />
          <span style={timer < 60 ? { color: 'red' } : {}}>
            {getFormattedTime(timer)}
          </span>
        </div>
        <div className='timer'>
          <img src='/tick.png' alt='' />
          <span>
            {numberOfQuestions}/{correctAnswer.current}
          </span>
        </div>
      </div>

      <div className='options'>
        {pokemonType !== false &&
          pokemonType.map((type, index) => {
            return (
              <button
                key={index}
                onClick={(e) => {
                  const correctTypes = [];
                  if (pokemon.types.length > 0) {
                    pokemon.types.forEach((type) => {
                      correctTypes.push(type.type.name);
                    });
                  }
                  pokemon.types.forEach((type) => {
                    if (type.type) {
                      if (type.type.name === e.target.innerText) {
                        correctAnswer.current = correctAnswer.current + 1;
                      }
                    }
                  });
                  setQuestionNumber(questionNumber + 1);

                  // so that old data dissapers until new is fetched
                  setPokemon(false);
                  setPokemonType([]);
                }}
              >
                {type.name}{' '}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default Game;
