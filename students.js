const express = require("express");
const router = express.Router();

const Database = require("nedb");
const students = new Database({
  filename: "database/students.db",
  autoload: true,
});

//to update netlify or any react app or any url for CORS:
// var corsOptions = {
//   origin: ["http://localhost:3000"],
//   optionsSuccessStatus: 200 // For legacy browser support
// }
// app.use(cors(corsOptions));
// const cors = require("cors");

// Get all students from particular city
// Endpoint: /api/v1/students/city/:cityVar;
router.get("/city/:cityVar", async (req, res) => {
  try {
    await students.find({ city: req.params.cityVar }).exec((err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error in the DB" });
      }
      if (data != null && data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(400).json({ message: "No student from this city" });
      }
    });
  } catch {
    res.status(500).json({ message: "Error in this API" });
  }
});

// Get the avg.score for all the students
// Endpoint: /api.v1/students/avgScore;

router.get("/:avgScore", async (req, res) => {
  try {
    await students.find({ city: req.params.cityVar }).exec((err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error in the DB" });
      }
      if (data != null && data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(400).json({ message: "No student from this city" });
      }
    });
  } catch {
    res.status(500).json({ message: "Error in this API" });
  }
});

router.get("/", async (req, res) => {
  try {
    await students.find({}).exec((err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error in the DB" });
      }
      res.send(data);
    });
  } catch {
    res.status(500).json({ message: "Error in this API" });
  }
});

// name, email, phone, roll number, city

router.post("/", async (req, res) => {
  try {
    await students.insert(req.body);
    res.status(200).json({ message: "Student added successfully" });
  } catch {
    res.status(500).json({ message: "Error in this API" });
  }
});

router.patch("/:idVariable", async (req, res) => {
  try {
    await students.update(
      { _id: req.params.idVariable },
      req.body,
      { upsert: false },
      (err, isDataUpdated) => {
        if (err) {
          return res.status(500).json({ message: "Error in the DB" });
        }
        if (isDataUpdated) {
          res.status(200).json({
            message:
              "Student name: " + req.body.name + " updated Successfully.",
          });
        } else {
          res
            .status(400)
            .json({ message: "Student with this ID does not exist." });
        }
      }
    );
  } catch {
    res.status(500).json({ message: "Error in this API" });
  }
});

router.delete("/:idVariable", async (req, res) => {
  try {
    await students.remove(
      { _id: req.params.idVariable },
      (err, isDataDeleted) => {
        if (err) {
          return res.status(500).json({ message: "Error in the DB" });
        }
        if (isDataDeleted) {
          res.status(200).json({ message: "Student Deleted Successfully." });
        } else {
          res.status(400).json({ message: "Student ID does not exist." });
        }
      }
    );
  } catch {
    res.status(500).json({ message: "Error in this API" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await students.remove({}, { multi: true }, (err, isDataDeleted) => {
      if (err) {
        return res.status(500).json({ message: "Error in the DB" });
      }
      if (isDataDeleted) {
        res.status(200).json({ message: "Students Deleted Successfully." });
      } else {
        res.status(400).json({ message: "Students Data does not exist." });
      }
    });
  } catch {
    res.status(500).json({ message: "Error in this API" });
  }
});

module.exports = router;
