import * as api from '/js/api.js';

window.addEventListener("load",async ()=>{
    if(id){
        const obj=await api.unidades_medida.buscar(id)
        nombre.value=obj.nombre;
    }
});

document.querySelector("form").addEventListener("submit",async(event)=>{
    event.preventDefault();
    btn_guardar.disabled = true;
    const obj={
        id:id,
        nombre:nombre.value
    }
    
    let guardado=false;
    if(id){
        guardado=await api.unidades_medida.editar(obj);
    }else{
        guardado=await api.unidades_medida.agregar(obj);
    }

    if(guardado){
        window.location.href="/unidades-medida";
    }else{
        alert("Error")
    }
    btn_guardar.disabled = false;
})