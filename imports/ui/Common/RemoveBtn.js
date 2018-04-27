import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid';

const RemoveBtn = ({removeData}) => {

    return (
            <button className='remove-icon-btn' onClick={removeData}>
                <FontAwesomeIcon icon={faTrashAlt} size='lg' />
            </button>
    )
}

RemoveBtn.propTypes = {
    removeData: PropTypes.func.isRequired,
};

export default RemoveBtn;