document.addEventListener("DOMContentLoaded", function () {
    // Cargar datos cuando la página se carga
    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then(response => response.json())
        .then(data => {
            mostrarListado(data)
        })
        .catch(error => console.error("Error al cargar los datos:", error));

    function mostrarListado(data) {
        // Guardar los datos para su posterior búsqueda
        const moviesData = data;

        // Función para mostrar películas basadas en la búsqueda del usuario
        document.getElementById("btnBuscar").addEventListener("click", function () {
            const searchTerm = document.getElementById("inputBuscar").value.toLowerCase();

            // Filtrar películas basadas en la búsqueda del usuario
            const filteredMovies = moviesData.filter(movie => {
                return (
                    movie.title.toLowerCase().includes(searchTerm) ||
                    movie.tagline.toLowerCase().includes(searchTerm) ||
                    movie.overview.toLowerCase().includes(searchTerm)
                );
            });

            // Mostrar resultados en el HTML
            const lista = document.getElementById("lista");
            lista.innerHTML = "";

            filteredMovies.forEach(movie => {
                const listItem = document.createElement("li");
                // listItem.classList.add("list-group-item", "bg-dark", "text-white", "d-column", "off-canvas-top");
                listItem.innerHTML = `<li class="list-group-item bg-dark" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"> <h5>${movie.title}</h5> 
                              <p>${movie.tagline}</p>
                              <p class="estrella">${generarEstrellas(movie.vote_average)}</p>
                              </li>`;
                listItem.addEventListener("click", function () {
                    mostrarPeli(movie);
                });
                lista.appendChild(listItem);
            });
            
           
        });

    }

    // e_e n_n U.w.   d(-.O)b   d(#.#)b   d(//.o    o.\\)b     -(7w7)-  (-.-) ('-') \/\/\/\/\/(0w0)\/\/\/\/\/  *\(0_0)/* por genero, lo inclui mas arriba  movie.genres.name.toLowerCase().includes(searchTerm)
   

   
});

function mostrarPeli(movie) {
    const offcanvasTitle = document.getElementById("offcanvasTopLabel");
    offcanvasTitle.textContent = movie.title;
    const offcanvasDescription = document.getElementById("offcanvaDescription");
    offcanvasDescription.textContent = movie.overview;
    const offcanvaCategories = document.getElementById("offcanvaCategories");
    movie.genres.forEach(genero=>{
        offcanvaCategories.innerHTML += `${genero.name} `;
    })
   

    const dropdown = `
    <div class="dropdown d-flex justify-content-end">
    <button class="btn btn-secondary dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
       More
    </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><p class="dropdown-item">Year: ${movie.release_date}</p></li>
      <li><p class="dropdown-item">Runtime: ${movie.runtime}</p></li>
      <li><p class="dropdown-item">Budget: ${movie.budget}</p></li>
      <li><p class="dropdown-item">Revenue: ${movie.revenue}</p></li>
      </ul>
    </div> `;
    
    offcanvaCategories.innerHTML += dropdown;
}


function generarEstrellas(calificacion) {
    var estrellasHTML = "";
    for (var i = 1; i <= 5; i++) {
        if (i <= calificacion/2) {
            estrellasHTML += '<span class="fa fa-star checked" id="estrella"></span>';
        } else {
            estrellasHTML += '<span class="fa fa-star" id="estrella"></span>';
        }
    }
    return estrellasHTML;
}
