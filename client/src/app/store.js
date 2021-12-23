import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/home/postsSlice';
import authReducer from '../features/auth/authSlice';
import libPostsReducer from '../features/library/PostsSlice'
import photosReducer from '../features/library/PhotosSlice'
import categoriesReducer from '../features/library/CategoriesSlice'
import searchReducer from '../features/search/searchSlice'
import exhibitionPostReducer from '../features/exhibition/exhibitonPostSlice'
import notifyReducer from '../features/exhibition/notifySlice'
import exhibitionReducer from '../features/admin/exhibition/exhibitionSlice'
import advertiseReducer from '../features/admin/advertise/advertiseSlice'
export const store = configureStore({
  reducer: {
    postReducer,
    authReducer,
    libPostsReducer,
    photosReducer,
    categoriesReducer,
    searchReducer,
    exhibitionPostReducer,
    notifyReducer,
    exhibitionReducer,
    advertiseReducer
  },
});
