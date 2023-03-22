namespace api
{
    public class ConnectionString
    {
        public string cs { get; set; }

        public ConnectionString()
        {
            string server = "u6354r3es4optspf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "l9epnmko5orsen0n";
            string port = "3306";
            string userName = "aey1w3vaxj54pnj8";
            string password = "y4blxt6l6xsbj1no";

            cs = $@"server = {server};user={userName};database={database};port={port};password={password};";
        }
    }
}