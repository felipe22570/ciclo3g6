
    let idAdminCatch= 0

    $('#Agregar').click((e)=>{
        e.preventDefault();
        if($('#Nombre').val() === "" || $('#Email').val() === "" || $('#Contraseña').val() === "" ){
            alert("Asegurate de rellenar todos los campos")
        }
        else{

            funcionPost();
        }
    
    })

    $('#Consultar').click((e)=>{
        e.preventDefault();
        funcionGet();
    })


    $('#ActualizarAdmin').click((e)=>{
       e.preventDefault()
       ActualizarAdmin()
    })

        async function funcionPost(){
            let dataSend = {
                name:$('#Nombre').val(),
                email:$('#Email').val(),
                password:$('#Contraseña').val()
        }
        console.log(dataSend)    
        const peticion = await fetch('http://localhost:8080/api/Admin/save',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataSend)
        })

        alert('Administardor creado con exito!')
        const respuesta = await peticion.json();
        console.log(respuesta)
    }

        async function funcionGet(){
    
        const peticion = await fetch('http://localhost:8080/api/Admin/all' ,{
            method:'GET',
            headers:{
                
                'Content-Type':'application/json',   
            }
        })
        
        const respuesta = await peticion.json();
        console.log(respuesta)
        console.log(respuesta.length)

    

        $('.cards').remove();
        for(i=0;i<respuesta.length;i++){
            let card = "<div class='cards clientCard'> "
            card+="<h1>"+respuesta[i].idAdmin+"</h1>";
            card+="<h1>"+respuesta[i].name+"</h1>";
            card+="<h1>"+respuesta[i].email+"</td>";
            card+="<div class='buttonCards'>"+"<button onclick='ElementosAdmin("+ respuesta[i].idAdmin +','+'"'+ respuesta[i].name +'"'+','+'"'+ respuesta[i].email +'"' +','+'"'+ respuesta[i].password +'"'+")'><a href='#cabecera'>Elige para actualizar</a></button>"+"<button onclick='BorrarAdmin("+ respuesta[i].idAdmin +")'>Borrar</button>"+"</div>"
            card+="</div>";
            
            $("#resultado").append(card); 
        }

        
    }

    function ElementosAdmin(id, name, email, password){

        idAdmin = idAdminCatch,
       

        $("#Nombre").val(name)
        $("#Email").val(email)
        $("#Contraseña").val(password)


        $("#Email").attr("disabled",true)
    
    }


    async function ActualizarAdmin(){
        let datosActualizar = {
            idAdmin:idAdminCatch,
            name:$("#Nombre").val(),
            email:$("#Email").val(),
            password:$("#Contraseña").val()

        }
        const adminact = await fetch("http://168.138.133.81:8080/api/Admin/update/",{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(datosActualizar)
        })

        const response = await adminact.json()

        funcionGet()

        }

    
    function BorrarAdmin(id){
        console.log(id)
    }

    async function BorrarAdmin(idAdmin){
        const adminbr = await fetch("http://168.138.133.81:8080/api/Admin/"+`${idAdmin}` ,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }

        })
        alert("Borrado exitosamente")
    }
    




