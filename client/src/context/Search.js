import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";


const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [values, setValue] = useState({
        keyword: "",
        result: []
    })
    return (
        <SearchContext.Provider value={[values, setValue]}>
            {children}
        </SearchContext.Provider>
    )

}

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider }