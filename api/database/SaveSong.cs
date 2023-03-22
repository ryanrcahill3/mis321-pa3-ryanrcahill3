using api.interfaces;
using api.models;
using MySql.Data.MySqlClient;

namespace api.database
{
    public class SaveSong : ISaveSong
    {
        public static void CreateSongTable()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"CREATE TABLE songs(id INTEGER PRIMARY KEY AUTO_INCREMENT, title TEXT, artist TEXT, date TEXT, favorited BOOLEAN DEFAULT false, deleted BOOLEAN DEFAULT false)";

            using var cmd = new MySqlCommand(stm, con);

            cmd.ExecuteNonQuery();
        }
        public void CreateSong(Song mySong)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"INSERT INTO songs(title, artist, date, favorited, deleted) VALUES(@title, @artist, @date, @favorited, @deleted)";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@title", mySong.Title);
            cmd.Parameters.AddWithValue("@artist", mySong.Artist);
            cmd.Parameters.AddWithValue("@date", mySong.Date);
            cmd.Parameters.AddWithValue("@favorited", mySong.Favorited);
            cmd.Parameters.AddWithValue("@deleted", mySong.Deleted);


            cmd.Prepare();

            cmd.ExecuteNonQuery();
        }

        public void UpdateSong(Song value)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"UPDATE songs set title = @title, artist = @artist, date = @date, favorited = @favorited, deleted = @deleted WHERE id = @id";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@id", value.ID);
            cmd.Parameters.AddWithValue("@title", value.Title);
            cmd.Parameters.AddWithValue("@artist", value.Artist);
            cmd.Parameters.AddWithValue("@date", value.Date);
            cmd.Parameters.AddWithValue("@favorited", value.Favorited);
            cmd.Parameters.AddWithValue("@deleted", value.Deleted);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }



    }
}