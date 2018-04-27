import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';

class CreateTodoButton extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
            triggerTodoDialog: false,
            todo:{
                name: '',
            }
        }
            
    }

    //Open dialog by changing state
    triggerTodoDialog = (state) => {
        this.setState({
            triggerTodoDialog: state
        })
    }

    //Insert new todo item into db
    insertTodo = (e) => {
        e.preventDefault();
        let objData = {
            ...this.state.todo,
            featureId: this.props.featureData._id,
            projectId: this.props.featureData.projectId,
            checked: false
        };
        
        Meteor.call('todos.insert', objData, (err, res) => {
            Meteor.call('features.update', this.props.featureData._id, {modifiedTodoAt: new Date()}, (err1, res1) => {
                if(!err1){
                    this.triggerTodoDialog(false);
                    this.setState({
                        todo:{ name:'' }
                    })
                }else{
                    alert(err);
                }
            })
        });
    }

    //Update todo state when inserting
    handleInputChange(e) {
        let tempTodo = {...this.state.todo};
        tempTodo[e.target.name] = e.target.value;

        this.setState({
            todo: tempTodo,
        });
    }

    render(){
        const { triggerTodoDialog, todo } = this.state;
        const { featureData, projectId } = this.props;
        
        const actions = [
            <FlatButton
            label="Cancel"
            primary={true}
            onClick={() => this.triggerTodoDialog(false)}
            />,
            <FlatButton
            label="Create"
            primary={true}
            onClick={() => this.insertProject()}
            />,
        ];
        const dialogStyle = {
            width:'300px',
            backgroundColor: 'red'
        }

        return (
            <form onSubmit={(e) => this.insertTodo(e)}>
                <div className='add-new-todo'>
                    <TextField
                        value={todo.name}
                        fullWidth={true}
                        name='name'
                        onChange={(e) => this.handleInputChange(e)}
                        hintText="Enter new todo" />
                    <div className='add-new-do-btn'>
                        &nbsp;&nbsp;
                        <button className='btn btn-default add-new-todo-btn' onClick={(e) => this.insertTodo(e)}>
                            <span className='add-new-todo-btn-icon'>
                                <FontAwesomeIcon icon={faPlus} size='lg' />
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

CreateTodoButton.propTypes = {
    featureData: PropTypes.object.isRequired,
    projectId: PropTypes.string,
};

export default CreateTodoButton;