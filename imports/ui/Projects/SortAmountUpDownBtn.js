import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSortAmountUp, faSortAmountDown } from '@fortawesome/fontawesome-free-solid';

const SortAmountUpDownBtn = ({ sortingUpDownValue, sortUpDown }) => {
    
    return (
        <button className='btn btn-default' onClick={sortUpDown} >
        {
            sortingUpDownValue === 1 ? 
                <FontAwesomeIcon icon={faSortAmountUp} size='lg' />
            :
                <FontAwesomeIcon icon={faSortAmountDown} size='lg' />
        }
        </button>
    )
}

SortAmountUpDownBtn.propTypes = {
    sortingUpDownValue: PropTypes.number.isRequired,
    sortUpDown: PropTypes.func.isRequired,
};

export default SortAmountUpDownBtn;