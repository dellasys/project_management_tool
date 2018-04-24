import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const TimeFromNow = ({ dateTime }) => {

    return (
            <span className='time-from-now'>
                {moment(new Date(dateTime)).fromNow()}
            </span>
    )
}

TimeFromNow.propTypes = {
    dateTime: PropTypes.string.isRequired,
};

export default TimeFromNow;