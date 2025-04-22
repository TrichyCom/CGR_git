import React, { useState, useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
const AddWorkerFormTwoAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FinNo: "",
    DOA: "",  
    DOB: "",
    DOI: "",
    DOE: "",
    DO_ThumbPrint: "",
    DO_Onboard: "",
    DO_Renewal: "",
    WP_No: "",
    WP_Expiry: "",
    PP_No: "",
    PP_Expiry: "",
    IPA: "",
    Passport: "",
    Bond: "",
    Onboard: "",
    Medical: "",
    Issuance: "",
    MOMThumbPrint: "",
    IC: "",
    Contract: "",
  });


  const [files, setFiles] = useState({});
 const [selectedFile, setSelectedFile] = useState(null);
 const fileInputRef = useRef(null); // Reference for file input
 const [selectedInputNames, setSelectedInputNames] = useState([]); // Store selected input names

  // Load selected input names from localStorage when the component is mounted
  useEffect(() => {
    const storedInputNames = JSON.parse(localStorage.getItem("selectedInputNames"));
    if (storedInputNames) {
      setSelectedInputNames(storedInputNames); // Set the state with the stored names
    }
  }, []);


  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0]; // Get the selected file
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: file,
    }));
    setSelectedFile(e.target.files[0]);
    setSelectedFile(file);

    if (file) {
      // Store input name if a file is selected
      const inputName = e.target.name;
      setSelectedInputNames((prevNames) => {
        const updatedNames = [...prevNames, inputName];
        localStorage.setItem("selectedInputNames", JSON.stringify(updatedNames)); 
        return updatedNames;
      });
    }
  };

  const formDataToSend = new FormData();
Object.keys(formData).forEach((key) => {
  if (formData[key]) formDataToSend.append(key, formData[key]);
});

Object.keys(files).forEach((key) => {
  if (files[key]) formDataToSend.append(key, files[key]);
});




// const handleSubmit = () => {
//   if (!selectedFile) {
//     alert("Please select a file before uploading.");
//     return;
//   }
//   console.log("Uploading:", selectedFile);
//   // Handle upload logic here
// };



