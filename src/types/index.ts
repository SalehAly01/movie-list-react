import { ThunkAction, Action } from "@reduxjs/toolkit";
import { storeDispatch, storeGetState } from "helpers/store";

export type AppDispatch = storeDispatch;
export type RootState = ReturnType<storeGetState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
