import { ADD_SEARCH_WORD, ADD_FILTER, RESET_ALL, RESET_FILTER, ADD_SORT } from "./actions"; 


export const initState = {
    searchWord: "",
    sort: "-favorites",
    filters: {
        type: null,
        country: null,
        vintage: null,
        packaging: null,
        eco: null,
        kosher: null,
        bioDynamic: null,
        green_packaging: null,
        gluten: null,
        volume: null,
        price: null,
        pricePerLiter: null,
        alcohol: null,
        tannins: null,
        fullness: null,
        freshness: null,
        sweetness: null,
        bitterness: null,
    }
};


// Handles all action cases who should update or add elements to the store
export const rootReducer = (state = initState, action) => { 
    switch (action.type) { 
        case ADD_SEARCH_WORD:
            return {
                ...state,
                searchWord: action.searchWord,   
            };

        case ADD_FILTER:
            return {
                ...state,
                filters: { ...state.filters, ...action.filter }  
            };

        case RESET_ALL:
            return initState

        case RESET_FILTER:
            return {
                ...state,
                filters: {
                    type: null,
                    country: null,
                    vintage: null,
                    packaging: null,
                    eco: null,
                    kosher: null,
                    bioDynamic: null,
                    green_packaging: null,
                    gluten: null,
                    volume: null,
                    price: null,
                    pricePerLiter: null,
                    alcohol: null,
                    tannins: null,
                    fullness: null,
                    freshness: null,
                    sweetness: null,
                    bitterness: null,
                }
            }

        case ADD_SORT: 
            return{
                ...state, 
                sort: action.sort,
            };

        default: 
            return state;
    };
};