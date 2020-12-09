const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://lconet01:comp20pass@cluster0.metld.mongodb.net/";
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000



MongoClient.connect(url, function(err, db) {
if(err) { return console.log(err); process.exit();}

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
      res.send(
    `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset = "UTF-8">
              <title> Stock Ticker</title>
            </head>

            <body>
              <header>
                <h1>Stock Ticker Marking App: Enter Company Name or Stock Ticker</h1>
              </header>
              <form action="/company" method="POST">

                <h3>View a Company based on Company Name</h3>
                <label>Company Name</label>
                <input type="text" id="comp" name="comp" >
                <br><br>
                <button type ="reset">Reset</button>
                <button type ="submit" value="Submit">Submit</button>
                <br><br><br>

             </form>
             <form action="/tick" method="POST">

               <h3>View a Company based on Company Stock Ticker</h3>
               <label>Stock Ticker</label>
               <input type="text" id="ticker" name="ticker">
               <br><br>
               <button type ="reset">Reset</button>
               <button type ="submit" value="Submit">Submit</button>
               <br><br><br>

            </form>
            </body>
            </html>
            `);
    });
    app.listen(port);



    var dbo = db.db("companies");
    var collection = dbo.collection('companies');


    app.post("/company", function (req, res) {
        collection.find({"Company" : req.body.comp}, {projection:{ _id: 0 }}).toArray(function(err, items) {
    	  if (err) {
    		console.log("Error: " + err);
            process.exit();
    	  }
    	  else
    	  {
              collection.find({"Ticker" : items[0].Ticker}, {projection:{ _id: 0 }}).toArray(function(err, items) {
                if (err) {
                  console.log("Error: " + err);
                  process.exit();
                }
                else
                {
                    set_string1 = "";
                    set_string2 = "";
                    for (i=0; i<items.length; i++){
            			set_string1 += "Company : " + items[i].Company + " ||||||     Ticker: " + items[i].Ticker + "\n";
                        set_string2 += "Company : " + items[i].Company + " ||||||     Ticker: " + items[i].Ticker + "<br>";
            	  }
              }
                    //console.log(items.length);
                    console.log(set_string1);
                    res.send(set_string2);

              });

    	  }

    	});

        db.close();
    });

    app.post("/tick", function (req, res) {
        collection.find({"Ticker" : req.body.ticker}, {projection:{ _id: 0 }}).toArray(function(err, items) {
          if (err) {
            console.log("Error: " + err);
            process.exit();
          }
          else
          {
              set_string1 = "";
              set_string2 = "";
              for (i=0; i<items.length; i++){
                  set_string1 += "Company : " + items[i].Company + " ||||||     Ticker: " + items[i].Ticker + "\n";
                  set_string2 += "Company : " + items[i].Company + " ||||||     Ticker: " + items[i].Ticker + "<br>";
            }
        }
              //console.log(items.length);
              console.log(set_string1);
              res.send(set_string2);

        });
        db.close();
});

});
