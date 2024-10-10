//Gráfica

let arrayNombrePelis;
let arrayFechasPelis;
let arrayAnios;
async function pelisStarWars() {
  try {
    let response = await fetch('https://swapi.dev/api/films/');
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    let data = await response.json();
    let pelis = data.results;
    arrayNombrePelis = pelis.map(peli => peli.title);
    arrayFechasPelis = pelis.map(peli => peli["release_date"]);
    arrayAnios = arrayFechasPelis.map(elemento => elemento.slice(0, 4))
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}
async function graficaStarWars() {
  try {
    await pelisStarWars();
    new Chartist.Line('.ct-chart', {
      labels: arrayNombrePelis,
      series: [
        arrayAnios
      ]
    }, {
      fullWidth: true,
      chartPadding: {
        right: 40
      }
    });
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

graficaStarWars()


let arrayNombrePersonajes;
let numPelis;

async function personajesStarWars() {
  try {
    let response = await fetch('https://swapi.dev/api/people/');
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    let data = await response.json();
    let personajes = data.results;
    arrayNombrePersonajes = personajes.map(personaje => personaje.name);
    let arrayNumPelis = personajes.map(personaje => personaje.films);
    numPelis = arrayNumPelis.map(arrayPelis =>  arrayPelis.length);

  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}
async function graficaPersonajesStarWars() {
  try {
    await personajesStarWars();
    new Chartist.Bar('.ct-chart2', {
      labels: arrayNombrePersonajes,
      series: numPelis
    }, {
      distributeSeries: true
    });
    
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

graficaPersonajesStarWars()


