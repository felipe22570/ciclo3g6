$("document").ready(()=>{

    

    $("#p").click(()=>{
        const a = $("input").val("hola mundo")
        let ji = {
    hola: $("input").val()
}



console.log(a)
    console.log(a[0])
    $(".clas").append("<h1>Añadido!</h1>")

    getclientes()

    }
)


async function getclientes(){
    const client = await fetch("http://168.138.133.236:8080/api/Client/all",{
        method:'GET',
        headers:{
            'content-TYPE':'application/json'
        }
    })
    
    let i = await client.json()
    console.log(i)
}








})