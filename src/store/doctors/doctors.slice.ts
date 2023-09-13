import { Idoctor, doctors } from './../../doctors';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const namespace = 'doctors'

export interface IDoctors {
  doctors: Idoctor[]
  currentDoctor: Idoctor
}


const initialState: IDoctors = {
  doctors: doctors,
  currentDoctor: doctors[0]
}



export const doctorsSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    getDoctor: (state, action: PayloadAction<number>) => {
      state.currentDoctor = state.doctors.find(el=>el.id === action.payload) as Idoctor
    },
  },
})

export const { getDoctor } = doctorsSlice.actions;