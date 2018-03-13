using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using TiendaVirtual.Entidades;
using TiendaVirtual.LogicaNegocio;

namespace PresentacionWebAPI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
       
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            //AreaRegistration.RegisterAllAreas();
            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);
            //BundleConfig.RegisterBundles(BundleTable.Bundles);

            string cadenaConexion =
              System.Configuration.ConfigurationManager.
               ConnectionStrings["TiendaVirtual"].
               ConnectionString;

            string tipo = System.Configuration.ConfigurationManager.AppSettings["motorDao"];

            HttpContext.Current.Application["logicaNegocio"] = new LogicaNegocio(tipo, cadenaConexion);

        }

        protected void Session_Start()
        {
            Session["carrito"] = new Carrito(null);
        }
    }
}
