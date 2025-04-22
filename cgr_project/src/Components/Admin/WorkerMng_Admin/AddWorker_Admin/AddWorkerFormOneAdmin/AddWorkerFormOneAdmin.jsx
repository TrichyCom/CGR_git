import React, { useState, useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import '../../../../../../public/assets/css/owncss/Admin/AddWorkerForm.css'

const AddWorkerFormOneAdmin = () => {





  const navigate = useNavigate();
  // const roles = ["Electrician", "Plumber", "Welder", "Steel Fixer", "Painter"]; 
  const [roles, setRoles] = useState([]); // Store fetched roles

  // Fetch roles from feilds table
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${apiUrl}/feilds`); // Replace with your API URL
      const roleNames = response.data.map((item) => item.Feilds); // Extract Feilds column
      setRoles(roleNames);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const [formData, setFormData] = useState({
    EmpId: "",
    EmpPosition: "",
    CompanyName: "",
    Department: "",
    FirstName: "",
    LastName: "",
    Age: "",
    ExpYear: "",
    Gender: "Male",
    ContNum: "",
    EmergencyContNum: "",
    BankAccNum: "",
    SelectFeilds: [],
    PanTaxId: "",
    SelectRole: "",
  });

  // Load stored data
  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("workerData")) || {};
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     ...storedData,
  //     SelectFields: storedData.SelectFields || [], // Ensure it's an array
  //   }));
  // }, []);

  // Handle input change
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // Handle checkbox selection
  // const handleCheckboxChange = (role) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     SelectFields: prevData.SelectFields.includes(role)
  //       ? prevData.SelectFields.filter((r) => r !== role) // Remove if already selected
  //       : [...prevData.SelectFields, role], // Add if not selected
  //   }));
  // };

  // const handleCheckboxChange = (role) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     SelectFeilds: prevData.SelectFeilds.includes(role)
  //       ? prevData.SelectFeilds.filter((r) => r !== role) // Remove if already selected
  //       : [...prevData.SelectFeilds, role], // Add if not selected
  //   }));
  // };

  const handleRoleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      SelectFeilds: selectedOptions,
    }));
  };



  // Handle navigation to next form
  const handleNext = () => {
    localStorage.setItem("workerData", JSON.stringify(formData));
    navigate("/addworkerformtwomain");
  };








  const [isOpen, setIsOpen] = useState(false); // State to handle toggle

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("workerData")) || {};
    setFormData((prevData) => ({
      ...prevData,
      ...storedData,
      SelectFields: storedData.SelectFields || [],
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (role) => {
    setFormData((prevData) => ({
      ...prevData,
      SelectFeilds: prevData.SelectFeilds.includes(role)
        ? prevData.SelectFeilds.filter((r) => r !== role)
        : [...prevData.SelectFeilds, role],
    }));
  };

  // const handleNext = () => {
  //   localStorage.setItem("workerData", JSON.stringify(formData));
  //   navigate("/addworkerformtwomain");
  // };



  // add role
  const [roless, setRoless] = useState([]); // Store roles from DB

  useEffect(() => {
    fetchRoless(); // Fetch roles on component load
  }, []);

  // Fetch roles from the database
  const fetchRoless = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${apiUrl}/roles`); // Replace with your API URL
      setRoless(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };




  // department
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(`${apiUrl}/departments`) // Update the API endpoint based on your backend route
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);



   const fileInputRef = useRef(null); // Reference for file input
   const [selectedFile, setSelectedFile] = useState(null);
   const previewImg = localStorage.getItem("workerProfileImg");


   const handleFileChange = (e) => {
     const file = e.target.files[0];
     if (file) {
       const reader = new FileReader();
       reader.onloadend = () => {
         localStorage.setItem("workerProfileImg", reader.result); // base64 string
         setSelectedFile(file); // save file in state for later use
       };
       reader.readAsDataURL(file); // convert to base64
     }
   };







   const [companyOptions, setCompanyOptions] = useState([]);

   useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(`${apiUrl}/getCompanies`)
      .then((res) => setCompanyOptions(res.data))
      .catch((err) => console.error(err));
  }, []);
  
   
  return (
    <>
      {/* <div>
      <h1>Add Worker - Page 1</h1>
      <input
        type="text"
        name="EmpId"
        value={formData.EmpId}
        onChange={handleChange}
        placeholder="Employee ID"
      />
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company"
      />
  
      <button onClick={handleNext}>Next</button>
    </div> */}























      <div id="content" className="app-content">
        <div className="conainer">
          
        <div class="d-lg-flex mb-lg-3 mb-2">
                        <h1 class="page-header mb-6 flex-1" id='data' > <span className="bg-dark text-white px-4 py-1 border-primary border-4 border rounded-start rounded-5">WORKERS MANAGEMENT</span></h1>
                        <div class="row gx-2 pb-lg-3 pb-2"></div>

                        <span class="d-none d-lg-flex align-items-center mx-2">
                        <Link to="/workermngadmin" className="btn yellowtext btn-sm d-flex pe-3 fw-bold backbuttonborder" >
                                <span class="iconify fs-18px me-2 ms-n1" data-icon="solar:refresh-bold-duotone"></span>
                               Back
                            </Link>
                            </span>

                            
                    </div>
                    <div className="border border-2 rounded mb-2 border-dark"></div>
          <div className="row justify-content-center">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-12">
                <div className="row">
                <div className="col-xl-6">
                {/* <h3 class="page-headr mb-6 flex-1" id='data' ><span className="bg-dark text-white px-4 py-1 border-white border rounded-start rounded-5">WORKERS MANAGEMENT</span></h3> */}


                  <h4 className="page-heade bluetext fw-bold mb-0 mt-3">
                 
                    ADD WORKER <small className="text-dark fw-100 fs-6"> please enter worker details here...</small>
                  </h4>
                  </div>
                  <div className="col-xl-6">
                    <div className="text-end">
                  {previewImg && (
  <img src={previewImg} alt="Preview" width={50} height={50} className="rounded-5 "/>)}
  </div>
                  </div>
                  </div>
                  <hr className="mb-3 opacity-3" />
                  <div id="formControls" className="mb-2">
                    {/* page 1     */}
                    <div className="card">
                      <div className="card-header d-flex justify-content-between align-items-center yellowtext fs-6 fw-bold">
                        WORKER DETAILS

                      </div>
                      <div className="card-body pb-2">
                        <form>
                          <div className="row">
                            <div className="col-xl-6">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="exampleFormControlInput1">Employee ID</label>
                                <input type="text" className="form-control input" name="EmpId" id="exampleFormControlInput1" placeholder="Employee ID" onChange={handleChange} value={formData.EmpId} required/>
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="exampleFormControlInput1">Employee Position</label>
                                {/* <div className="d-flex flex-wrap">
    {["Supervisor", "ProjectManager", "OfficePersonel", "Worker"].map((position) => (
      <div key={position} className="form-check me-3 ">
        <input
          type="radio"
          className="form-check-input "
          name="EmpPosition"
          id={`position-${position}`}
          value={position}
          checked={formData.EmpPosition === position}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor={`position-${position}`}>
          {position}
        </label>
      </div>
    ))}
  </div> */}

                                <select
                                  className="form-select selectinput"
                                  name="EmpPosition"
                                  value={formData.EmpPosition}
                                  onChange={handleChange}
                                >
                                  <option value="">Select Position</option>
                                  {["Supervisor", "ProjectManager", "OfficePersonel", "Worker"].map((position) => (
                                    <option key={position} value={position}>
                                      {position}
                                    </option>
                                  ))}
                                </select>

                              </div>
                            </div>
                            {/* <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlFile1">File input</label>
                        <input type="file" className="form-control" id="exampleFormControlFile1" />
                      </div> */}


                          </div>


                          <div className="row">
                            <div className="col-xl-6">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="exampleFormControlInput1">Company</label>
                                {/* <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Company" name="CompanyName" onChange={handleChange} value={formData.CompanyName}/> */}
                                {/* <select
                                  className="form-select"
                                  name="CompanyName"
                                  onChange={handleChange}
                                  value={formData.CompanyName}
                                  id="exampleFormControlInput1"
                                >
                                  <option value="" className="text-dark">Select Company</option>
                                  <option value="Company1" className="text-dark">PNI</option>
                                  <option value="Company2" className="text-dark">CGR</option>
                                </select> */}


                                <select
  className="form-select selectinput"
  name="CompanyName"
  onChange={handleChange}
  value={formData.CompanyName}
  id="exampleFormControlInput1"
>
  <option value="" className="text-dark">Select Company</option>
  {companyOptions.map((company) => (
    <option
      key={company.id}
      value={company.CompanyList}
      className="text-dark"
    >
      {company.CompanyList}
    </option>
  ))}
</select>


                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="exampleFormControlInput1">Department</label>
                                <select
                                  className="form-select selectinput"
                                  id="exampleFormControlSelect1"
                                  name="Department"
                                  onChange={handleChange}
                                  value={formData.Department}
                                >
                                  <option value="">Select Department</option>
                                  {departments.map((dept) => (
                                    <option key={dept.id} value={dept.Department}>
                                      {dept.Department}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>




                          <div className="row">
                            <div className="col-xl-6">
                              {/* <div className="mb-3">
                        <label className="form-label" htmlFor="exampleFormControlInput1"> Full Name</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Full Name" name="FullName" onChange={handleChange} value={formData.FullName}/>
                      </div> */}

                              <div className="row">
                                <div className="col-xl-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="exampleFormControlInput1"> First Name</label>
                                    <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="First Name" name="FirstName" onChange={handleChange} value={formData.First} required/>
                                  </div>
                                </div>
                                <div className="col-xl-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="exampleFormControlInput1"> Last Name</label>
                                    <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="Last Name" name="LastName" onChange={handleChange} value={formData.LastName} />
                                  </div>
                                </div>
                              </div>


                            </div>
                            <div className="col-xl-6">
                              <div className="row">
                                <div className="col-xl-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="exampleFormControlInput1">Age</label>
                                    <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="Age" name="Age" onChange={handleChange} value={formData.Age} required/>
                                  </div>
                                </div>
                                <div className="col-xl-6">
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="exampleFormControlSelect1">Gender</label>
                                    <select className="form-select selectinput" id="exampleFormControlSelect1" name="Gender" onChange={handleChange} value={formData.Gender} >
                                      <option>Male</option>
                                      <option>Female</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                            </div>

                          </div>



                          <div className="row">
                            <div className="col-xl-6">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="exampleFormControlInput1">Experience in Year</label>
                                <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="Experience in Year" name="ExpYear" onChange={handleChange} value={formData.ExpYear} />
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="exampleFormControlInput1">PAN/TAX ID</label>
                                <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="PAN/TAX ID" name="PanTaxId" onChange={handleChange} value={formData.PanTaxId} />
                              </div>
                            </div>
                          </div>



                          <div className="row">
                            <div className="col-xl-6">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="exampleFormControlInput1">Contact Number</label>
                                <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="Contact Number" name="ContNum" onChange={handleChange} value={formData.ContNum} />
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="exampleFormControlInput1">Emergency Contact Number</label>
                                <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="Emergency Contact Number" name="EmergencyContNum" onChange={handleChange} value={formData.EmergencyContNum} />
                              </div>
                            </div>
                          </div>



                          <div className="row">
                            <div className="col-xl-6">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="exampleFormControlInput1">Bank Account Number</label>
                                <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="Bank Account Number" name="BankAccNum" onChange={handleChange} value={formData.BankAccNum} />
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="mb-3">

                                <label className="form-label">Profile</label>
                                <div className="input-group">
                                <input
  type="file"
  className="form-control input ps-3 border border-light"
  accept="image/*"
  name="ProfileImg"
  ref={fileInputRef}
  onChange={handleFileChange}
/>


                                </div>
                              </div>


                            </div>
                          </div>



                          <div className="row">
                            <div className="col-xl-6">
                              <div className="mb-3">
                                <label className="form-label" htmlFor="exampleFormControlSelect1">Select Feilds</label>


                                {/* <div className="checkbox-container"> */}

                                <button
                                  className="btn btn-warning fw-bold mb-1 p-1 rounded px-1 mx-4 "
                                  onClick={(e) => {
                                    e.preventDefault(); // Prevents the form from submitting
                                    setIsOpen(!isOpen);
                                  }}
                                >
                                  {isOpen ? "Close" : "Open"} Feilds
                                </button>

                                {isOpen && (
                                  <div className="checkbox-container">
                                    {roles.map((role) => (
                                      <div key={role} className="checkbox-item">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id={`role-${role}`}
                                          value={role}
                                          checked={Array.isArray(formData.SelectFeilds) && formData.SelectFeilds.includes(role)}
                                          onChange={() => handleCheckboxChange(role)}
                                        />
                                        <label className="form-check-label" htmlFor={`role-${role}`}>
                                          {role}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* </div> */}




                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="mb-3">
                                {/* <label className="form-label" htmlFor="exampleFormControlSelect1">Select Role</label>
                        <select className="form-select" id="exampleFormControlSelect1" name="SelectRole" onChange={handleChange} value={formData.SelectRole}>
                        <option value="">Select a role</option>
        {roless.map((role) => (
          <option key={role.id} value={role.Roles}>
            {role.Roles}
          </option>
        ))}
                        </select> */}
                              </div>
                            </div>


                          </div>



                        </form>


                        <div class="d-lg-flex align-items-center mb-n2 py-4 my-3">


                          <ul class="pagination pagination-sm mb-0 mx-auto justify-content-center">
                            {/* <li class="page-item disabled"><Link class="page-link">Previous</Link></li> */}

                            <li class="page-item"><span class=" page-link btn yellowtext fw-bold border-2 btn-sm d-flex buttonborder fs-6 px-5" onClick={handleNext} >Next</span></li>
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
    </>
  );
};

export default AddWorkerFormOneAdmin;
