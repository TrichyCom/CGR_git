import React from 'react'
import '../../../../../public/assets/css/owncss/SignupLogin.css'
function DashRight() {
    return (
        <div>
            <div id="content" className="app-content p-3">
                {/* <h1 className="page-header mb-3 flex-1"> OverAll Activities </h1> */}
                <h3 class="page-headr mb-6 flex-1" id='data' ><span className="bg-dark text-white px-4 py-1 border-primary border-4 border rounded-start rounded-5">OverAll Activities</span></h3>
                <div className="row g-2 mt-4">

                    <div className="col-xl-12">

                        <div className="row g-2">

                            <div className="col-xl-3 col-lg-3 col-6">

                                <div className="card h-100">

                                    <div className="card-header yellowtext bluebg">Total Workers</div>


                                    <div className="card-body bg-light">
                                        <div className="h4 fw-100 bluetext mb-1">1000 +</div>
                                        <p className="text-dark fs-10px mb-0">
                                            +8.5% vs last month
                                        </p>
                                        <p className="fs-9px mb-0 text-dark text-opacity-65">
                                            updated 1 min ago
                                        </p>
                                    </div>

                                </div>

                            </div>


                            <div className="col-xl-3 col-lg-3 col-6">

                                <div className="card h-100">

                                    <div className="card-header yellowtext bluebg">Active Workers</div>


                                    <div className="card-body bg-light">
                                        <div className="h4 fw-100 bluetext mb-1">900 +</div>
                                        <p className="text-dark fs-10px mb-0">
                                            +12.3% vs last quarter
                                        </p>
                                        <p className="fs-9px mb-0 text-dark text-opacity-65">
                                            updated 1 min ago
                                        </p>
                                    </div>

                                </div>

                            </div>


                            <div className="col-xl-3 col-lg-3 col-6">

                                <div className="card h-100 bg-light">

                                    <div className="card-header yellowtext bluebg">Pending Approvals</div>


                                    <div className="card-body">
                                        <div className="h4 fw-100 bluetext mb-1">12000</div>
                                        <p className="text-dark fs-10px mb-0">
                                            -3.2% vs last week
                                        </p>
                                        <p className="fs-9px mb-0 text-dark text-opacity-65">
                                            updated 1 min ago
                                        </p>
                                    </div>

                                </div>

                            </div>




                            <div className="col-xl-3 col-lg-3 col-6">

<div className="card h-100 bg-light">

    <div className="card-header yellowtext bluebg">Approvals %</div>


    <div className="card-body">
        <div className="h4 fw-100 bluetext mb-1">45.2%</div>
        <p className="text-dark fs-10px mb-0">
            -3.2% vs last week
        </p>
        <p className="fs-9px mb-0 text-dark text-opacity-65">
            updated 1 min ago
        </p>
    </div>

</div>

</div>










                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashRight
