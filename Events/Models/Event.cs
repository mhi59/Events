using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Events.Models
{
    public class Event
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string Theme { get; set; }

        public string SousTheme { get; set; }

        public DateTime Date { get; set; }

        public string Info { get; set; }
    }
}
