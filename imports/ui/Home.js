import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects_Features } from '../api/Projects';
import ProjectItem from '../ui/Projects/ProjectItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentPage } from '../Actions';
import { CSSTransitionGroup } from 'react-transition-group';
// import ReactCSSTransitionGroup from 'react-transition-group';
import TransitionGroup from 'react-transition-group/TransitionGroup'
import Search from '../ui/Projects/Seach';

let searchKeyword = ReactiveVar('');

class Home extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            keyword: ''
        }
    }
    
    componentWillMount(){
        this.props.setCurrentPage('projects');
    }

    searchKeyword = (e) => {
        e.preventDefault();
        searchKeyword.set(this.state.keyword);
    }

    handleKeywordChange = (e) =>{
        this.setState({
            keyword: e.target.value
        })
    }

    render(){

        const { projectList, setCurrentPage, currentPage } = this.props;
        
        return (
            <div>
                <Search handleKeywordChange={this.handleKeywordChange} 
                        searchKeyword={this.searchKeyword} />
                <br/>
                <CSSTransitionGroup
                    className='project-box'
                    transitionName="animatedlist"
                    transitionEnterTimeout={600}
                    transitionAppearTimeout={600}
                    transitionLeaveTimeout={200}
                    transitionAppear={true}>
                    {
                        projectList.map(project => {
                            return (<ProjectItem key={project._id} projectData={project} />)
                        })
                    }
                </CSSTransitionGroup>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentPage: state.projects.currentPage
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentPage,
}, dispatch);

const HomeTracker = withTracker(() => {
    const projectsSub = Meteor.subscribe('projects.features', '', searchKeyword.get());

    return {
        projectList : Projects_Features.find().fetch()
    }
})(Home);

Home.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    currentPage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTracker);