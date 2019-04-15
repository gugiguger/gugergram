const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static("./public"));

app.get("/get-info", (req, res) => {
    db.getData()
        .then(function(results) {
            res.json(results.rows);
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});

app.listen(8080, () => console.log(`I'm listening`));
