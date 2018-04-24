import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link, Redirect } from "react-router-dom";
import TextField from 'material-ui/TextField';
import SaveBtn from '../Common/SaveBtn';
import EditBtn from '../Common/EditBtn';
import RemoveBtn from '../Common/RemoveBtn';
import TimeFromNow from '../Common/TimeFromNow';
import DisplayFeaturesNumber from '../Projects/DisplayFeaturesNumber';
import Paper from 'material-ui/Paper';

class ProjectItem extends PureComponent {

    constructor(props){
        super(props);

        this.state = {
            projectEdit: false,
            projectName: props.projectData.projectName,
            redirectToFeatures: false
        }
    }

    editProject = () => {
        this.setState({
            projectEdit: !this.state.projectEdit
        })
    }

    saveProject = () => {
        const objData = {
            projectName: this.state.projectName
        };
        Meteor.call('projects.update', this.props.projectData._id, objData, (err, res) => {
            if(!err){
                this.setState({
                    projectEdit: false
                })
            }
        });
    }

    removeProject(){
        Meteor.call('projects.remove', this.props.projectData._id, (err, res) => {
            if(err){
               alert(err); 
            }
        });
    }

    removeAllProjectAssociatesData(){
        Meteor.call('remove.projects.features.todos', this.props.projectData._id, (err, res) => {
            if(err){
                alert(err);
            }
        });
    }

    handleInputChange(e) {
        this.setState({
            projectName: e.target.value,
        });
    }

    render(){
        const { projectData } = this.props;
        const { projectName, projectEdit } = this.state;
        
        return (
            <Paper>
                <div className='project-item'>
                    <div>
                        {
                            projectEdit ? 
                                <TextField
                                    name='projectName'
                                    fullWidth={true}
                                    value={projectName}
                                    onChange={(e) => this.handleInputChange(e)}
                                    hintText="" />
                            :
                            <Link to={`/features/${projectData._id}`}>{projectName}</Link>
                        }
                    </div>
                    <div>
                        {
                            projectEdit ? 
                                <div className='edit-remove-btn-group'>
                                    <SaveBtn saveData={() => this.saveProject()}/>
                                </div>
                            :
                                <div className='edit-remove-btn-group'>
                                    <EditBtn editData={this.editProject} />
                                    <RemoveBtn removeData={() => this.removeAllProjectAssociatesData()} />
                                </div>
                        }
                    </div>
                    <div className='feature-row'>
                        <DisplayFeaturesNumber featuresNumber={projectData.features.length} />
                        <TimeFromNow dateTime={projectData.createdAt}/>
                    </div>
                </div>
            </Paper>
        )
    }
}

ProjectItem.propTypes = {
    projectData: PropTypes.object.isRequired,
};

export default ProjectItem;