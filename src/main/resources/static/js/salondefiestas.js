let idpartyCatch= 0


    let idCategoria = 0
    funcionGetCategory()

    $('#Consultar').click(()=>{
        funcionGet();
    })

    $('#Agregar').click(()=>{
        funcionPost();
        
        $("#owner").val("")
        $("#name").val("")
        $("#description").val("")
        $("#capacity").val("")
        $("#Seleccion").val("")
    })
    $('#Actualizar').click(()=>{
        if(confirm("Seguro que quiere actualizar")){
        ActualizarPartyroom();
        alert("Actualizado correctamente")
        funcionGet();
        
        
    }
        else{

    }

    })


    async function funcionGetCategory(){
        const peticion = await fetch('http://168.138.133.81:8080/api/Category/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })

        
        const respuesta = await peticion.json()
        /////////////////////////////////////////////////////////////////////////
        let optionSelect=""
        for(i=0;i<respuesta.length;i++){
            optionSelect += '<option value="'+`${respuesta[i].name}`+'">'+ respuesta[i].name +'</option>';
        }

        $('#Seleccion').append(optionSelect)

        if(respuesta.length === 0){
            setTimeout(() => {
                alert('no existe ningun salon de fiestas , Agrega uno!')    
            }, 4000);
             
            
        }


        $("#Seleccion").change(function() {
                 for(i=0;i<respuesta.length;i++){
                     if(respuesta[i].name === $("#Seleccion").val()){
                        idCategoria = respuesta[i].id
                        break
                     }
                 }   
            });
            
             ////////////////////////////////////////////////////////////////////////////////////////////////////////////
             
    }



    async function funcionPost(){
        let datosPartyroom = {
            owner:$('#owner').val(),
            capacity:$('#capacity').val(),
            category:{id:idCategoria},
            name:$('#name').val(),
            description:$('#description').val(),
        }

        console.log(datosPartyroom)
        const peticion = await fetch('http://168.138.133.81:8080/api/Partyroom/save' ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(datosPartyroom)  
        })

        alert('Creado el salon de fiestas con exito!')
        const response = await peticion.json();
        
             
     
    }
    
    async function funcionGet(){
        const peticion = await fetch('http://168.138.133.81:8080/api/Partyroom/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
            
        })
        
        const respuesta = await peticion.json()

        let nameCategory = ""
        
        $(".cards").remove()

        for(i=0;i<respuesta.length;i++){
            let card ="<div class='cards clientCard'>"
            card+="<h1>"+respuesta[i].name+"</p>";
            card+="<p>"+respuesta[i].owner+"</p>";
            card+="<p>"+respuesta[i].capacity+"</p>";
            card+="<p>"+respuesta[i].description+"</p>";
            for(var e in respuesta[i].category){
                if(e === "name"){ 
                    nameCategory = respuesta[i].category[e]
                    card+="<p>"+respuesta[i].category[e]+"</p>";
                }
            }
            

            card+="<div class='buttonCards'>"+"<button onclick='ElementosPartyroom("+respuesta[i].id+',' +'"'+ respuesta[i].name +'"' +','+'"'+ respuesta[i].owner +'"'+','+'"'+ respuesta[i].capacity +'"' +','+'"'+ respuesta[i].description + '"' +','+'"'+ nameCategory +'"'+")'><a href='#cabecera'>Elige para actualizar</a></button>"+"<button onclick='BorrarPartyroom("+ respuesta[i].id +")'>"+"Borrar"+"</button>"+"</div>"
            card+="</div>";

            $("#resultado").append(card);

        }
        

        if(respuesta.length === 0){
            alert('no existe ningun salon de fiestas')
        }


    
    }
    function ElementosPartyroom(id , name, owner, capacity, description, category){
        idpartyCatch = id

        $("#name").val(name)
        $("#owner").val(owner)
        $("#capacity").val(capacity)
        $("#description").val(description)

        $("#Seleccion").val(category)
        $("#Seleccion").attr("disabled",true)
    
    }

    async function ActualizarPartyroom(){
        let datosActualizar = {
            id:idpartyCatch,
            owner:$("#owner").val(),
            name:$("#name").val(),
            description:$("#description").val(),
            capacity:$("#capacity").val()
        }

        console.log(datosActualizar)
        const partyact = await fetch("http://168.138.133.81:8080/api/Partyroom/update/",{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(datosActualizar)
        })

        const response = await partyact.json()

        funcionGet()

        }
        

    
    async function BorrarPartyroom(id){
        if(confirm("Seguro que desea borrar")){
            const Partybr = await fetch("http://168.138.133.81:8080/api/Partyroom/"+`${id}`,{
            method:'DELETE',
            headers:{
            'Content-Type':'application/json'
        }
        })

        alert("Borrado exitosamente")

        funcionGet()

        }
        
        else{
        }        
    }
