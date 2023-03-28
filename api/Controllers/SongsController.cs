using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.database;
using api.interfaces;
using api.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        // GET: api/ToDo
        [HttpGet]
        public List<Song> Get()
        {
            IReadAllData readObject = new ReadData();
            List<Song> allSongs = readObject.GetAllSongs();
            List<Song> modifiedSongs = new List<Song>();

            foreach (Song song in allSongs)
            {
                modifiedSongs.Add(song);
            }

            return modifiedSongs;


        }

        // GET: api/ToDo/5
        // GET: api/Songs/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            IReadAllData readObject = new ReadData();
            List<Song> allSongs = readObject.GetAllSongs();

            Song song = allSongs.FirstOrDefault(s => s.ID == id);

            if (song == null)
            {
                return NotFound();
            }

            return Ok(song);
        }


        // POST: api/ToDo
        [HttpPost] //Create
        public void Post([FromBody] Song mySong)
        {
            mySong.Save.CreateSong(mySong);
        }

        // PUT: api/ToDo/5
        [HttpPut("{id}")] //Update
        public void Put(int id, [FromBody] Song mySong)
        {
            mySong.Save.UpdateSong(mySong);
        }

        // DELETE: api/ToDo/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            DeleteSong DeleteObject = new DeleteSong();
            DeleteObject.RemoveSong(id);
        }
    }
}
