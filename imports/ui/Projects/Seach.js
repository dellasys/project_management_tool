import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const Search = ({ handleKeywordChange, searchKeyword }) => {
    
    return (
        <form onSubmit={(e) => searchKeyword(e)}>
            <div className='search-input-group'>
                <TextField
                    name='keyword'
                    fullWidth={true}
                    hintText="Search"
                    onChange={(e) => handleKeywordChange(e)} />
                <div>
                    <button className='btn btn-success' onClick={(e) => searchKeyword(e)}>Search</button>
                </div>
                <div className='hint'>Keywords : Project Name, Feature Title, Feature Description, Todo Title</div>
            </div>
        </form>
    )
}

Search.propTypes = {
    handleKeywordChange: PropTypes.func.isRequired,
    searchKeyword: PropTypes.func.isRequired,
};

export default Search;