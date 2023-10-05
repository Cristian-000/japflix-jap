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
                listItem.classList.add("list-group-item","bg-dark","text-white","d-column", "off-canvas-top"); // off-canvas-top?
                listItem.innerHTML = `<h5>${movie.title}</h5>
                              <p>${movie.tagline}</p>
                              <p>Vote Average: ${movie.vote_average} &#9733;</p>`;
                            //agregar estrellas
                listItem.addEventListener("click", function () {
                    mostrarPeli(movie);
                });
                lista.appendChild(listItem);
            }); 
        });

    }
  // e_e n_n U.w.   d(-.O)b   d(#.#)b   d(//.o    o.\\)b     -(7w7)-  (-.-) ('-') \/\/\/\/\/(0w0)\/\/\/\/\/  *\(0_0)/* por genero, lo inclui mas arriba  movie.genres.name.toLowerCase().includes(searchTerm)
// 
   
  function mostrarPeli(movie) {
    const cualquiercosa = document.getElementsByTagName("header");
   cualquiercosa.innerHTML=
    `
    <div class="offcanvas offcanvas-start show" class="postion0" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
    
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasLabel">${movie.title}</h5>
  </div>

  <div class="offcanvas-body">
  <p>${movie.tagline}</p>
  </div>

  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>

</div>`;
    }
    
    // function mostrarPeli(movie) {
    //     // Mostrar el offcanvas con los detalles de la película
    //     const offcanvasLabel = document.getElementById("offcanvasLabel");
    //     const offcanvasBody = document.querySelector(".offcanvas-body");

    //     offcanvasLabel.textContent = movie.title;
    //     offcanvasBody.innerHTML = `<p>${movie.tagline}</p>`;
    //     offcanvas.classList.add("show");
    // }
});


