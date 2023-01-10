import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { blogsApi } from "./services/blogsApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer:{
        [blogsApi.reducerPath] : blogsApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(blogsApi.middleware),
    
})
setupListeners(store.dispatch)