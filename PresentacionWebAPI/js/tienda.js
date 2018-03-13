$(function () {
   

   // Cambios de pantalla
    $('#btnAddCarrito').click(function (e) {
        
        alert($(this).data('id'));
        $('#index').hide(); //fadeOut(2000); //slideUp(); //hide();
        $('#ficha').show(); //fadeIn(2000); //slideDown(); //show();
    });

    $('#frmCarrito').submit(function (e) {
        e.preventDefault();

        $('#ficha').hide();
        $('#carrito').show();
    });

    $('#btnFactura').click(function (e) {
        e.preventDefault();

        $('#carrito').hide();
        $('#factura').show();
    });

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
});

var url = "/api/Productos";

$(function () {
    console.clear();
    $('#ficha, #carrito, #factura, #login').hide();

    $oferta = $('#productito');

    $ficha = $('#ficha');

    $oferta.detach();

    console.log($oferta);

    $.getJSON(url, ProductoOK).fail(fallo);  //rellena lista de productos
    
      
});

function ProductoOK(productos) {
    $ofertas = $('#ofertas');

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
   // e.preventDefault();

    //alert($(this).data('id'));

    $('#index').hide(); //fadeOut(2000); //slideUp(); //hide();
    $ficha.show(); //fadeIn(2000); //slideDown(); //show();
    
    //$.getJSON(this.href, function(prod) {
    $.getJSON(url + "/" + prod.Id, function (prod) {
        $ficha.find('h2#etiqueta').text(prod.Id);
       
        
    });


   
}

function fallo(jqXHR, textStatus, errorThrown) {
    if (jqXHR.readyState === 0) {
        errorThrown = "ERROR DE CONEXIÓN";
    }

    console.log(jqXHR, textStatus, errorThrown);

    //$('#cuadroerror').show();
    //$('#textoerror').text(errorThrown);
}