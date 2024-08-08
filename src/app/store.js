import { configureStore } from '@reduxjs/toolkit'
import review from '../features/reviewSlice'


export const store = configureStore({
  reducer: 
  {
    review
  },
})
