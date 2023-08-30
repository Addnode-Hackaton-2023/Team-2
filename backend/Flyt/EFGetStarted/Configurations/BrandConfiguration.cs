using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Flyt.Models;

namespace Flyt.Configuration
{
    public class BrandConfiguration : IEntityTypeConfiguration<Brand>
    {
        public void Configure(EntityTypeBuilder<Brand> builder)
        {
            builder.Property(a => a.Id)
                .IsRequired();
        }
    }
}