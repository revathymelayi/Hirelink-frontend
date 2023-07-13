import { createSlice } from "@reduxjs/toolkit";

const employerSlice = createSlice({
    name: "employer",
    initialState: {
        employerInfo: null
    },
    reducers: {
        employerDetails(state, action) {
            state.employerInfo = action.payload
        },
    }
})
export const { employerDetails } = employerSlice.actions
export default employerSlice.reducer;