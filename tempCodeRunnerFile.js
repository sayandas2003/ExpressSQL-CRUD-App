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