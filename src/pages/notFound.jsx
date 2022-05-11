import React from 'react'
import img from '../assets/notfound.png'

const PageNotFound = () => {
    return (
        <div className="notfound">
            <img src={img} alt="not found" />
            <h1>Has entrado a un mundo desconocido, mejor vuelve al inicio...</h1>
        </div>
    );
}

export default PageNotFound