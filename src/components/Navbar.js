import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import ActivityLog from './ActivityLog';
import Login from './Login'
import SignUp from './SignUp'
import Students from './Students';

export default function Navbar() {
    let [isLogin, setIsLogin] = useState(false);
    

    let makeTrueIsLogin=()=>{
        setIsLogin(isLogin = true);
    }
    return (
        <>
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
                        <div className="container-fluid">
                            <h5 className='mx-5'>YOU-TELL-I-DO</h5>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup"  style={{textAlign: 'right', justifyContent:'right', justifySelf:'right'}}>
                                <div className="navbar-nav">
                                    {/* <a href="/">Login</a> */}
                                    <Link className="nav-link active mx-1" aria-current="page" to="/" style={(isLogin)?{display:'none'}:{display:'block'}}>Login</Link>
                                    <Link className="nav-link active mx-1" aria-current="page" to="/signup" style={(isLogin)?{display:'none'}:{display:'block'}}>Sign Up</Link>
                                    <Link className="nav-link active mx-1" aria-current="page" to="/" style={(isLogin)?{display:'block'}:{display:'none'}} onClick={()=>{setIsLogin(isLogin=false)}}>Logout</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <Routes>
                    <Route exact path="/" element={<Login func={makeTrueIsLogin}/>}></Route>
                    <Route exact path="/signup" element={<SignUp />}></Route>
                    <Route exact path="/students" element={<Students />}></Route>
                    <Route exact path="/activitylog" element={<ActivityLog />}></Route>
                </Routes>
            </Router>
        </>
    )
}
