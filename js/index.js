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
                listItem.innerHTML = `
                    <li class="list-group-item bg-dark text-white d-flex justify-content-between" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                        <div class="col-7">
                            <h5>${movie.title}</h5> 
                            <p class="text-secondary"><em>${movie.tagline}</em></p>
                        </div>
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
    const offcanvasDescription = document.getElementById("offcanvaDescription");
    const offcanvaCategories = document.getElementById("offcanvaCategories");
    const dropdown = document.getElementById("ul-dropdown-menu");

    offcanvasTitle.textContent = movie.title;
    offcanvasDescription.textContent = ` ${movie.overview}`;
    offcanvaCategories.textContent = movie.genres.map((genre) => ` ` + genre.name);

    dropdown.innerHTML = '';
    dropdown.innerHTML += `
      <li class="dropdown-item d-flex justify-content-between"><p>Year: </p><p> ${movie.release_date.substring(0, 4)}</p></li>
      <li class="dropdown-item d-flex justify-content-between"><p>Runtime: </p><p> ${movie.runtime} mins</p></li>
      <li class="dropdown-item d-flex justify-content-between"><p>Budget: </p><p> $${movie.budget}</p></li>
      <li class="dropdown-item d-flex justify-content-between"><p>Revenue:&nbsp;&nbsp; </p><p> $${movie.revenue}</p></li>`;
    ;
}


function generarEstrellas(calificacion) {
    var estrellasHTML = "";
    for (var i = 1; i <= 5; i++) {
        if (i <= calificacion / 2) {
            estrellasHTML += '<span class="fa fa-star checked" id="estrella"></span>';
        } else {
            estrellasHTML += '<span class="fa fa-star" id="estrella"></span>';
        }
    }
    return estrellasHTML;
}
