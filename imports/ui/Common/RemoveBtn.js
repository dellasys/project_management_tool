import React from 'react';
import PropTypes from 'prop-types';

const RemoveBtn = ({removeData}) => {

    return (
            <button className='btn btn-danger' onClick={removeData}>
                <i className="fas fa-trash-alt"></i>
            </button>
    )
}

RemoveBtn.propTypes = {
    removeData: PropTypes.func.isRequired,
};

export default RemoveBtn;