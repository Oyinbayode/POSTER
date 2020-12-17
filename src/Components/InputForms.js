import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { ADD_POST } from '../Redux/Form/FormTypes'
import { EDIT_POST } from '../Redux/Home/homeTypes'

const InputForms = ({Submit, Edit, articleToEdit}) => {
  
  const [title, setTitle] = useState('')
  const [post, setPost] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handlePostChange = e => {
    setPost(e.target.value)
  }


  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title)
      setPost(articleToEdit.post)
    }
  }, [articleToEdit])

  const handleSubmit = () => {
    if (!articleToEdit) {
      return axios.post('https://consume-api-test.herokuapp.com/api/posts', {
        title,
        post
      })
      .then(res => {
        Submit(res.data)
      })
      .then(() => {
        setPost('')
        setTitle('')
      })
    } else {
      return axios.put(`https://consume-api-test.herokuapp.com/api/posts/${articleToEdit._id}`, {
        title,
        post
      })
      .then(res => {
        Edit(res.data) 
      }
      )
      .then(() => {
        setPost('')
        setTitle('')
      })
    }

  }


  return (
    <div className='d-flex flex-column col-lg-6 ' >
      <input className='form-control inputing mb-4' type='text' value={title} onChange={handleTitleChange} placeholder='Post Title' maxLength='50' required />
      <textarea value={post} onChange={handlePostChange} className='form-control textarea purple-border' placeholder='Post' rows='5' required ></textarea>
  <button onClick={handleSubmit} className='btn btn-outline-primary buttonF align-self-end mt-3' >{articleToEdit ? 'Update' : 'Add'} Post</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    Submit: (data) => dispatch({
      type: ADD_POST,
      payload: data
    }),
    Edit: data => dispatch({
      type: EDIT_POST,
      payload: data
    })
  }
}

const mapStateToProps = state => {
  return {articleToEdit: state.HomeReducer.articleToEdit}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForms)
