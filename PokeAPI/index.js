let offset = 0; // Para llevar el control de la página actual

// Selector de cantidad de pokemon
const select = document.querySelector('select');
[10, 30, 50].forEach(num => {
  select.appendChild(new Option(num, num));
});

// Evento para mostrar pokemon
select.addEventListener('change', () => {
  offset = 0; // Reseteamos la página cuando cambiamos la cantidad de pokemones
  fetchPokemon(select.value, offset);
});

// Obtener y mostrar pokemon
async function fetchPokemon(limit, offset) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    renderPokemon(data.results);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Renderizar tarjetas
function renderPokemon(pokemons) {
  const container = document.querySelector('.pokemon-container') || crearContenedor();
  container.innerHTML = '';
  pokemons.forEach(async (poke) => {
    const pokeData = await (await fetch(poke.url)).json();
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
      <img src="${pokeData.sprites.front_default}" alt="${poke.name}">
      <h3>${poke.name}</h3>
      <button class="details-button">Detalles</button>
    `;
    card.querySelector('.details-button').addEventListener('click', () => {
      window.location.href = `details.html?name=${poke.name}&weight=${pokeData.weight}&height=${pokeData.height}`;
    });
    container.appendChild(card);
  });
}

// Crear contenedor si no existe
function crearContenedor() {
  const container = document.createElement('div');
  container.className = 'pokemon-container';
  document.body.appendChild(container);
  return container;
}

// Crear botones de paginación
const prevButton = document.createElement('button');
prevButton.textContent = 'Anterior';
const nextButton = document.createElement('button');
nextButton.textContent = 'Siguiente';

document.body.appendChild(prevButton);
document.body.appendChild(nextButton);

// Función para actualizar la página
function updatePage(limit, newOffset) {
  fetchPokemon(limit, newOffset);
}

// Eventos para los botones de paginación
prevButton.addEventListener('click', () => {
  if (offset > 0) {
    offset -= parseInt(select.value); // Restamos el límite para retroceder
    updatePage(select.value, offset);
  }
});

nextButton.addEventListener('click', () => {
  offset += parseInt(select.value); // Sumamos el límite para avanzar
  updatePage(select.value, offset);
});

// Cargar automáticamente con el valor inicial
fetchPokemon(10, 0);
