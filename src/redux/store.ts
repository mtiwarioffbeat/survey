import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import authSlice from '../redux/AuthSlice/AuthSlice'
import dashboardSlice from '../redux/DashboardSlice/DashboardSlice'
import surveySlice from '../redux/SurveySlice/SurveySlice'
import {FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

// redux persist config
const persistConfig = {
  key:'root',
  storage,
  whitelist:['dashboard']
}

const persistedReducer = persistReducer(persistConfig,dashboardSlice)

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard:persistedReducer, //reducer persists wraps a slice
    survey:surveySlice
  },
   middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)