import React, { useEffect, useState } from 'react'
import axios, { } from "axios";
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    let [students, setStudents] = useState([]);
    let [alert, setAlert] = useState(null);
    const navigate = useNavigate();

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

    let register = (event) => {
        event.preventDefault();
        let arr = students.filter((f) => {
            if (f.id == mail) {
                console.log('findout')
                return f;
            }
        })

        if (arr.length >= 1) {
            console.log("already registered")
            showAlert('User Already Exists', 'danger')
        }
        else {
            console.log("submited")
            axios.post('http://localhost:3001/student', {
                "id": mail,
                "name": name,
                "password": password,
                "assingments": [
                    // {
                    //     // "task": null,
                    //     // "answer": null,
                    //     // "correct": null
                    // }
                ]
            }).then(()=>{
                navigate('/');
            })
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3001/student')
            .then((response) => {
                setStudents(students = response.data);
                console.log(students);
            })
    }, [])


    return (
        <>
            <div className='container border border-dark-subtle' style={{ width: '500px', margin: 'auto', marginTop: '60px' }}>
                <form style={{ padding: '15px' }} onSubmit={register}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input required type="text" className="form-control" id="name" value={name} onChange={(n) => setName(n.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input required type="email" className="form-control" id="mail" placeholder="name@example.com" value={mail} onChange={(n) => setMail(n.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input required type="text" className="form-control" id="pass" value={password} onChange={(n) => setPassword(n.target.value)} />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-danger my-3">Sign Up</button>
                    </div>
                </form>
            </div>
            <div style={{ margin: 'auto', marginTop: '60px' }}>
                <Alert alertData={alert} />
            </div>
        </>
    )
}
