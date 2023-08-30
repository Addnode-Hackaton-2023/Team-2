using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Flyt.Models;

namespace Flyt.Configuration
{
    public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.Property(a => a.Id)
                .IsRequired();

            builder.HasMany(v => v.Routes)
                    .WithOne(r => r.Vehicle)
                    .HasForeignKey(v => v.VehicleId);
        }
    }
}