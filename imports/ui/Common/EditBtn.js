import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-solid';

const EditBtn = ({editData}) => {

    return (
            <button className='edit-icon-btn' onClick={editData}>
                <FontAwesomeIcon icon={faEdit} size='lg' />
            </button>
    )
}

EditBtn.propTypes = {
    editData: PropTypes.func.isRequired,
};

export default EditBtn;