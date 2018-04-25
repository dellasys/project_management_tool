import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from "react-router-dom";
import ToDoList from '../ToDoList';
import RenderToLayer from 'material-ui/internal/RenderToLayer';
import TextField from 'material-ui/TextField';
import SaveBtn from '../Common/SaveBtn';
import EditBtn from '../Common/EditBtn';
import RemoveBtn from '../Common/RemoveBtn';
import Paper from 'material-ui/Paper';
import DisplayNumberOfComplete from '../ToDoList/DisplayNumberOfComplete';

class FeatureItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            featureEdit: false,
            featureForm: {
                title: this.props.featureData.title,
                description: this.props.featureData.description 
            }
        }
    }

    //TUrn editing mode on
    editFeature = () => {
        this.setState({
            featureEdit: !this.state.featureEdit
        })
    }

    //Update existing feature
    saveFeature = () => {
        const objData = {
            ...this.state.featureForm
        };
        Meteor.call('features.update', this.props.featureData._id, objData, (err, res) => {
            if(!err){
                this.setState({
                    featureEdit: false
                })
            }
        });
    }

    //Remove all todos that associated with a feature
    removeAllFeatureAssociatesData = () => {
        Meteor.call('remove.features.todos', this.props.featureData._id, (err, res) => {
            if(!err){

            }
        })
    }

    //Update features information when editing
    handleInputChange = (e) => {
        let formObj = {...this.state.featureForm};
        formObj[e.target.name] = e.target.value;

        this.setState({
            featureForm: formObj,
        });
    }

    render(){
        const { featureData } = this.props;
        const { featureEdit, featureForm } = this.state;

        return (
            <Paper className='feature-item'>
                {/* <div > */}
                    <div>
                        <div className=''>
                            <b>Title</b> : &nbsp;
                            {
                                featureEdit ? 
                                <div>
                                    <TextField
                                        name='title'
                                        fullWidth={true}
                                        value={featureForm.title}
                                        onChange={(e) => this.handleInputChange(e)}
                                        hintText="" />
                                </div> :
                                featureForm.title
                            }
                        </div>
                        <div>
                            <b>Description</b> : &nbsp;
                            {
                                featureEdit ? 
                                <div>
                                    <TextField
                                        name='description'
                                        fullWidth={true}
                                        value={featureForm.description}
                                        multiLine={true}
                                        rows={2}
                                        onChange={(e) => this.handleInputChange(e)}
                                        hintText="" />
                                </div> : 
                                featureForm.description
                            }
                        </div>
                    </div>
                    <div className=''>
                        {
                            featureEdit ? 
                                <div className='edit-remove-btn-group'>
                                    <SaveBtn saveData={() => this.saveFeature()} />
                                </div>
                            :
                                <div className='edit-remove-btn-group'>
                                    <EditBtn editData={() => this.editFeature()} />
                                    <RemoveBtn removeData={() => this.removeAllFeatureAssociatesData()} />
                                </div>
                        }
                    </div>
                    <div>
                        <a className='view-todo-list-btn' data-toggle='collapse' 
                                href={`#viewTodoList${featureData._id}`} expanded='false'>
                            <div className='view-todo-list-btn-div'>
                                <div></div>
                                You have {featureData.todos.length} todo in the list
                                <div>
                                    <DisplayNumberOfComplete todosData={featureData.todos} />
                                </div>
                                <div></div>
                            </div>
                        </a>
                        <div className='collapse' id={`viewTodoList${featureData._id}`}>
                            <ToDoList featureData={featureData} todosList={featureData.todos} />
                        </div>
                    </div>
                {/* </div> */}
            </Paper>
        )

    }
}

FeatureItem.propTypes = {
    featureData: PropTypes.object.isRequired,
};

export default FeatureItem;