using Events.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Interfaces
{
    public interface IEventRepository
    {
        //Représente les différentes opérations de CRUD qu'on peur avoir qu'on implémentera dans la classe EventRepository
        Task<IEnumerable<Event>> GetAllEvents();
        Task<Event> GetEvent(ObjectId id);
        Task Create(Event _event);
        Task<bool> Update(Event _event);
        Task<bool> Delete(ObjectId id);
    }
}
