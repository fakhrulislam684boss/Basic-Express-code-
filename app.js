// Basic Express
const db = require("./db");
const fs = require("fs"); //file system module
const expres = require("express"); // express store a function
const { json } = require("express");

const app = expres(); // express is called it basically return a object
// so app sotre a object

//console.log(app);
// app.use()  used for   using middleware function
// express.json() this is  middleWare function .it is Used  to
// to convert in Json Object
app.use(expres.json());

app.get("/", (request, response) => {
  response.send("Hello I am from Express js");
});

app.get("/another", (req, res) => {
  res.send("I am from another");
});

app.get("/api/student", (req, res) => {
  const p = db.getDbStudents();

  p.then((students) => {
    res.send(students);
  });
  console.log(p);
});

app.post("/api/student", (req, res) => {
  //console.log(req.body); // Received  which i send as a post Method
  const student = req.body; // received which I send as a post Method
  db.getDbStudents().then((students) => {
    const pupil = students;
    pupil.push(student);
    fs.writeFile("./db.json", JSON.stringify(pupil), (err) => {
      res.send(student);
    });
  });
});

app.get("/api/student/:id", (req, res) => {
  const id = req.params.id;

  db.getDbStudents().then((students) => {
    const student = students.find((s) => s.id == id);
    if (!student) {
      res.status(404).send("Student Not found");
    } else {
      res.send(student);
    }
  });
});

app.put("/api/student/:id", (req, res) => {
  const id = req.params.id;

  const updateData = req.body;

  db.getDbStudents().then((students) => {
    const student = students.find((s) => s.id == id);
    if (!student) {
      res.status(404).send("Student Not found");
    } else {
      let index = students.findIndex((s) => s.id == id);
      students[index] = updateData;
      fs.writeFile("./db.json", JSON.stringify(students), (err) => {
        res.send(updateData);
      });
    }
  });
});

app.delete("/api/student/:id", (req, res) => {
  const id = req.params.id;
  db.getDbStudents().then((students) => {
    let pupil = students.filter((s) => {
      return s.id != id;
    });
    if (!pupil) {
      res.status(404).send("Student Not found");
    } else {
      fs.writeFile("./db.json", JSON.stringify(pupil), (err) => {
        res.send(pupil);
      });
    }
  });
});

const port = 3000;

app.listen(port, () => {
  console.log("listing server ...");
});
