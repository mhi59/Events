using Events.Interfaces;
using Events.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Services
{
    public class CredentialsRepository : ICredentialsRepository
    {
        private readonly ICredentialsContext _credentialsContext;

        public CredentialsRepository(ICredentialsContext credentialsContext)
        {
            _credentialsContext = credentialsContext;
        }

        public async Task<IEnumerable<Credentials>> GetAllCredentials()
        {
            return await _credentialsContext
                .Credentials
                .Find(_ => true)
                .ToListAsync();
                
        }
    }
}
