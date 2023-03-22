using api.models;

namespace api.interfaces
{
    public interface ISaveSong
    {
        public void CreateSong(Song mySong);

        public void UpdateSong(Song mySong);
    }
}