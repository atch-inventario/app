import * as api from '/js/api.js';

window.addEventListener("load",async ()=>{
    const unidades_medida = await api.unidades_medida.lista();
    
    for (const item of unidades_medida) {
        unidad_medida.innerHTML+=`<option value="${item.id}">${item.nombre}</option>`
    }

    if(id){
        const obj=await api.articulos.buscar(id)
        codigo.value=obj.codigo;
        descripcion.value=obj.descripcion;
        unidad_medida.value=obj.unidad_medida.id;
    }
});

document.querySelector("form").addEventListener("submit",async(event)=>{
    event.preventDefault();
    btn_guardar.disabled = true;
    const obj={
        id:id,
        codigo:codigo.value,
        descripcion:descripcion.value,
        unidad_medida_id:parseInt(unidad_medida.value)
    }

    let guardado=false;
    if(id){
        guardado=await api.articulos.editar(obj);
    }else{
        guardado=await api.articulos.agregar(obj);
    }

    if(guardado){
        window.location.href="/articulos";
    }else{
        alert("Error")
    }
    btn_guardar.disabled = false;
})