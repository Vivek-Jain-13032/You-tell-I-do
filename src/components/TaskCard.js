import React, { useRef } from 'react'

export default function TaskCard(props) {
    const inputRef = useRef();

    return (
        <div>
            <div className="card mx-2 my-2" style={(props.fTask=='No Task')?{display:'none'}:{display:'block', width: "16rem" }}>
                <div className="card-header">
                    {props.fTask} = ?
                    <div style={(props.answer=='Not Attempted')?{display:'none'}:{display:'block', float:'right'}}>
                        {(props.answer==props.correct)?<strong>&#9745;</strong>:<strong>&#9746;</strong>}
                    </div>
                    <div style={(props.answer=='Not Attempted')?{display:'block', float:'right'}:{display:'none'}}>
                        <strong>&#9744;</strong>
                    </div>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Submited Ans: {props.answer}</h6>
                    <p className="card-text">Correct Ans: <span style={(props.correct=='Not Declared')?{fontWeight:'lighter'}:{fontWeight:'bold'}}>{props.correct}</span></p>

                    <button className='btn btn-danger' onClick={() => props.evaluate(props.task)} style={(props.user) ? { display: 'block' } : { display: 'none' }} disabled={props.correct!='Not Declared'}>Evaluate Answer</button>

                    <input required min={0} max={9} type="number" ref={inputRef} className="form-control my-1" id='ans' placeholder="your answer" style={(props.user) ? { display: 'none' } : { display: 'block' }} disabled={props.answer!='Not Attempted'}/>

                    <button className='btn btn-danger' onClick={() => props.submitAns(props.task, inputRef.current.value)} style={(props.user) ? { display: 'none' } : { display: 'block' }} disabled={props.answer!='Not Attempted'}>Submit Answer</button>
                </div>
            </div>
            <div className='text-center' style={(props.fTask=='No Task')?{width:'500px', margin:'110px'}:{display:'none'}}>
                <h1 className='text-center' style={{color:'tomato'}}>Task Not Assigned Yet</h1>
            </div>
        </div>
    )
}