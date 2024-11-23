import * as api from '/js/api.js';

window.addEventListener("load",async ()=>{
    if(id){
        const obj=await api.tipos_documento.buscar(id)
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
        guardado=await api.tipos_documento.editar(obj);
    }else{
        guardado=await api.tipos_documento.agregar(obj);
    }

    if(guardado){
        window.location.href="/tipos-documento";
    }else{
        alert("Error")
    }
    btn_guardar.disabled = false;
})