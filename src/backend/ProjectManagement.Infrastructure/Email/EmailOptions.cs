using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Infrastructure.Email
{
    public class EmailOptions
    {
        public const string SectionName = "Email";

        public string Host { get; set; } = string.Empty;

        public int Port { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string From { get; set; } = string.Empty;

        public bool EnableSsl { get; set; }
    }
}
