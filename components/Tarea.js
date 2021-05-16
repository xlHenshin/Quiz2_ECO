class Tarea{
    constructor(tarea){
        this.tarea=tarea;
    }

    render=()=>{

        let component = document.createElement("div");
        component.className= "Tarea";

        let fechaTarea = document.createElement("div");
        fechaTarea.className = "fechaCont";
        fechaTarea.innerHTML = this.tarea.fecha;

        let tareaDescripcion = document.createElement("div");
        tareaDescripcion.className = "tareaDescripcion";
        tareaDescripcion.innerHTML = this.tarea.descripcion;

        let eliminarBtn = document.createElement("button");
        eliminarBtn.className="eliminarBtn";

        let avanceBtn = document.createElement("button");
        avanceBtn.className="avanceBtn";

        let retrocesoBtn = document.createElement("button");
        retrocesoBtn.className="retrocesoBtn";

        let buttonDiv = document.createElement("div");
        buttonDiv.className="buttonDiv";
        buttonDiv.appendChild(eliminarBtn);
        buttonDiv.appendChild(retrocesoBtn);
        buttonDiv.appendChild(avanceBtn);

        component.appendChild(fechaTarea);
        component.appendChild(tareaDescripcion);
        component.appendChild(buttonDiv);
        

        
        eliminarBtn.addEventListener('click', ()=>{

            if(this.tarea.tipo==="do"){
                let reference = database.ref("tareas/do/"+this.tarea.id).remove();
            }

            if(this.tarea.tipo==="doing"){
                let reference = database.ref("tareas/doing/"+this.tarea.id).remove();
            }

            if(this.tarea.tipo==="done"){
                let reference = database.ref("tareas/done/"+this.tarea.id).remove();
            }
        });

        avanceBtn.addEventListener('click', ()=>{

            let tipoDoing="doing";
            let tipoDone="done";

            if(this.tarea.tipo==="do"){
                let reference = database.ref("tareas/doing").push();

                let tareaNueva={
                    id: reference.key,
                    descripcion: this.tarea.descripcion,
                    fecha: this.tarea.fecha,
                    tipo: tipoDoing
                };
            
                reference.set(tareaNueva);
                database.ref("tareas/do/"+this.tarea.id).remove();

            }
            
            if(this.tarea.tipo==="doing"){

                let reference = database.ref("tareas/done").push();

                let tareaNueva={
                    id: reference.key,
                    descripcion: this.tarea.descripcion,
                    fecha: this.tarea.fecha,
                    tipo: tipoDone
                };
            
                reference.set(tareaNueva);
                database.ref("tareas/doing/"+this.tarea.id).remove();
            }
            
        });

        retrocesoBtn.addEventListener('click', ()=>{
            
            let tipoDo="do";
            let tipoDoing="doing";

            if(this.tarea.tipo==="doing"){

                let reference = database.ref("tareas/do").push();

                let tareaNueva={
                    id: reference.key,
                    descripcion: this.tarea.descripcion,
                    fecha: this.tarea.fecha,
                    tipo: tipoDo
                };
            
                reference.set(tareaNueva);
                database.ref("tareas/doing/"+this.tarea.id).remove();
            }

            if(this.tarea.tipo==="done"){

                let reference = database.ref("tareas/doing").push();

                let tareaNueva={
                    id: reference.key,
                    descripcion: this.tarea.descripcion,
                    fecha: this.tarea.fecha,
                    tipo: tipoDoing
                };
            
                reference.set(tareaNueva);
                database.ref("tareas/done/"+this.tarea.id).remove();
            }
        });
        return component;
    }
}