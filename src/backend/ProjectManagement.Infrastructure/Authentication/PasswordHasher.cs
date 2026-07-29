using Microsoft.AspNetCore.Identity;
using ProjectManagement.Application.Interfaces;
using ProjectManagement.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Infrastructure.Authentication
{
    public class PasswordHasher : IPasswordHasher
    {
        private readonly Microsoft.AspNetCore.Identity.PasswordHasher<User> _passwordHasher;

        public PasswordHasher()
        {
            _passwordHasher = new Microsoft.AspNetCore.Identity.PasswordHasher<User>();
        }

        public string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(new User(), password);
        }

        public bool VerifyPassword(string password, string passwordHash)
        {
            var result = _passwordHasher.VerifyHashedPassword(
                new User(),
                passwordHash,
                password);

            return result == PasswordVerificationResult.Success
                || result == PasswordVerificationResult.SuccessRehashNeeded;
        }
    }
}
