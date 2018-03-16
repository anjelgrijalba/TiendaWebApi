var p = {
    Nombre: "",
    Id: "",
    Precio: ""
};
var lf = {
    Cantidad: 0,
    ProductoId: 0,
    FacturaId: 0
};

//var carrito = [{ idProducto: 1, cantidad: 5 }, { idProducto: 2, cantidad: 3 }]
//

//


$(function () {
    var totalCarrito = 0;
    var url = "/api/Productos";
    var carrito = JSON.parse(sessionStorage.getItem('carrito'));
    if (!carrito) {
        carrito =
            {
                usuario:
                    {
                        id: 1,
                        Nick: 'Angel',
                        Password: 'a'
                    },
                productos:
                    [
                        {
                            producto:
                                {
                                    Id: 1,
                                    Nombre: 'Producto 1',
                                    Precio: 10
                                },
                            cantidad: 5
                        }
                        {
                            producto:
                                {
                                    Id: 2,
                                    Nombre: 'Producto 2',
                                    Precio: 20
                                },
                            cantidad: 3
                        }
                    ]
            };
        sessionStorage.setItem('carrito', JSON.stringify('carrito', carrito));
    } else {

    }

    //Eventos botones
    $('#btnAumentarCantidad').click(function (e) {
        e.preventDefault();
        $('#cantidad').get(0).value++;
        //$('#cantidad').val($('#cantidad').val() + 1);
    });

    $('#btnReducirCantidad').click(function (e) {
        e.preventDefault();
        $('#cantidad').get(0).value--;
        //$('#cantidad').val($('#cantidad').val() + 1);
    });

    console.clear();
    $('#ficha, #carrito, #factura, #login').hide();

    $oferta = $('#productito');

    $ficha = $('#ficha');
    $index = $('#index');
    $ofertas = $('#ofertas');
    $factura = $('#factura');
    $login = $('#login');

    $oferta.detach();

    console.log($oferta);

    $.getJSON(url, ProductoOK).fail(fallo);  //rellena lista de productos
    $login.find('form')
    $('#frmCarrito').submit(formCarritoSubmit);
    //$('#frmCarrito').submit(function (e) {
    //    e.preventDefault();

    //    $('#ficha').hide();
    //    $('#carrito').show();
    //});
    $('#btnSeguir').click(function (e) {
        e.preventDefault();
        $('#ficha, #carrito, #factura, #login').hide();
        $ofertas.show();
        $index.show();
    });
    $('#btnFactura').click(facturarCarrito);
    //$('#btnFactura').click(function (e) {
    //    e.preventDefault();

    //    $('#carrito').hide();
    //    $('#factura').show();
    //});


});

function ProductoOK(productos) {

    //$ofertas.empty();

    $.each(productos, function (key, prod) {
        $oferta = $oferta.clone();

        $oferta.find('img.thumbnail').attr('src', 'fotos/' + prod.Id + '.png').attr('height', '235px').attr('width', '235px');
        $oferta.find('h3#nombre').text(prod.Nombre);
        $oferta.find('a#btnAddCarrito').data('id', prod.Id);
        $oferta.find('a#btnAddCarrito').prop('href', url + "/" + prod.Id).click(mostrarFicha);

        //$oferta.find('a#btnAddCarrito').attr("href", url + " / " + prod.Id);

        $ofertas.append($oferta);

        console.log(key, prod);
    });
}


function mostrarFicha(e) {
    e.preventDefault();

    $index.hide(); //fadeOut(2000); //slideUp(); //hide();
    $ofertas.hide();
    $ficha.show(); //fadeIn(2000); //slideDown(); //show();

    $.getJSON(this.href, function (prod) {
        //$.getJSON(url + "/" + prod.Id, function (prod) {
        p = {
            Nombre: prod.Nombre,
            Id: prod.Id,
            Precio: prod.Precio
        };

        $ficha.find('h2#etiqueta').text(p.Nombre);
        $ficha.find('img.thumbnail').attr('src', 'fotos/' + p.Id + '.png').attr('height', '235px').attr('width', '235px');
        $ficha.find('#precio').text(p.Precio + ' euros');
        //$ficha.find('input#id').val(prod.Id);
    });
}

function generarLinea(e) {
    e.preventDefault();
}


function formCarritoSubmit(e) {
    e.preventDefault();
    $ficha.hide();
    $carrito = $('#carrito').show();

    lf = {
        Cantidad: $('#cantidad').val(),
        ProductoId: $('input#id').val(),
        FacturaId: 0
    };

    $linea = $carrito.find('#lineaCarrito').clone();

    if ($linea.find('td.nombre').text() == 'Prueba') {
        $carrito.find('#lineaCarrito').detach();
    }

    $linea.find('td.nombre').text(p.Nombre);
    $linea.find('td.cantidad').text(lf.Cantidad);
    $linea.find('td.precio').text(p.Precio + ' euros');
    totalCarrito += p.Precio * lf.Cantidad;
    $linea.find('img.thumbnail').attr('src', 'fotos/' + p.Id + '.png').attr('height', '40px').attr('width', '40px');
    $carrito.find('td.total').text(totalCarrito + ' euros');

    $carrito.find('tbody').append($linea);
}

function facturarCarrito(e) {
    e.preventDefault();
    $carrito.hide();
    $factura.show();
}



function fallo(jqXHR, textStatus, errorThrown) {
    if (jqXHR.readyState === 0) {
        errorThrown = "ERROR DE CONEXIÓN";
    }

    console.log(jqXHR, textStatus, errorThrown);

    //$('#cuadroerror').show();
    //$('#textoerror').text(errorThrown);
}