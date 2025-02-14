// Obtener parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const weight = urlParams.get('weight');
const height = urlParams.get('height');

// Obtener detalles adicionales del Pokémon (incluyendo la imagen)
async function fetchPokemonDetails(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    // Mostrar los detalles del Pokémon
    displayPokemonDetails(data);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Mostrar detalles del Pokémon en la página
function displayPokemonDetails(pokemonData) {
  const detailsContainer = document.createElement('div');
  detailsContainer.className = 'pokemon-details';

  const detailsContent = `
    <h2>Detalles de ${pokemonData.name}</h2>
    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
    <p><strong>Peso:</strong> ${pokemonData.weight}</p>
    <p><strong>Altura:</strong> ${pokemonData.height}</p>
  `;

  detailsContainer.innerHTML = detailsContent;
  document.body.appendChild(detailsContainer);
}

// Cargar los detalles cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
  fetchPokemonDetails(name);
});
