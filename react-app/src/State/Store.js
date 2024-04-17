import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import departmentSlice from './departmentSlice';
export const store = configureStore({
    reducer: {
        user : userReducer,
        department : departmentSlice

    },
});
