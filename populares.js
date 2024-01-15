
let ordenActual = "populares"; 















let pagina=1;
let elementosCargados = 0;

let observador = new IntersectionObserver(async (entradas, observador) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            document.getElementById('loader').style.display = 'flex';

            setTimeout(() => {
                document.getElementById('loader').style.display = 'none';
                cargarPeliculas();
            }, 1000);
        }
    });
}, {
    rootMargin: '0px 0px 200px 0px',
    threshold: 1.0
});

const cargarPeliculas = async () => {
    try {

        if(ordenActual==="populares"){
             respuesta = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&include_adult=false&include_video=false&language=en-US&page=${pagina}&sort_by=popularity.desc`);
        }else if(ordenActual==="menosPopulares"){
             respuesta = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&include_adult=false&include_video=false&language=en-US&page=${pagina}&sort_by=popularity.asc`);
        }else{
             respuesta = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&include_adult=false&include_video=false&language=en-US&page=${pagina}`);

        }

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            const peliculasNuevas = datos.results;

            peliculasNuevas.forEach(pelicula => {
                const peliculaHTML = `
                    <div class="pelicula" >
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                        <button type="button" id="${pelicula.id}" onClick="cargarDetalle(this.id)">Ver</button>
                    </div>
                `;



                if(ordenActual==="populares"){

                    document.getElementById('contenedor').innerHTML += peliculaHTML;
                    
                }else if(ordenActual==="menosPopulares"){

                    document.getElementById('contenedorN').innerHTML += peliculaHTML;
                }else{

                    document.getElementById('contenedorU').innerHTML += peliculaHTML;
       
               }
            });

            elementosCargados += peliculasNuevas.length;


            var peliculasEnPantalla;
            if(ordenActual==="populares"){
                 peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
            }else if(ordenActual==="menosPopulares"){
                 peliculasEnPantalla = document.querySelectorAll('.contenedorN .pelicula');
            }else{
                 peliculasEnPantalla = document.querySelectorAll('.contenedorU .pelicula');
   
           }


            const ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
            observador.observe(ultimaPelicula);

            pagina++;
        } else if (respuesta.status === 401) {
            console.log('Pusiste la llave mal');
        } else if (respuesta.status === 404) {
            console.log('La película que buscas no existe');
        } else {
            console.log('Hubo un error y no sabemos qué pasó');
        }
    } catch (error) {
        console.log(error);
    }
}

cargarPeliculas();
function ordenarMenosPopulares() {
    if(ordenActual!=="menosPopulares"){
        console.log("entro menos " + ordenActual);

        pagina=1;
    ordenActual = "menosPopulares";
    document.getElementById('lugar').innerHTML = "Películas menos populares";


    document.getElementById('contenedor').innerHTML = "";
    document.getElementById('contenedorU').innerHTML = "";

    cargarPeliculas();
    }

}

function ordenarMasPopulares() {
    if(ordenActual!=="populares"){
        console.log("entro más " + ordenActual);

    pagina=1;
    ordenActual = "populares";
    document.getElementById('lugar').innerHTML = "Películas más populares";

    document.getElementById('contenedorN').innerHTML = "";
    document.getElementById('contenedorU').innerHTML = "";

    cargarPeliculas();
    }

}

function ordenarProximosEstrenos() {
    if(ordenActual!=="proximosEstrenos"){
        console.log("entro proximo " + ordenActual);

    pagina=1;
    ordenActual = "proximosEstrenos";
    document.getElementById('lugar').innerHTML = "Próximos estrenos";

    document.getElementById('contenedor').innerHTML = "";
    document.getElementById('contenedorN').innerHTML = "";

    cargarPeliculas();
    }

}
