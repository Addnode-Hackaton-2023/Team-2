using Flyt.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Client;
using System.Runtime.CompilerServices;

namespace Flyt
{
    public class Program
    {
        private static IServiceProvider serviceProvider;

        static void Main(string[] args)
        {
            Console.WriteLine("Started");
            RegisterServices();
            IDataService dataService = serviceProvider.GetService<IDataService>();

            //Console.WriteLine("Generating Brands");
            //Brand newBrand = new Brand();
            //newBrand.Id = 0;
            //newBrand.Name = "Lidl";

            //Console.WriteLine("Generating Adresses");
            //Adress newAdress = new Adress();
            //newAdress.Id = 0;
            //newAdress.Street = "Tomtegatan 4";
            //newAdress.City = City.Stockholm;
            //newAdress.Muncipality = Muncipality.Stockholm;
            //newAdress.ZipCode = 12345;

            //Console.WriteLine("Generating Stoppoints");
            //Stoppoint newStoppoint = new Stoppoint();
            //newStoppoint.Id = 0;
            //newStoppoint.Brand = newBrand;
            //newStoppoint.IsRecipient = true;
            //newStoppoint.Adresses = new List<StoppointAdress>();
            
            //StoppointAdress newStoppointAdress = new StoppointAdress();
            //newStoppointAdress.Id = 0;
            //newStoppointAdress.Adress = newAdress;

            //newStoppoint.Adresses.Add(newStoppointAdress);

            //dataService.PostStoppoints(new List<Stoppoint> { newStoppoint });

            //Console.WriteLine("Getting Stoppoints");
            //List<Stoppoint> z = dataService.GetActiveStoppoints().ToList();
            //foreach (Stoppoint point in z)
            //{
            //    Adress stoppointAdress = point.Adresses.Single().Adress;
            //    Console.WriteLine($"Id: {point.Id} - Adress: {stoppointAdress.Street}, {stoppointAdress.ZipCode} {Enum.GetName(typeof(City), stoppointAdress.City).ToUpper()} {Enum.GetName(typeof(Muncipality), stoppointAdress.Muncipality).ToUpper()}");
            //}
            //Console.WriteLine("Finished");
        }

        public static void RegisterServices()
        {
            var collection = new ServiceCollection()
                .AddSingleton<IDataService, DataService>();
            serviceProvider = collection.BuildServiceProvider();
        }
    }
}