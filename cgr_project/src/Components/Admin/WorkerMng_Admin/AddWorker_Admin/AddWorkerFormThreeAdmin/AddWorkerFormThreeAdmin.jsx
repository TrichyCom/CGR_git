import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { FaExclamationCircle } from 'react-icons/fa';
import { FaGraduationCap } from 'react-icons/fa'; // Graduation cap from FontAwesome
import DefaultImg from '../../../../../../public/assets/img/DefaultProfile/defaultprofile.png';
import ComLogo from '../../../../../../public/assets/img/Logo/Clogo.jpeg'
import { AiOutlineWarning } from "react-icons/ai";

const AddWorkerFormThreeAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FinNo: "",
    CertificateName: "",
    Category: "",
    CertNo: "",
    Expiry: "",
    BalanceDays: "0",
    Levels: "",
    Smse: "",
    IssueDate: "",
    WahaM: "",
    Rigger: "",
    SignalMan: "",
    SsrcSssrc: "",
    CourseTitle: "",
    CourseTitleTwo: "",
  });

  const [certificateFile, setCertificateFile] = useState(null);
  const [certificateData, setCertificateData] = useState([]);
  const handleFocus = (e) => {
    // Optional: You can execute additional logic when the input is focused
    console.log('Date Picker Focused');
  };
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("workerData")) || {};
    setFormData((prevData) => ({ ...prevData, ...storedData }));
  }, []);

  // Fetch data function
  const fetchData = () => {
    if (formData.FinNo) {
      axios.get(`${process.env.REACT_APP_API_URL}/certificates/${formData.FinNo}`)
        .then((response) => {
          setCertificateData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching certificate data:", error);
        });
    }
  };

  // Auto-refresh every 5 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 sec
    return () => clearInterval(interval);
  }, [formData.FinNo]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
  
