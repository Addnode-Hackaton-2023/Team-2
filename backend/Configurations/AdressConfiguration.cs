using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Flyt.Models;

namespace Flyt.Configuration
{
    public class AdressConfiguration : IEntityTypeConfiguration<Adress>
    {
        public void Configure(EntityTypeBuilder<Adress> builder)
        {
            builder.HasKey(a => a.Id);

            builder.Property(a => a.Text) 
                .IsRequired();

            builder.HasMany(a => a.StoppointAdresses)
                .WithOne(sa => sa.Adress)
                .HasForeignKey(a => a.AdressId);
        }
    }
}