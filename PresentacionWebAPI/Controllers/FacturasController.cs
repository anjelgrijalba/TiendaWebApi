using PresentacionWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TiendaVirtual.Entidades;
using TiendaVirtual.LogicaNegocio;

namespace PresentacionAspNetMvc.Controllers
{
    public class FacturasController : ApiController
    {

        private static ILogicaNegocio ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];
       
        // GET: api/Facturas
        public IEnumerable<IFactura> Get()
        {
            return null;
        }

        // GET: api/Facturas/5
        public IFactura Get(int id)
        {

            return null;
        }
                        
        [Route("api/CarritoDTO/test")]  
        //esta ruta me la invento
        public CarritoDTO Get(string nolose)  //esto es una prueba
        {
            CarritoDTO carritoDTO = new CarritoDTO();
            carritoDTO.IdUsuario = 1;
            carritoDTO.IdsProductos = new int[] { 1, 2, 3, 4 };
            carritoDTO.CantidadesProductos = new int[] { 10, 20, 30, 40 };

            return carritoDTO;
        }

        // POST: api/Facturas
        public IFactura Post([FromBody]CarritoDTO carritoDTO)
        {
            //Debug.Print(carritoDTO.ToString());
            var ln = (ILogicaNegocio)HttpContext.Current.Application["logicaNegocio"];

            IUsuario usuario = ln.BuscarUsuarioPorId(carritoDTO.IdUsuario);
            Carrito carrito = new Carrito(usuario);
            IProducto producto;
            int cantidad;

            for (int i = 0; i < carritoDTO.IdsProductos.Length; i++)
            {
                producto = ln.BuscarProductoPorId(carritoDTO.IdsProductos[i]);
                cantidad = carritoDTO.CantidadesProductos[i];
                ln.AgregarProductoACarrito(producto, cantidad, carrito);
            }
               
            return ln.FacturarCarrito(carrito);
        }

        // PUT: api/Facturas/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE: api/Facturas/5
        //public void Delete(int id)
        //{
        //}
    }
}
