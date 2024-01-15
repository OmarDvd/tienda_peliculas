

const cargarContenido = async (id) => {

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`);

        console.log(respuesta);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
console.log(datos.title);
var peliculas = document.createElement('div');



const index = carrito.findIndex(element => element[0] ===  datos.id);
var cantidad=carrito[index][1];

                peliculas.innerHTML += `	<div class="carritoTarjeta" id="carritoTarjeta${datos.id}">

                        <img class="posterDetalle" src="https://image.tmdb.org/t/p/w500/${datos.poster_path}">
                        <h3 class="tituloDetalle">${datos.title}</h3>
                        <h3 class="cantidadDetalle" id="cantidadDetalle${datos.id}">Cantidad: ${cantidad}</h3>

                        <button type="button" onClick="sumaleUno(${datos.id})">Sumar uno</button>
                        <button type="button" onClick="restaleUno(${datos.id})">Quitar uno</button>
                        <button type="button" onClick="quita(${datos.id})">Elimina película</button>
                        <!--<button type="button" onClick="vaciarCarrito()">Vaciar todo</button>-->
                        
                    </div>
                `;
                var contenedorCarrito=document.querySelectorAll(".contenedorCarrito")[0];

                contenedorCarrito.appendChild(peliculas);





           

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


carrito.forEach(item => {
    cargarContenido(item[0]);
});














