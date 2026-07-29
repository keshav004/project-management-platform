using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using ProjectManagement.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Infrastructure.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.FirstName)
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(x => x.LastName)
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(x => x.Email)
                   .HasMaxLength(200)
                   .IsRequired();

            builder.HasIndex(x => x.Email)
                   .IsUnique();

            builder.Property(x => x.PasswordHash)
                   .IsRequired()
                   .HasMaxLength(500);

            builder.Property(x => x.Role)
                   .HasConversion<string>()
                   .HasMaxLength(50)
                   .IsRequired();

            builder.HasMany(x => x.RefreshTokens)
                   .WithOne(x => x.User)
                   .HasForeignKey(x => x.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.PasswordResetTokens)
                   .WithOne(x => x.User)
                   .HasForeignKey(x => x.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
