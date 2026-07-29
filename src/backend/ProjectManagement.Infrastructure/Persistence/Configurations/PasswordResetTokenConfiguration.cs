using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Infrastructure.Persistence.Configurations
{
    public class PasswordResetTokenConfiguration : IEntityTypeConfiguration<PasswordResetToken>
    {
        public void Configure(EntityTypeBuilder<PasswordResetToken> builder)
        {
            builder.ToTable("PasswordResetTokens");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Token)
                   .IsRequired()
                   .HasMaxLength(512);

            builder.HasIndex(x => x.Token)
                   .IsUnique();

            builder.Property(x => x.CreatedAt)
                   .IsRequired();

            builder.Property(x => x.ExpiryDate)
                   .IsRequired();

            builder.Property(x => x.IsUsed)
                   .IsRequired();

            builder.Property(x => x.UsedAt);

            builder.HasIndex(x => x.UserId);

            builder.HasOne(x => x.User)
                   .WithMany(x => x.PasswordResetTokens)
                   .HasForeignKey(x => x.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
