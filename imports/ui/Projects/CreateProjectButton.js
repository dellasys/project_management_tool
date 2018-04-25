import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class CreateProjectButton extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
            triggerProjectNameDialog: false,
            projectName:''
        }
    }

    //Open dialog by chaning the state
    triggerProjectNameDialog = (state) => {
        this.setState({
            triggerProjectNameDialog: state,
            projectName: ''
        })
    }

    //Insert new project
    insertProject = (e) => {
        e.preventDefault();
        let objData = {
            projectName: this.state.projectName
        }
        Meteor.call('projects.insert', objData, (err, res) => {
            if(!err){
                this.triggerProjectNameDialog(false);
            }else{
                alert(err);
            }
        });
    }

    //Update new project name state
    handleInputChange = (e) => {
        this.setState({
            projectName: e.target.value,
        });
    }

    

    render(){
        const { triggerProjectNameDialog, projectName } = this.state;
        const { projectId } = this.props;
        const actions = [
            <FlatButton
            label="Cancel"
            primary={true}
            onClick={() => this.triggerProjectNameDialog(false)}
            />,
            <FlatButton
            label="Create"
            primary={true}
            onClick={(e) => this.insertProject(e)}
            />,
        ];
        const dialogStyle = {
            width:'300px',
            backgroundColor: 'red'
        }
        
        return (
            <div>
                <button type='button' className='btn btn-info' 
                        onClick={() => this.triggerProjectNameDialog(true)}>
                    <i className="fas fa-plus"></i> New Project
                </button>
                <Dialog
                    title='New Project'
                    contentStyle={dialogStyle}
                    actions={actions}
                    modal={false}
                    open={triggerProjectNameDialog}
                    onRequestClose={() => this.triggerProjectNameDialog(false)} >
                    <form onSubmit={(e) => this.insertProject(e)}>
                        <TextField
                            hintText=""
                            value={projectName}
                            onChange={(e) => this.handleInputChange(e)}
                            floatingLabelText="Name" />
                    </form>
                </Dialog>
            </div>
        )
    }
}

CreateProjectButton.propTypes = {
    projectId: PropTypes.string,
};

export default CreateProjectButton;