import { useEffect, useState } from 'react'
import { supabase } from '../Config/supabaseClient'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [formError, setFormError] = useState(null)

  const [username, setUsername] = useState("")

  const rating = 0

  useEffect(()=>{
    const getSessionData = async () => {
      const session = await supabase.auth.getSession();
      if (session && session.data.session && session.data.session.user) {
        const username_extracted = session.data.session.user.email.split('@')[0];
        setUsername(username_extracted);
        
      }
      else{
        alert("please log in to create a card")
        navigate('/login')
      }
    };

    getSessionData();
  }, [])

  

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
                  break;
              }
            }
          }
        />

        <label htmlFor="method">Desciption:</label>
        <textarea 
          type = "text" 
          id = "method" 
          value = {method}
          onChange={(e)=>setMethod(e.target.value)}
        />

        <button>Create</button>

        {formError && <p className="error">{formError}</p>}
      </form>

    </div>
  )
}

export default Create