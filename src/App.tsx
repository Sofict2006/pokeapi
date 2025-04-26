import { useState, useEffect } from 'react'
import { funcionApi } from './service/api';
import './App.css'


// Esto es una clase
function App() {


  const [pokemon, setpokemon] = useState({
    name: "esto sale si no cargó bien",
    sprite: "no ha cargado :c",
  });
  const [guess, setGuess] = useState("nada escrito aun");
  const [feedback, setFeedback] = useState("sin feedback todavia");
  const [score, setScore] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // Sonidito
  const whosThatPokemonSound = new Audio('/public/audiojiji.mp3');


  const retornaPokemon = async() => {
    const pokemonadivinar = await funcionApi();
    setpokemon(pokemonadivinar);
    setGuess('');
    setFeedback('');
    setIsRevealed(false);

    // Sonidito c:
    whosThatPokemonSound.play()
  }
  
  // Funcion asincrona q espera q cargue
  useEffect(() => {
    retornaPokemon()
  }, []) 

  // Manejar la adivinanza
  const adivinar = () => {

    const adivinanzaUsuario = guess.trim().toLowerCase();
    const nombreReal = pokemon.name.toLowerCase();

    if (adivinanzaUsuario === nombreReal) {
      setFeedback(`¡Correcto! Es ¡${pokemon.name}!`);
      setIsRevealed(true);
      setScore(score + 10);

      // Cargar un nuevo Pokémon automáticamente después de acertar
      setTimeout(() => {
        retornaPokemon();
      }, 1500); // Pequeño retraso para mostrar el feedback

    } else {
      setFeedback('Incorrecto :c Intenta de nuevo o prueba otro Pokémon.');
      setScore(score - 10);
    }
  };

  return (
    <>
      <div className="container">

        <div>
          {/* Esto carga la img*/}
          <div className="image-container">
            {/* Si la img no ha cargado sale un textito de cargando */}
            {pokemon.sprite !== "no ha cargado :c" ? (
              <img
                src={pokemon.sprite}
                alt="Pokémon Silueta"
                className="pokemon-image"
                style={{ filter: isRevealed ? 'none' : 'brightness(0)' }}
              />
            ) : (
              <p>Cargando...</p>
            )}
          </div>

          <p className="score">Puntos: {score === 0 ? 0 : score}</p>

        </div>

        <div className="text-container">

          <h1 className="title">Who's that Pokemon?</h1>

          <div className="button-container">
            
            {/* Esto es para q escriban el nombre de pokemon */}
            {/* Si lo q se ingresa es igual la valor por defecto entonces manda un string vacio a comparar, si no manda lo ingresado */}
            <input
              type="text"
              value={guess === "nada escrito aun" ? "" : guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Escribe el nombre del Pokémon"
              className="guess-input"
            />
            
            <button onClick={adivinar} className="guess-button">
              ¡Adivinar!
            </button>

          </div>

          <button onClick={retornaPokemon} className="new-pokemon-button">
              Nuevo Pokémon
            </button>

          {/* Si */}
          {feedback !== "sin feedback todavia" && (
            <p className={`feedback`}>
              {feedback}
            </p>
          )}

        </div>

        
      </div>
    </>
  )
}

export default App