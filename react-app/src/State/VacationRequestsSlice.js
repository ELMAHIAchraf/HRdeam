import { createSlice } from '@reduxjs/toolkit';

const VacationRequestsSlice = createSlice({
    name: 'vacationRequests',
    initialState : [],
    reducers: {
        setVacationRequests: (state, action) => {
            return action.payload.sort((a, b) => a.status.localeCompare(b.status)).reverse();
        },
        addVacationRequest: (state, action) => {
            state.unshift(action.payload);
        },
        removeVacationRequest: (state, action) => {
            const requestId = action.payload;
            const filteredRequests = state.filter(request => request.id !== requestId);
            const sortedRequests = filteredRequests.sort((a, b) => a.status.localeCompare(b.status)).reverse();
            return sortedRequests;
        }
    }

});

export const { setVacationRequests, addVacationRequest, removeVacationRequest } = VacationRequestsSlice;
export default VacationRequestsSlice.reducer;