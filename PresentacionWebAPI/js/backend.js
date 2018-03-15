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
        $('#productos').show();
        $.getJSON(url2, ProductoOK).fail(fallo);
        
        $('table').DataTable();

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
        $lineaProducto = $('#productito').clone();
        $lineaProducto.find('img.thumbnail').attr('src', 'fotos/' + prod.Id + '.png').attr('height', '50').attr('width', '50');
        $lineaProducto.find('td.nombre').text(prod.Nombre);
        $lineaProducto.find('td.precio').text(prod.Precio);
        $lineaProducto.find('td.cantidad').text('ggdgdgd');

        //$oferta.find('a#btnAddCarrito').attr("href", url + " / " + prod.Id);

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