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
        }
    }
}