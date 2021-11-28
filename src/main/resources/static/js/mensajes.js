
    
    let retornarId = 0
    let Clienteid = 0
    let idMessageCatch= 0
    funcionGetPartyroomClient()

    $('#Consultar').click(()=>{
        funcionGet();
    })

    $('#Agregar').click(()=>{
        $("#Seleccion2").val()
        if($("#Seleccion").val() != '' && $("#Seleccion2").val() != '' && $("#messagetext").val() != '' ){
            alert("Mensaje agregado")
            funcionPost();
        }
        else{
            alert('Debe agregar un usuario o un salon de fiestas para poder enviar el mensaje')

            if($("#messagetext").val() != ''){
                funcionPost()
            }
            else{
                alert('El mensaje no puede estar vacio debe tener de 1 a 250 caracteres , Vuelve a intentarlo!')
            }
            
        }
    })
    $('#Actualizar').click(()=>{
        if(confirm("Seguro que quiere actualizar")){
        ActualizarMessage()
        alert("se ha actualizado correctamente")
        funcionGet()
    }
        else{
    }
    })

    


    async function funcionGetPartyroomClient(){
        const peticion = await fetch('http://168.138.133.81:8080/api/Partyroom/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })

        const peticionCliente = await fetch('http://168.138.133.81:8080/api/Client/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        
        const respuesta = await peticion.json()
        informacionPartyroom = respuesta
        const respuesta2 = await peticionCliente.json();
        informacionCliente = respuesta2
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

        let idSalon = 0

        $("#Seleccion").change(function() {
                 for(i=0;i<respuesta.length;i++){
                     if(respuesta[i].name === $("#Seleccion").val()){
                        idSalon = respuesta[i].id
                        retornarId = idSalon
                        break
                     }
                 }   
            });
            
             ////////////////////////////////////////////////////////////////////////////////////////////////////////////
             
            let optionSelect2=""
            for(i=0;i<respuesta2.length;i++){
                 optionSelect2 += '<option value="'+`${respuesta2[i].name}`+'">'+ respuesta2[i].name +'</option>';
             }

            
     
             $('#Seleccion2').append(optionSelect2)
     
             if(respuesta2.length === 0){
                 setTimeout(() => {
                     alert('no existe ningun Cliente , Agrega uno!')    
                 }, 4000);
                  
                 
             }
     
     
             $("#Seleccion2").change(function() {
                      for(i=0;i<respuesta2.length;i++){
                         if(respuesta2[i].name === $('#Seleccion2').val()){
                            Clienteid = respuesta2[i].idClient;
                         }
                      }   
                 });

    }

    async function funcionPost(){

        let datosCliente = {
            messageText:$('#messagetext').val(),
            client:{idClient:Clienteid},
            partyroom:{id:retornarId}
        }

        const peticion = await fetch('http://168.138.133.81:8080/api/Message/save' ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(datosCliente)  
        })

        const response = await peticion.json();
        alert('Creada el mensaje con exito!')

        
    } 

    async function funcionGet(){
        const peticion = await fetch('http://168.138.133.81:8080/api/Message/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
            
        })
        
        const respuesta = await peticion.json()
        let npartyroom
        let nclient 

        $(".cards").remove();
        for(i=0;i<respuesta.length;i++){
            let card ="<div class='cards clientCard'>";
            card+="<h1>"+respuesta[i].messageText+"</h1>";
            for(var element in respuesta[i].partyroom){
                if (element === "name") {
                    card+="<p>"+respuesta[i].partyroom[element]+"</p>";
                    npartyroom = respuesta[i].partyroom[element]
                }
                
            }
            for(var e in respuesta[i].partyroom){
                if (e === "name") {
                    card+="<p>"+respuesta[i].client[e]+"</p>"; 
                    nclient = respuesta[i].client[e]
                }
                
            }
            card+="<div class='buttonCards'>"+"<button onclick='ElementosMessage("+respuesta[i].idMessage+',' +'"'+ respuesta[i].messageText +'"'+',' +'"'+ npartyroom +'"' + ',' +'"'+ nclient +'"'+")'><a href='#cabecera'>Elige para actualizar</a></button>"+"<button onclick='BorrarMessage("+ respuesta[i].idMessage +")'>Borrar</button>"+"</div>"
            card+="</div>";

            $("#resultado").append(card);
        }
        
 


        if(respuesta.length === 0){
            alert('no existe ningun Mensaje')
        }

     
    }
    function ElementosMessage(idMessage , messageText, npartyroom, ncliente){
        idMessageCatch = idMessage

        $("#messagetext").val(messageText)
        $("#Seleccion").val(npartyroom)
        $("#Seleccion2").val(ncliente)

      
        $("#Seleccion").attr("disabled",true)
        $("#Seleccion2").attr("disabled", true)

    }

    async function ActualizarMessage(){
        let datosActualizar = {
            idMessage:idMessageCatch,
            messageText:$("#messagetext").val()
        }

        const messageact = await fetch("http://168.138.133.81:8080/api/Message/update",{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(datosActualizar)
        })

        const response = await messageact.json()

        funcionGet()

        alert("Actualizado con exito")

        }

        async function BorrarMessage(id){
            if(confirm("Seguro que desea borrar")){
                const Messagebr = await fetch("http://168.138.133.81:8080/api/Message/"+`${id}`,{
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

