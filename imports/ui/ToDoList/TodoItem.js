import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from "react-router-dom";
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SaveBtn from '../Common/SaveBtn';
import EditBtn from '../Common/EditBtn';
import RemoveBtn from '../Common/RemoveBtn';
import TodoStatus from '../ToDoList/TodoStatus';

const styles = {
    block: {
      maxWidth: 250,
    },
    checkbox: {
      marginBottom: 16,
    },
    checked: {
        textDecoration: 'line-through',
    }
};
  

class TodoItem extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            checked: props.todoData.checked,
            todoValue: props.todoData.name,
            todoEdit:false
        }
    }

    editTodo(){
        this.setState({
            todoEdit: !this.state.todoEdit
        })
    }

    saveTodo(){
        const objData = {
            name: this.state.todoValue
        };
        Meteor.call('todos.update', this.props.todoData._id, objData, (err, res) => {
            if(!err){
                this.setState({
                    todoEdit: false
                })
            }
        });
    }

    removeTodo(){
        Meteor.call('todos.remove', this.props.todoData._id, (err, res) => {
            Meteor.call('features.update', this.props.todoData.featureId, {modifiedTodoAt: new Date()}, (err1, res1) => {
                if(!err){
                    
                }
            });
        });
    }

    updateCheck() {
        const objData = {
            checked: !this.state.checked
        }
        Meteor.call('todos.update', this.props.todoData._id, objData, (err, res) => {
            Meteor.call('features.update', this.props.todoData.featureId, {modifiedTodoAt: new Date()}, (err1, res1) => {
                if(!err){
                    this.setState((oldState) => {
                        return {
                          checked: !oldState.checked,
                        };
                    });
                }
            });
        });
    }

    handleInputChange(e) {
        this.setState({
            todoValue: e.target.value,
        });
    }

    render() {
        const { todoData } = this.props;
        const { todoValue, todoEdit } = this.state;
        
        return (
            <div className='todo-item fade-in'>
                <div className='todo-grid-child'>
                    <Checkbox
                        label=""
                        checked={this.state.checked}
                        onCheck={this.updateCheck.bind(this)}
                        style={styles.checkbox} />
                </div>
                <div className='todo-grid-child' style={todoData.checked ? styles.checked: {}}>
                    <div>
                        {
                            todoEdit ?
                                <TextField
                                    name='todoValue'
                                    value={todoValue}
                                    onChange={(e) => this.handleInputChange(e)}
                                    hintText="" />
                            :
                                <div>{todoValue}</div>
                        }
                    </div>
                </div>
                <div className='todo-grid-child'>
                    <TodoStatus todoStatus={todoData.checked} />
                </div>
                <div className='todo-grid-child'>
                {
                    todoEdit ? 
                        <div className='edit-remove-btn-group'>
                            <SaveBtn saveData={() => this.saveTodo()} />
                        </div>
                    :
                        <div className='edit-remove-btn-group'>
                            <EditBtn editData={() => this.editTodo()} />
                            <RemoveBtn removeData={() => this.removeTodo()} />
                        </div>
                }
                </div>
            </div>
        )
    }
}

TodoItem.propTypes = {
    todoData: PropTypes.object.isRequired,
};

export default TodoItem;