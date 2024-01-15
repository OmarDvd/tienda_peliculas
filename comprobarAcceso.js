if (!sessionStorage.getItem('llave')) {
    window.location.href = 'index.html';
} else {
    console.log(sessionStorage.getItem('username'));
    var elementos = document.querySelectorAll(".nombreUsuario");

    elementos.forEach(element => {
        element.textContent = sessionStorage.getItem('username');
    });

}









