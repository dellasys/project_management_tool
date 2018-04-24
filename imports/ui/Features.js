import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Features_Todos } from '../api/Features';
import { Projects_Features } from '../api/Projects';
import ProjectItem from '../ui/Projects/ProjectItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentPage } from '../Actions';
import { CSSTransitionGroup } from 'react-transition-group';
import FeatureItem from './Features/FeatureItem';
import ProjectDoesNotExist from './Common/ProjectDoesNotExist';
import NoFeatureFound from './Common/NoFeatureFound';

class Features extends Component{

    componentWillMount(){
        this.props.setCurrentPage('features');
    }

    render(){

        const { featuresList, featuresSubReady, projectsList, 
                projectsSubReady, projectId } = this.props;
        
        if(!projectsSubReady){
            return <div clsssName='loadingGroup'>Loading...</div>
        }else if(projectsList.length < 1 && projectsSubReady){
            return <ProjectDoesNotExist />
        }
        
        return (
            <div className='features_box'>
                <div className='features_list'>
                    <h3>
                    {
                        projectsList.length > 0 ?
                        projectsList[0].projectName :
                        ''
                    }
                    </h3>
                    {
                        featuresList.length < 1 ?
                        <NoFeatureFound />:
                        ''
                    }
                    {/* <CSSTransitionGroup
                        transitionName="animatelist"
                        transitionEnterTimeout={600}
                        transitionAppearTimeout={600}
                        transitionLeaveTimeout={200}
                        transitionAppear={true} >  */}
                    {
                        featuresList.map(featureData => {
                            return <FeatureItem key={featureData._id} featureData={featureData} />
                        })
                    }
                    {/* </CSSTransitionGroup> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentPage,
}, dispatch);

const FeaturesTracker = withTracker(({match}) => {
    const projectId = match.params.id;
    const featuresSub = Meteor.subscribe('features.todos', projectId);
    const projectsSub = Meteor.subscribe('projects.features', projectId);

    return {
        projectId,
        featuresList: Features_Todos.find().fetch(),
        featuresSubReady: featuresSub.ready(),
        projectsList: Projects_Features.find().fetch(),
        projectsSubReady: projectsSub.ready()
    }
})(Features);

Features.propTypes = {
    featuresList: PropTypes.array.isRequired,
    projectsList: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturesTracker);