import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { TodosCol } from '../api/Todos';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentPage } from '../Actions';
import { CSSTransitionGroup } from 'react-transition-group';
import TodoItem from './ToDoList/TodoItem';
import CreateTodoButton from './ToDoList/CreateTodoButton';
import NoTodoFound from './ToDoList/NoTodoFound';

class ToDoList extends Component{

    render(){

        const { featureData, todosList } = this.props;
        
        return (
            <div className='todolist_box'>
                {
                    todosList.length < 1 ? 
                        <NoTodoFound />
                    :
                        ''
                }
                <CSSTransitionGroup
                    transitionName="animatedlist"
                    transitionEnterTimeout={300}
                    transitionAppearTimeout={200}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}>
                {
                    todosList.map(todo => {
                        return <TodoItem key={todo._id} todoData={todo} />
                    })
                }
                </CSSTransitionGroup>
                <CreateTodoButton featureData={featureData} />
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentPage,
}, dispatch);

const ToDoListTracker = withTracker(({featureId}) => {

    return {
        
    }
})(ToDoList);

ToDoList.propTypes = {
    featureData: PropTypes.object.isRequired,
    todosList: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoListTracker);