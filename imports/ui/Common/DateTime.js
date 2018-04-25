import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DateTime = ({ dateTime }) => {

    return (
            <span className='time-from-now'>
                { moment(new Date(dateTime)).format('YYYY-MM-DD hh:mm A') }
            </span>
    )
}

DateTime.propTypes = {
    dateTime: PropTypes.string.isRequired,
};

export default DateTime;