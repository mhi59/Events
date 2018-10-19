using Events.Interfaces;
using Events.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Services
{
    public class EventRepository : IEventRepository
    {
        private readonly IEventContext _context;

        public EventRepository(IEventContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetAllEvents()
        {
            return await _context
                .Events
                .Find(_ => true)
                .ToListAsync();                      
        }

        public Task<Event> GetEvent(ObjectId id)
        {
            FilterDefinition<Event> filter = Builders<Event>.Filter.Eq(m => m.Id, id);

            return _context
                .Events
                .Find(filter)
                .FirstOrDefaultAsync();
        }

        public async Task Create(Event _event)
        {
            await _context
                .Events
                .InsertOneAsync(_event);
        }

        public async Task<bool> Update(Event _event)
        {
            ReplaceOneResult updateResult = await _context
                                                .Events
                                                .ReplaceOneAsync(
                                                    filter: e => e.Id == _event.Id,
                                                    replacement: _event);

            return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
        }

        public async Task<bool> Delete(ObjectId id)
        {
            FilterDefinition<Event> filter = Builders<Event>
                                                .Filter.Eq(e => e.Id, id);

            DeleteResult deleteResult = await _context
                                            .Events
                                            .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }        
    }
}
