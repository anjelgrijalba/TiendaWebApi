$(function () {
   
    var url1 = "/api/Productos" //controlador de la tienda
    var url2 = "/api/UsuariosEF" //controlador del backend usuarios
    var url3 = "/api/UsuariosLN" //controlador del backend usuarios

    ocultarTodos();
    $usuarios = $('#usuarios');
    $productos = $('#productos');

    $('#btnProductos').click(function (e) {
        e.preventDefault();
        ocultarTodos();
        $productos.show();
        if ($productos.find('tbody').hasClass("vacio"))
        {
            $productos.find('tbody').toggleClass('lleno vacio');
            $lineaProducto = $('#productito');
            $lineaProducto.detach();
            $.getJSON(url1, ProductoOK).fail(fallo);
        }
    });

    $('#btnUsuarios').click(function (e) {
        e.preventDefault();
        ocultarTodos();
        $usuarios.show();
        if ($usuarios.find('tbody').hasClass("vacio"))
        {
            $usuarios.find('tbody').toggleClass('lleno vacio');
            $nuevoUsuario = $('#cadaUsuario');
            $nuevoUsuario.detach();
            $.getJSON(url2, UsuariosOK).fail(fallo);
        }
        
    });

    $('a#inicioTienda').click(function (e) {
        e.preventDefault();
        window.location.href = 'index.html';
    });
   

});

function UsuariosOK(usuarios) {
    $.each(usuarios, function (key, us) {

        $nuevoUsuario = $nuevoUsuario.clone();
       
        $nuevoUsuario.find('td.nombre').text(us.Nick);
        $nuevoUsuario.find('td.apellido').text("Pérez " + us.Id);
        $nuevoUsuario.find('td.password').text(us.Contra);

        $usuarios.find('tbody').append($nuevoUsuario);

        console.log(key, us);
    });
}

function ProductoOK(productos) {
    $.each(productos, function (key, prod) {
        
        $lineaProducto = $lineaProducto.clone();
       
        $lineaProducto.find('img.thumbnail').attr('src', 'fotos/' + prod.Id + '.png').attr('height', '50').attr('width', '50');
        $lineaProducto.find('td.nombre').text(prod.Nombre);
        $lineaProducto.find('td.precio').text(prod.Precio);
        $lineaProducto.find('td.cantidad').text('ggdgdgd');

        $productos.find('tbody').append($lineaProducto);
        
        console.log(key, prod);
    });
}


function ocultarTodos() {
    $('section').hide();
}

function fallo(jqXHR, textStatus, errorThrown) {
    if (jqXHR.readyState === 0) {
        errorThrown = "ERROR DE CONEXIÓN";
    }

    console.log(jqXHR, textStatus, errorThrown);

    //$('#cuadroerror').show();
    //$('#textoerror').text(errorThrown);
}