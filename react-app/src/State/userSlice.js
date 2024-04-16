import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        cin: null,
        fname: null,
        lname: null,
        doj: null,
        departement_id: null,
        position: null,
        salary: null,
        phone: null,
        address: null,
        role: null,
        email: null,
        avatar: null
    },
    reducers: {
        addUser: (state, action) => {
            state.id=action.payload.id;
            state.cin=action.payload.cin;
            state.fname=action.payload.fname;
            state.lname=action.payload.lname;
            state.doj=action.payload.doj;
            state.departement_id=action.payload.departement_id;
            state.position=action.payload.position;
            state.salary=action.payload.salary;
            state.phone=action.payload.phone;
            state.address=action.payload.address;
            state.role=action.payload.role;
            state.email=action.payload.email;
            state.avatar=action.payload.avatar;
          },
        removeUser: (state) => {
            state.id=null;
            state.cin=null;
            state.fname=null;
            state.lname=null;
            state.doj=null;
            state.departement_id=null;
            state.position=null;
            state.salary=null;
            state.phone=null;
            state.address=null;
            state.role=null;
            state.email=null;
            state.avatar=null;
        }
    },

});


export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;