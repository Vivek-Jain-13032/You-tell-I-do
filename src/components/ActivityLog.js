import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import TaskCard from './TaskCard';

export default function ActivityLog() {
    const location = useLocation();
    console.log('location', location.state);
    let [student, setStudent] = useState([]);
    let [assingments, setAssingments] = useState([]);
    let [flag, setFlag] = useState(true);
    const inputRef = useRef();


    let id = location.state.studentId;
    useEffect(() => {
        axios.get('http://localhost:3001/student/' + id).then((response) => {
            console.log(response.data);
            setStudent(student = Object.values(response.data));
            console.log(student);
            console.log(Object.values(response.data));
            console.log(student[3].length)

            setAssingments(assingments = student[3])
            console.log(assingments.length)
            let a = assingments.filter((f) => {
                if (f.task == null) {
                    return true;
                }
            })
            console.log(a);
            if (a[0].task == undefined || a[0].task == null) {
                setFlag(flag = false)
            }
            console.log(flag);
        });
    }, []);

    // functions to validate the answers...
    function zero(func) {
        return makeNum(0, func);
    }
    function one(func) {
        return makeNum(1, func);
    }
    function two(func) {
        return makeNum(2, func);
    }
    function three(func) {
        return makeNum(3, func);
    }
    function four(func) {
        return makeNum(4, func);
    }
    function five(func) {
        return makeNum(5, func);
    }
    function six(func) {
        return makeNum(6, func);
    }
    function seven(func) {
        return makeNum(7, func);
    }
    function eight(func) {
        return makeNum(8, func);
    }
    function nine(func) {
        return makeNum(9, func);
    }



    function plus(right) {
        return function (left) { return left + right; };
    }
    function minus(right) {
        return function (left) {
            return left - right;
        };
    }
    function times(right) {
        return function (left) { return left * right; };
    }
    function dividedBy(right) {
        return function (left) {
            if(right == 0){
                return Infinity;
            }
            let r = right/left;
            console.log('r: '+r)
            return Math.floor(r);
        };
    }


    function makeNum(num, func) {
        if (func === undefined) {
            return num;
        } else {
            return func(num);
        }
    }

    let pandingAssingments = assingments.filter((f) => { if (f.answer == null) { return true; } }).length;
    // let flag = assingments.filter((f) => { if (f.task == null) { return true; } })
    // console.log("flag: " + flag);

    const formateTask = (task) => {
        let temp = task;
        console.log(temp)
        const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        // return words[num];
        if (temp == null) {
            return 'No Task';
        }
        let tempArr = temp.split('');
        let left = tempArr[0];
        let f = tempArr[1];
        let right = tempArr[2];
        let fName;

        switch (f) {
            case '+':
                fName = 'plus';
                break;
            case '-':
                fName = 'minus';
                break;
            case '*':
                fName = 'times';
                break;
            case '/':
                fName = 'dividedBy';
                break;
            default:
                throw new Error('Invalid token');
        }
        console.log(words[left] + '(' + fName + '(' + words[right] + ')))')
        return words[left] + '(' + fName + '(' + words[right] + ')))';
    }


    let evaluate = (task, id) => {
        let taskArr = task.split('');
        console.log(taskArr);

        // Convert tokens to functions and numbers
        const convertedTaskArr = taskArr.map(t => {
            if (isNaN(t)) {
                switch (t) {
                    case '+':
                        return plus;
                    case '-':
                        return minus;
                    case '*':
                        return times;
                    case '/':
                        return dividedBy;
                    default:
                        throw new Error('Invalid token');
                }
            } else {
                return parseInt(t, 10);
            }
        });

        console.log(convertedTaskArr)

        // Evaluate the expression
        let result = convertedTaskArr[0];
        for (let i = 1; i < convertedTaskArr.length; i += 2) {
            const operator = convertedTaskArr[i];
            const operand = convertedTaskArr[i + 1];
            console.log(operator + ' ' + result + ' ' + operand)
            result = operator(result)(operand);
        }
        console.log(result);

        //adding correct answer in data
        let newAssing = assingments.map((f) => {
            if (f.task == task) {
                f.correct = result;
                return f
            }
            else {
                return f
            }
        })
        console.log(newAssing);
        console.log(assingments);

        axios.patch('http://localhost:3001/student/' + student[0], {
            assingments
        }).then((response) => {
            console.log(response)
            fetchAgain();
        })

    }

    let fetchAgain = () => {
        axios.get('http://localhost:3001/student/' + id).then((response) => {
            console.log(response.data);
            setStudent(student = Object.values(response.data));
            setAssingments(assingments = student[3])
        });
    }

    let submitAns = (task, refValue) => {
        console.log("submitAns");
        //adding submited answer in data
        let newAssing = assingments.map((f) => {
            if (f.task == task) {
                f.answer = refValue;
                return f
            }
            else {
                return f
            }
        })
        console.log(newAssing);
        console.log(assingments);

        axios.patch('http://localhost:3001/student/' + student[0], {
            assingments
        }).then((response) => {
            console.log(response)
            fetchAgain();
        })
    }


    return (
        <>
            <div>
                <h1 className='text-center my-3'>Activity Log</h1>
            </div>

            <div className="container">
                <div className="row">
                    <div className="card col-4" style={{ width: '18rem' }}>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Name: {student[1]}</li>
                            <li className="list-group-item">Email Id: {student[0]}</li>
                            <div style={(flag) ? { display: 'block' } : { display: 'none' }}>
                                <li className="list-group-item">Total Assingments: {assingments.length}</li>
                                <li className="list-group-item">Attemped Assingments: {assingments.length - pandingAssingments}</li>
                                <li className="list-group-item">Panding Assingments: {pandingAssingments}</li>
                            </div>
                        </ul>
                    </div>

                    <div className="assingment col" style={{ display: 'flex', flexWrap: 'wrap', margin: '2px' }}>
                        {assingments.map((s) => {
                            return <div key={s.task} style={{}}>
                                <TaskCard task={s.task} fTask={formateTask(s.task)} answer={(s.answer) ? s.answer : 'Not Attempted'} correct={(s.correct != null) ? s.correct : 'Not Declared'} user={location.state.isAdmin}
                                    evaluate={evaluate} submitAns={submitAns} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
