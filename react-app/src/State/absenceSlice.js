import { createSlice } from '@reduxjs/toolkit';

const absenceSlice = createSlice({
    name: 'absence',
    initialState : [],
    reducers: {
        SetAbsence: (state, action) => {
            return action.payload;
        },
        AddAbsence: (state, action) => {
            const employee = state.employees.data.find(emp => emp.id == action.payload.user_id);
            employee && employee.absences.push(action.payload);
        },
        filterAbsence: (state, action) => {
            return state.filter(absence => absence.id !== action.payload);
        },
    },
});

export const { SetAbsence, AddAbsence } = absenceSlice.actions;

export default absenceSlice.reducer;