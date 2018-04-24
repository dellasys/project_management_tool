import React from 'react';
import PropTypes from 'prop-types';

const EditBtn = ({editData}) => {

    return (
            <button className='btn btn-warning' onClick={editData}>
                <i className="far fa-edit"></i>
            </button>
    )
}

EditBtn.propTypes = {
    editData: PropTypes.func.isRequired,
};

export default EditBtn;