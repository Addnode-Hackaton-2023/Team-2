using Flyt.DTO;
using Flyt.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Flyt
{
    public class DataService : IDataService
    {
        readonly private string connectionString;

        public DataService()
        {
            this.connectionString = @"";
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

        public IEnumerable<StoppointGetDTO> GetActiveStoppoints()
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                var stoppoints = context.Stoppoints
                               .Include(sp => sp.Ignores)
                               .Where(sp => sp.Ignores == null || sp.Ignores.Any(i => i.StartDate <  DateTime.Now && i.EndDate > DateTime.Now) == false)
                               .Include(sp => sp.Adresses.Where(spa => spa.StartDate < DateTime.Now && spa.EndDate > DateTime.Now))
                               .ThenInclude(spa => spa.Adress)
                               .Include(sp => sp.Brand)
                               .ToList();
                return GetDTOStoppoints(stoppoints);
            }
        } 
        
        public IEnumerable<StoppointGetDTO> GetAllStoppointsQuery()
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                var stoppoints = context.Stoppoints
                               .Include(sp => sp.Ignores)
                               .Include(sp => sp.Adresses.Where(spa => spa.StartDate < DateTime.Now && spa.EndDate > DateTime.Now))
                               .ThenInclude(spa => spa.Adress)
                               .Include(sp => sp.Brand)
                               .ToList();

                return GetDTOStoppoints(stoppoints);
            }
        }

        List<StoppointGetDTO> GetDTOStoppoints(IEnumerable<Stoppoint> stoppoints)
        {
            List<StoppointGetDTO> DTOStoppoints = new List<StoppointGetDTO>();
            DTOStoppoints = stoppoints.Select(sp => new StoppointGetDTO()
            {
                Id = sp.Id,
                IsRecipient = sp.IsRecipient,
                Adress = sp.Adresses.Select(a => new AdressGetDTO
                {
                    Id = a.AdressId ?? 0,
                    City = a.Adress.City,
                    Muncipality = a.Adress.Muncipality,
                    Street = a.Adress.Street,
                    ZipCode = a.Adress.ZipCode
                }).First(),
                Brand = new BrandGetDTO
                {
                    Id = sp.BrandId,
                    Name = sp.Brand.Name
                }
            }).ToList();
            return DTOStoppoints;
        }

        public int PostStoppoints(IEnumerable<StoppointPostDTO> stoppoints)
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                try
                {
                    foreach (StoppointPostDTO stoppoint in stoppoints)
                    {
                        Stoppoint newStoppoint = new Stoppoint()
                        {
                            Id = 0,
                            BrandId = stoppoint.BrandId,
                            Adresses = new List<StoppointAdress>()
                            { new StoppointAdress
                                {
                                    Id = 0,
                                    AdressId = stoppoint.AdressId,
                                    StartDate= DateTime.Now,
                                    EndDate = DateTime.Now.AddYears(100)
                                 } 
                            },
                            IsRecipient = stoppoint.IsRecipient
                        };
                        context.Stoppoints.Add(newStoppoint);
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
