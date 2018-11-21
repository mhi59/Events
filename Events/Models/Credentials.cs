using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Models
{
    public class Credentials
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }
    }
}
