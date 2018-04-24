import React from 'react';
import PropTypes from 'prop-types';

const SaveBtn = ({ saveData }) => {

    return (
            <button className='btn btn-primary' onClick={saveData}>
                <i className="far fa-save"></i>
            </button>
    )
}

SaveBtn.propTypes = {
    saveData: PropTypes.func.isRequired,
};

export default SaveBtn;