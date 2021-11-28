

    let idCliente = 0
    let idPartyroom = 0
    let idReservationGet = 0
    let estado = ""

    funcionGetPartyroomAndClient()

    $('#Agregar').click(()=>{
        if ($('#start-day').val() === '' || $('#departure-day').val() === '' || $('#combo-client').val() === '' || $('#combo-partyroom').val() === '' ) {
            alert('Asegurate de ingresar todos los campos requeridos para crear una reserva')

        } else {
            funcionPost();
        }
        
    })

    $('#Consultar').click(()=>{
        funcionGet();
    })

    $('#ConsultarCal').click(()=>{
        Getcalificaciones()
    })

    $('#AgregarCal').click(()=>{
        funcionPostCategorias();
    })

    $("#Actualizar").click(()=>{
        if(confirm("Seguro que quieres actualizar la reservacion")){
            funcionActualizarReservacion()
            alert("se ha actualizado exitosamente")
            funcionGet()
        }


    })

    async function funcionGetPartyroomAndClient(){


        const peticion = await fetch('http://168.138.133.81:8080/api/Partyroom/all',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            } 
               
        })

        const peticion2 = await fetch('http://168.138.133.81:8080/api/Client/all' , {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }) 

        const response = await peticion.json()
        const response2 = await peticion2.json()
        /*Peticion para traer la informacion de partyroom y cliente para mostrarla en el front end*/

        let PartyroomOption= ""
        for(let i =0;i<response.length;i++){
            PartyroomOption+= "<option value='"+`${response[i].name}`+"'>"+response[i].name+"</option>";
        }



        $('#combo-partyroom').append(PartyroomOption)

        if(response.length === 0){
            setTimeout(() => {
                alert('no hay ningun salon de fiesta!')
            }, 3000);
        }

        $('#combo-partyroom').change(()=>{
            console.log($('#combo-partyroom').val())
            for(let e = 0;response.length;e++){
                if(response[e].name === $('#combo-partyroom').val()){
                    idPartyroom = response[e].id
                    console.log( response[e].id)
                }
            }
            
        })

        ////////////////////////////////////////////////////////////////////////////////////////////

        let ClientOption= ""
        for(let i =0;i<response2.length;i++){
            ClientOption+= "<option value='"+`${response2[i].name}`+"'>"+response2[i].name+"</option>";
        }



        $('#combo-client').append(ClientOption)

        
        if(response2.length === 0){
            setTimeout(() => {
                alert('no hay ningun Cliente!')
            }, 3000);
        }

        $('#combo-client').change(()=>{
            console.log($('#combo-client').val())
            for(let e = 0;response2.length;e++){
                if(response2[e].name === $('#combo-client').val()){
                    idCliente = response2[e].idClient
                    console.log(response2[e].idClient)
                }
            }
            
        })


    }

    async function funcionGet(){
        const peticion = await fetch("http://168.138.133.81:8080/api/Reservation/all",{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        
        const respuesta = await peticion.json();
        console.log(respuesta)

        $(".cards").remove();

        for(i=0;i<respuesta.length;i++){
            let card = "<div class='cards clientCard'>"
            card+="<h1>"+respuesta[i].idReservation+"</h1>";
            card+="<p>"+respuesta[i].startDate+"</p>";
            card+="<p>"+respuesta[i].devolutionDate+"</p>";
            
            let NamePartyroom = ""
            let nameCliente = ""

            for(var element in respuesta[i].partyroom){
                if (element === "name" || element === "owner" || element === "description") {
                    card+="<p>"+respuesta[i].partyroom[element]+"</p>";
                    if(element === "name"){
                        NamePartyroom = respuesta[i].partyroom[element]
                    }
                }

            }

            for(var e in respuesta[i].client){
                if (e === "idClient" || e === "name" || e === "email"){
                    card+="<p>"+respuesta[i].client[e]+"</p>";
                    if(e === "name"){
                        nameCliente = respuesta[i].client[e]
                    } 
                }
                
            }

           card+="<div class='buttonCards'><button class='btn-tabla' onclick='elementosReser("+ respuesta[i].idReservation+','+'"'+ respuesta[i].status +'"' +','+'"'+ NamePartyroom +'"'+','+'"'+ nameCliente +'"'+")'><a href='#cabecera'>Elige para actualizar</a></button>"
           card+="<button onclick='BorrarReservaciones("+ respuesta[i].idReservation +")'>Borrar</button></div>"
           card+="</div>";

            $("#resultado").append(card);

        }
        
    

        if(respuesta.length === 0){
            alert('no existe ninguna Reservacion')
        }

    
    

    }

    function elementosReser(id ,status, salon , cliente){
        idReservationGet = id

        estado =status

        $('#combo-client').val(cliente)
        $('#combo-partyroom').val(salon)

        $('#combo-client').attr("disabled",true)
        $('#combo-partyroom').attr("disabled",true)
        
    }


    
    async function Getcalificaciones(){
        const peticionCalificacion = await fetch("http://168.138.133.81:8080/api/Score/all",{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            
            const respuestaCalificacion = await peticionCalificacion.json();
            console.log(respuestaCalificacion)
    
            let mytabla = "<table class='tabla2'>"
            mytabla+="<tr>"+"</th>"+"<th>"+"Calificacion"+"</th>"+"<th>"+"Mensaje"+"</th>"+"</tr>"
    
            for(i=0;i<respuestaCalificacion.length;i++){
                mytabla+="<tr>";
                mytabla+="<td>"+respuestaCalificacion[i].qualification+"</td>";
                mytabla+="<td>"+respuestaCalificacion[i].message+"</td>";
                
    
                mytabla+="</tr>";
            }
            
            mytabla+='</table>'
    
            if(respuestaCalificacion.length === 0){
                alert('no existe ninguna Calificacion')
            }
    
            $(".tabla2").remove();
            $("#resultado").append(mytabla);
    
    }

    async function funcionPostCategorias(){

        let valorPunt = $("#Puntuacion").val()
        let valormensaje = $("#mensajecal").val()
        let valorsalon = $("#combo-partyroom").val()



        if($("#Puntuacion").val() === ""){
             valorPunt = null
            
        }

        else if($("#mensajecal").val() === ""){
             valormensaje = null
        }

        else if($("#combo-partyroom").val() === ""){
             valorsalon = null
        }

        let datosReservacion={
            qualification:valorPunt,
            message:valormensaje,
        }

        console.log(datosReservacion)
        

        const peticion = await fetch('http://168.138.133.81:8080/api/Score/save' ,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(datosReservacion)
        
        })

        alert('Calificacion guardada con exito')
        const respuesta = await peticion.json();
        
    }



    async function funcionPost(){

        let datosReservacion={
            startDate:$('#start-day').val(),
            devolutionDate:$('#departure-day').val(),
            client:{idClient:idCliente},
            partyroom:{id:idPartyroom}
        }

        console.log(datosReservacion)
        console.log($('#start-day').val())

        const peticion = await fetch('http://168.138.133.81:8080/api/Reservation/save' ,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(datosReservacion)
        
        })

        alert('reservacion guardada con exito')
        const respuesta = await peticion.json();
        
    }


    async function funcionActualizarReservacion(){

        let dataToSend = {
            idReservation:idReservationGet,
            startDate:$("#start-day").val(),
            devolutionDate:$("#departure-day").val(),
        }

        console.log(dataToSend)
        
        const peticion = await fetch("http://168.138.133.81:8080/api/Reservation/update/",{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(dataToSend)
        })

        const response = await peticion.json()

        funcionGet()


        }

    


    async function BorrarReservaciones(idReserv){
        const adminbr = await fetch("http://168.138.133.81:8080/api/Reservation/"+`${idReserv}` ,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }

        })

        alert("Borrado exitosamente")

        funcionGet()
    }
    