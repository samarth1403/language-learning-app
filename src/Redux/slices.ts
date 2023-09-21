import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:stateType = {
    loading : false,
    words : [],
    result : []
}

const rootSlice = createSlice({
    name:"root",
    initialState,
    reducers:{
        getWordsRequest : (state) => {
             state.loading = true;
        },
        getWordsSuccess : (state , action:PayloadAction<WordType[]>) => {
            state.loading = false;
            state.words = action.payload;
        },
        getWordsFailure : (state,action : PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        saveResult : (state , action: PayloadAction<string[]>) => {
           state.loading = false;
           state.result = action.payload;
        },
        clearState : () => {
            return initialState;
        }

    },
})

export const { getWordsFailure , getWordsRequest , getWordsSuccess , saveResult , clearState } = rootSlice.actions;
export default rootSlice.reducer;