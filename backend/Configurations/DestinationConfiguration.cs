using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Flyt.Models;

namespace Flyt.Configuration
{
    public class DestinationConfiguration : IEntityTypeConfiguration<Destination>
    {
        public void Configure(EntityTypeBuilder<Destination> builder)
        {
            builder.Property(a => a.Id)
                .IsRequired();

            builder.HasOne(d => d.Route)
                .WithMany(r => r.Destinations)
                .HasForeignKey(d => d.RouteId)
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired(false);

            builder.HasOne(d => d.Stoppoint)
                .WithMany(sp => sp.Destinations)
                .HasForeignKey(d => d.RouteId)
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired(false);
        }
    }
}