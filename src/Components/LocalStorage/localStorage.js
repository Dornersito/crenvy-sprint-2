//import react, {useRef} from "react";

function LocalStorage(cancion,value){
    //localStorage.clear();   

    const filtros=[];

    //value entrega un "+1" o "-1" dependiendo 
    let titulo=cancion.content;//obtenemos el titulo de la cancion
    let estado=cancion.animo;//obtenemos el animo

    //console.log("ESTAMOS EN LOCAL STORAGE")
    //console.log(estado)

    let animo=""
    if(estado==="Feliz 😎"){
        animo="Feliz"
    }else if(estado==="Triste 😔"){
        animo="Triste"
    }else{
        animo="Indiferente"
    }

    //console.log("Aca el animo")
    //console.log(animo)
    let valueString = localStorage.getItem(titulo);//Obtiene el valor almacenado en el almacenamiento local con la clave

    if (valueString === null){// si no se tienes registro en el storage se inicia en 1 tomando en cuenta el primer like
        if(animo=="Feliz"){
            filtros.push({
                Feliz:"1",
                Triste:"0",
                Indiferente:"0"
            })
        }else if(animo=="Triste"){
            filtros.push({
                Feliz:"0",
                Triste:"1",
                Indiferente:"0"
            })
        }else{
            filtros.push({
                Feliz:"0",
                Triste:"0",
                Indiferente:"1"
            })
        }
        const arrayString = JSON.stringify(filtros);
        localStorage.setItem(titulo,arrayString)//yo del futuro no esta comparando animo ademas creo que no guarda el value bien revisa doc de localStorage
    }else{
        let valueObject = JSON.parse(valueString);//Convierte la cadena a un objeto usando JSON.parse
        let valorActual = Object.values(valueObject);//Convierte el objeto a un array usando Object.values
        //filtros = valorActual
        console.log(valorActual)

        console.log("Entra");
        valorActual.forEach(element => {
            let claves = Object.keys(element);//claves 
            for(let i=0; i< claves.length; i++){
                let clave = claves[i];
                if(claves[i]==animo){
                    if(value=="+1"){
                        let nuevoVal = parseInt(element[clave])+1;
                        element[clave]=nuevoVal.toString();
                    }else{
                        let nuevoVal = parseInt(element[clave])-1;
                        element[clave]=nuevoVal.toString();
                    }
                }
                //console.log(element[clave]);
            }
        });
        console.log("Sale");

        const arrayString = JSON.stringify(valorActual)
        localStorage.setItem(titulo,arrayString)
        
        /*
        if(value=="+1"){//like
            let nuevoVal = parseInt(valorActual)+1 
            localStorage.setItem(titulo,nuevoVal.toString())
        }else{//dislike
            let nuevoVal = parseInt(valorActual)-1
            localStorage.setItem(titulo,nuevoVal.toString())
        }*/
    }
}
export default LocalStorage