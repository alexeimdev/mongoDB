using MongoDB.Driver;
using MongoDB.Bson;
using System;

namespace mongo.NET
{
    class Program
    {
        private static string ConnectionString = "mongodb://localhost:27017";
        private static string DbName = "interactive_poll";
        private static string CollectionName = "poll_questions";

        static void Main(string[] args)
        {
            var mongoClient = new MongoClient(ConnectionString);
            var db = mongoClient.GetDatabase(DbName);
            var collection = db.GetCollection<BsonDocument>(CollectionName);


            var result = collection.Find("{}");
            Console.WriteLine(result.SingleOrDefault());
            Console.ReadKey();
        }

    }
}
