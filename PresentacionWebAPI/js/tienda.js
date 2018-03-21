var p = {
    Id: "",
    Nombre: "",
    Precio: ""
};

"use strict";
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
var $lineaCarrito;
var $lineaFactura;

$(function () {

    url = "/api/Productos";
    carritoUsuario = cargarCarrito();
    if (!carritoUsuario) {
        carritoUsuario =
            {
                usuario:
                    {
                        Id: 1,
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
    $lineaCarrito = $('.lineaCarrito');
    $lineaFactura = $('.lineaFactura');

    $oferta.detach();  //borra la oferta original de modelo
    $lineaCarrito.detach();   //y la linea del carrito
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
    $ficha.hide();

    //suyo
    var idStr = $('#frmCarrito input[name=id]').val();
    var id = parseInt(idStr);
    var cantidad = $('#frmCarrito input[name=cantidad]').val();

    //$.getJSON('api/Productos/' + id, function (producto) {

   

    carritoUsuario = cargarCarrito();
    var repetido = false;
    var totalLinea;


    for (i = 0; i < carritoUsuario.productos.length; i++)
    {
        if (carritoUsuario.productos[i].producto.Id == id)
        {
            $lineaR = $('.lineaCarrito[data-id="' + id + '"]');
            var c = carritoUsuario.productos[i].cantidad += parseInt(cantidad);
            var linea = {
                producto: p,
                cantidad: c
            };
            $lineaR.find('td.cantidad').text(c);
            totalLinea = carritoUsuario.productos[i].producto.Precio * c;
            $lineaR.find('td.totalLinea').text(totalLinea);
            totalCarrito += carritoUsuario.productos[i].producto.Precio * parseInt(cantidad);
            $carrito.find('td.total').text(totalCarrito + ' euros');
            console.log('producto ya en carrito');
            repetido = true;
            break;
        }
    }
    if (!repetido)
    {
        var linea = {
            producto: p,
            cantidad: parseInt(cantidad)
        };

        $lineaCarrito = $lineaCarrito.clone();
        $lineaCarrito.attr("data-id", id);

        $lineaCarrito.find('td.nombre').text(p.Nombre);
        $lineaCarrito.find('td.cantidad').text(linea.cantidad);
        $lineaCarrito.find('td.precio').text(p.Precio + ' euros');
        totalLinea = p.Precio * linea.cantidad;
        $lineaCarrito.find('td.totalLinea').text(totalLinea);
        totalCarrito += totalLinea;
        $lineaCarrito.find('img.thumbnail').attr('src', 'fotos/' + p.Id + '.png').attr('height', '40px').attr('width', '40px');
        $carrito.find('td.total').text(totalCarrito + ' euros');

        $carrito.find('tbody').append($lineaCarrito);
       
        carritoUsuario.productos.push(linea);
    }
    guardarCarrito(carritoUsuario);
    $carrito = $('#carrito').show();
}

function facturarCarrito(e) {
    e.preventDefault();

    var carritoDTO = {};
    var carrito = cargarCarrito();
    carritoDTO.IdUsuario = carrito.usuario.Id;
    carritoDTO.IdsProductos = [];
    carritoDTO.CantidadesProductos = [];

    $.each(carrito.productos, function (clave, linea) {
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

    $lineaFactura = $lineaFactura.clone();

    //$.each(libroFacturas, function (clave, factura) {
        
    //});


    //foreach 
    //$lineaFactura.find('td.nombre').text(carrito.productos[i].);
    //$lineaFactura.find('td.cantidad').text(linea.cantidad);
    //$lineaFactura.find('td.precio').text(p.Precio + ' euros');
    //totalLinea = p.Precio * linea.cantidad;
    //$lineaFactura.find('td.totalLinea').text(totalLinea);
    //totalCarrito += totalLinea;
    //$lineaFactura.find('img.thumbnail').attr('src', 'fotos/' + p.Id + '.png').attr('height', '40px').attr('width', '40px');
    //$carrito.find('td.total').text(totalCarrito + ' euros');





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



preguntas:


donde declarar las varporque si las declaras dentro de una funcion sirven para todas


porque llama a push desde hallax ? que pasa con las factura que envia ?
    hago un get de factura o cojo los datos del carrito de la memoria ?
