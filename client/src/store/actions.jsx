//Updates redux store after a search is done
export const ADD_SEARCH_WORD = "ADD_SEARCH_WORD"; 
export const RESET_ALL = "RESET_ALL";
export const RESET_FILTER = "RESET_FILTER";
export const ADD_FILTER = "ADD_FILTER"; 
export const ADD_SORT = "ADD_SORT"; 


export const addSearchWord = (searchWord) => ({
    type: ADD_SEARCH_WORD, 
    searchWord
});

export const addFilter = (filter) => ({
    type: ADD_FILTER, 
    filter
});

export const resetAll = () => ({
    type: RESET_ALL,
});

export const resetFilter = () => ({
    type: RESET_FILTER,
});

export const addSort = (sort) => ({
    type: ADD_SORT, 
    sort
}); 