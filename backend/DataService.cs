using Flyt.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flyt
{
    public class DataService : IDataService
    {
        readonly private string connectionString;

        public DataService()
        {
            this.connectionString = @"***REMOVED***";
            Initialize();
        }

        private void Initialize()
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                context.Database.Migrate();
            }
        }

        public IEnumerable<Vehicle> GetVehicles()
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                var vehicles = context.Vehicles.ToList();
                return vehicles;
            }
        }

        public int UpdateVehicle(IEnumerable<Vehicle> vehicles)
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                List<Vehicle> vehiclesToSave = context.Vehicles
                                                .Where(v1 => vehicles.Select(v => v.Id)
                                                                    .Contains(v1.Id)).ToList();
                foreach (Vehicle vehicle in vehicles)
                {
                    Vehicle vehicleToSave = vehiclesToSave.Single(v1 => v1.Id == vehicle.Id)
                    vehicleToSave.MaxCargo = vehicle.MaxCargo;
                }
                
            }
        }

        public IEnumerable<Driver> GetDrivers()
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                var drivers = context.Drivers.ToList();
                return drivers;
            }
        }

        public int UpdateDriver(IEnumerable<Driver> drivers)
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                List<Driver> driversToSave = context.Drivers
                                                .Where(d1 => drivers.Select(d => d.Id)
                                                                    .Contains(d1.Id)).ToList();
                foreach (Driver driver in drivers)
                {
                    Driver driverToSave = driversToSave.Single(d1 => d1.Id ==driver.Id)
                    driverToSave.Name = driver.Name;
                }
                
            }
        }

        public IEnumerable<Stoppoint> GetActiveStoppoints()
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                var test = context.Stoppoints
                               .Include(sp => sp.Ignores)
                               .Where(sp => sp.Ignores == null || sp.Ignores.Any(i => i.StartDate <  DateTime.Now && i.EndDate > DateTime.Now) == false)
                               .Include(sp => sp.Adresses.Where(spa => spa.StartDate < DateTime.Now && spa.EndDate > DateTime.Now))
                               .ThenInclude(spa => spa.Adress).ToList();
                return test;
            }
        }

        public int PostStoppoints(IEnumerable<Stoppoint> stoppoints)
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                try
                {
                    foreach (Stoppoint stoppoint in stoppoints)
                    {
                        context.Stoppoints.Add(stoppoint);
                    }
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    return 1;
                }
            }
            return 0;
        }

        public int UpdateStoppoints(IEnumerable<Stoppoint> stoppoints)
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                try
                {
                    List<Stoppoint> stoppointsToSave = context.Stoppoints
                                                          .Where(sp1 => stoppoints.Select(sp => sp.Id)
                                                                                  .Contains(sp1.Id)).ToList();
                    foreach (Stoppoint stoppoint in stoppoints)
                    {
                        Stoppoint stoppointToSave = stoppointsToSave.Single(sp1 => sp1.Id == stoppoint.Id);
                        stoppointToSave.BrandId = stoppoint.BrandId;
                        stoppointToSave.IsRecipient = stoppoint.IsRecipient;
                        stoppointToSave.Ignores = stoppoint.Ignores;
                        stoppointToSave.Adresses = stoppoint.Adresses;
                    }
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    return 1;
                }
            }
            return 0;
        }
    }
}
