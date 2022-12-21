import React, { useState } from "react";
import LocalStorage from "../LocalStorage/localStorage";
import Ranking from "../Ranking/ranking";


export const Likes = (titulo) => {
    
    const[like,setlike]= useState("")

    const[likeactive,setlikeactive]=useState(false)

    //console.log(titulo)

    function likef(){
        if(likeactive){//si like esta activo cuando se presiona pasa a estado dislike
            setlikeactive(false)
            setlike("")
            LocalStorage(titulo,"-1")
        }else{
            setlikeactive(true)
            setlike("d❤")
            LocalStorage(titulo,"+1")
        }
    }

    
    return (
        <div>
            <button onClick={likef} className={likeactive?'active-like':null}> Like{like}</button>
        </div>
    )
    
}