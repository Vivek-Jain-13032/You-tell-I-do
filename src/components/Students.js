import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

export default function Students() {
  let [allStudents, setAllStudents] = useState([]);
  let [student, setStudent] = useState([]);
  const [mail, setMail] = useState('');
  const [num1, setNum1] = useState('');
  const [operation, setOperations] = useState('+');
  const [num2, setNum2] = useState('');
  let [alert, setAlert] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/student').then((response) => {
      console.log(response.data);
      setAllStudents(allStudents = response.data);
      console.log(allStudents);
      console.log(Object.values(response.data));
    });
  }, []);

  const navigate = useNavigate();
  function handleClick(id) {
    console.log("click: " + id);
    navigate("/activitylog", {
      state: {
        studentId: id,
        isAdmin: true
      }
    });
  }

  let showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }

  let sendTask = (event) => {
    event.preventDefault();
    console.log(operation)
    console.log({
      "task": num1 + operation + num2,
      "answer": null,
      "correct": null
    })

    if (num1==null || num1=='' || num2==null || num2=='' || (num1 + operation + num2) == 'nullnull' || operation == '') {
      showAlert('Please Fill Out All Fields', 'danger');
    }
    else {
      console.log("send task");
      axios.get('http://localhost:3001/student/' + mail)
        .then((response) => {
          console.log(response.data);

          setStudent(student = response.data.assingments.push({
            "task": num1 + operation + num2,
            "answer": null,
            "correct": null
          }));

          showAlert('Task send successfully', 'success');

          console.log("student")
          console.log(student)
          console.log(response.data.assingments)
          let assingments = response.data.assingments;
          axios.patch('http://localhost:3001/student/' + mail, {
            assingments
          }).then((response) => { console.log(response) })
        })
    }

  }

  return (
    <div className='container-fluid'>
      <div className="row">

        <h4 className='my-4 mx-3'>All Students</h4>
        <div className="col-7 list" style={{ display: 'flex', flexWrap: 'wrap', margin: '2px' }}>
          {allStudents.map((s) => {
            return <div key={s.id} style={{}}>
              <div className="card mx-2 my-2" style={{ width: "15rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{s.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{s.id}</h6>
                  <button className='btn btn-danger' onClick={c => handleClick(s.id)}>Check Assingments</button>
                </div>
              </div>
            </div>
          })}
        </div>

        <div className="col" style={{ margin: '0px' }}>
          <h4>Post Task</h4>
          <div className='my-5'>
            <label className="form-label">Select Student</label>
            <select required className="form-select" aria-label="Default select example" value={mail} onChange={(n) => setMail(n.target.value)}>
              <option></option>
              {allStudents.map(s => {
                return <option key={s.id} value={s.id}>{s.id}</option>
              })}
            </select>
          </div>
          <div className="input-group mb-3">
            <input required type="number" min={0} max={9} className="form-control" placeholder="Digit-1" aria-label="Digit-1" value={num1} onChange={(n) => setNum1(n.target.value)} />
            <select required className="input-group-text" value={operation} onChange={(n) => setOperations(n.target.value)}>
              <option defaultValue={"+"}>+</option>
              <option value="-">-</option>
              <option value="*">*</option>
              <option value="/">/</option>
            </select>
            <input required type="number" min={0} max={9} className="form-control" placeholder="Digit-2" aria-label="Digit-2" value={num2} onChange={(n) => setNum2(n.target.value)} />
          </div>
          {/* <div className='my-5'> */}
          <button className='btn btn-danger' onClick={sendTask}>Send Task</button>
          {/* </div> */}
        </div>

        <div style={{ margin: 'auto', marginTop: '60px' }}>
          <Alert alertData={alert} />
        </div>

      </div>
    </div>
  )
}
