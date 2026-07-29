using System.Net;
using System.Net.Mail;
using ProjectManagement.Application.Interfaces;
using Microsoft.Extensions.Options;

namespace ProjectManagement.Infrastructure.Email
{
    public class SmtpEmailService : IEmailService
    {
        private readonly EmailOptions _options;

        public SmtpEmailService(IOptions<EmailOptions> options)
        {
            _options = options.Value;
        }

        public async Task SendPasswordResetEmailAsync(
            string email,
            string resetLink)
        {
            var body = $"""
            <h2>Password Reset</h2>

            <p>Click the link below to reset your password.</p>

            <a href="{resetLink}">
                Reset Password
            </a>
            """;

            using var message = new MailMessage(
                _options.From,
                email,
                "Reset your password",
                body);

            message.IsBodyHtml = true;

            using var client = new SmtpClient(
                _options.Host,
                _options.Port);

            client.Credentials =
                new NetworkCredential(
                    _options.Username,
                    _options.Password);

            client.EnableSsl = _options.EnableSsl;

            await client.SendMailAsync(message);
        }

        public Task SendWelcomeEmailAsync(
            string email,
            string firstName)
        {
            return Task.CompletedTask;
        }
    }
}
