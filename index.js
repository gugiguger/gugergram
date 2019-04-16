const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const config = require("./config");
const s3 = require("./s3");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    // If nothing went wrong the file is already in the uploads directory\
    let fullUrl = config.s3url + req.file.filename;
    db.insertData(
        fullUrl,
        req.body.username,
        req.body.title,
        req.body.description
    )
        .then(function(result) {
            res.json(result.rows);
        })
        .catch(function(err) {
            console.log(err);

            res.json({
                success: false
            });
        });
});

app.get("/get-info", (req, res) => {
    db.getData()
        .then(function(results) {
            res.json(results.rows);
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.listen(8080, () => console.log(`I'm listening`));
