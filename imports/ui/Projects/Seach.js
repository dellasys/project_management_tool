import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';

const Search = ({ handleKeywordChange, searchKeyword }) => {
    
    return (
        <div className='search-input-group'>
            <form onSubmit={(e) => searchKeyword(e)}>
                <TextField
                    name='keyword'
                    fullWidth={true}
                    hintText="Search"
                    onChange={(e) => handleKeywordChange(e)} />
                <div>
                    <button className='btn btn-default' onClick={(e) => searchKeyword(e)}>
                        <FontAwesomeIcon icon={faSearch} size='lg' />
                    </button>
                </div>
                <div className='hint'>Keywords : Project Name, Feature Title, Feature Description, Todo Title</div>
            </form>
        </div>
    )
}

Search.propTypes = {
    handleKeywordChange: PropTypes.func.isRequired,
    searchKeyword: PropTypes.func.isRequired,
};

export default Search;