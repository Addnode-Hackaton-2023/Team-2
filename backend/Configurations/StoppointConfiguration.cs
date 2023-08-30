using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Flyt.Models;

namespace Flyt.Configuration
{
    public class StoppointConfiguration : IEntityTypeConfiguration<Stoppoint>
    {
        public void Configure(EntityTypeBuilder<Stoppoint> builder)
        {
            builder.Property(a => a.Id)
                .IsRequired();

            builder.HasOne(sp => sp.Brand)
                    .WithMany(b => b.Stoppoints)
                    .HasForeignKey(sp => sp.BrandId)
                    .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(sp => sp.Ignores)
                    .WithOne(i => i.Stoppoint)
                    .HasForeignKey(sp => sp.StoppointId);

            builder.HasMany(sp => sp.Destinations)
                    .WithOne(d => d.Stoppoint)
                    .HasForeignKey(sp => sp.StoppointId);

            builder.HasMany(sp => sp.Adresses)
                    .WithOne(a => a.Stoppoint)
                    .HasForeignKey(sp => sp.StoppointId);
    }
    }
}