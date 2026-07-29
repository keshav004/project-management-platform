using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using ProjectManagement.Infrastructure.Authentication;
using ProjectManagement.Infrastructure.Persistence;
using ProjectManagement.Application.Interfaces;
using ProjectManagement.Infrastructure.Repositories;
using ProjectManagement.Infrastructure.Email;

namespace ProjectManagement.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"));
#if DEBUG
            options.EnableSensitiveDataLogging();
            options.EnableDetailedErrors();
#endif
        });

        services.Configure<JwtOptions>(
           configuration.GetSection(JwtOptions.SectionName));

        services.Configure<EmailOptions>(configuration.GetSection(EmailOptions.SectionName));

        services.AddScoped<IUserRepository, UserRepository>();

        services.AddScoped<ITokenService, JwtTokenService>();

        services.AddScoped<IPasswordHasher, PasswordHasher>();

        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

        services.AddScoped<IPasswordResetTokenRepository, PasswordResetTokenRepository>();

        services.AddScoped<IEmailService, SmtpEmailService>();

        return services;
    }
}
