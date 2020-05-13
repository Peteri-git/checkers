using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UkazkaRazor.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UkazkaRazor.Controllers
{
    public class ApiController : Controller
    {
        // GET: /<controller>/
        //      /<controller>/<action>/{id}
        [Route("api/test")]
        //[Route("api/test/{*kocicka}")]   // api/test/nejaka/cesta/nekam
        //[Route("files/download/{path:int}/{test:string}")]   // api/test/nejaka/cesta/nekam
        public IActionResult Index(string kocicka="zelva")
        {
            return Content(kocicka);
        }

        [Route("api/postItem")]
        [HttpPost]
        [Authorize(Roles ="Administrator,Management",Policy ="Over18")]
        public IActionResult Test([FromBody]Item item)
        {
            if (ModelState.IsValid)
            {
                return Json(item);
            }
            else
            {
                return Json(ModelState);
            }
        }
    }
}
