import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import authSlice from '../redux/AuthSlice/AuthSlice'
import dashboardSlice from '../redux/DashboardSlice/DashboardSlice'
import surveySlice from '../redux/SurveySlice/SurveySlice'
import surveysSlice from '../redux/SurveysSlice/SurveysSlice'
import {FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
import storage from './storageEngine'
// redux persist config
const persistConfig = {
  key:'root',
  storage,
  whitelist:['dashboard','survey','surveys']
}

// const persistedReducer = persistReducer(persistConfig,dashboardSlice)
// const surveyReducer = persistReducer(persistConfig,surveySlice)

// Combine reducers
const rootReducer = combineReducers({
  dashboard: dashboardSlice,
  survey: surveySlice,
  auth:authSlice,
surveys:surveysSlice
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
           ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
          },
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)