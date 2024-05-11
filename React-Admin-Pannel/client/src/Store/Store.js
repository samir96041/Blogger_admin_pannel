import { configureStore } from '@reduxjs/toolkit'
import postreducer from './PostSlice'
import  userreducer  from './UserSlice'
import  Commentreducer  from './CommentSlice'


export default configureStore( {    
  reducer: {
   PostR:postreducer,
   UserR:userreducer,
   CommentR: Commentreducer,
  }
 
})

