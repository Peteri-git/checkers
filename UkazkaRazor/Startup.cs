using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using UkazkaRazor.Services;
using UkazkaRazor.SignalR;

namespace UkazkaRazor
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            //if (services.BuildServiceProvider().GetService<IWebHostEnvironment>().IsDevelopment())
            //{
            //    services.AddSingleton<IMessageStorage>(new MessageStorage());
            //}
            //else 
            //{ 
            //    services.AddSingleton<IMessageStorage>(new DbMessageStorage());
            //}
            //services.AddScoped<MessageStorage>();
            //services.AddTransient<MessageStorage>();
            //services.AddSingleton<IMessageStorage>(new MessageStorage());
            services.AddSingleton<IRoomStorage>(new RoomStorage());
            services.AddSignalR();
            //services.AddSingleton(typeof(MessageStorage), new MessageStorage());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/hub");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
