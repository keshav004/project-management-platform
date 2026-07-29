using ProjectManagement.Application.DTOs;
using ProjectManagement.Application.Interfaces;
using ProjectManagement.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Application.Services
{
    public class AuthService:IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        public AuthService(IUserRepository userRepository,ITokenService tokenService, IPasswordHasher passwordHasher, IRefreshTokenRepository refreshTokenRepository) 
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _passwordHasher = passwordHasher;
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);

            if (user == null || !_passwordHasher.VerifyPassword(request.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }

            // Generate access token and refresh token
            var accessToken = _tokenService.GenerateAccessToken(user);

            var refreshToken = new RefreshToken
            {
                Id = Guid.NewGuid(),
                Token = _tokenService.GenerateRefreshToken(),
                CreatedAt = DateTime.UtcNow,
                ExpiryDate = request.RememberMe ? DateTime.UtcNow.AddDays(30) : DateTime.UtcNow.AddDays(1),
                UserId = user.Id
            };

            await _refreshTokenRepository.AddAsync(refreshToken);

            await _refreshTokenRepository.SaveChangesAsync();

            return new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                ExpiresAt = DateTime.UtcNow.AddMinutes(60)
            };
        }

        public async Task RegisterAsync(RegisterRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);

            if (user != null)
            {
                throw new InvalidOperationException("User with this email already exists.");
            }

            var newUser = new User
            {
                Id = Guid.NewGuid(),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PasswordHash = _passwordHasher.HashPassword(request.Password),
            };

            //add User
            await _userRepository.AddAsync(newUser);

            await _userRepository.SaveChangesAsync();
        }

        public async Task<LoginResponse> RefreshTokenAsync(RefreshTokenRequest request)
        {
            var existingToken = await _refreshTokenRepository.GetAsync(request.RefreshToken);

            if (existingToken is null)
            {
                throw new UnauthorizedAccessException("Invalid refresh token.");
            }

            if (!existingToken.IsActive)
            {
                throw new UnauthorizedAccessException("Refresh token has expired or has been revoked.");
            }

            var user = existingToken.User;

            var accessToken =
                _tokenService.GenerateAccessToken(user);

            existingToken.IsRevoked = true;
            existingToken.RevokedAt = DateTime.UtcNow;

            var newRefreshToken = new RefreshToken
            {
                Token = _tokenService.GenerateRefreshToken(),
                CreatedAt = DateTime.UtcNow,
                ExpiryDate = existingToken.ExpiryDate,
                UserId = user.Id
            };

            await _refreshTokenRepository.AddAsync(newRefreshToken);

            await _refreshTokenRepository.SaveChangesAsync();

            return new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = newRefreshToken.Token,
                ExpiresAt = DateTime.UtcNow.AddMinutes(60)
            };
        }

        public async Task LogoutAsync(LogoutRequest request)
        {
            var refreshToken = await _refreshTokenRepository.GetAsync(request.RefreshToken);

            if (refreshToken is null)
            {
                return;
            }

            if (refreshToken.IsRevoked)
            {
                return;
            }

            refreshToken.IsRevoked = true;
            refreshToken.RevokedAt = DateTime.UtcNow;

            await _refreshTokenRepository.SaveChangesAsync();
        }
    }
}
