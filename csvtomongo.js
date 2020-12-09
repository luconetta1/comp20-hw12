const MongoClient = require('mongodb').MongoClient;
const csvtojson = require("csvtojson");


let url = "mongodb+srv://lconet01:comp20pass@cluster0.metld.mongodb.net/";

csvtojson().fromFile("companies-1.csv").then(csvData => {
    console.log(csvData);

    MongoClient.connect(url,
        { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
          if (err) {
            console.log("Error: " + err);
            process.exit();
          }

        client.db("companies").collection("companies")
            .insertMany(csvData, (err, res) => {
                if (err) {
                  console.log("Error: " + err);
                  process.exit();
                }
            client.close();
          });
      }
    );
  });
