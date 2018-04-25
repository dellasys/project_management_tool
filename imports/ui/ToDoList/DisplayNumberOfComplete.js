import React from 'react';
import PropTypes from 'prop-types';

const DisplayNumberOfComplete = ({ todosData }) => {

    //Count the total amount of checked and unchecked todo items
    const countTodosComplete = () => {
        let todos = {
            true:0,
            false:0
        };
        todosData.map(todo => {
            todos[todo.checked.toString()]++;
        })

        return todos;
    }

    let todos = countTodosComplete(todosData);

    return (
            <span>
                {
                    todosData.length > 0 ?
                        'Complete ' + todos['true'] +' / '+ todosData.length
                    :
                    ''
                }
            </span>
    )
}

DisplayNumberOfComplete.propTypes = {
    todosData: PropTypes.array.isRequired,
};

export default DisplayNumberOfComplete;