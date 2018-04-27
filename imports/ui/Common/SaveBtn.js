import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/fontawesome-free-solid';

const SaveBtn = ({ saveData }) => {

    return (
        <button className='save-icon-btn' onClick={saveData}>
            <FontAwesomeIcon icon={faSave} size='lg' />
        </button>
    )
}

SaveBtn.propTypes = {
    saveData: PropTypes.func.isRequired,
};

export default SaveBtn;