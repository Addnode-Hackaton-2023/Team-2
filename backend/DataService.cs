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

        public IEnumerable<StoppointAdress> GetActiveStoppoints()
        {
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            using (FlytDbContext context = new FlytDbContext(connectionString))
            {
                return context.StoppointAdresses
                               .Include(spa => spa.Stoppoint)
                               .Include(spa => spa.Adress)
                               .Where(spa => spa.StartDate < DateTime.Now && spa.EndDate > DateTime.Now);
            }
        }
    }
}
