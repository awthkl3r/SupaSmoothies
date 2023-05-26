import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { supabase } from "../Config/supabaseClient"

const Update = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState(0)

  const [username, setUsername] = useState('')

  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!title || !method){
      setFormError('Please Fill In The Fields')
      console.log('error')
      return
    }

    const { data, error } = await supabase
      .from('smoothies')
      .update({ title, method, rating })
      .eq('id', id)
      .select()

    if(error){
      console.log(error)
      setFormError('Please Fill In The Fields')
    }

    if(data){
      setFormError(null)
      console.log('error')
      navigate('/')
    }
  }

  useEffect(()=>{
    const fetchSmoothie = async ()=>{
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()
      
      if(error){
        navigate('/', { replace: true })  
      }
      if(data){
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
      }
    }

    fetchSmoothie()
  }, [id, navigate])

  useEffect(()=>{

    const getSessionData = async () => {
      const session = await supabase.auth.getSession();
      if (session && session.data.session && session.data.session.user) {
        const username_extracted = session.data.session.user.email.split('@')[0];
        setUsername(username_extracted);
        
      }
    };

    getSessionData();
  }, [])
  
  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>

        <label htmlFor="title">Title:</label>
        <input 
          type = "text" 
          id = "title" 
          value = {title}
          onChange={(e)=>setTitle(e.target.value)}
          onBlur={(e)=>{

            var pattern = username
            var string = e.target.value
            var extractedPart = string.split(pattern)[0]

            switch (true) {
                case (e.target.value !== "" && e.target.value !== `${e.target.value} by ${username}` && e.target.value === `${extractedPart} by ${username}`):
                  setTitle(`${e.target.value} by ${username}`);
                  break;
                case (e.target.value !== "" && e.target.value !== `${extractedPart} by ${username}`):
                  if (`${extractedPart}${username}` !== string.split(`${extractedPart} ${username}`)[0]) {
                    setTitle(`${extractedPart} by ${username}`);
                  }
                  break;
                default:
                  // Handle any other cases if needed
                  break;
              }
          }
         }
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          type = "text" 
          id = "method" 
          value = {method}
          onChange={(e)=>setMethod(e.target.value)}
        />

        <button>Update Card</button>

        {formError && <p className="error">{formError}</p>}
    </form>
    </div>
  )
}

export default Update