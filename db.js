const fs = require("fs");
const getDbStudents = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
      const student = JSON.parse(data);
      resolve(student);
    });
  });
};

module.exports.getDbStudents = getDbStudents;
