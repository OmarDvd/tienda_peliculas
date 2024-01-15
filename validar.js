var llave = false;

function validar() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var nombreUsuario=document.getElementById("nombre").value;
    var email=document.getElementById("email").value;


    var formData = {
        username: username,
        password: password
    };

    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.token) {
                sessionStorage.setItem('username', nombreUsuario);
                sessionStorage.setItem('llave',true);
                sessionStorage.setItem('carrito', []);
                sessionStorage.setItem('email', email);

                

                window.location.href = 'popular.html';
            } else {
                console.error('Login fallido');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}









