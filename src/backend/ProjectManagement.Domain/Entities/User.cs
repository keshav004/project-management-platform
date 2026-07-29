using ProjectManagement.Domain.Common;
using ProjectManagement.Domain.Enums;

namespace ProjectManagement.Domain.Entities;
public class User : BaseEntity
{
    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public UserRole Role { get; set; } = UserRole.Member;

    public bool IsActive { get; set; } = true;

    public ICollection<RefreshToken> RefreshTokens { get; set; }
        = new List<RefreshToken>();

    public ICollection<PasswordResetToken> PasswordResetTokens
    { get; set; } = new List<PasswordResetToken>();
}