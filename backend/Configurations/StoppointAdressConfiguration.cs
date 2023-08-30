using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Flyt.Models;

namespace Flyt.Configuration
{
    public class StoppointAdressConfiguration : IEntityTypeConfiguration<StoppointAdress>
    {
        public void Configure(EntityTypeBuilder<StoppointAdress> builder)
        {
            builder.Property(a => a.Id)
                    .IsRequired();

            builder.HasOne(spa => spa.Stoppoint)
                    .WithMany(sp => sp.Adresses)
                    .HasForeignKey(spa => spa.StoppointId)
                    .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(spa => spa.Adress)
                    .WithMany(spa => spa.StoppointAdresses)
                    .HasForeignKey(spa => spa.AdressId)
                    .OnDelete(DeleteBehavior.NoAction)
                    .IsRequired(false);
        }
    }
}