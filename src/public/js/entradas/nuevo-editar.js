import * as api from '/js/api.js';

window.addEventListener("load",async ()=>{
    const articulos = await api.articulos.lista();
    const tipos_documento = await api.tipos_documento.lista();

    fecha.value=fechaActual();
    for (const item of articulos) {
        articulo.innerHTML+=`<option value="${item.id}">${item.codigo} - ${item.descripcion}</option>`
    }
    for (const item of tipos_documento) {
        tipo_documento.innerHTML+=`<option value="${item.id}">${item.nombre}</option>`
    }

    if(id){
        const obj=await api.entradas.buscar(id)
        fecha.value=obj.fecha;
        articulo.value=obj.articulo.id;
        tipo_documento.value=obj.tipo_documento.id;
        numero_documento.value=obj.numero_documento;
        cantidad.value=obj.cantidad;
        precio_unitario.value=obj.precio_unitario;
        observacion.value=obj.observacion;
    }
});

document.querySelector("form").addEventListener("submit",async(event)=>{
    event.preventDefault();
    btn_guardar.disabled = true;
    const obj={
        id:id,
        fecha:fecha.value,
        articulo_id:parseInt(articulo.value),
        tipo_documento_id:parseInt(tipo_documento.value),
        numero_documento:numero_documento.value,
        cantidad:parseInt(cantidad.value),
        precio_unitario:parseFloat(precio_unitario.value),
        observacion:observacion.value
    }
    
    let guardado=false;
    if(id){
        guardado=await api.entradas.editar(obj);
    }else{
        guardado=await api.entradas.agregar(obj);
    }

    if(guardado){
        window.location.href="/entradas";
    }else{
        alert("Error")
    }
    btn_guardar.disabled = false;
})