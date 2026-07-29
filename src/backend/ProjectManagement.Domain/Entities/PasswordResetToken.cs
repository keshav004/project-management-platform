using ProjectManagement.Domain.Common;
using ProjectManagement.Domain.Entities;

public class PasswordResetToken : BaseEntity
{
    public string Token { get; set; } = string.Empty;

    public DateTime ExpiryDate { get; set; }

    public DateTime CreatedAt { get; set; }

    public bool IsUsed { get; set; }

    public DateTime? UsedAt { get; set; }

    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public bool IsExpired => DateTime.UtcNow >= ExpiryDate;

    public bool IsActive => !IsUsed && !IsExpired;
}