import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Applied: [],
    Interviewed: [],
    Made_offer: [],
    Hired: [],
};

const applicantsSlice = createSlice({
    name: 'applicants',
    initialState,
    reducers: {
        setApplicants: (state, action) => {
            const applicants = action.payload;
            state.Applied = applicants.filter(applicant => applicant.status === 'Applied');
            state.Interviewed = applicants.filter(applicant => applicant.status === 'Interviewed');
            state.Made_offer = applicants.filter(applicant => applicant.status === 'Made offer');
            state.Hired = applicants.filter(applicant => applicant.status === 'Hired');
        },
        moveApplicant: (state, action) => {
            const { applicantId, source, destination } = action.payload;
            const applicant = state[source].find((applicant) => applicant.id === applicantId);
            state[source] = state[source].filter((applicant) => applicant.id !== applicantId);
            state[destination].push(applicant);
        },
        deleteApplicant: (state, action) => {
            const { applicantId, list } = action.payload;
            state[list] = state[list].filter((applicant) => applicant.id !== applicantId);
        },
        modifyStatus: (state, action) => {
            let { applicantId, status } = action.payload;
            if (status === "Made offer") {
                status = status.replace(" ", "_");
            }
            const statusKeys = ['Applied', 'Interviewed', 'Made_offer', 'Hired'];
        
            let currentStatus;
            for (let key of statusKeys) {
                if (state[key].find(applicant => applicant.id === applicantId)) {
                    currentStatus = key;
                    break; 
                }
            }
            if (currentStatus) {
                const applicant = state[currentStatus].find(applicant => applicant.id === applicantId);
                state[currentStatus] = state[currentStatus].filter(applicant => applicant.id !== applicantId);
                if (applicant) {
                    applicant.status = status;
                    state[status].push(applicant);
                }
            }
        }
    }
});

export const { moveApplicant, deleteApplicant, setApplicants, modifyStatus } = applicantsSlice.actions;

export default applicantsSlice.reducer;