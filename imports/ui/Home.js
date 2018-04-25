import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects_Features } from '../api/Projects';
import ProjectItem from '../ui/Projects/ProjectItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentPage } from '../Actions';
import { CSSTransitionGroup } from 'react-transition-group';
import Search from './Projects/Seach';
import ProjectsSorting from './Projects/ProjectsSorting';
import NoItemFound from './Common/NoItemFound';

//Reactive Variables
let searchKeyword = ReactiveVar('');
let sortingField = ReactiveVar('createdAt');
let sortingUpDownValue = ReactiveVar(1);

class Home extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            keyword: '',
        }
    }
    
    //Update current page to redux store everytime component mounting
    componentWillMount(){
        this.props.setCurrentPage('projects');
    }

    //Update reactive variable keyword when search button clicked.
    searchKeyword = (e) => {
        e.preventDefault();
        searchKeyword.set(this.state.keyword);
    }

    //Update keyword state that being entered in search input
    handleKeywordChange = (e) =>{
        this.setState({
            keyword: e.target.value
        })
    }

    //Button Clicked: Set field name that needs to be sorted
    sortProjects = (event, index, value) => {
        sortingField.set(value);
    }

    // Button Clicked: If value is 1 return -1 Else return 1
    sortUpDown = () => {
        let upDownValue = sortingUpDownValue.get() == 1 ? -1: 1;
        sortingUpDownValue.set(upDownValue);
    }

    render(){

        const { projectList, setCurrentPage, currentPage } = this.props;
        const {  } = this.state;
        
        return (
            <div>
                <div className='projects-sorting-row'>
                    <ProjectsSorting sortingField={sortingField.get()} 
                            sortingUpDownValue={sortingUpDownValue.get()} sortProjects={this.sortProjects}
                            sortUpDown={this.sortUpDown} />
                </div>
                <Search handleKeywordChange={this.handleKeywordChange} 
                        searchKeyword={this.searchKeyword} />
                {
                    projectList.length < 1 ? 
                        <NoItemFound content='No project found.' />
                    :
                    ''
                }
                <CSSTransitionGroup
                    className='project-box'
                    transitionName="animatedlist"
                    transitionEnterTimeout={300}
                    transitionAppearTimeout={200}
                    transitionLeaveTimeout={300}
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
        projectList : Projects_Features.find({}, {sort: { [sortingField.get()]: sortingUpDownValue.get() }}).fetch()
    }
})(Home);

Home.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    currentPage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTracker);