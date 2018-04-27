import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSortAlphaUp, faSortAlphaDown } from '@fortawesome/fontawesome-free-solid';

const SortAlphaUpDownBtn = ({ sortingUpDownValue, sortUpDown }) => {

    return (
        <button className='btn btn-default' onClick={sortUpDown} >
        {
            sortingUpDownValue === 1 ? 
                <FontAwesomeIcon icon={faSortAlphaDown} size='lg' />
            :
                <FontAwesomeIcon icon={faSortAlphaUp} size='lg' />
        }
        </button>
    )
}

SortAlphaUpDownBtn.propTypes = {
    sortingUpDownValue: PropTypes.number.isRequired,
    sortUpDown: PropTypes.func.isRequired,
};

export default SortAlphaUpDownBtn;