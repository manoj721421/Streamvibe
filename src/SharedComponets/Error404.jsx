import React from 'react'
import Error40402 from "../assets/Error40402.png"

const Error404 = () => {
    return (
        <div className="container">
            <div className='row mb-5'>
                <div className="col-6">
                <div className="text-white mt-5 pt-2">
                    <h1 style={{fontSize:"8em"}}><span className='text-danger'>Sorry!, </span>this page isn't available</h1>
                    <p className="mt-3" style={{fontSize:"1.8em"}}>The page you were looking for couldn't be found</p>
                    <p className='mt-5' style={{fontSize:"1.5em"}}>Go back to <span className='text-danger'>Home Page</span> or Visit our <span className='text-danger'>Help Center</span></p>
                </div>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <img src={Error40402} width="600px" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Error404