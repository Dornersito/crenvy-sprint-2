import React, {useState} from "react";

const EntryCard = props =>{
    //console.log(props);
    const {entryData} = props; //Toma los valores de props(obejeto con los datos)
    const {entryTitle, content, picture, animo} = entryData; //Le pasamos los valores desde entryData
    return(
        <div className="blog-entry">
            <img src={picture}/>
            <h2>{content}</h2>
            <p align="center">{entryTitle} se encuentra {animo}, mientras escucha "{content}"</p>
            <button>Like!</button>
        </div>
    )
}
export default EntryCard