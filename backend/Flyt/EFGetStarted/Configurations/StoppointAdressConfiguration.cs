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
        }
    }
}