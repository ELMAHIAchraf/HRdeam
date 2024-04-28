import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const departmentSlice = createSlice({
    name: 'department',
    initialState : [],
    reducers: {
        addDepartment: (state, action) => {
            state.push(action.payload);
        },
        removeDepartment: (state, action) => {
            return state.filter(department => department.id !== action.payload);
        },
        clearDepartments: () => initialState,

    },
});

export const { addDepartment, removeDepartment, clearDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;