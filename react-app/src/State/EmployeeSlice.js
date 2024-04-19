import { createSlice } from '@reduxjs/toolkit';


const employeeSlice = createSlice({
    name: 'employee',
    initialState : [],
    reducers: {
        setEmployee: (state, action) => {
            return action.payload;
        },
        addEmployee: (state, action) => {
            state.push(action.payload);
        },
        removeEmployee: (state, action) => {
            return state.filter(employee => employee.id !== action.payload);
        },
        modifyEmployee: (state, action) => {
            return state.map(employee => {
                if(employee.id === action.payload.id) {
                    return action.payload;
                }
                return employee;
            });
        }
    },
});

export const { setEmployee, addEmployee, removeEmployee, modifyEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;