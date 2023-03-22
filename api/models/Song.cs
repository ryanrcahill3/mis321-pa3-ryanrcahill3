using api.interfaces;
using api.database;

namespace api.models
{
    public class Song
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public string Artist { get; set; }

        public string Date { get; set; }

        public bool Favorited { get; set; }

        public bool Deleted { get; set; }

        public ISaveSong Save { get; set; }

        public IDeleteSong Delete { get; set; }

        public Song()
        {
            Save = new SaveSong();
            Delete = new DeleteSong();
        }

        public override string ToString()
        {
            return "ID: " + ID + " " + Title + ", written by " + Artist + ", added on " + Date + ", is favorited: " + Favorited + ", is deleted: " + Deleted;
        }

    }
}