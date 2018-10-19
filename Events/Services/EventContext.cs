using Events.Interfaces;
using Events.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Services
{
    public class EventContext : IEventContext
    {
        private readonly IMongoDatabase _db;

        public EventContext(IOptions<MongoSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _db = client.GetDatabase(options.Value.Database);
        }


        public IMongoCollection<Event> Events => _db.GetCollection<Event>("Events");
    }
}
