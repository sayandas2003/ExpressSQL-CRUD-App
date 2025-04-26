const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'sayandas2003'
  });


// Inserting New Data using placeholders (?)
// let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
// let user = ["123", "123_newuser", "abc@gmail.com", "abc"];

// try {
//   connection.query(q, user, (err, result) => {
//       if(err) throw err;
//       console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }


// // for multiple users -
// let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let users = [
//     ["123b", "123_newuserb", "abc@gmail.comb", "abcb"],
//     ["123c", "123_newuserc", "abc@gmail.comc", "abcc"]
// ];

// try {
//   connection.query(q, [users], (err, result) => {
//       if(err) throw err;
//       console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }



// // for inserting in bulk using faker -
// let getRandomUser = () => {
//   return [
//       faker.string.uuid(),
//       faker.internet.username(), 
//       faker.internet.email(),
//       faker.internet.password(),
//   ];
// }

// let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let data = [];
// for (let i=1; i<=100; i++) {
//   data.push(getRandomUser()); // 100 fake users data generated and stored
// }

// try {
//   connection.query(q, [data], (err, result) => {
//       if(err) throw err;
//       console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }



//   console.log(getRandomUser());

// connection.end();


// Home Route -
app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let count = result[0]["COUNT(*)"];
      // console.log(result);
      res.render("home.ejs", {count})
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
})


// Show Route -
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
      if(err) throw err;
      res.render("showusers.ejs", {users});
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
})


// Edit Route -
app.get("/user/:id/edit", (req, res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
})


// Update (DB) Route -
app.patch("/user/:id", (req, res) => {
  let {id} = req.params;
  let {password: formPass, username: newUsername} = req.body; 
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let user = result[0];
      if(formPass != user.password) {
        res.send("wrong password");
      } else {
        let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if(err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
})





// Home work -

// New User entry Route -
app.get("/user/new", (req, res) => {
  res.render("newuser.ejs");
})

// New User to (DB) route -
app.post("/user", (req, res) => {
  let { username, email, password } = req.body;
  let id = faker.string.uuid();
  let q = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;
  let values = [id, username, email, password];

  try {
    connection.query(q, values, (err, result) => {
      if(err) throw err;
      res.redirect("/user");
    })
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// Delete path -
app.get("/user/:id/delete", (req, res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, user) => {
      if(err) throw err;
      res.render("delete.ejs", {user: user[0]});
    });
  } catch(err) {
    console.log(err);
    res.send("error in DB");
  }
})

// Delete From DB route -
app.delete("/user/:id", (req, res) => {
  let {id} = req.params;
  let {email, password} = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;

  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let user = result[0];
      if(password != user.password) {
        res.send("wrong password");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if(err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch(err) {
    console.log(err);
    res.send("error in db");
  }
})













app.listen("8080", () => {
  console.log("server is listening on port 8080");
})