import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Define your initial state here
};

const vacationRequestsSlice = createSlice({
    name: 'vacationRequests',
    initialState,
    reducers: {
        setVacationRequests: (state, action) => {
            state.push(action.payload);
        },
        removeVacationRequest: (state, action) => {
            return state.filter(vacationRequest => vacationRequest.id !== action.payload);
        },
        assignVacationRequest: (state, action) => {
            const { id, assignee } = action.payload;
            const vacationRequest = state.find(vacationRequest => vacationRequest.id === id);
            vacationRequest.assignee = assignee;
        },
    }

});

export const { setVacationRequests, removeVacationRequest, assignVacationRequest } = vacationRequestsSlice;
export default vacationRequestsSlice.reducer;