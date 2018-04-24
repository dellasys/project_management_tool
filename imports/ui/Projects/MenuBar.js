import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from './Breadcrumbs';
import CreateProjectButton from './CreateProjectButton';
import CreateFeatureButton from '../Features/CreateFeatureButton';
import CreateTodoButton from '../ToDoList/CreateTodoButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Divider from 'material-ui/Divider';

class MenuBar extends Component{

    render(){
        const { currentPage, location } = this.props;
        const pathInfo = location.pathname.split('/');
        const projectId = pathInfo[2];
        
        return (
            <div>
                <div className='menu-bar'>
                    <Breadcrumbs />
                    {
                        currentPage == 'projects' ?
                            <CreateProjectButton projectId={projectId} /> :
                        currentPage == 'features' ?
                            <CreateFeatureButton projectId={projectId} /> :
                        currentPage == 'todolist' ?
                            <CreateTodoButton projectId={projectId} /> :
                        ''
                    }
                    
                </div>
                <Divider />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentPage: state.projects.currentPage
});

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch);

MenuBar.propTypes = {
    currentPage: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);