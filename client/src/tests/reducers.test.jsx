import { rootReducer } from "../store/reducer";
import { ADD_SEARCH_WORD, RESET_ALL, RESET_FILTER, ADD_SORT, ADD_FILTER } from "../store/actions";

const initState = {
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

// These tests checks that all the reducers we've written updates the store as we've intended. 
describe('reducers', () => {
    it('should return the initial state', () => {
        expect(rootReducer(undefined, {})).toEqual({ ...initState });
    })
  
    it('should handle ADD_SEARCH_WORD', () => {
        const state = {
            ...initState
        };
        const newState = rootReducer(state, {
            type: ADD_SEARCH_WORD,
            searchWord: "Jägermeister"
        });

        expect({ ...newState }).toEqual({ 
            ...state, 
            searchWord: "Jägermeister" 
        });

    });

    it('should handle ADD_FILTER', () => {
        const state = {
            ...initState
        };
        const newState = rootReducer(state, {
            type: ADD_FILTER,
            filter: { price: [100, 300] }
        });

        expect({ ...newState }).toEqual({ 
            ...state, 
            filters: {
                ...state.filters,
                price: [100, 300]
            }
        });

    });

    it('should handle RESET_ALL', () => {
        const state = {
            ...initState,
            searchWord: "Jägermeister",
            sort: "favorites",
            filters: {
                ...initState.filters,
                price: [100, 300]
            }
        };
        const newState = rootReducer(state, {
            type: RESET_ALL
        });

        expect({ ...newState }).toEqual({ ...initState });
    });

    it('should handle RESET_FILTER', () => {
        const state = {
            ...initState,
            searchWord: "Jägermeister",
            sort: "favorites",
            filters: {
                ...initState.filters,
                price: [100, 300]
            }
        };
        const newState = rootReducer(state, {
            type: RESET_FILTER
        });

        expect({ ...newState }).toEqual({ 
            ...initState,
            searchWord: "Jägermeister",
            sort: "favorites"
         });
    });

    it('should handle ADD_SORT', () => {
        const state = {
            ...initState
        };
        const newState = rootReducer(state, {
            type: ADD_SORT,
            sort: "favorites"
        });

        expect({ ...newState }).toEqual({ 
            ...state, 
            sort: "favorites" 
        });

    });

});