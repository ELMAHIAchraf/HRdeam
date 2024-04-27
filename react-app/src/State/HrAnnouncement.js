import { createSlice } from '@reduxjs/toolkit';


const HRAnnouncementsSlice = createSlice({
    name: 'announcements',
    initialState : [],
    reducers: {
        setAnnouncements: (state, action) => {
            return action.payload;
        },
        addAnnouncement: (state, action) => {
            state.push(action.payload);
        },
        deleteAnnouncement: (state, action) => {
            return state.filter(announcement => announcement.id !== action.payload);
        }
    },
});

export const { setAnnouncements, addAnnouncement, deleteAnnouncement } = HRAnnouncementsSlice.actions;


export default HRAnnouncementsSlice.reducer;