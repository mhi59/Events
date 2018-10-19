using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Events.Interfaces;
using Events.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Events.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        // GET: api/Event
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return new ObjectResult(await _eventRepository.GetAllEvents());
        }

        // GET: api/Event/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(ObjectId id)
        {
            var _event = await _eventRepository.GetEvent(id);

            if (_event == null)
                return new NotFoundResult();

            return new ObjectResult(_event);
        }

        // POST: api/Event
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Event _event)
        {
            await _eventRepository.Create(_event);
            return new OkObjectResult(_event);
        }

        // PUT: api/Event/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(ObjectId id, [FromBody]Event _event)
        {
            var eventFromDb = await _eventRepository.GetEvent(id);

            if (eventFromDb == null)
                return new NotFoundResult();

            _event.Id = eventFromDb.Id;

            await _eventRepository.Update(_event);

            return new OkObjectResult(_event);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(ObjectId id)
        {
            var eventFromDb = await _eventRepository.GetEvent(id);

            if (eventFromDb == null)
                return new NotFoundResult();

            await _eventRepository.Delete(id);

            return new OkResult();
        }
    }
}
