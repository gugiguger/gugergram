# about

Gugergram is an imageboard app for comic lovers who to share their favorites comic's cover within the community they can upload image and also put comment.

# features

## home, register or login

Users are greeted with a landing page that allows them to upload a picture. They can also see all previous pictures available.

![gugergram gif](./public/images/gugergram.gif)

# technologies

-   Javascript
-   Handlebars
-   Node.js
-   Express.js
-   PostgreSQL
-   Vue.js
-   AWS S3

# instructions

you need an AWS account to run the app.

1.  clone repository

```bash
git clone https://github.com/gugiguger/gugergram
cd gugergram
```

2.  install dependencies

```bash
npm install
```

3.  setup database

you need PostgreSQL at least version 9 and your system user needs to be able to access the server without a password.

```bash
createdb imageboard
cd sql
psql -d imageboard -f images.sql
psql -d imageboard -f comments.sql
```

4.  create S3 bucket and credentials

go to the AWS console and create a S3 bucket in the eu-west-1 region. in the bucket create a folder named as you want.

the bucket and folder name need to be exchanged in the s3.js file with the one you created.

in AWS IAM create security credentials for a user that can write to the new bucket and put the access key and secret into a file called secrets.json.

```json
{
    "AWS_KEY": "YOUR AWS KEY",
    "AWS_SECRET": "YOUR AWS SECRET"
}
```

5.  start the application and the bundle server

```bash
npm start
```

now go to http://localhost:8080 in your browser
