import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import supabase from "../Config/supabaseClient"

const SmoothieCard = ({ smoothie, onDelete, onLike })=>{

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        const likedSmoothies = JSON.parse(localStorage.getItem("likedSmoothies")) || [];
        setIsLiked(likedSmoothies.includes(smoothie.id));
    }, [smoothie.id]);

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
        // const likedSmoothies = JSON.parse(localStorage.getItem("likedSmoothies")) || []
        
        if (!isLiked) {
            const { data, error } = await supabase
                .from("smoothies")
                .update({ rating: smoothie.rating + 1 })
                .eq("id", smoothie.id)
                .select()

            if (error) {
                console.log(error)
            }
            if (data) {
                const updatedSmoothie = data[0];
                onLike(updatedSmoothie);
                setIsLiked(true);
                const likedSmoothies = JSON.parse(localStorage.getItem("likedSmoothies")) || [];
                likedSmoothies.push(smoothie.id);
                localStorage.setItem("likedSmoothies", JSON.stringify(likedSmoothies));
            }
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
                <i
                    onClick={handleLike}
                    className={`material-icons ${isLiked ? "special" : "normal"}`}
                >
                thumb_up
                </i>
            </div>
        </div>
    )
}

export default SmoothieCard