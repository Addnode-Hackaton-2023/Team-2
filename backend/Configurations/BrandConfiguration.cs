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

            builder.HasMany(b => b.Stoppoints)
                .WithOne(sp => sp.Brand)
                .HasForeignKey(b => b.BrandId);
        }
    }
}