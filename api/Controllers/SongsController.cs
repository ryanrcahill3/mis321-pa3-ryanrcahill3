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

            // Song song = new Song() { ID = 1, Title = "Complete PA3", Artist = "Jeff Lucas", Date = "Today", Favorited = false };
            // Song song2 = new Song() { ID = 2, Title = "Exam 2", Artist = "Jeff Lucas", Date = "Today", Favorited = false };
            // Song song3 = new Song() { ID = 3, Title = "Wash Dishes", Artist = "Jeff Lucas", Date = "Today", Favorited = false };

            // mySongs.Add(song);
            // mySongs.Add(song2);
            // mySongs.Add(song3);
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
            System.Console.WriteLine(mySong.Title);
            mySong.Save.CreateSong(mySong);
        }

        // PUT: api/ToDo/5
        [HttpPut("{id}")] //Update
        public void Put(int id, [FromBody] Song mySong)
        {
            System.Console.WriteLine(id);
            System.Console.WriteLine("Inside the put");
            mySong.Save.UpdateSong(mySong);
            System.Console.WriteLine(mySong);
        }

        // DELETE: api/ToDo/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

            System.Console.WriteLine(id);
            System.Console.WriteLine("Inside the delete");
            Song mySong = new Song();
            mySong.Delete.RemoveSong(id);



        }
    }
}
