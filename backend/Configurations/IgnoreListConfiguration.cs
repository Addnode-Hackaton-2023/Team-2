using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Flyt.Models;

namespace Flyt.Configuration
{
    public class IgnoreListConfiguration : IEntityTypeConfiguration<IgnoreList>
    {
        public void Configure(EntityTypeBuilder<IgnoreList> builder)
        {
            builder.Property(a => a.Id)
                .IsRequired();

            builder.HasOne(i => i.Stoppoint)
                .WithMany(sp => sp.Ignores)
                .HasForeignKey(i => i.StoppointId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}