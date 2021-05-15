const database=firebase.database();
const descripcionTarea = document.getElementById("descripcionTarea");
const descripcionBtn = document.getElementById("descripcionBtn");

const nuevaTarea = ()=>{

    if(descripcionTarea.value===''){
        alert("Ingrese la descripción de la tarea");
        return;
    }

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let fecha = null;

    if (month < 10) {
        fecha = `${day}-0${month}-${year}`;
      } else {
        fecha = `${day}-${month}-${year}`;
      }

      let reference = database.ref("tareas/do").push();
      let tareaNueva={
          id: reference.key,
          descripcion: descripcionTarea.value,
          fecha: fecha
      };
  
      reference.set(tareaNueva);
      descripcionTarea.value='';
};

descripcionBtn.addEventListener('click', nuevaTarea);