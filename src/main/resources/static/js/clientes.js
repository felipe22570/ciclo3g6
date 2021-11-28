

    $('#Consultar').click(()=>{
        funcionGet()
    })

    $('#Agregar').click(()=>{
        if($('#nameclient').val() === "" || $('#email').val() === ""  || $('#passwordclient').val() === "" || $('#age').val() === "" ){
            alert("Asegurate de rellenar todos los campos")
        }
        else{
            funcionPost();
            $('#nameclient').val("")
            $('#email').val("")
            $('#passwordclient').val("")
            $('#age').val("")
        }
    })

    $('#Actualizar').click(()=>{
        if(confirm("Seguro que quiere actualizar")){
        ActualizarClient()
        alert("Actualizado Correctamente")
        funcionGet()
    }
        else{
    }
    })


    async function funcionPost(){
        let datosCliente = {
            name:$('#nameclient').val(),
            email:$('#email').val(),
            password:$('#passwordclient').val(),
            age:$('#age').val(),
        }

        const peticion = await fetch('http://168.138.133.81:8080/api/Client/save' ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(datosCliente)  
        })

        alert('Creado el usuario con exito!')
        $('#nameclient').val() === "" || $('#email').val() === ""  || $('#passwordclient').val() === "" || $('#age').val("") 
        const response = await peticion.json();
        
        
     
    } 

    async function funcionGet(){
        const peticion = await fetch('http://168.138.133.81:8080/api/Client/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        
        const respuesta = await peticion.json()
       
        $(".cards").remove()
        
        for(i=0;i<respuesta.length;i++){
            let card = "<div class='cards clientCard'>"
            card+="<h1>"+respuesta[i].idClient+"</h1>";
            card+="<p>"+respuesta[i].email+"</p>";
            card+="<p>"+respuesta[i].name+"</p>";
            card+="<p>"+respuesta[i].age+"</p>";
            card+="<div class='buttonCards'><button onclick='ElementosClient("+respuesta[i].idClient+',' +'"'+ respuesta[i].name +'"' +','+'"'+ respuesta[i].email +'"'+','+'"'+ respuesta[i].password+ '"' +','+ respuesta[i].age +")'><a href='#cabecera'>Elige para actualizar</a></button>"+"<button onclick='BorrarClient("+ respuesta[i].idClient +")'>Borrar</button></div>"
            card+="</div>";
            console.log(card)
            $("#resultado").append(card);
        }

        
        

        if(respuesta.length === 0){
            alert('no existe ningun cliente')
        }

        $('.tabla').remove();
        

    }
    function ElementosClient(idClient , name, email, password, age){
        idclientCatch = idClient

        $("#nameclient").val(name)
        $("#email").val(email)
        $("#passwordclient").val(password)
        $("#age").val(age)

      
        $("#email").attr("disabled",true)
    
    }

    async function ActualizarClient(){
        let datosActualizar = {
            idClient:idclientCatch,
            name:$("#nameclient").val(),
            email:$("#email").val(),
            password:$("#passwordclient").val(),
            age:$("#age").val(),
          
        }


        const clientact = await fetch("http://168.138.133.81:8080/api/Client/update/",{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(datosActualizar)
        })

        const response = await clientact.json()

        funcionGet()

        alert("Actualizado con exito")

        }

        async function BorrarClient(idClient){
            if(confirm("Seguro que desea borrar")){
                const Clientbr = await fetch("http://168.138.133.81:8080/api/Client/"+`${idClient}`,{
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
    
    
