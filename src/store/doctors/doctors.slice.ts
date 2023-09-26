import { createSlice } from "@reduxjs/toolkit";
import { Idoctor } from "../../types/interface";
import { doctorsApi } from "../../api/doctorsApit";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { doctorCategory } from "../../types/enums";


const namespace = 'doctors'

export interface IDoctors {
  doctors: Idoctor[]
  currentDoctor: Idoctor
}

const initCurrentDoctor = {
  _id: '',
  name: '',
  mainInfo: [],
  prof: [],
  category: doctorCategory.TER,
  img: '',
  video: '',
  info: {}
}


const initialState: IDoctors = {
  doctors: [],
  currentDoctor: initCurrentDoctor
}

export const doctorGetAll = createAppAsyncThunk(`doctorGetAll`, async () => {
  return doctorsApi.getAll()
})

export const doctorGetOne = createAppAsyncThunk(`doctorGetOne`, async (id: string) => {
  return doctorsApi.getOne(id)
})

export const doctorsSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    resetCurrentDoctor: (state) => {
      state.currentDoctor = initCurrentDoctor
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(doctorGetAll.fulfilled, (state, action) => {
        state.doctors = action.payload?.data.doctors
      })
      .addCase(doctorGetOne.fulfilled, (state, action) => {
        state.currentDoctor = action.payload?.data.doctor
      })
  }
})

export const { resetCurrentDoctor } = doctorsSlice.actions;