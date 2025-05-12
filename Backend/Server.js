// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer = require("multer");
const path = require("path");

const moment = require("moment");
const XLSX = require("xlsx"); // Make sure XLSX is required if handling numeric dates

const cors = require('cors');
app.use(cors());

const PORT = 3001;


const mysql = require('mysql');

const config = require('./config');

// const mysql = require('mysql2');
// const fs = require("fs");

app.use(express.json());
const fs = require("fs");
app.use(express.urlencoded({ extended: true }));

// Serve static files (certificate uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// File Upload Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Store files in 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage });











// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File Filter to Accept Specific Formats
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|pdf|xlsx|xls|csv/; // Allowed formats
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Invalid file type. Only images, PDFs, and Excel files are allowed."), false);
  }
};

// Multer Upload Configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});


// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',      
//   password: 'Mysql-prakashs', 
//   database: 'CGR'  
// });



const db = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
});



db.getConnection((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;
app.use(bodyParser.json());



// API to Add Worker
// app.post('/addworker', (req, res) => {
//     const {
//       EmpId, CompanyName, FullName, ExpYear, ContNum, BankAccNum, SelectFeilds, Department, Age, Gender,
//       EmergencyContNum, PanTaxId, SelectRole, FinNo, DOA, DOI, DO_Onboard, WP_No, PP_No, DOB,
//       DO_ThumbPrint, DO_Renewal, WP_Expiry, PP_Expiry, SelectCourse, Category, Cert_No, DOE,
//       SMSE, Rigger, ssrc_sssrc, Levels, DOI_Two, BalanceDays, WAHA_M, Singnel_Man
//     } = req.body;
  
//     const sql = `INSERT INTO addworker (EmpId, CompanyName, FullName, ExpYear, ContNum, BankAccNum, SelectFeilds, Department, Age, Gender,
//       EmergencyContNum, PanTaxId, SelectRole, FinNo, DOA, DOI, DO_Onboard, WP_No, PP_No, DOB,
//       DO_ThumbPrint, DO_Renewal, WP_Expiry, PP_Expiry, SelectCourse, Category, Cert_No, DOE,
//       SMSE, Rigger, ssrc_sssrc, Levels, DOI_Two, BalanceDays, WAHA_M, Singnel_Man)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
//     db.query(sql, [
//       EmpId, CompanyName, FullName, ExpYear, ContNum, BankAccNum, SelectFeilds, Department, Age, Gender,
//       EmergencyContNum, PanTaxId, SelectRole, FinNo, DOA, DOI, DO_Onboard, WP_No, PP_No, DOB,
//       DO_ThumbPrint, DO_Renewal, WP_Expiry, PP_Expiry, SelectCourse, Category, Cert_No, DOE,
//       SMSE, Rigger, ssrc_sssrc, Levels, DOI_Two, BalanceDays, WAHA_M, Singnel_Man
//     ], (err, result) => {
//       if (err) {
//         console.error('Error inserting data:', err);
//         return res.status(500).json({ error: 'Database insertion failed' });
//       }
//       res.status(201).json({ message: 'Worker added successfully', workerId: result.insertId });
//     });
//   });



// Add Worker 


// app.post("/addworker", (req, res) => {
//     const data = req.body;
      
//         // Ensure SelectFeilds is stored as a JSON string
//     const selectFieldsString = JSON.stringify(data.SelectFeilds);

    app.post("/addworker", upload.single("ProfileImg"), (req, res) => {
      const data = JSON.parse(req.body.data); // sent as JSON string in `data` field from frontend
      const profileImgPath = req.file ? req.file.path : null; // file path from multer
    
      const selectFieldsString = JSON.stringify(data.SelectFeilds);

    const query = `INSERT INTO addworker (EmpId, EmpPosition, CompanyName, FirstName, LastName, ExpYear, ContNum, BankAccNum, SelectFeilds, Department, Age, Gender,
      EmergencyContNum, PanTaxId, SelectRole, FinNo, DOA, DOI, DO_Onboard, WP_No, PP_No, DOB,
      DO_ThumbPrint, DO_Renewal, WP_Expiry, WP_BalDays, PP_Expiry, PP_BalDays, SelectCourse, Category, Cert_No, DOE,
      SMSE, Rigger, ssrc_sssrc, Levels, DOI_Two, BalanceDays, WAHA_M, Singnel_Man, ProfileImg)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      data.EmpId, data.EmpPosition, data.CompanyName, data.FirstName, data.LastName, data.ExpYear, data.ContNum, 
      data.BankAccNum,selectFieldsString, data.Department, data.Age, 
      data.Gender, data.EmergencyContNum, data.PanTaxId, data.SelectRole, data.FinNo, data.DOA, 
      data.DOI, data.DO_Onboard, data.WP_No, data.PP_No, data.DOB, data.DO_ThumbPrint, data.DO_Renewal, data.WP_Expiry, data.WP_BalDays, data.PP_Expiry,  data.PP_BalDays,
      data.SelectCourse, data.Category, data.Cert_No, data.DOE, data.SMSE, data.Rigger, data.ssrc_sssrc, data.Levels,
      data.DOI_Two, data.BalanceDays, data.WAHA_M, data.Singnel_Man, profileImgPath
    ];
  
    db.query(query, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error inserting data", error: err });
      }
      res.json({ message: "Worker added successfully!" });
    });
  });


  // get worker details finno based particular worker data

  app.get("/addworker/:finNo", (req, res) => {
    const { finNo } = req.params;
  
    const query = "SELECT * FROM addworker WHERE FinNo = ?";
    db.query(query, [finNo], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching worker data", error: err });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "No worker found with that FinNo" });
      }
  
      res.json(results[0]); // return single result
    });
  });
  
  



//   app.get("/getworkers", (req, res) => {
//     db.query("SELECT * FROM addworker", (err, results) => {
//       if (err) {
//         return res.status(500).json({ message: "Error fetching data", error: err });
//       }
  
//       // Parse SelectFeilds before sending response
//       const formattedResults = results.map(worker => ({
//         ...worker,
//         SelectFeilds: JSON.parse(worker.SelectFeilds || "[]") // Ensure it's an array
//       }));
  
//       res.json(formattedResults);
//     });
//   });
  


// GET Worker by FinNo
app.get('/addworker', (req, res) => {
  const { FinNo } = req.query;
  if (!FinNo) return res.status(400).json({ error: "FIN No is required" });

  const sql = "SELECT FirstName, LastName, DOB FROM addworker WHERE FinNo = ?";
  db.query(sql, [FinNo], (err, result) => {
      if (err) return res.status(500).json({ error: "Database Error" });
      if (result.length === 0) return res.status(404).json({ error: "Worker not found" });

      res.json(result[0]);
  });
});




// addcertificate

// app.post("/addcertificate", async (req, res) => {
//   const { FinNo, BasicSafetyCourse, RopeAccessCourse, MetalScaffoldCourse, LiftingCourse } = req.body;

//   try {
//     await db.query(`
//       INSERT INTO addcertificate (FinNo, BasicSafetyCourse, RopeAccessCourse, MetalScaffoldCourse, LiftingCourse)
//       VALUES (?, ?, ?, ?, ?)`, [FinNo, BasicSafetyCourse || null, RopeAccessCourse || null, MetalScaffoldCourse || null, LiftingCourse || null]);

//     res.json({ message: "Certificate data added successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Database insertion failed" });
//   }
// });



// app.post("/addcertificate", upload.any(), (req, res) => {
//   const { FinNo } = req.body;
//   let query = `INSERT INTO addcertificate (FinNo, BasicSafetyCourse, RopeAccessCourse, MetalScaffoldCourse, LiftingCourse, BasicSafetyCourseFile, RopeAccessCourseFile, MetalScaffoldCourseFile, LiftingCourseFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   const data = [
//     FinNo,
//     req.body.BasicSafetyCourse || null,
//     req.body.RopeAccessCourse || null,
//     req.body.MetalScaffoldCourse || null,
//     req.body.LiftingCourse || null,
//     req.files.find((file) => file.fieldname === "BasicSafetyCourse_file")?.filename || null,
//     req.files.find((file) => file.fieldname === "RopeAccessCourse_file")?.filename || null,
//     req.files.find((file) => file.fieldname === "MetalScaffoldCourse_file")?.filename || null,
//     req.files.find((file) => file.fieldname === "LiftingCourse_file")?.filename || null,
//   ];

//   db.query(query, data, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Database error" });
//     }
//     res.json({ message: "Certificates added successfully" });
//   });
// });



// add options

// Fetch fields
app.get("/feilds", (req, res) => {
  db.query("SELECT * FROM feilds", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});



// Add new field
app.post("/feilds", (req, res) => {
  const { Feilds } = req.body;
  db.query("INSERT INTO feilds (Feilds) VALUES (?)", [Feilds], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, Feilds });
  });
});

// Delete field
app.delete("/feilds/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM feilds WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Field deleted" });
  });
});


