import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
};

const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        initializeCount(state, action) {
            state.count = action.payload;
        },
        incrementCount(state) {
            state.count += 1;
        },
        decrementCount(state) {
            state.count -= 1;
        },
    }
});

export const { initializeCount, incrementCount, decrementCount } = countSlice.actions;
export default countSlice.reducer;