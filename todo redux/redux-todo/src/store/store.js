import { configureStore } from '@reduxjs/toolkit'
import todoSlicereducer from '../features/todoSlice'

const store = configureStore({
  reducer: {
    todos: todoSlicereducer,
  },
})

export default store