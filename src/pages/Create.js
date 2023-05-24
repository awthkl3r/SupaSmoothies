import { useState } from 'react'
import supabase from '../Config/supabaseClient'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState(0)
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!title || !method){
      setFormError('Please Fill In All The Fields')
      return
    }

    const { data, error } = await supabase
      .from('smoothies')
      .insert([{ title, method, rating }])
      .select()

    if(error){
      console.log(error)
      setFormError('Please Fill In All The Fields')
    }
    if(data){
      navigate('/')
      console.log(data)
      setFormError(null)
    }
    
  }

  return (
    <div className="page create">

      <form onSubmit={handleSubmit}>

        <label htmlFor="title">Title:</label>
        <input 
          type = "text" 
          id = "title" 
          value = {title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <label htmlFor="method">Desciption:</label>
        <textarea 
          type = "text" 
          id = "method" 
          value = {method}
          onChange={(e)=>setMethod(e.target.value)}
        />

        {/* <label htmlFor="rating">Rating:</label>
        <input 
          type = "number" 
          id = "rating" 
          value = {rating}
          onChange={(e)=>setRating(e.target.value)}
        /> */}

        <button>Create Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>

    </div>
  )
}

export default Create