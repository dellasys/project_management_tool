import React from 'react';
import { Link } from "react-router-dom";

const ProjectDoesNotExist = () => {

    return (
            <div className='project-not-found-message'>
                Project does not exist. Return to <Link to='/'>Home</Link>.
            </div>
    )
}

export default ProjectDoesNotExist;