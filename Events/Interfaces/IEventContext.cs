using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Interfaces
{
    public interface IEventContext //Interface qu'on utilisera pour charger le bon contexte de donnée
    {
        IMongoCollection<Models.Event> Events { get; }
    }
}
