const SearchInput = ({placeholder, onChangeHandler}) => {

    return (
        <div className="search-input-container">
            <input className='search-input' placeholder={placeholder} onChange={onChangeHandler} />
        </div>
    );
};

export default SearchInput;