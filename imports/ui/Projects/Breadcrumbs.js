import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";

class Breadcrumbs extends Component{

    render(){

        const { currentPage } = this.props;
        
        return (
            <div className='breadcrumbs-group'>
                {
                    currentPage == 'projects'?
                        <span> Main </span> :
                    currentPage == 'features' ?
                        <span> <Link to='/'>Main</Link>&nbsp;&nbsp;&nbsp;>>&nbsp;&nbsp;&nbsp;Features </span> :
                    ''
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentPage: state.projects.currentPage
});

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch);

Breadcrumbs.propTypes = {
    currentPage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);