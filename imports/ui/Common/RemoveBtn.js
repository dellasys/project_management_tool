import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid';

const RemoveBtn = ({removeData}) => {

    return (
            <button className='btn btn-danger' onClick={removeData}>
                <FontAwesomeIcon icon={faTrashAlt} size='lg' />
            </button>
    )
}

RemoveBtn.propTypes = {
    removeData: PropTypes.func.isRequired,
};

export default RemoveBtn;