using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TiendaVirtual.Entidades;
using TiendaVirtual.LogicaNegocio;

namespace PresentacionWebAPI.Controllers
{
    public class ProductosController : ApiController
    {
        // GET: api/Productos
        public IEnumerable<IProducto> Get()
        {
             var ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
             return ln.ListadoProductos();
        }

        // GET: api/Productos/5
        public IProducto Get(int id)
        {
            var ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            IProducto producto = ln.BuscarProductoPorId(id);
            if (producto == null)
            {
                return null;
            }

            return producto;
        }

        // POST: api/Productos
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Productos/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Productos/5
        public void Delete(int id)
        {
        }

        [Route("Productos/Agregar/{id:int}")]
        public void AnnadirProducto(IProducto producto)
        {
            var ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
            //ln.AgregarProductoACarrito(producto, cantidad, carrito);
        }
    }
}
