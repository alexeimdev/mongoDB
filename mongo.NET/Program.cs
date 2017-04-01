using MongoDB.Driver;
using MongoDB.Bson;
using System;
using System.Threading.Tasks;

namespace mongo.NET
{
    class Program
    {
        private static string ConnectionString = "mongodb://localhost:27017";
        private static string DbName = "students";
        private static string CollectionName = "grades";

        static void Main(string[] args)
        {
            MainAsync(args).Wait();
            Console.Read();

        }

        static async Task MainAsync(string[] args)
        {
            var mongoClient = new MongoClient(ConnectionString);

            var db = mongoClient.GetDatabase(DbName);
            var col = db.GetCollection<BsonDocument>(CollectionName);

            var res = await col.FindAsync("{}");
        }

        private static void print(string str)
        {
            Console.WriteLine(str);
        }
    }

}
