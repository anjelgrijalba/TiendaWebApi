$(function () {
    $('#ficha, #carrito, #factura, #login').hide();

    //Cambios de pantalla
    $('#btnAddCarrito').click(function () {
        //alert($(this).data('id'));
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

    $ficha = $('#productito');

    $ficha.detach();

    console.log($linea);

    $.getJSON(url, ProductoOK).fail(fallo);  //rellena lista de productos
   

   
});

function ProductoOK(comics) {
    $comics = $('#Comics');

    $comics.empty();

    $.each(comics, function (key, comic) {
        $linea = $linea.clone();

        $linea.find('.NombreEditorial').text(comic.Editorial.Nombre);
        $linea.find('.Titulo').text(comic.Titulo);
        //$linea.find('.detalles').prop('href', url + "/" + comic.Id).click(comicdetalle);
        $linea.find('.borrar').prop('href', url + "/" + comic.Id).click(comicborrar);
        $linea.find('.actualizar').prop('href', url + "/" + comic.Id).click(comicactualizar);

        $comics.append($linea);

        console.log(key, comic);
    });
}