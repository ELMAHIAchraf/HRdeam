import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import departmentSlice from './departmentSlice';
import EmployeeSlice from './EmployeeSlice';
import countSlice from './countSlice';
export const store = configureStore({
    reducer: {
        user : userReducer,
        department : departmentSlice,
        employee : EmployeeSlice,
        count : countSlice
    },
});
