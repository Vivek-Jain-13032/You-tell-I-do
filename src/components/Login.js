import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Alert from './Alert';

export default function Login(props) {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    let [admin, setAdmin] = useState("");
    let [students, setStudents] = useState([]);
    let [alert, setAlert] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/admin')
            .then((response) => {
                setAdmin(admin = response.data);
                console.log(admin);
            })

        axios.get('http://localhost:3001/student')
            .then((response) => {
                setStudents(students = response.data);
                console.log(students);
            })
    }, [])

    let showAlert = (msg, type) => {
        console.log("called")
        setAlert({
            msg: msg,
            type: type
        })

        setTimeout(() => {
            setAlert(null);
        }, 1500)
    }

    let loginTrue = () => {
        let flag = props.func();
    }

    let login = (event) => {
        console.log("login");
        event.preventDefault();


        if (mail == admin.id && password == admin.password) {
            console.log("admin login");
            setUser(admin);
            loginTrue();
            navigate('/students');
            showAlert(admin.name + ', Login Successfully', 'success');
            console.log(user)
        } else {
            let s = students.filter((f) => {
                console.log(f.id == mail)
                if (f.id == mail) {
                    return f
                }
            })

            if ((s[0]) !== undefined) {

                console.log(mail == s[0].id && password == s[0].password)
                if (mail == s[0].id && password == s[0].password) {
                    setUser(s);
                    console.log(s);
                    loginTrue();
                    showAlert(s[0].name + ', Login Successfully', 'success');
                    navigate("/activitylog", {
                        state: {
                            studentId: mail,
                            isAdmin: false
                        }
                    });
                }
                else {
                    console.log('alert')
                    showAlert('Invalid Id or Password', 'danger');
                }

            } else {
                console.log('alert')
                showAlert('Invalid Id or Password', 'danger');
            }
        }


        // if (mail == 'admin@gmail.com' && password == 'Spritle') {
        //     console.log("Admin Login");
        //     axios.get('http://localhost:3001/admin')
        //         .then((response) => {
        //             console.log(response.data);
        //             setUser(response.data);
        //             navigate('/students');
        //         })
        //     console.log("login user is admin: ");
        //     console.log(user);
        // }
        // else {
        //     axios.get('http://localhost:3001/student/' + mail)
        //         .then((response) => {
        //             console.log(response.data);
        //             setUser(response.data);
        //             navigate("/activitylog", {
        //                 state: {
        //                     studentId: mail,
        //                     isAdmin: false
        //                 }
        //             });
        //         })
        //     console.log("login user is");
        //     console.log(user);
        // }
    }


    return (
        <>
            <div style={{ width: '500px', margin: 'auto', marginTop: '60px' }}>
                <div className='container border border-dark-subtle' style={{ padding: '15px' }}>
                    <form onSubmit={login}>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input required type="email" className="form-control" id="mail" placeholder="name@example.com" value={mail} onChange={(n) => setMail(n.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input required type="text" className="form-control" id="pass" value={password} onChange={(n) => setPassword(n.target.value)} />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-danger my-3">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <div style={{ margin: 'auto', marginTop: '60px' }}>
                <Alert alertData={alert} />
            </div>
        </>
    )
}
