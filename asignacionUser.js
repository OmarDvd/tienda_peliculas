
    var elementos = document.querySelectorAll(".nombreUsuario");

    elementos.forEach(element => {
        element.textContent = sessionStorage.getItem('username');
    });

