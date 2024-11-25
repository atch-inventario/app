import * as api from '/js/api.js';

const dialog_error=new DialogATCH("dialog-error");

window.addEventListener("load",async ()=>{
    if(id){
        const obj=await api.unidades_medida.buscar(id)
        nombre.value=obj.nombre;
    }
});

document.querySelector("form").addEventListener("submit",async(event)=>{
    event.preventDefault();
    if(await validacion())return;
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
        dialog_error.open()
    }
    btn_guardar.disabled = false;
})

async function validacion(){
    let validacion=false;
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach(input => {
        input.value=input.value.toUpperCase().trim();
        if(input.required && input.value===""){
            input.select();
            validacion=true;
            return;
        }
    });
    return validacion;
}