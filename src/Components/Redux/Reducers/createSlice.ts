import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Audit } from '../../Incident/Incident'

export interface CounterState {
  audit : Audit[]
}

const initialState: CounterState = {
  audit: [],
}

export const AuditSlice = createSlice({
  name: 'Audit',
  initialState,
  reducers: {
    AddAudit: (state, action: PayloadAction<Audit>) => {
        state.audit.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { AddAudit} = AuditSlice.actions

export default AuditSlice.reducer