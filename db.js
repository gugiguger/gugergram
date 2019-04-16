const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/imageboard`
);

exports.getData = function() {
    return db.query(
        `SELECT * FROM images
    ORDER BY id DESC`
    );
};

exports.insertData = function(url, username, title, description) {
    return db.query(
        `INSERT INTO images(url,username,title,description)
        VALUES($1, $2, $3, $4)
        RETURNING id, url, username, title, description`,
        [url || null, username || null, title || null, description || null]
    );
};
