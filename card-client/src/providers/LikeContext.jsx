import {createContext, useEffect, useState} from "react";

const LikeContext = createContext();

export function LikeProvider({children}){

    const [likes, setLikes] = useState([]);

    useEffect(() => {
    }, [likes])

    return(
        <LikeContext.Provider value={{likes, setLikes}}>
            {children}
        </LikeContext.Provider>
    )
}

export default LikeContext;