// If both Expiry and current date are set, calculate BalanceDays
if (newData.Expiry) {
  const currentDate = new Date(); // Get today's date
  const expiryDate = new Date(newData.Expiry);

  // Ensure expiry date is valid
  if (!isNaN(expiryDate)) {
    // Calculate the difference in time (in milliseconds)
    const timeDifference = expiryDate - currentDate;

    // Convert time difference to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Set the BalanceDays value (ensure it's a positive value)
    newData.BalanceDays = daysDifference >= 0 ? daysDifference : 0; // Prevent negative days

  } else {
    newData.BalanceDays = '0'; // Reset BalanceDays if Expiry is invalid
  }
}


          // If either date is missing, keep BalanceDays as "0"
    // if (!newData.IssueDate || !newData.Expiry) {
    //   newData.BalanceDays = '0';
    // }
  
      return newData;
    });
  };
  





  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setCertificateFile(e.target.files[0]);
    }
  };



  // Handle navigation to previous form
  const handlePre = () => {
    localStorage.setItem("workerData", JSON.stringify(formData));
    navigate("/addworkerformtwomain");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/certificates/${id}`);
      setCertificateData(certificateData.filter((cert) => cert.Id !== id));
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  // const handleSubmit = async (e) => {
    
  //   e.preventDefault();

  //   if (!formData.FinNo) {
  //     alert("Please enter FinNo.");
  //     return;
  //   }

  //   // Convert SelectFields array to a string before sending to the backend
  //   const formattedData = {
  //     ...formData,
  //     SelectFields: JSON.stringify(formData.SelectFields),
  //   };

  //   try {
  //     const response = await fetch("http://localhost:3001/addworker", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formattedData),
  //     });

  //     const result = await response.json();
  //     console.log(result.message);
  //     alert("Worker added successfully!");
  //     localStorage.removeItem("workerData");

  //     localStorage.removeItem("selectedInputNames");

   
  //     // setFormData({}); // Clear form data
  //     // setSelectedInputNames([]); // Clear selected names

  //     navigate("/workermngadmin");
  //     setFormData({
  //       SelectCourse: "",
  //       Category: "",
  //       Levels: "",
  //       Cert_No: "",
  //       DOI: "",
  //       DOE: "",
  //       BalanceDays: "0",
  //       SMSE: "",
  //       WAHA_M: "",
  //       Rigger: "",
  //       ssrc_sssrc: "",
  //       Singnel_Man: "",
  //       SelectFields: [],
  //     });


  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };




    const uploadDefaultImage = () => {
      return fetch(DefaultImg) // DefaultImg must be an imported path
        .then(res => res.blob())
        .then(blob => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              localStorage.setItem("workerProfileImg", reader.result);
              resolve(); // ensure we wait before continuing
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        })
        .catch(err => {
          console.error("Error loading default image:", err);
        });
    };
    
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [alertModal, setAlertModal] = useState({ show: false, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.FinNo) {
      // alert("Please enter FinNo.");
      setAlertModal({ show: true, message: "Please enter FinNo." });
      return;
    }
  

      // Check if image not uploaded, and upload default if needed
  if (!localStorage.getItem("workerProfileImg")) {
    await uploadDefaultImage(); // make sure this finishes first
  }


    const base64Image = localStorage.getItem("workerProfileImg");
    const formDataToSend = new FormData();
  
    // Convert base64 to File (Blob)
    if (base64Image) {
      const byteString = atob(base64Image.split(",")[1]);
      const mimeString = base64Image.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "profile_image.jpg", { type: mimeString });
      formDataToSend.append("ProfileImg", file);
    }
  
    // Format SelectFields as string
    const allWorkerData = {
      ...formData,
      SelectFields: formData.SelectFields, // keep it as array; backend stringifies it
    };
  
    formDataToSend.append("data", JSON.stringify(allWorkerData));
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/addworker`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // alert("Worker added successfully!");
      console.log(res.data.message);

      console.log("Setting modal to true...");
      setShowSuccessModal(true);
      

      localStorage.removeItem("workerProfileImg");
      localStorage.removeItem("workerData");
      localStorage.removeItem("selectedInputNames");
      
      // navigate("/workermngadmin");
   
      setFormData({
        SelectCourse: "",
        Category: "",
        Levels: "",
        Cert_No: "",
        DOI: "",
        DOE: "",
        BalanceDays: "0",
        SMSE: "",
        WAHA_M: "",
        Rigger: "",
        ssrc_sssrc: "",
        Singnel_Man: "",
        SelectFields: [],
      });
  
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("Upload failed!");
      setAlertModal({ show: true, message: "Upload failed!" });
    }
  };
  


  const [topAlert, setTopAlert] = useState({ show: false, message: "" });

  

  const handleUpload = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (certificateFile) {
      formDataToSend.append("CertificateFile", certificateFile);
    }
    if (!formData.FinNo) {
      // alert("FinNo is missing. Please check the stored data.");
      setAlertModal({ show: true, message: "FinNo is missing. Please check the stored data." });
      return;
    }

    if (!formData.CertificateName || !certificateFile) {
      // alert("Please enter an certificate upload a file.");
      setAlertModal({ show: true, message: "Please enter an certificate upload a file." });
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/certificates`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // alert("Certificate Added Successfully!");
      setTopAlert({ show: true, message: "Certificate Added Successfully!" });
      setTimeout(() => setTopAlert({ show: false, message: "" }), 2000);
      // Clear file state
      setCertificateFile(null);

      // **Manually clear file input**
      document.getElementById("fileInput").value = "";

      // Clear form but keep FinNo to avoid losing data
      setFormData((prev) => ({
        ...prev,
        CertificateName: "",
        Category: "",
        CertNo: "",
        CertNoTwo: "",
        Expiry: "",
        BalanceDays: "0",
        Levels: "",
        Smse: "",
        IssueDate: "",
        WahaM: "",
        Rigger: "",
        SignalMan: "",
        SsrcSssrc: "",
        CourseTitle: "",
        CourseTitleTwo: "",

      }));

      // Refresh GET request after upload
      fetchData();

    } catch (error) {
      alert("Failed to add certificate.");
    }
  };








  const [formDataeducation, setFormDataeducation] = useState({
  
    Education: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle dropdown change
  const handleInputChangeeducation = (e) => {
    setFormDataeducation({ ...formDataeducation, Education: e.target.value });
  };

  // Handle file selection
  const handleFileChangeeducation = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  
  

  // const UploadEducation = async (e) => {
  //   e.preventDefault();
  
  //   console.log("Current formDataeducation:", formDataeducation); // Debugging
  
  //   if (!formDataeducation.FinNo) {
  //     alert("FinNo is missing. Please check the stored data.");
  //     return;
  //   }
  
  //   if (!formDataeducation.Education || !selectedFile) {
  //     alert("Please enter FinNo, select an education level, and upload a file.");
  //     return;
  //   }
  
  //   const formDataToSend = new FormData();
  //   formDataToSend.append("FinNo", formDataeducation.FinNo);
  //   formDataToSend.append("Education", formDataeducation.Education);
  //   formDataToSend.append("EducationFile", selectedFile);
  
  //   console.log("Uploading Education with FinNo:", formDataeducation.FinNo); // Debugging
  
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3001/upload-education",
  //       formDataToSend,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     alert(response.data.message);
  //     fetchDataeducation(); // Refresh data after upload
  //   } catch (error) {
  //     console.error("Error uploading education data:", error);
  //     alert("Failed to upload education data.");
  //   }
  // };
  
  // Ensure FinNo is set correctly from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("workerData")) || {};
    console.log("Loaded FinNo from localStorage:", storedData.FinNo); // Debugging
  
    setFormDataeducation((prevData) => ({
      ...prevData,
      FinNo: storedData.FinNo || "", // Ensure FinNo is assigned correctly
    }));
  }, []);
  
  
  



  const [education, setEducation] = useState([]);
// const [formData, setFormData] = useState({ FinNo: "" });

useEffect(() => {
  // Ensure FinNo is loaded from localStorage first
  const storedData = JSON.parse(localStorage.getItem("workerData")) || {};
  if (storedData.FinNo) {
    setFormData((prevData) => ({ ...prevData, FinNo: storedData.FinNo }));
  }
}, []); // Runs only once when the component mounts

useEffect(() => {
  if (formData.FinNo) {
    fetchEducationData(formData.FinNo); // Fetch data immediately

    const interval = setInterval(() => {
      fetchEducationData(formData.FinNo);
    }, 5000); // Auto-refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }
}, [formData.FinNo]); // Runs when FinNo is updated

const fetchEducationData = async (finNo) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/education/${finNo}`);
    setEducation(response.data);
  } catch (error) {
    console.error("Error fetching education data:", error);
  }
};

const UploadEducation = async (e) => {
  e.preventDefault();

  if (!formData.FinNo) {
    // alert("FinNo is missing. Please check the stored data.");
    setAlertModal({ show: true, message: "FinNo is missing. Please check the stored data." });
    return;
  }

  if (!formDataeducation.Education || !selectedFile) {
    // alert("Please enter an education level and upload a file.");
    setAlertModal({ show: true, message: "Please enter an education level and upload a file." });
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append("FinNo", formData.FinNo);
  formDataToSend.append("Education", formDataeducation.Education);
  formDataToSend.append("EducationFile", selectedFile);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/upload-education`,
      formDataToSend,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    // alert(response.data.message);
          setTopAlert({ show: true, message: "Education details uploaded successfully!" });
      setTimeout(() => setTopAlert({ show: false, message: "" }), 2000);
    
    fetchEducationData(formData.FinNo); // Refresh data immediately after upload
    // Clear the select input and file input
    setFormDataeducation((prev) => ({ ...prev, Education: "" })); 
    document.getElementById("educationfileinput").value = ""; // Clear file input
  } catch (error) {
    console.error("Error uploading education data:", error);
    alert("Failed to upload education data.");
  }
};





  // Handle Delete Function
  const handleDeleteEducation = async (id) => {
    // if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/education/${id}`);
      setEducation(education.filter((edu) => edu.Id !== id));
      // alert("Education record deleted successfully!");
      setTopAlert({ show: true, message: "Education record deleted successfully!" });
      setTimeout(() => setTopAlert({ show: false, message: "" }), 2000);
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record.");
    }
  };

  const [certificates, setCertificates] = useState([]);

useEffect(() => {
  fetchCertificates();
}, []);

const fetchCertificates = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/getcertificates`);
    setCertificates(response.data); // Store fetched data in state
  } catch (error) {
    console.error("Error fetching certificates:", error);
  }
};








  return (
    <div id="content" className="app-content">
      <div className="conainer">
      <div class="d-lg-flex mb-lg-3 mb-2">
                          <h1 class="page-header mb-6 flex-1" id='data' > <span className="bg-dark text-white px-4 py-1 border-primary border-4 border rounded-start rounded-5">WORKERS MANAGEMENT</span></h1>
                          <div class="row gx-2 pb-lg-3 pb-2"></div>
  
                          <span class="d-none d-lg-flex align-items-center mx-2">
                          {/* <Link to="/addworkerformadmin" className="btn yellowtext btn-sm d-flex pe-3 fw-bold backbuttonborder" >
                                  <span class="iconify fs-18px me-2 ms-n1" data-icon="solar:refresh-bold-duotone"></span>
                                 Back
                              </Link> */}
                              </span>
  
                              
                      </div>
                      <div className="border border-2 rounded mb-2 border-dark"></div>
                  <h4 className="page-heade bluetext fw-bold mb-0 mt-4">
                 
                    ADD WORKER <small className="text-dark fw-100 fs-6"> please enter worker details here... </small>
                  </h4>
          <hr className="mb-3 opacity-3" />
          <div className="row justify-content-center">
          <div className="col-xl-12">
        <div className="row">
        <div className="col-xl-6">
        <div className="card">
          <div className="card-header yellowtext fs-6 fw-bold">WORKER DETAILS</div>
          <div className="card-body pb-2">
            <form>
              {/* <div className="mb-3">
                <label className="form-label">FinNo</label>
                <input
                  type="text"
                  className="form-control input"
                  name="FinNo"
                  value={formData.FinNo}
                  onChange={handleInputChange}
                  required
                />
              </div> */}

              <div className="row">
                <div className="col-xl-6">
                  <div className="mb-3">
                    <label className="form-label">Certificate</label>
                    <select
                      className="form-select selectinput"
                      name="CertificateName"
                      value={formData.CertificateName}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Certificate</option>
  
  {certificates.map((cert) => (
    <option key={cert.id} value={cert.CertificateList}>
      {cert.CertificateList}
    </option>
  ))}
                    </select>

                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="mb-3">
                    <label className="form-label">Upload Certificate</label>
                    <input
                      type="file"
                      id="fileInput"  // Add this ID
                      className="form-control input ps-3 border border-light"
                      onChange={handleFileChange}
                      accept="*/*"
                    />
                  </div>
                </div>
              </div>


                  <div className="">
                  <div className="row">
                    <div className="col-xl-3">
                      <div className="mb-3">
                        <label className="form-label">CertNo</label>
                        <input
                          type="text"
                          className="form-control input"
                          name="CertNo"
                          value={formData.CertNo}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3">
                      <div className="mb-3">
                        <label className="form-label">IssueDate</label>
                        {/* <input
                          type="date"
                          className="form-control input"
                          name="IssueDate"
                          value={formData.IssueDate}
                          onChange={handleInputChange}
                          onFocus={(e) => e.target.showPicker()}
                        /> */}

<input
  type="date"
  className="form-control input"
  name="IssueDate"
  value={formData.IssueDate}
  onChange={handleInputChange}
  onFocus={(e) => e.target.showPicker()}
  max={new Date().toISOString().split("T")[0]} 
/>

                      </div>
                    </div>
                    <div className="col-xl-3">
                      <div className="mb-3">
                        <label className="form-label">Expiry</label>
                        {/* <input
                          type="date"
                          className="form-control input"
                          name="Expiry"
                          value={formData.Expiry}
                          onChange={handleInputChange}
                          onFocus={(e) => e.target.showPicker()}
                        /> */}
                        <input
  type="date"
  className="form-control input"
  name="Expiry"
  value={formData.Expiry}
  onChange={handleInputChange}
  onFocus={(e) => e.target.showPicker()}
  min={new Date().toISOString().split("T")[0]} // Prevent past dates
/>

                      </div>
                    </div>
                    <div className="col-xl-3">
                      <div className="mb-3">
                        <label className="form-label">Balance Days</label>
                        <input
                          type="text"
                          className="form-control input text-warning"
                          name="BalanceDays"
                          value={formData.BalanceDays || '0'}
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  </div>
     

             

              <div className="mx-auto text-center mt-3">
                <button type="submit" className="btn btn-primary w-25 fw-bold rounded" onClick={handleUpload}>
                  Upload
                </button>
              </div>

            </form>
<div className="border border-3 mt-3"></div>
            <div className="mt-4">
              <h3>Uploaded Certificates</h3>
              {certificateData.length > 0 ? (
                <div id="certificateTableWrapper">
                <table className="table table-bordered " >
                  <thead className="">
                    <tr className="bg-dark">
                      <th>FinNo</th>
                      <th>Certificate Name</th>
                      <th>File</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody >
                    {certificateData.map((cert) => (
                      <tr key={cert.Id}>
                        <td>{cert.FinNo}</td>
                        <td>{cert.CertificateName}</td>
                        <td>
                          {cert.CertificateFile && (
                            <a
                              href={`http://localhost:3001/uploads/${cert.CertificateFile}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View File
                            </a>
                          )}
                        </td>
                        <td> <span
                          className="btn btn-danger"
                          onClick={() => handleDelete(cert.Id)}
                        >Delete</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              ) : (
              
                <p className="py-1 mx-auto text-center" style={{height:'195px'}}>
          <FaExclamationCircle  className="w-50 h-50 p-3"/>
          <p> No certificates</p>
         
        </p>
              )}
            </div>

            {/* <div className="d-lg-flex align-items-center mb-n2 py-4 my-3">
              <ul className="pagination pagination-sm mb-0 mx-auto justify-content-center">
                <li class="page-item "><span class="page-link btn yellowtext border-2 btn-sm d-flex buttonborder fs-6 px-4" onClick={handlePre}>Previous</span></li>
                <li className="page-item">
                  <span className="btn bluebg yellowtext border-3 fw-bold btn-sm d-flex button border fs-6 px-5" onClick={handleSubmit}>
                    Submit
                  </span>
                </li>
              </ul>
            </div> */}

          </div>
        </div>
        </div>
   
        <div className="col-xl-6">
        <div className="card">
          <div className="card-header yellowtext fs-6 fw-bold">WORKER DETAILS</div>
          <div className="card-body pb-2">
            <form>

              <div className="row">
                <div className="col-xl-6">
                  <div className="mb-3">
                  <label className="form-label">Highest Qualification</label>
            <select className="form-select selectinput" value={formDataeducation.Education} onChange={handleInputChangeeducation} required>
              <option value="">Select Education</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="UG">UG</option>
              <option value="PG">PG</option>
            </select>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="mb-3">
                  <label className="form-label">Upload Education File</label>
                  <div className="input-group">
                  <input type="file" id="educationfileinput" className="form-control input ps-3 border border-light" onChange={handleFileChangeeducation} accept="*/*" required />
                  <button type="submit" className="btn btn-primary" onClick={UploadEducation}>
                  Upload
                </button>
                  </div>
                  </div>
                </div>
              </div>


            </form>
<div className="border border-3 mt-3"></div>
<div className="mt-4">
      <h3>Uploaded Education Files</h3>
      {education.length > 0 ? (
        <div id="educationtable">
        <table className="table table-bordered">
          <thead>
            <tr className="bg-dark">
              <th>FinNo</th>
              <th>Certificate Name</th>
              <th>File</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {education.map((edu) => (
              <tr key={edu.Id}>
                <td>{edu.FinNo}</td>
                <td>{edu.Education}</td>
                <td>
                  {edu.EducationFile && (
                    <a
                      href={`http://localhost:3001/uploads/${edu.EducationFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View File
                    </a>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteEducation(edu.Id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <div className="text-center" style={{height:'310px'}}>
          <FaGraduationCap className="h-25 w-25 mt-5"/>
        <p className="py-3">No Education Files</p>
        </div>
      )}
    </div>



          </div>
        </div>
      </div>
      </div>



{/* popup */}
{showSuccessModal && (
  <div className="modal-overlay">
    <div className="modal-content professional-modal p-4 text-center">
      {/* Worker Illustration */}
      <div className="modal-image mb-4">
        <img
          src={ComLogo}
          alt="Worker Added"
          className="worker-img"
        />
      </div>

      {/* Title */}
      <h2 className="modal-title mb-2">✅ Worker Added Successfully! 🎉</h2>

      {/* Description */}
      <p className="modal-text">The worker’s information has been securely stored in the system.</p>

      {/* Close Button */}
      <button
  className="modal-button"
  onClick={() => {
    setShowSuccessModal(false);
    navigate("/workermngadmin");
  }}
>
  Got It
</button>
    </div>
  </div>
)}





{/* alert message popup */}
{alertModal.show && (
  <div className="modal-overlay">
    <div className="modal-content custom-modal p-4 rounded shadow-lg text-center">
    <div className="mb-3 text-danger">
  <AiOutlineWarning size={60} />
</div>
      <h4 className="text-danger fw-bold mb-2">Oops!</h4>
      <p className="text-dark fw-bold">{alertModal.message}</p>
      <button
        className="btn btn-danger mt-3 px-4 fw-bold"
        onClick={() => setAlertModal({ show: false, message: "" })}
      >
        OK
      </button>
    </div>
  </div>
)}



{/* top alart message */}
{topAlert.show && (
  <div className="top-alert">
    <span>{topAlert.message}</span>
  </div>
)}




      <div className="d-lg-flex align-items-center mb-n2 py-4 my-3">
              <ul className="pagination pagination-sm mb-0 mx-auto justify-content-center">
                <li class="page-item "><span class="page-link btn bluetext fw-bold yellowbg blueborder border-2 btn-sm d-flex buttonborder fs-6 px-4" onClick={handlePre}>Previous</span></li>
                <li className="page-item">
                  <span className="btn border-3 border-info fw-bold btn-sm d-flex button border fs-6 px-5" onClick={handleSubmit}>
                    Submit
                  </span>
                </li>
              </ul>
            </div>


      </div>
    </div>
    </div>
    </div>
  );
};

export default AddWorkerFormThreeAdmin;
