import { Link } from "react-router-dom"
import supabase from "../Config/supabaseClient"

const SmoothieCard = ({ smoothie, onDelete })=>{

    const handleDelete = async () =>{
        const { data, error } = await supabase
            .from('smoothies')
            .delete()
            .eq('id', smoothie.id)
            .select()

        if(error){
            console.log(error)
        }
        if(data){
            onDelete(smoothie.id)
        }
    } 

    return (
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className="rating">{smoothie.rating}</div>
            <div className="button">
                <Link to={'/' + smoothie.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i onClick={handleDelete} className="material-icons">delete</i>
            </div>
        </div>
    )
}

export default SmoothieCard