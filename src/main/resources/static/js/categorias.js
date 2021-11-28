
    let idCategory = 0

    $('#AgregarCategory').click(()=>{
        if($('#NameCategory').val() === "" || $('#DescCategory').val() === "" ){
            alert("Asegurate de rellenar todos los campos")
        }
        else{
            funcionPost();
        }
        name:$("#NameCategory").val("") 
        description:$("#DescCategory").val("")
        alert("se ha agregado exitosamente")
    })

    $('#Actualizar').click(()=>{
        funcionActualizar()
    })

        async function funcionPost(){
            let dataSend = {
                name:$('#NameCategory').val(),
                description:$('#DescCategory').val()
        }
        console.log(dataSend)    
        const peticion = await fetch('http://168.138.133.81:8080/api/Category/save',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataSend)
        })

        const respuesta = await peticion.json();

        alert('Creada la categoria con exito!')
        
    }

    function funcionGet(){

        $.ajax({
            url:"http://168.138.133.81:8080/api/Category/all",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                MostrarCategorias(respuesta)
                
            }
    
        })
    }

    
    function MostrarCategorias(respuesta){

        $('.cards').remove();   

        for(i=0;i<respuesta.length;i++){
            let card = "<div class='cards'>"
            card+="<h1>"+respuesta[i].name+"</h1>"
            card+="<p>"+respuesta[i].description+"</p>"
            card+="<div class='buttonCards'>"+"<button onclick='traerToActualizar("+ respuesta[i].id + ")'>"+"<a href='#cabecera'>Elige para actualizar</a>"+"</button>"+"<button onclick='funcionBorrar("+ respuesta[i].id +")' class='btn-Borrar'>"+"Borrar"+"</button>"+"</div>"
            card+="</div>"
            $("#resultado").append(card);
        
        }
   
              

    }


    async function traerToActualizar(idCategoria){
        const category = await fetch("http://168.138.133.81:8080/api/Category/all",{
            method:'GET',
            headers:{
                "Content-Type":'application/json'
            }

        })

        const peticionCategory = await category.json()
        console.log(peticionCategory)


        for(let i=0;i < peticionCategory.length;i++){
            if(idCategoria === peticionCategory[i].id){
                idCategory = idCategoria
                $("#NameCategory").val(peticionCategory[i].name)
                $("#DescCategory").val(peticionCategory[i].description)
            }
        }


    }

    async function funcionActualizar(){

            datosPasar = {
                id:idCategory,
                name:$("#NameCategory").val() ,
                description:$("#DescCategory").val()   
            }
        

        console.log(datosPasar)
        
        const peticion = await fetch("http://168.138.133.81:8080/api/Category/update" , {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(datosPasar)
        })

        


        alert("Se ha actualizado con exito")

        $("#NameCategory").val("")
        $("#DescCategory").val("")

        funcionGet();
        
    }

    async function funcionBorrar(id){
        const peticionBorrar = await fetch("http://168.138.133.81:8080/api/Category/"+`${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }

        })

        alert("se ha borrado la categoria con exito")

        funcionGet()
    }

    
