using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
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
            var x = serviceProvider.GetService<IDataService>().GetActiveStoppoints();
            Console.WriteLine("Finished");
        }

        public static void RegisterServices()
        {
            var collection = new ServiceCollection()
                .AddSingleton<IDataService, DataService>();
            serviceProvider = collection.BuildServiceProvider();
        }
    }
}