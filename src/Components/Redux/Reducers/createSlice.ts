import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LoginResponse } from '../../../Services/LoginApi'

export interface CounterState {  
  uid :string;
  token : string;
  username: string;
  isAuthenticated: boolean;
  auditor: boolean;
}

const initialState: CounterState = {  
  uid: "",
  token: "" ,
  username :"",
  isAuthenticated : false,
  auditor : false
}

export const AuditSlice = createSlice({
  name: 'Audit',
  initialState,
  reducers: {
    AddUserId:(state, action: PayloadAction<LoginResponse>) =>{
      state.uid = action.payload.uid;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.username = action.payload.username
      state.auditor = action.payload.auditor
    },
    RemoveuserId:(state)=>{
      state.uid ="";
      state.token ="";
      state.isAuthenticated = false;
      state.auditor = false;
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { AddUserId,RemoveuserId} = AuditSlice.actions

export default AuditSlice.reducer