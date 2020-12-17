import { HOME_PAGE_LOADED, DATA_FAILURE, DATA_SUCCESS } from "./homeTypes"
import axios from 'axios'

const dataFetched = () => {
  return {
    type: HOME_PAGE_LOADED
  }
}

const dataSuccess = posts => {
  return {
    type: DATA_SUCCESS,
    payload: posts
  }
}

const dataFailure = error => {
  return {
    type: DATA_FAILURE,
    payload: error
  }
}

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(dataFetched())

    axios.get('https://consume-api-test.herokuapp.com/api/posts')
      .then(res => {
        const posts = res.data
        dispatch(dataSuccess(posts))
      })
      .catch(err => {
        const error = err
        dispatch(dataFailure(error))
      })
  }
}