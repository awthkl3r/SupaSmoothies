import supabase from "../Config/supabaseClient"
import { useEffect, useState } from 'react'


//components
import SmoothieCard from "../components/smoothieCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  const [orderBy, setOrderBy] = useState('created_at')
  const [ascend, setAscend] = useState(false)

  const handleDelete = (id) =>{
    setSmoothies(prevSmoothies =>{
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }

  useEffect(()=>{
    const fetchSmoothies = async ()=>{
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .order(orderBy, {ascending: ascend})

        if(error){
          setFetchError('Could not fetch smoothies')
          setSmoothies(null)
          console.log(error)
        }

        if(data){
          setSmoothies(data)
          setFetchError(null)
        }
    }

    fetchSmoothies()
  }, [orderBy, ascend])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order By:</p>

            <button 
              className={orderBy === "created_at" ? "active" :""} 
              onClick={()=> {
                setOrderBy('created_at'); 
                setAscend(false)
              }}>
              Time Created
            </button>
            
            <button 
              className={orderBy === "title" ? "active" :""} 
              onClick={()=> {
                setOrderBy('title'); 
                setAscend(true)
              }}>
              Title
            </button>
            
            <button 
              className={orderBy === "rating" ? "active" :""} 
              onClick={()=> {
                setOrderBy('rating'); 
                setAscend(false)
              }}>
              Rating
            </button>
            {/* {orderBy} */}
          </div>
          <div className="smoothie-grid">
            {smoothies.map(smoothie =>(
              <SmoothieCard 
                key={smoothie.id} 
                smoothie={smoothie} 
                onDelete = {handleDelete}  
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home