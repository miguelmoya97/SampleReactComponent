import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectionContext = ({children}) => {
    const [listId, setListId] = useState(0)

    useEffect(()=>{
        const selectedList = JSON.parse(localStorage.getItem("selected-list"))
        if(selectedList) {
            setListId(selectedList)
        }
    }, [])


    return (
        <SelectListContext.Provider value={{listId, setListId}}>
            {children}
        </SelectListContext.Provider>
    );
}
const SelectListContext = createContext()

export const useListId = () => {
    return useContext(SelectListContext)
}
export default SelectionContext;