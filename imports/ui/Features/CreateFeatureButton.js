import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';

class CreateFeatureButton extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
            triggerFeatureDialog: false,
            feature:{
                title: '',
                description: ''
            }
        }
    }

    triggerFeatureDialog = (state) => {
        this.setState({
            triggerFeatureDialog: state
        })
    }

    insertProject = (e) => {
        e.preventDefault();
        let objData = {
            ...this.state.feature,
            projectId: this.props.projectId
        };
        Meteor.call('features.insert', objData, (err, res) => {
            if(!err){
                this.setState({
                    feature:{
                        title:'',
                        description:''
                    }
                })
                this.triggerFeatureDialog(false);
            }else{
                alert(err);
            }
        });
    }

    handleInputChange(e) {
        let tempFeature = {...this.state.feature};
        tempFeature[e.target.name] = e.target.value;

        this.setState({
            feature: tempFeature,
        });
    }

    render(){
        const { triggerFeatureDialog, feature } = this.state;
        const { projectId } = this.props;
        const actions = [
            <FlatButton
            label="Cancel"
            primary={true}
            onClick={() => this.triggerFeatureDialog(false)}
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
                <button className='add-new-feature-btn' onClick={() => this.triggerFeatureDialog(true)}>
                    <FontAwesomeIcon icon={faPlus} size='lg' />&nbsp; New Feature
                </button>
                <Dialog
                    title='New Feature'
                    contentStyle={dialogStyle}
                    actions={actions}
                    modal={false}
                    open={triggerFeatureDialog}
                    onRequestClose={() => this.triggerFeatureDialog(false)} >
                    <form onSubmit={(e) => this.insertProject(e)}>
                        <TextField
                            hintText=''
                            value={feature.title}
                            name='title'
                            onChange={(e) => this.handleInputChange(e)}
                            floatingLabelText='Title' />
                        <TextField
                            hintText=''
                            value={feature.description}
                            name='description'
                            onChange={(e) => this.handleInputChange(e)}
                            multiLine={true}
                            rows={2}
                            floatingLabelText='Description' />
                    </form>
                </Dialog>
            </div>
        )
    }
}

CreateFeatureButton.propTypes = {
    projectId: PropTypes.string,
};

export default CreateFeatureButton;