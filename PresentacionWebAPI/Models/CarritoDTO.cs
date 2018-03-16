using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PresentacionWebAPI.Models
{
    public class CarritoDTO
    {
        public int IdUsuario { get; set; }
        public int[] IdsProductos { get; set; }
        public int [] CantidadesProductos { get; set; }
    }
}