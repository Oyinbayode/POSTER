import React, { useEffect } from 'react'
import InputForms from './InputForms'
import {BounceLoader} from 'react-spinners'
import axios from 'axios'
import moment from 'moment'
import {connect} from 'react-redux'
import {fetchPosts} from '../Redux/Home/homeAction'
import { DELETE_POST, SET_EDIT } from '../Redux/Home/homeTypes'

const Home = ({userDispatch, userData, Delete, setEdit}) => {

  useEffect(() => {
    userDispatch()
  }, [userDispatch])

  const Posts = userData

  const handleDelete = (id, post) => {
    
    // THIS IS WHAT I WAS ACTUALLY TRYING TO DO WITH THE END POINT
    axios.delete(`https://consume-api-test.herokuapp.com/api/posts/${id}`, {
      data: {
        post
      }
    })
      .then(() => Delete(id))
      .catch(err => {
        console.log(err)
      })
  }

  const handleEdit = (post) => {
    
    setEdit(post)
  }
  
  const displayPosts = (Posts.length === 0) ? (
    <BounceLoader />
  ) : (
    Posts.map(post => {
    return (
      <li key={post._id} className='list list-group' >
          <div className="innerList">
            <h5 className="mb-2 pt-1 h5 title">
              {post.title.toUpperCase()}
            </h5>
            <div className="buttons">
          <button onClick={() => handleEdit(post)} className='btn btn-secondary'>Edit</button>
          <button onClick={() => handleDelete(post._id, post)} className="btn btn-danger">Delete</button>
        </div>
          </div>
          <div className="body">
            <p className="mb-2 paragraph">{post.post}</p>
            <small>
              Created {moment(new Date(post.createdAt)).fromNow()}
            </small>
          </div>
      </li>
    )
    })
  )
  
  return (
    <div className='Home container'>
      <div className="row pt-5 d-flex justify-content-center flex-column align-items-center">
        <div className="col-12 col-lg-6">
          <h1 className="text-center mb-5">
            POSTER
          </h1>
        </div>
        <InputForms />
      </div>
      <div>
        <ul className='list-group parentList' >
          {displayPosts}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.HomeReducer.posts
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    userDispatch: () => dispatch(fetchPosts()),
    Delete: id => dispatch({
      type: DELETE_POST,
      payload: id 
    }),
    setEdit: post => dispatch({
      type: SET_EDIT,
      payload: post
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
