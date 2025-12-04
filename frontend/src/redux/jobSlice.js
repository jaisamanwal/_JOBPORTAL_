import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        savedJobs: [],
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        toggleSavedJob: (state, action) => {
            const job = action.payload;
            // Ensure savedJobs array exists
            if (!state.savedJobs) {
                state.savedJobs = [];
            }
            const index = state.savedJobs.findIndex(savedJob => savedJob._id === job._id);
            if (index === -1) {
                // Job not saved, add it
                state.savedJobs.push(job);
            } else {
                // Job already saved, remove it
                state.savedJobs.splice(index, 1);
            }
        }
    }
});
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    toggleSavedJob
} = jobSlice.actions;
export default jobSlice.reducer;