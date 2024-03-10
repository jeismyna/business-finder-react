import {createContext, useState} from "react";

const SearchbarContext = createContext();

export function SearchbarProvider({children}){

    const [text, setText] = useState("");

    return(
        <SearchbarContext.Provider value={{text, setText}}>
            {children}
        </SearchbarContext.Provider>
    )
}

export default SearchbarContext;