import * as api from '/js/api.js';
const busqueda=document.getElementById("busqueda");

async function Listar() {
    let data=await api.articulos.lista();
    data=data.filter(item=>
        item.codigo.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase())||
        item.descripcion.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase())||
        item.unidad_medida.nombre.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase())
    );
    
    let data_entradas= await api.entradas.lista()
    let data_salidas= await api.salidas.lista()
    
    let content="";
    data.forEach(async(item,index) => {
        const entradas_cantidad=data_entradas.filter(x => x.articulo.id === item.id).reduce((acc, x) => acc + x.cantidad, 0);
        const salidas_cantidad=data_salidas.filter(x => x.articulo.id === item.id).reduce((acc, x) => acc + x.cantidad, 0);
        if(entradas_cantidad>0 || salidas_cantidad>0){
            content+=`
            <tr>
                <td>${item.codigo}</td>
                <td>${item.descripcion}</td>
                <td>${item.unidad_medida.nombre}</td>
                <td>${entradas_cantidad}</td>
                <td>${salidas_cantidad}</td>
                <td>${entradas_cantidad-salidas_cantidad}</td>
            </tr>
        `
        }
    });
    document.querySelector("tbody").innerHTML=content;
}

window.addEventListener("load",async ()=>{
    await Listar();
});
busqueda.addEventListener("keyup",async ()=>{
    await Listar();
})