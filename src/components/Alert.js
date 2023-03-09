import React from 'react'

export default function Alert(props) {
    return (
        props.alertData && <div className={`alert alert-${props.alertData.type} d-flex align-items-center container`} role="alert" style={{ height: '40px', textAlign: 'center', alignContent: 'center', width: '700px'}}>
            <div style={{ width: '500px', margin: '0px auto' }}>
                {props.alertData.msg}
            </div>
        </div>
    )
}
