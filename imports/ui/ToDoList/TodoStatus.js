import React from 'react';
import PropTypes from 'prop-types';

const TodoStatus = ({todoStatus}) => {

    return (
            <div>
                {
                    todoStatus ? 
                        <span className='complete-status'>
                            Complete
                        </span>
                    :
                        <span className='incomplete-status'>
                            Incomplete
                        </span>
                }
            </div>
    )
}

TodoStatus.propTypes = {
    todoStatus: PropTypes.bool.isRequired,
};

export default TodoStatus;