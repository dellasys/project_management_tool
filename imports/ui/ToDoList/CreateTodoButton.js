import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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

    triggerTodoDialog = (state) => {
        this.setState({
            triggerTodoDialog: state
        })
    }

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
                    <button className='btn btn-success' onClick={(e) => this.insertTodo(e)}>Add</button>
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