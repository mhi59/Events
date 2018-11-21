using Events.Interfaces;
using Events.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Services
{
    public class CredentialsContext : ICredentialsContext
    {
        private readonly IMongoDatabase _db;

        public CredentialsContext(IOptions<MongoSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _db = client.GetDatabase(options.Value.Database);
        }

        public IMongoCollection<Credentials> Credentials => _db.GetCollection<Credentials>("Credentials");
    }
}
