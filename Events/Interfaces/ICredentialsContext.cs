using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Interfaces
{
    public interface ICredentialsContext
    {
        IMongoCollection<Models.Credentials> Credentials { get; }
    }
}
