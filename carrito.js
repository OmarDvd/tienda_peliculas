
var carritoString = sessionStorage.getItem('carrito');

var carrito = carritoString ? JSON.parse(carritoString) : [];
actualizaCarritoVista();





function anade(id) {
    console.log("entramos");
    const index = carrito.findIndex(element => element[0] === id);

    if (index === -1) {
        carrito.push([id, 1]);
    } else {
        carrito[index][1]++;
    }
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizaCarritoVista();



}



function quita(id) {
    console.log("pre "+carrito);
    const index = carrito.findIndex(element => element[0] === id);

    carrito.splice(index, 1);

    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizaCarritoVista();


    document.getElementById(`carritoTarjeta${id}`).remove();
    if(carrito.length<1){
        setTimeout(function() {
            window.location.href = 'popular.html';
        }, 1000);

    }



}

function sumaleUno(id) {

    const index = carrito.findIndex(element => element[0] === id);

    carrito[index][1]++;

    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizaCarritoVista();



    var cantidadH3 = document.getElementById(`cantidadDetalle${id}`);

    var cantidadActual = parseInt(cantidadH3.textContent.split(' ')[1]);

    cantidadH3.textContent = `Cantidad: ${cantidadActual + 1}`;


}

function restaleUno(id) {
    const index = carrito.findIndex(element => element[0] === id);

    if (carrito[index][1] === 1) {
        carrito.splice(index, 1);
        document.getElementById(`carritoTarjeta${id}`).remove();
        if(carrito.length<1){
            setTimeout(function() {
                window.location.href = 'popular.html';
            }, 1000);

        }

    } else {
        carrito[index][1]--;
        var cantidadH3 = document.getElementById(`cantidadDetalle${id}`);

        var cantidadActual = parseInt(cantidadH3.textContent.split(' ')[1]);
    
        
        cantidadH3.textContent = `Cantidad: ${cantidadActual - 1}`;
    }

    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizaCarritoVista();


}


function vaciarCarrito() {
    carrito = [];
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizaCarritoVista();

    var tarjetasCarrito = document.querySelectorAll('.carritoTarjeta');

    tarjetasCarrito.forEach(element => element.remove());
    setTimeout(function() {
        window.location.href = 'popular.html';
    }, 1000);

}




function actualizaCarritoVista() {
    var elementos = 0;
    elementos = carrito.length;
    var elementosCarrito = document.querySelectorAll(".botonCarrito");
    elementosCarrito.forEach(element => {
        element.textContent = "Carrito: " + elementos;
    });

    var elementosCarritoUL = document.querySelectorAll(".botonCarritoUL");
    elementosCarritoUL.forEach(element => {
        element.textContent = "Carrito: " + elementos;
    });

    return elementos;

}





function vercarrito() {
    window.location.href = 'carrito.html';
}




function comprar() {
    actualizaCarritoVista();

    setTimeout(function() {
        vaciarCarrito();
    }, 1000);
}
