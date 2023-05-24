import { Link, useNavigate } from "react-router-dom"
import supabase from "../Config/supabaseClient"

const SmoothieCard = ({ smoothie, onDelete, onLike })=>{


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
            // console.log(data)
            onDelete(smoothie.id)
        }
    } 

    const handleLike = async () => {
        const { data, error } = await supabase
            .from("smoothies")
            .update({ rating: smoothie.rating + 1 })
            .eq("id", smoothie.id)
            .select();

        if (error) {
        console.log(error);
        }
        if (data) {
        const updatedSmoothie = data[0]; // Retrieve the updated smoothie data
        onLike(updatedSmoothie); // Pass the updated smoothie object
        }
  };

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
                <i onClick={handleLike} className="material-icons special">thumb_up</i>
            </div>
        </div>
    )
}

export default SmoothieCard