import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../Config/supabaseClient";

const SmoothieCard = ({ smoothie, onDelete, onLike}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [username, setUsername] = useState("")

  useEffect(() => {
    const likedSmoothies = JSON.parse(localStorage.getItem("likedSmoothies")) || [];
    setIsLiked(likedSmoothies.includes(smoothie.id));
  }, [smoothie.id]);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      onDelete(smoothie.id);
    }
  };

  const handleLike = async () => {
    if (!isLiked) {
      const { data, error } = await supabase
        .from("smoothies")
        .update({ rating: smoothie.rating + 1 })
        .eq("id", smoothie.id)
        .select();

      if (error) {
        console.log(error);
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

    if (isLiked && smoothie.rating) {
      const { data, error } = await supabase
        .from("smoothies")
        .update({ rating: smoothie.rating - 1 })
        .eq("id", smoothie.id)
        .select();

      if (error) {
        console.log(error);
      }
      if (data) {
        const updatedSmoothie = data[0];
        onLike(updatedSmoothie);
        setIsLiked(false);
        const likedSmoothies = JSON.parse(localStorage.getItem("likedSmoothies")) || [];
        likedSmoothies.pop(smoothie.id);
        localStorage.setItem("likedSmoothies", JSON.stringify(likedSmoothies));
      }
    }
  };

  useEffect(()=>{

    const getSessionData = async () => {
      const session = await supabase.auth.getSession();
      if (session && session.data.session.user) {
        const username_extracted = session.data.session.user.email.split('@')[0];
        setUsername(username_extracted);
      }
    };
    getSessionData();
  }, [])
  
  var pattern = username
  var regex = new RegExp(pattern, "g")
  var string = smoothie.title
  var extractedPart = string.match(regex);

  return (
    <div className="smoothie-card">
      <h3>
      {smoothie.title}
      </h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="button">
        <Link to={"/" + smoothie.id}>
          {/* eslint-disable-next-line eqeqeq */}
          <i className={String(extractedPart) == String(username) ? "material-icons" : "hidden"}>edit</i>
        </Link>
        {/* eslint-disable-next-line eqeqeq */}
        <i onClick={handleDelete} className={String(extractedPart) == String(username) ? "material-icons" : "hidden"}>
          delete
        </i>
        {/* eslint-disable-next-line eqeqeq */}
        <i
          onClick={handleLike}
          className={String(extractedPart) != String(username) ? `material-icons ${isLiked ? "special" : "normal"}` : "hidden"}
        >
          thumb_up
        </i>
      </div>
    </div>
  );
};

export default SmoothieCard;