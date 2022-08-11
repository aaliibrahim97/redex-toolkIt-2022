import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
    name: "report",
    initialState: { logs:[] },
    reducers:{
        logInsert:(state,action)=>{
            state.logs.push(action.payload)
        },
        resetLogs:(state)=>{
            state.logs = []
        }
    },
  });
  
  export const { logInsert, resetLogs } = reportSlice.actions;

  export default reportSlice.reducer;
