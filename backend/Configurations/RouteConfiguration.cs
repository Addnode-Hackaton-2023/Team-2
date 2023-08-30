using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Flyt.Models;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Flyt.Configuration
{
    public class RouteConfiguration : IEntityTypeConfiguration<Route>
    {
        public void Configure(EntityTypeBuilder<Route> builder)
        {
            builder.Property(a => a.Id)
                    .IsRequired();

            builder.HasOne(r => r.Driver)
                    .WithMany(d => d.Routes)
                    .HasForeignKey(r => r.DriverId)
                    .OnDelete(DeleteBehavior.NoAction)
                    .IsRequired(false);

            builder.HasOne(r => r.Vehicle)
                    .WithMany(v => v.Routes)
                    .HasForeignKey(r => r.VehicleId)
                    .OnDelete(DeleteBehavior.NoAction)
                    .IsRequired(false);

            builder.HasMany(r => r.Destinations)
                    .WithOne(d => d.Route)
                    .HasForeignKey(d => d.RouteId);

            builder.HasOne(r => r.EndStoppoint)
                    .WithMany()
                    .HasForeignKey(r => r.EndStoppointId)
                    .OnDelete(DeleteBehavior.NoAction)
                    .IsRequired(false);                    
        }
    }
}