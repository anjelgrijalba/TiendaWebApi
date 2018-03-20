var p = {
    Id: "",
    Nombre: "",
    Precio: ""
};

'use strict';
var carritoUsuario;
var totalCarrito = 0;
var url;
var $ficha;
var $index;
var $ofertas;
var $factura;
var $login;
var $oferta;
var $carrito;

$(function () {

    url = "/api/Productos";
    carritoUsuario = cargarCarrito();
    if (!carritoUsuario) {
        carritoUsuario =
            {
                usuario:
                    {
                        id: 1,
                        Nick: 'Angel',
                        Password: 'a'
                    },
                productos:
                    [
                        //{
                        //    producto:
                        //        {
                        //            Id: 1,
                        //            Nombre: 'Producto 1',
                        //            Precio: 10
                        //        },
                        //    cantidad: 5
                        //},
                        //{
                        //    producto:
                        //        {
                        //            Id: 2,
                        //            Nombre: 'Producto 2',
                        //            Precio: 20
                        //        },
                        //    cantidad: 3
                        //}
                    ]
            };
        guardarCarrito(carritoUsuario);

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
    $carrito = $('#carrito');

    $oferta.detach();  //borra la oferta original de modelo

    console.log($oferta);

    $.getJSON(url, ProductoOK).fail(fallo);  //rellena lista de productos
    $login.find('form');
    $('#frmCarrito').submit(formCarritoSubmit);  //añadir a carrito
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

    $.getJSON(this.href, function (prod) {
        //$.getJSON(url + "/" + prod.Id, function (prod) {

        p = {
            Id: parseInt(prod.Id),
            Nombre: prod.Nombre,
            Precio: prod.Precio
        };

        $ficha.find('h2#etiqueta').text(p.Nombre);
        $ficha.find('img.thumbnail').attr('src', 'fotos/' + p.Id + '.png').attr('height', '235px').attr('width', '235px');
        $ficha.find('#precio').text(p.Precio + ' euros');
        $('#frmCarrito input[name=id]').val(p.Id);
        $('#frmCarrito input[name=cantidad]').val(1);

        //$ficha.find('input#id').val(prod.Id);
    });

    $index.hide(); //fadeOut(2000); //slideUp(); //hide();
    $ofertas.hide();
    $ficha.show(); //fadeIn(2000); //slideDown(); //show();
}

function generarLinea(e) {
    e.preventDefault();
}


function formCarritoSubmit(e) {
    e.preventDefault();

    //suyo
    var id = $('#frmCarrito input[name=id]').val();
    var cantidad = $('#frmCarrito input[name=cantidad]').val();


    //$.getJSON('api/Productos/' + id, function (producto) {

    var linea = {
        producto: p,
        cantidad: parseInt(cantidad)
    };

    carritoUsuario = cargarCarrito();
    var repetido = false;

    for (i = 0; i < carritoUsuario.productos.length; i++)
    {
        if (carritoUsuario.productos[i].producto.Id === ParseInt(id))
        {
            var c = carritoUsuario.productos[i].cantidad++;
            $lineaR = $('.lineaCarrito ')[i];
            $lineaR.find('td.cantidad').text(c);
            console.log('repetido');
            repetido = true;
            return;
        }
      
    }
    if (!repetido)
    {
        $linea = $carrito.find('.lineaCarrito').last().clone();
       
        if ($linea.find('td.nombre').text() === 'Prueba') {
            $carrito.find('.lineaCarrito').detach();
        }
        $linea.attr("data-id", id);
       

        $linea.find('td.nombre').text(p.Nombre);
        $linea.find('td.cantidad').text(linea.cantidad);
        $linea.find('td.precio').text(p.Precio + ' euros');
        totalLinea = p.Precio * linea.cantidad;
        $linea.find('td.totalLinea').text(totalLinea);
        totalCarrito += totalLinea;
        $linea.find('img.thumbnail').attr('src', 'fotos/' + p.Id + '.png').attr('height', '40px').attr('width', '40px');
        $carrito.find('td.total').text(totalCarrito + ' euros');

        $carrito.find('tbody').append($linea);
        carritoUsuario.productos.push(linea);
    }
    
    guardarCarrito(carritoUsuario);

    $ficha.hide();
    $carrito = $('#carrito').show();
}

function facturarCarrito(e) {
    e.preventDefault();

    var carritoDTO = {};
    var carrito = cargarCarrito();
    carritoDTO.IdUsuario = carrito.usuario.Id;
    carritoDTO.IdsProductos = [];
    carritoDTO.CantidadesProductos = [];

    $each(carrito.productos, function (clave, linea) {
        carritoDTO.IdsProductos.push(linea.producto.Id);
        carritoDTO.CantidadesProductos.push(linea.cantidad);
    });
    console.log(carritoDTO);
    $.ajax({
        url: 'api/Facturas',
        method: 'POST',
        data: JSON.stringify(carritoDTO),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (factura) {
        console.log(factura);
    }).fail(function () {
        alert('Ha habido un error al crear la factura en el servidor');
    });

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

function guardarCarrito(carrito) {
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    return JSON.parse(sessionStorage.getItem('carrito'));
}