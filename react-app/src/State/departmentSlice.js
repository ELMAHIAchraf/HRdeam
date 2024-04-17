import { createSlice } from '@reduxjs/toolkit';

const departmentSlice = createSlice({
    name: 'department',
    initialState : [],
    reducers: {
        addDepartment: (state, action) => {
            state.push(action.payload);
        },
        removeDepartment: (state, action) => {
            return state.filter(department => department.id !== action.payload);
        }
    },
});

export const { addDepartment, removeDepartment} = departmentSlice.actions;
export default departmentSlice.reducer;