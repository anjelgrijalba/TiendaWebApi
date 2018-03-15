$(function () {
    $('table').DataTable();

    var url1 = "/api/Productos" //controlador de la tienda
    var url2 = "/api/ProductoBackend" //controlador del backend
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
            $('table').DataTable();
        }
    });

    $('#btnUsuarios').click(function () {
        ocultarTodos();
        $usuarios.show();
        
    });

    $('a#inicioTienda').click(function (e) {
        e.preventDefault();
        window.location.href = 'index.html';
    });
   

});

function ProductoOK(productoes) {
    $.each(productoes, function (key, prod) {
        
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