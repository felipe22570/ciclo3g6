
$('#Consultar').click(()=>{
    $('#icon').show()
    animacion()
})

const animacion = ()=>{

    $('#icon').append('<a href="#resultado"><img id="icon-down" src="images/flechas-hacia-abajo.png" width"70px" height="70px"></a>')
        $('#icon-down').addClass('icon-toogle');

        setTimeout(() => {
            $('#icon').hide();
            $('#icon-down').remove();
        }, 4000);

        
    }