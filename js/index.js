const database=firebase.database();
const descripcionTarea = document.getElementById("descripcionTarea");
const descripcionBtn = document.getElementById("descripcionBtn");
const doContainer = document.getElementById("doContainer");
const doingContainer = document.getElementById("doingContainer");
const doneContainer = document.getElementById("doneContainer");

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

      let tipo = "do";
      
      let reference = database.ref("tareas/do").push();
      let tareaNueva={
          id: reference.key,
          descripcion: descripcionTarea.value,
          fecha: fecha,
          tipo: tipo
      };
  
      reference.set(tareaNueva);
      descripcionTarea.value='';
};

descripcionBtn.addEventListener('click', nuevaTarea);

database.ref("tareas/do").on('value', function(data){
    doContainer.innerHTML="";
    data.forEach((id)=>{
        let valor = id.val();
        let tarea = new Tarea(valor);
        doContainer.appendChild(tarea.render());
    })
});

database.ref("tareas/doing").on('value', function(data){
    doingContainer.innerHTML="";
    data.forEach((id)=>{
        let valor = id.val();
        let tarea = new Tarea(valor);
        doingContainer.appendChild(tarea.render());
    })
});

database.ref("tareas/done").on('value', function(data){
    doneContainer.innerHTML="";
    data.forEach((id)=>{
        let valor = id.val();
        let tarea = new Tarea(valor);
        doneContainer.appendChild(tarea.render());
    })
});