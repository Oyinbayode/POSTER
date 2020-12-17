import {HOME_PAGE_LOADED, DATA_SUCCESS, DATA_FAILURE, DELETE_POST, SET_EDIT, EDIT_POST} from './homeTypes'
import { ADD_POST } from '../Form/FormTypes'

const initialState = {
  loading: false,
  posts: [],
  error: ''
}

const HomeReducer = (currState = initialState, action) => {
  switch(action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...currState,
        loading: true
      }
    case DATA_SUCCESS:
      return {
        loading: false,
        posts: action.payload.data,
        error: ''
      }
    case DATA_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload
      }
    case ADD_POST:
      return {
        ...currState,
        posts: ([...(currState.posts), action.payload.data])
      }
    case DELETE_POST:
      return {
        ...currState,
        posts: currState.posts.filter(post => {
          return post._id !== action.payload
        })
      }
    case SET_EDIT: 
      return {
        ...currState,
        articleToEdit: action.payload
      }
    case EDIT_POST:
      return {
        ...currState,
        posts: currState.posts.map(post => {
          if (post._id === action.payload.data._id) {
            return {
              ...action.payload.data
            }
          }
          return post;
        }),
        articleToEdit: undefined
      }
    default:
      return currState;
  }

}

export default HomeReducer