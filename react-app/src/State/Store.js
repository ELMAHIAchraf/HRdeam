import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import departmentSlice from './departmentSlice';
import EmployeeSlice from './EmployeeSlice';
import countSlice from './countSlice';
import absenceSlice from './absenceSlice';
import announcementsSlice from './announcementsSlice';
import applicantsSlice from './applicantsSlice';

export const store = configureStore({
    reducer: {
        user : userReducer,
        department : departmentSlice,
        employee : EmployeeSlice,
        count : countSlice,
        absence : absenceSlice,
        announcements : announcementsSlice,
        applicants : applicantsSlice,
    },
});
