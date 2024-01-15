if(carrito.length>0){

    var botonVaciar = document.createElement("button");
    botonVaciar.type = "button";
    botonVaciar.className = "botonVaciar";
    botonVaciar.id = "botonVaciar";
    botonVaciar.innerHTML = "Vaciar carrito";
    botonVaciar.addEventListener("click", function() {
        vaciarCarrito();
    });

document.body.appendChild(botonVaciar);


    var botonComprar = document.createElement("button");
botonComprar.type = "button";
botonComprar.className = "botonComprar";
botonComprar.id = "botonComprar";
botonComprar.innerHTML = "Comprar definitivamente";
document.body.appendChild(botonComprar);
}else{
    window.location.href = 'popular.html';

}




var mensajePedido="";



const cargaContenidoCarrito = async (idPeli,cantidadPeli) => {

    try {
        console.log(idPeli);
        console.log(cantidadPeli);


        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${idPeli}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`);
        console.log("estaremos aqui?");

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            console.log(cantidadPeli +" unidades de la película "+datos.title+"\n");
            mensajePedido+=cantidadPeli +" unidades de la película "+datos.title+"\n";
            console.log(mensajePedido);

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





























const btn = document.getElementById('botonComprar');
console.log(sessionStorage.getItem('email'));
btn.addEventListener('click', async function(event) {
    var prepararPedidoStr = sessionStorage.getItem('carrito');
    console.log("Contenido de 'carrito' en sessionStorage:", prepararPedidoStr);
    var prepararPedido = JSON.parse(prepararPedidoStr);
    console.log(prepararPedido[0][0]);
    
    for(let i=0;i<prepararPedido.length;i++){
        await cargaContenidoCarrito(prepararPedido[i][0], prepararPedido[i][1]);

    }
    
   event.preventDefault();

   btn.textContent = 'Comprando...';
   emailjs.send("service_o6x5yhr","template_2hju27i",{
    emailjs_name: sessionStorage.getItem('username'),
    emailjs_to: sessionStorage.getItem('email'),
    emailjs_email: "omarescamez@gmail.com",
    emailjs_message: mensajePedido,
    });
    btn.textContent = 'Compra realizada. Hemos mandado un email';
    mensajePedido="";
    comprar();
});



