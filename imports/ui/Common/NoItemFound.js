import React from 'react';
import { Link } from "react-router-dom";

const NoItemFound = ({ content }) => {

    return (
            <div className='project-not-found-message'>
                {content}
            </div>
    )
}

export default NoItemFound;