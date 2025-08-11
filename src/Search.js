function Search({changebody,search,setsearch}){
    return(
        <form className="search-bar">
            <input type="text" placeholder="Search products..." value={search}
            onChange={(e) => setsearch(e.target.value)}
            name="search"/>
        </form>
    );
}

export default Search;