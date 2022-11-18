const express = require("express");
const bodyParser = require("body-parser");
const request = require("request"); 
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res) {
    console.log("Post!")
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
   
    var data = {
        members: [ 
            {
                email_address: email, 
                status: "subscribed", 
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }

            }
        ]
    }; 

    var jsonData = JSON.stringify(data); 
    const url = "https:/us18.api.mailchimp.com/3.0/lists/6ffa4d9129";
    const options = {
        methods: "POST",
        auth: "linh:ae63f739858e0d0b02a5f84c1497f4d1-us18"

    }
    
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.send("Success");
        } else {
            res.send("There was Error when signing up");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});


app.listen(process.env.PORT, function() {
    console.log("Server is running on port 3000");
});

// ae63f739858e0d0b02a5f84c1497f4d1-us18

// 6ffa4d9129


