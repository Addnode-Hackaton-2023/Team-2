using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Flyt.Models;

namespace Flyt.Configuration
{
    public class DriverConfiguration : IEntityTypeConfiguration<Driver>
    {
        public void Configure(EntityTypeBuilder<Driver> builder)
        {
            builder.Property(a => a.Id)
                .IsRequired();

            builder.HasMany(d => d.Routes)
                .WithOne(r => r.Driver)
                .HasForeignKey(d => d.DriverId);
        }
    }
}