// get feilds column 

app.get("/feilds", (req, res) => {
  db.query("SELECT Feilds FROM feilds", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});









// add roles

// app.get("/roles", (req, res) => {
//   db.query("SELECT * FROM roles", (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// });

// app.post("/roles", (req, res) => {
//   const { Roles } = req.body;
//   db.query("INSERT INTO roles (Roles) VALUES (?)", [Roles], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json({ id: result.insertId, Roles });
//   });
// });


// app.delete("/roles/:id", (req, res) => {
//   const { id } = req.params;
//   db.query("DELETE FROM roles WHERE id = ?", [id], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: "Role deleted successfully!" });
//   });
// });


// get Roles column
// app.get("/roles", (req, res) => {
//   db.query("SELECT * FROM roles", (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// });






// Department

// Fetch all departments
app.get("/departments", (req, res) => {
  db.query("SELECT * FROM Department", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Add a new department
app.post("/departments", (req, res) => {
  const { Department } = req.body;
  db.query("INSERT INTO Department (Department) VALUES (?)", [Department], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Department added successfully!" });
  });
});

// Delete a department by ID
app.delete("/departments/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Department WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Department deleted successfully!" });
  });
});

// particular column get in Department
app.get("/departments", (req, res) => {
  db.query("SELECT id, Department FROM Department", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});










// worker table view

app.get("/workers", (req, res) => {
  const sql = "SELECT Id, EmpId, EmpPosition, FirstName, LastName, ContNum, FinNo, SelectFeilds, Gender FROM addworker";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});




// get particular worker details 

app.get("/workers/:finNo", (req, res) => {
  const finNo = req.params.finNo;
  db.query("SELECT * FROM addworker WHERE FinNo = ?", [finNo], (err, result) => {
    if (err) {
      console.error("Error fetching worker details:", err);
      res.status(500).json({ error: "Error fetching worker details" });
    } else {
      res.json(result[0]);
    }
  });
});



// get particular worker certificate

// app.get("/certificates/:FinNo", (req, res) => {
//   const { FinNo } = req.params;
//   const sql = "SELECT * FROM addcertificate WHERE FinNo = ?";
  
//   db.query(sql, [FinNo], (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (result.length === 0) return res.status(404).json({ message: "No certificate found" });
//     res.json(result[0]);
//   });
// });



// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Ensure 'uploads' directory exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

app.post("/certificates", upload.single("CertificateFile"), async (req, res) => {
  try {
    const {
      FinNo,
      CertificateName,
      Category,
      CertNo,
      Expiry,
      BalanceDays,
      Levels,
      Smse,
      IssueDate,
      WahaM,
      Rigger,
      SignalMan,
      SsrcSssrc,
      CourseTitle,
      CourseTitleTwo,
    } = req.body;

    const CertificateFile = req.file ? req.file.filename : null;

    const sql = `INSERT INTO certificate (FinNo, CertificateName, Category, CertNo, Expiry, BalanceDays, Levels, Smse, IssueDate, WahaM, Rigger, SignalMan, SsrcSssrc, CourseTitle, CourseTitleTwo, CertificateFile)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [FinNo, CertificateName, Category, CertNo, Expiry, BalanceDays, Levels, Smse, IssueDate, WahaM, Rigger, SignalMan, SsrcSssrc, CourseTitle, CourseTitleTwo, CertificateFile], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "Certificate added successfully", id: result.insertId });
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});







// GET - Fetch Certificate Records
app.get("/certificates", (req, res) => {
  const sql = "SELECT * FROM certificate";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching certificates:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

// GET - Download Certificate File
app.get("/certificates/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});



// Fetch Certificates by FinNo
// app.get("/certificates/:FinNo", (req, res) => {
//   const { FinNo } = req.params;
//   const sql = "SELECT * FROM certificate WHERE FinNo = ?";
  
//   db.query(sql, [FinNo], (err, results) => {
//     if (err) {
//       console.error("Error fetching certificates:", err);
//       return res.status(500).json({ error: "Failed to fetch certificates" });
//     }
//     res.json(results);
//   });
// });


// delete the particular row in certificate table

app.delete("/certificates/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM certificate WHERE Id = ?", [id]);
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting certificate" });
  }
});



// finno based worker view details for certificate
app.get("/certificates/:FinNo", (req, res) => {
  const FinNo = req.params.FinNo;
  const sql = "SELECT * FROM certificate WHERE FinNo = ?";
  
  db.query(sql, [FinNo], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});



// finno based worker view details for certificate download

app.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  res.download(filePath, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).send("Error downloading file");
    }
  });
});




// education post

app.post("/upload-education", upload.single("EducationFile"), (req, res) => {
  const { FinNo, Education } = req.body;
  const filePath = req.file ? req.file.filename : null;

  // console.log("Received FinNo:", FinNo, "Education:", Education, "File:", filePath); // Debugging

  if (!FinNo || !Education || !filePath) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO education (FinNo, Education, EducationFile) VALUES (?, ?, ?)";
  db.query(sql, [FinNo, Education, filePath], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database insertion failed" });
    }
    res.status(200).json({ message: "Education details uploaded successfully!" });
  });
});






// education particular value get finno based
app.get("/education/:FinNo", (req, res) => {
  const { FinNo } = req.params;
  const sql = "SELECT * FROM education WHERE FinNo = ?";
  
  db.query(sql, [FinNo], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Failed to fetch education data" });
    }
    res.status(200).json(result);
  });
});


// education particular value drop finno based
app.delete("/education/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM education WHERE Id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Education record deleted successfully!" });
  });
});







// addworkerreportfiles

app.post('/workerreportfiles', upload.fields([
  { name: 'IPA' }, { name: 'Passport' }, { name: 'Bond' },
  { name: 'Onboard' }, { name: 'Medical' }, { name: 'Issuance' },
  { name: 'MOMThumbPrint' }, { name: 'IC' }, { name: 'Contract' }
]), (req, res) => {
  const { FinNo } = req.body;
  const filePaths = req.files;

  const fileData = {
      FinNo,
      IPA: filePaths.IPA ? filePaths.IPA[0].filename : null,
      Passport: filePaths.Passport ? filePaths.Passport[0].filename : null,
      Bond: filePaths.Bond ? filePaths.Bond[0].filename : null,
      Onboard: filePaths.Onboard ? filePaths.Onboard[0].filename : null,
      Medical: filePaths.Medical ? filePaths.Medical[0].filename : null,
      Issuance: filePaths.Issuance ? filePaths.Issuance[0].filename : null,
      MOMThumbPrint: filePaths.MOMThumbPrint ? filePaths.MOMThumbPrint[0].filename : null,
      IC: filePaths.IC ? filePaths.IC[0].filename : null,
      Contract: filePaths.Contract ? filePaths.Contract[0].filename : null
  };

  db.query('INSERT INTO workerreportfiles SET ?', fileData, (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Database error');
      } else {
          res.status(200).send('Worker Report Files Uploaded Successfully');
      }
  });
});


// get report data based on Finno
app.get('/workerreportfiles/:finNo', (req, res) => {
  const finNo = req.params.finNo;
  db.query('SELECT * FROM workerreportfiles WHERE FinNo = ?', [finNo], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "Worker report not found" });
    }
  });
});

// Serve file for (download)
app.get('/download/workerreportfile/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename); // Adjust path
  res.download(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Error sending file');
    }
  });
});

// Serve file for viewing (not download)
app.get('/view/workerreportfile/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename); // Adjust as needed

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file for view:", err);
      res.status(500).send("Error viewing file");
    }
  });
});




// Fetch all certificates
app.get("/getcertificates", (req, res) => {
  db.query("SELECT * FROM CertificateList", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a certificate
app.post("/postcertificates", (req, res) => {
  const { CertificateList } = req.body;

  if (!CertificateList || CertificateList.trim() === "") {
    return res.status(400).json({ error: "Certificate name cannot be empty" });
  }

  db.query(
    "INSERT INTO CertificateList (CertificateList) VALUES (?)",
    [CertificateList],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Certificate added successfully", id: result.insertId });
    }
  );
});

// Delete a certificate
app.delete("/dropcertificates/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  db.query("DELETE FROM CertificateList WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Certificate deleted successfully" });
  });
});



















const tableColumns = [
  "EmpId", "EmpPosition", "CompanyName", "FirstName", "LastName", "ExpYear", "ContNum",
  "BankAccNum", "SelectFeilds", "Department", "Age", "Gender", "EmergencyContNum",
  "PanTaxId", "SelectRole", "FinNo", "DOA", "DOI", "DO_Onboard", "WP_No", "WP_BalDays",
  "PP_No", "PP_BalDays", "DOB", "DO_ThumbPrint", "DO_Renewal", "WP_Expiry", "PP_Expiry",
  "SelectCourse", "Category", "Cert_No", "DOE", "SMSE", "Rigger", "ssrc_sssrc",
  "Levels", "DOI_Two", "BalanceDays", "WAHA_M", "Singnel_Man" ,"ProfileImg"
];

app.post("/upload-excel", (req, res) => {
  const { data } = req.body;

  if (!data || data.length === 0) {
    return res.status(400).json({ error: "No data received from Excel" });
  }

  const matchedData = data.map((row) => {
    let formattedRow = {};

    Object.keys(row).forEach((key) => {
      const columnName = tableColumns.find(col => col.toLowerCase() === key.toLowerCase());
      if (columnName) {
        let value = row[key];

        // ✅ Correcting DOB Format
        if (["DOB", "DOA", "WP_Expiry", "PP_Expiry"].includes(columnName) && value) {
          if (!isNaN(value)) {
            // Convert Excel numeric date to YYYY-MM-DD
            const date = XLSX.SSF.parse_date_code(Number(value));
            value = moment.utc({ year: date.y, month: date.m - 1, day: date.d }).format("YYYY-MM-DD");
          } else if (typeof value === "string") {
            // Handle text-based dates (e.g., 12-11-2025 or 12/11/2025)
            let parsedDate = moment(value, ["DD-MM-YYYY", "DD/MM/YYYY", "YYYY-MM-DD"], true);
            if (parsedDate.isValid()) {
              value = parsedDate.format("YYYY-MM-DD");
            } else {
              console.warn(`Invalid DOB format: ${value}`);
              value = null; // Skip invalid date
            }
          }
        }

        formattedRow[columnName] = value;
      }
    });

    return formattedRow;
  });

  // ✅ Insert Matched Data into MySQL
  const insertPromises = matchedData.map((row) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO addworker SET ?", row, (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });

  // Wait for all insert queries to finish
  Promise.all(insertPromises)
    .then(() => res.json({ message: "Excel data successfully inserted!" }))
    .catch(() => res.status(500).json({ error: "Error inserting some rows" }));
});






// add company list
// Add company
app.post("/addCompany", (req, res) => {
  const { companyName } = req.body;
  const sql = "INSERT INTO CompanyList (CompanyList) VALUES (?)";
  db.query(sql, [companyName], (err, result) => {
    if (err) return res.status(500).json(err);
    const newCompany = { id: result.insertId, CompanyList: companyName };
    res.json(newCompany);
  });
});


// Get all company list
app.get("/getCompanies", (req, res) => {
  db.query("SELECT * FROM CompanyList", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});


// delete particular company name
app.delete("/deleteCompany/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM CompanyList WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200); // or res.json({ message: 'Deleted' });
  });
});






// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
  

  app.listen(config.serverPort, () => {
    console.log(`Server running on http://${config.serverHost}:${config.serverPort}`);
  });
