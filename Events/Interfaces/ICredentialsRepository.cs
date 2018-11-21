using Events.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Interfaces
{
    public interface ICredentialsRepository
    {
        Task<IEnumerable<Credentials>> GetAllCredentials();
    }
}
