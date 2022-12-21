import react, {useRef} from "react";

function LocalStorage(title,value){
    
    //value entrega un "+1" o "-1" dependiendo 
    let titulo=Object.values(title);//obtenemos el titulo de la cancion
    let valorActual = localStorage.getItem(titulo);//vemos el valor almecenado en el storage

    //console.log({value})

    if (valorActual === null){// si no se tienes registro en el storage se inicia en 1 tomando en cuenta el primer like
        localStorage.setItem(titulo,"1")
    }else{
        if(value==="+1"){//like
            let nuevoVal = parseInt(valorActual)+1 
            localStorage.setItem(titulo,nuevoVal.toString())
        }else{//dislike
            let nuevoVal = parseInt(valorActual)-1
            localStorage.setItem(titulo,nuevoVal.toString())
        }
    }
}
export default LocalStorage