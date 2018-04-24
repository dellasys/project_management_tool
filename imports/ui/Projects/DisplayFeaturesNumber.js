import React from 'react';
import PropTypes from 'prop-types';

const DisplayFeaturesNumber = ({ featuresNumber }) => {

    return (
            <span>{featuresNumber} Features</span>
    )
}

DisplayFeaturesNumber.defaultProps = {
    featuresNumber: 0
}

DisplayFeaturesNumber.propTypes = {
    featuresNumber: PropTypes.number,
};

export default DisplayFeaturesNumber;