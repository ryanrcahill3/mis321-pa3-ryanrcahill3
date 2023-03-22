using api.interfaces;
using api.models;
using MySql.Data.MySqlClient;

namespace api.database
{
    public class ReadData : IReadAllData
    {
        public List<Song> GetAllSongs()
        {
            List<Song> allSongs = new List<Song>();

            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "SELECT * FROM songs";
            using var cmd = new MySqlCommand(stm, con);

            using MySqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                Song temp = new Song() { ID = rdr.GetInt32(0), Title = rdr.GetString(1), Artist = rdr.GetString(2), Date = rdr.GetString(3), Favorited = rdr.GetBoolean(4), Deleted = rdr.GetBoolean(5) };
                allSongs.Add(temp);
            }


            return allSongs;
        }
    }
}