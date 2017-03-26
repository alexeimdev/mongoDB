using MongoDB.Driver;
using MongoDB.Bson;
using System;

namespace mongo.NET
{
    class Program
    {
        private static string ConnectionString = "mongodb://localhost:27017";
        private static string DbName = "m101";
        private static string CollectionName = "hw1";

        enum QueryType { Linq, SqlLike, Native };


        static void Main(string[] args)
        {
            var mongoClient = new MongoClient(ConnectionString);
            var db = mongoClient.GetDatabase(DbName);
            var collection = db.GetCollection<BsonDocument>(CollectionName);

            var queryType = QueryType.Linq;
            string strResult;

            switch (queryType)
            {
                case QueryType.Linq:
                    var resLinq= collection.Find(x => x.Equals("answer" == "42.0"));
                    strResult = resLinq.SingleOrDefault().ToString();
                    print(strResult);
                    break;
                case QueryType.SqlLike:
                    break;
                case QueryType.Native:
                    var resNative = collection.Find("{}");
                    strResult = resNative.SingleOrDefault().ToString();
                    print(strResult);
                    break;
            }


        }

        private static void print(string str)
        {
            Console.WriteLine(str);
            Console.ReadKey();
        }
    }

}
