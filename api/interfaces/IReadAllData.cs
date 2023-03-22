using api.models;

namespace api.interfaces
{
    public interface IReadAllData
    {
        public List<Song> GetAllSongs();
    }
}