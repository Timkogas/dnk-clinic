import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'
import { testSlice } from "./test/test.slice"
import { userSlice } from "./user/user.slice"
import { doctorsSlice } from './doctors/doctors.slice';

const makeStore = () => {
    return configureStore({
        reducer: {
            test: testSlice.reducer,
            user: userSlice.reducer,
            doctors: doctorsSlice.reducer
        }
    })
}

const store = makeStore()
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store