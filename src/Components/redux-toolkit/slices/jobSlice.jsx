import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobInfo: null
    },
    reducers: {
        jobDetails(state, action) {
            state.jobInfo = action.payload
        },
    }
})
export const { jobDetails } = jobSlice.actions
export default jobSlice.reducer;