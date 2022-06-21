let movies
let selectedGenres
let selectedYears = 0
let genres = document.querySelectorAll( 'input[name="genre"]' )
let preferedYears = document.querySelectorAll('input[name="year"]')
let sliderInput = document.getElementById("slider-input")
let outputMovie = document.querySelector( '#movie' ) 
let outputOriginalTitle = document.querySelector( '#originaltitle' ) 
let outputGenre = document.querySelector( '#genre' ) 
let outputDirector = document.querySelector( '#director' )
let outputYear = document.querySelector( '#year' )
let outputRuntimeMinutes = document.querySelector( '#runtimeMinutes' )
let outputRating = document.querySelector( '#rating' )


async function readJson () {
  const res = await fetch("imdb_dataset.json")
  const data = await res.json()
  movies = data
}
readJson()

for ( let genre of genres ) {
    // Ouve o evento de clique
    genre.addEventListener( 'input', selectedGenre )
  }

  //Cria uma lista com os gêneros selecionados pelo usuário
function selectedGenre(){
  selectedGenres = []
  for (let genre of genres){
    if (genre.checked) {
      selectedGenres.push(genre.value)
    }
  }
}

for ( let item of preferedYears) {
  item.addEventListener( 'input', selectedYear )
}


function selectedYear(){
selectedYears
for ( let item of preferedYears) {
  if (item.checked){
    selectedYears = item.value
  }
}
}



  //A partir dos gêneros selecionados, começa a filtrar entre os filmes possíveis
function filterGenres( movies ) {
  return movies.filter(movie => selectedGenres.includes(movie.genre))
}

  //Faz um novo filtro a partir da duração selecionada
function filterDuration( movies ) {
  let duration = parseInt( sliderInput.value )
  return movies.filter( movie => movie.runtimeMinutes <= duration )
}

  //Faz um novo filtro a partir da preferência de ano
function filterYear( movies ) {
  let year = parseInt ( selectedYears )
  return movies.filter( movie => movie.year >= year )
}

  //Seleciona um filme aleatório a partir do último array após os filtros
function pickRandom( movies ) {

  let max = movies.length
  let index = Math.floor( Math.random() * max )
  let movie = movies[ index ]

  return movie
}

  //Roda as funções de filtro e escolha aleatória
function filter( movies ) {

  movies = filterGenres( movies )
  movies = filterDuration( movies )
  movies = filterYear( movies )
  let movie = pickRandom( movies )

  return movie

}

// Mostra sugestão de filme após clicar no botão 'mostrar sugestão'
let suggestionButton = document.querySelector( '.show-suggestion-button' )
let showResult = document.querySelector( '.suggestion' )
let showNoResult = document.querySelector( '.no-suggestions' )

function showResults() {

  let movie = filter( movies )

  if ( movie ) {
    // Mostrar filme encontrado
    outputMovie.textContent = movie.title
    outputOriginalTitle.textContent = movie.originalTitle
    outputGenre.textContent = movie.genre
    outputDirector.textContent = movie.director
    outputYear.textContent = movie.year;
    outputRuntimeMinutes.textContent = movie.runtimeMinutes; 
    outputRating.textContent = movie.averageRating;
    let anchor = document.querySelector('#anchor');
    anchor.href = `https://www.justwatch.com/br/busca?q=${movie.originalTitle}`;
    showNoResult.style.display = 'none'
    showResult.style.display = 'initial'
    showResult.scrollIntoView({behavior: "smooth"});
  } else {
    // Mostra mensagem de erro caso o array esteja vazio
    showNoResult.style.display = 'initial'
    showNoResult.scrollIntoView({behavior: "smooth"});
    showResult.style.display = 'none'
  }

}

// Ouve pelo clique no botão
suggestionButton.addEventListener('click', showResults)

// Limpa checkboxes selecionadas ao clicar no botão 'remover filtros'
let clearButton = document.querySelector( '.clear-button' )

let reloadPage = () => {
  location.reload();
}

clearButton.addEventListener('click', reloadPage)

// Optei por substituir a função acima pela função de recarregar a página para zerar oa arrays

// Abaixo, uma função para selecionar todas as checkboxes e declarar a array com todos os gêneros disponíveis, já que não há um eventListener para obter quais caixas foram marcados
let selectButton = document.querySelector( '.select-all' )

function checkAllGenres() {
  selectedGenres = ['Ação', 'Animação', 'Aventura', 'Biografia', 'Comédia', 'Crime', 'Documentário', 'Drama', 'Fantasia', 'Horror', 'Mistério', 'Musical', 'Noir', 'Romance', 'Thriller', 'Western']
  let check = document.getElementsByTagName('input');
  for (let i=0; i<check.length;i++) {
      if(check[i].type=='checkbox') {
          check[i].checked=true;
      }
  }
}

selectButton.addEventListener('click', checkAllGenres)

// Código do slider que encontrei online

const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
    const range = wrap.querySelector(".range");
    const bubble = wrap.querySelector(".bubble");

    range.addEventListener("input", () => {
        setBubble(range, bubble);
    });

    setBubble(range, bubble);

})

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${10 - newVal * 0.15}px))`;
}
