using ProjectManagement.Domain.Entities;


namespace ProjectManagement.Application.Interfaces;
public interface IRefreshTokenRepository
{
    Task AddAsync(RefreshToken refreshToken);

    Task<RefreshToken?> GetAsync(string token);

    Task SaveChangesAsync();
}