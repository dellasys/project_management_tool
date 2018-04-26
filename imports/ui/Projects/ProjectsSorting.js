import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SortAmountUpDownBtn from './SortAmountUpDownBtn';
import SortAlphaUpDownBtn from './SortAlphaUpDownBtn';

class ProjectsSorting extends Component {

    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    render(){
        const { sortProjects, sortUpDown, sortingField, sortingUpDownValue } = this.props;
        const {  } = this.state;
        
        return (
            <div className='sorting-group'>
                <SelectField
                    floatingLabelText="Sort by"
                    value={sortingField}
                    onChange={sortProjects} >
                    <MenuItem value='createdAt' primaryText="Created time" />
                    <MenuItem value='lowerCaseProjectName' primaryText="Project name" />
                </SelectField>
                &nbsp;&nbsp;
                {
                    sortingField == 'createdAt' ? 
                        <SortAmountUpDownBtn sortingUpDownValue={sortingUpDownValue} sortUpDown={sortUpDown} />
                    :
                        <SortAlphaUpDownBtn sortingUpDownValue={sortingUpDownValue} sortUpDown={sortUpDown} />
                }
            </div>
        )
    }
}

ProjectsSorting.propTypes = {
    sortProjects: PropTypes.func.isRequired,
};

export default ProjectsSorting;