const [topAlert, setTopAlert] = useState({ show: false, message: "" });

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!formData.FinNo.trim()) {
        alert("Please enter FinNo.");
        return;
      }
      if (!selectedFile) {
        alert("Please select a file before uploading.");
        return;
      }
 
      const formDataToSend = new FormData();
      formDataToSend.append("FinNo", formData.FinNo); // Include FinNo
  
      Object.keys(files).forEach((key) => {
          formDataToSend.append(key, files[key]); // Append files
      });
  
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
          const response = await axios.post(
              `${apiUrl}/workerreportfiles`,
              formDataToSend,
              { headers: { "Content-Type": "multipart/form-data" } }
          );
  
          console.log("Data saved:", response.data);
          // alert("Worker Report Files Uploaded Successfully");
          setTopAlert({ show: true, message: "Worker Report Files Uploaded Successfully" });
          setTimeout(() => setTopAlert({ show: false, message: "" }), 2000);
  
          // Store in localStorage
          localStorage.setItem("workerData", JSON.stringify(response.data));
          
                // Reset input fields
      setSelectedFile(null);
      
   
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clears file input field
    }
      } catch (error) {
          console.error("Error submitting form:", error);
      }
  };
  

  // const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // Excluding 'I' and 'O'

  // Function to generate Fin No
  // const generateFinNo = () => {
  //   const firstLetter = letters.charAt(Math.floor(Math.random() * letters.length));
  //   const numbers = Math.floor(1000000 + Math.random() * 9000000); // 7-digit number
  //   const lastLetter = letters.charAt(Math.floor(Math.random() * letters.length));
  //   return `${firstLetter}${numbers}${lastLetter}`;
  // };




  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("workerData")) || {};
    // if (!formData.FinNo) {
    //   formData.FinNo = generateFinNo();
    // }
    setFormData((prevData) => ({
      ...prevData,
      ...storedData,
      // FinNo: storedData.FinNo || generateFinNo(), // Set FinNo only if not already stored
    }));
  }, []);


  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  



  const handleNext = () => {
    // Auto-generate FinNo if it's empty
    // if (!formData.FinNo) {
    //   formData.FinNo = generateFinNo();
    // }
    localStorage.setItem("workerData", JSON.stringify(formData));
    navigate("/addworkerformthreemain");
  };
  
  const handlePre = () => {
    // Auto-generate FinNo if it's empty
    // if (!formData.FinNo) {
    //   formData.FinNo = generateFinNo();
    // }
    localStorage.setItem("workerData", JSON.stringify(formData));
    navigate("/addworkerformadmin");
  };

  return (
    <>
    {/* <div>
      <h1>Add Worker - Page 2</h1>
      <input
        type="text"
        name="finNo"
        value={formData.finNo}
        onChange={handleChange}
        placeholder="FIN No"
      />
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        placeholder="D.O.B"
      />
     
      <button onClick={handleNext}>Next</button>
    </div> */}


















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
                 
                    ADD WORKER <small className="text-dark fw-100 fs-6"> please enter worker details here...</small>
                  </h4>
          <hr className="mb-3 opacity-3" />
  <div className="row justify-content-center">
    <div className="col-xl-12">
      <div className="row">
        <div className="col-xl-12">
       

          <div id="formControls" className="mb-5">
        {/* page 1     */}
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center yellowtext fs-6 fw-bold">
                WORKER DETAILS
             
              </div>
              <div className="card-body pb-2">
                <form>
                <div className="row">
                <div className="col-xl-6">
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1">FIN No</label>
                        <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="FIN No" name="FinNo" value={formData.FinNo} onChange={handleChange} required/>
                      </div>
                      </div>
                      <div className="col-xl-6">
                      <div className="mb-3">
                      <label className="form-label" htmlFor="exampleFormControlInput1">D.O.E</label>
                      <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.E" onFocus={(e) => e.target.showPicker()} name="DOE" value={formData.DOE} onChange={handleChange}/>
                      </div>
                      </div>
                      {/* <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlFile1">File input</label>
                        <input type="file" className="form-control input" id="exampleFormControlFile1" />
                      </div> */}
                   
                    
                  </div>


                  <div className="row">
                    <div className="col-xl-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1">D.O.A</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.A" onFocus={(e) => e.target.showPicker()}  name="DOA" value={formData.DOA} onChange={handleChange}/>
                      </div>
                      </div>
                    <div className="col-xl-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1">D.O.B</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.B" onFocus={(e) => e.target.showPicker()} name="DOB" value={formData.DOB} onChange={handleChange} required/>
                      </div>
                      </div>
             
                      </div>



                      
                  <div className="row">
                  <div className="col-xl-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1">D.O.I</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.I" onFocus={(e) => e.target.showPicker()} name="DOI" value={formData.DOI} onChange={handleChange}/>
                      </div>
                      </div>
                      <div className="col-xl-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1">D.O.Thumb Print</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.Thumb Print" onFocus={(e) => e.target.showPicker()} name="DO_ThumbPrint" value={formData.DO_ThumbPrint} onChange={handleChange}/>
                      </div>
                      </div>
                      </div>



                  <div className="row">
                  <div className="col-xl-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1">D.O.onboard</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.onboard" onFocus={(e) => e.target.showPicker()} name="DO_Onboard" value={formData.DO_Onboard} onChange={handleChange}/>
                      </div>
                      </div>
                      <div className="col-xl-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1">D.O.Renewal</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.Renewal" onFocus={(e) => e.target.showPicker()} name="DO_Renewal" value={formData.DO_Renewal} onChange={handleChange}/>
                      </div>
                      </div>
                      </div>



                  <div className="row">
                  <div className="col-xl-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1">WP No</label>
                        <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="WP No" name="WP_No" value={formData.WP_No} onChange={handleChange} />
                      </div>
                      </div>
                      <div className="col-xl-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1">WP EXPIRY</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="WP EXPIRY" onFocus={(e) => e.target.showPicker()} name="WP_Expiry" value={formData.WP_Expiry} onChange={handleChange}/>
                      </div>
                      </div>
                      </div>



                  <div className="row">
                  <div className="col-xl-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1">PP No</label>
                        <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="PP No" name="PP_No" value={formData.PP_No} onChange={handleChange}/>
                      </div>
                      </div>
                      <div className="col-xl-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1">PP EXPIRY</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="PP EXPIRY" onFocus={(e) => e.target.showPicker()} name="PP_Expiry" value={formData.PP_Expiry} onChange={handleChange}/>
                      </div>
                      </div>
                      </div>
                      </div>
                      {/* col-2 */}
                      
                      <div className="col-xl-6">
                        
                      <div className="row">
                      <div className="col-xl-6">
                      <div className="mb-3">
                      <label className="form-label">IPA File</label>
                      <div className="input-group">
                      <input type="file" className="form-control input ps-3 border border-light" accept="*/*" name="IPA" onChange={handleFileChange} ref={fileInputRef}/>
                      {/* <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={!formData.FinNo.trim() || !selectedFile}>
        Upload
      </button> */}
    </div>
                      </div>
                      </div>
                      <div className="col-xl-6">
                      <div className="mb-3">
                      <label className="form-label">Passport File</label>
                      <div className="input-group">
                      <input type="file" className="form-control input ps-3 border border-light" accept="*/*" name="Passport" onChange={handleFileChange} ref={fileInputRef}/>
                      {/* <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={!formData.FinNo.trim() || !selectedFile}>
        Upload
      </button> */}
    </div>
                      </div>
                      </div>
                      </div>
                      <div className="row">
                      <div className="col-xl-6">
                      <div className="mb-3">
                      <label className="form-label">Bond File</label>
                      <div className="input-group">
                      <input type="file" className="form-control input ps-3 border border-light" accept="*/*" name="Bond" onChange={handleFileChange} ref={fileInputRef}/>
                      {/* <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={!formData.FinNo.trim() || !selectedFile}>
        Upload
      </button> */}
    </div>
                      </div>
                      </div>
                      <div className="col-xl-6">
                      <div className="mb-3">
                      <label className="form-label">Onboard File</label>
                      <div className="input-group">
                      <input type="file" className="form-control input ps-3 border border-light" accept="*/*" name="Onboard" onChange={handleFileChange} ref={fileInputRef}/>
                      {/* <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={!formData.FinNo.trim() || !selectedFile}>
        Upload
      </button> */}
    </div>
                      </div>
                      </div>
                      </div>
                      <div className="row">
                      <div className="col-xl-6">
                      <div className="mb-3">
                      <label className="form-label">Medical Report</label>
                      <div className="input-group">
                      <input type="file" className="form-control input ps-3 border border-light" accept="*/*" name="Medical" onChange={handleFileChange} ref={fileInputRef}/>
                      {/* <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={!formData.FinNo.trim() || !selectedFile}>
        Upload
      </button> */}
    </div>
                      </div>
                      </div>
                      <div className="col-xl-6">
                      <div className="mb-3">
                      <label className="form-label">Issuance File</label>
                      <div className="input-group">
                      <input type="file" className="form-control input ps-3 border border-light" accept="*/*" name="Issuance" onChange={handleFileChange} ref={fileInputRef}/>
                      {/* <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={!formData.FinNo.trim() || !selectedFile}>
        Upload
      </button> */}
    </div>
                      </div>
                      </div>
                      </div>
                      <div className="row">
                      <div className="col-xl-6">
                      <div className="mb-3">
                      <label className="form-label">MOM Thumb Print Form</label>
                      <div className="input-group">
                      <input type="file" className="form-control input ps-3 border border-light" accept="*/*" name="MOMThumbPrint" onChange={handleFileChange} ref={fileInputRef}/>
                      {/* <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={!formData.FinNo.trim() || !selectedFile}>
        Upload
      </button> */}
    </div>
                      </div>
                      </div>
                      <div className="col-xl-6">
                      <div className="mb-3">
                      <label className="form-label">IC Copy</label>
                      <div className="input-group">
                      <input type="file" className="form-control input ps-3 border border-light" accept="*/*" name="IC" onChange={handleFileChange}  ref={fileInputRef}/>
                      {/* <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={!formData.FinNo.trim() || !selectedFile}>
        Upload
      </button> */}
    </div>
                      </div>
                      </div>
                      </div>
                      <div className="row">
                      <div className="col-xl-6">
                      <div className="mb-3">
                      <label className="form-label">Contract File</label>
                      <div className="input-group">
      <input
        type="file"
        className="form-control input ps-3 border border-light"
        accept="*/*"
        name="Contract"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {/* <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={!formData.FinNo.trim() || !selectedFile}>
        Upload
      </button> */}
    </div>
                      </div>
                      </div>

                      </div>

                      <div className="row mt-4">
                        
                        <div className=" mx-auto text-center p-3">
                                <button className="btn btn-warning w-50 rounded fw-bold" type="button" onClick={handleSubmit} disabled={!formData.FinNo.trim() || !selectedFile}>
        Upload
      </button>
                        </div>
                      </div>

 {/* Display all selected input names */}
 {selectedInputNames.length > 0 && (
        <p className="mt-2 text-success">
          <strong className="">Selected Inputs:</strong>
          <ol style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none', padding: 0 }}>
  {selectedInputNames.map((name, index) => (
    <li
      key={index} 
      className="text-dark"
      style={{
        marginRight: '10px',  // Space between items
        marginTop:'5px',
        marginBottom: '5px',  // Space below items
        backgroundColor: '#f0f0f0', // Optional background color
        padding: '5px 10px', // Optional padding for better spacing
        borderRadius: '5px', // Optional rounded corners
      }}
    >
      {name}
    </li>
  ))}
</ol>

        </p>
      )}


                      </div>
                      </div>


                </form>


                <div class="d-lg-flex align-items-center mb-n2 py-4 my-3">
                 
              
                  <ul class="pagination pagination-sm mb-0 mx-auto justify-content-center">
                      {/* <li class="page-item "><Link to='/addworkerformadmin' class="page-link buttonborder border-2 fs-6 px-5">Previous</Link></li> */}
                      <li class="page-item "><span class="page-link btn yellowtext fw-bold border-2 btn-sm d-flex buttonborder fs-6 px-4" onClick={handlePre}>Previous</span></li>
                      
                      <li class="page-item"><span class="page-link btn yellowtext fw-bold border-2 btn-sm d-flex buttonborder fs-6 px-5" onClick={handleNext}>Next</span></li>
                  </ul>
              </div>



              </div>
            </div>




            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>


{/* top alart message */}
{topAlert.show && (
  <div className="top-alert">
    <span>{topAlert.message}</span>
  </div>
)}



</>
  );
};

export default AddWorkerFormTwoAdmin;
