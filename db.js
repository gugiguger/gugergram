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