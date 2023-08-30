using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Flyt.Models;

namespace Flyt.Configuration
{
    public class RouteConfiguration : IEntityTypeConfiguration<Route>
    {
        public void Configure(EntityTypeBuilder<Route> builder)
        {
            builder.Property(a => a.Id)
                .IsRequired();
        }
    }
}