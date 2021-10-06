//1.FUNCIONES PARA LA TABLA CABIN
//se crea la funcion consultar que se le asigno al boton del html
function ConsultarCabin(){
    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:"GET",
        datatype:"JSON",
        //success es el resultado exitoso del metodo ajax
        success:function(respuesta){
            $("#resultado").empty();
            $("#detalle").empty();
            console.log(respuesta);
            mostrarCabin(respuesta.items);
            OcultarForm();
        } 
    });
}

function mostrarCabin(items){
    //creacion de una variable tipo tabla
    let myTable="<table>";
    let thead = "<thead>";
            thead += "<tr>";
            thead += "<th>" +"ID" + "</th>"
            thead += "<th>" + "NOMBRE CABAÑA" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTable+=thead;
        
    //funcion for para recorrer las columnas de la tabla CABIN
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
            myTable+="<td align=center>"+items[i].id+"</td>";
            myTable+="<td align=center>"+items[i].name+"</td>";
            myTable+="<td> <button onclick='Consultar1Cabin("+items[i].id+")'>Ver Detalles</button>";
            myTable+="<td> <button onclick='borrarCabin("+items[i].id+")'>Borrar</button>"; //Agregar boton borrar en js
        myTable+="</tr>";
    }
    myTable+="</table>";

    myTable+="</div id='detalle'></div>";
    $("#resultado").append(myTable); //"resultado" hace referencia al id del <div> creado en el html
}

function Consultar1Cabin(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin/"+idElemento,
        type:"GET",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaid){
            $("#detalle").empty();
            Cabin1=respuestaid;
            globalThis;
            let data={
                id:Cabin1.items[0].id,
                name:Cabin1.items[0].name,
                brand:Cabin1.items[0].brand,
                rooms:Cabin1.items[0].rooms,
            } 
            $("#resultado").empty();
            $("#detalle").empty();
            DetalleCabin(data)
            globalThis;
            OcultarForm();
        } 
    });
}

function DetalleCabin(data){
    console.log(data);
    let myTableD="<table>";
    let thead = "<thead>";
            thead += "<tr>";
            thead += "<th>" + "ID" + "</th>"
            thead += "<th>" + "NOMBRE" + "</th>"
            thead += "<th>" + "BRAND" + "</th>"
            thead += "<th>" + "N° HABITACIONES" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTableD+=thead;
    myTableD+="<tr>";
        myTableD+="<td align=center>"+data.id+"</td>";
        myTableD+="<td align=center>"+data.name+"</td>";
        myTableD+="<td align=center>"+data.brand+"</td>";
        myTableD+="<td align=center>"+data.rooms+"</td>";
        myTableD+="<td> <button onclick='ModifCabin()'>Editar</button>"; 
    myTableD+="</tr>";
    myTableD+="</table>";
    $("#detalle").append(myTableD); //"resultado" hace referencia al id del <div> creado en el html
    
}

function mostrarlabels(){
    document.getElementById("labid").removeAttribute("hidden");
    document.getElementById("labbrand").removeAttribute("hidden");
    document.getElementById("labrooms").removeAttribute("hidden");    
    document.getElementById("labcatid").removeAttribute("hidden");    
    document.getElementById("labname").removeAttribute("hidden");
}

function AgregarCabin(){
    $("#resultado").empty();
    $("#detalle").empty();
    mostrarlabels();
    document.getElementById("brand").removeAttribute("hidden");$("#brand").val("");
    document.getElementById("rooms").removeAttribute("hidden");$("#rooms").val("");
    document.getElementById("category_id").removeAttribute("hidden");$("category_id").val("");
    document.getElementById("name").removeAttribute("hidden");$("#name").val("");
    document.getElementById("BGCab").removeAttribute("hidden");
    document.getElementById("BECab").setAttribute("hidden", "true");
}

function ModifCabin(){
    $("#resultado").empty();
    $("#detalle").empty();
    mostrarlabels();
    document.getElementById("id").removeAttribute("hidden");
    $("#id").val(Cabin1.items[0].id);
    document.getElementById("id").setAttribute("disabled", "disabled");
    document.getElementById("brand").removeAttribute("hidden");
    $("#brand").val(Cabin1.items[0].brand);
    document.getElementById("rooms").removeAttribute("hidden");
    $("#rooms").val(Cabin1.items[0].rooms);
    document.getElementById("category_id").removeAttribute("hidden");
    $("#category_id").val(Cabin1.items[0].category_id);
    document.getElementById("name").removeAttribute("hidden");
    $("#name").val(Cabin1.items[0].name);
    document.getElementById("BECab").removeAttribute("hidden");
}

function OcultarForm(){
    document.getElementById("labid").setAttribute("hidden", "true");
    document.getElementById("labbrand").setAttribute("hidden", "true");    
    document.getElementById("labrooms").setAttribute("hidden", "true");    
    document.getElementById("labcatid").setAttribute("hidden", "true");    
    document.getElementById("labname").setAttribute("hidden", "true");
    document.getElementById("id").setAttribute("hidden", "true");
    document.getElementById("brand").setAttribute("hidden", "true");
    document.getElementById("rooms").setAttribute("hidden", "true");
    document.getElementById("category_id").setAttribute("hidden", "true");
    document.getElementById("name").setAttribute("hidden", "true");
    document.getElementById("BGCab").setAttribute("hidden", "true");
    document.getElementById("BECab").setAttribute("hidden", "true");
      
}

function guardarCabin(){
    let myData={
        brand:$("#brand").val(),
        rooms:$("#rooms").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("");
            ConsultarCabin();
            alert("se ha guardado el dato")
            OcultarForm();
        }
    });
}

function editarCabin(){
    let myData={
        id:$("#id").val(),
        brand:$("#brand").val(),
        rooms:$("#rooms").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#roooms").val("");
            $("#category_id").val("");
            $("#name").val("");
            ConsultarCabin();
            alert("se ha Actualizado");
            OcultarForm();
        }
    });
}

function borrarCabin(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#detalle").empty();
            ConsultarCabin();
            alert("Se ha Eliminado.")
        }
    });
}

//2.FUNCIONES PARA LA TABLA CLIENTE
function ConsultarClient(){
    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:"JSON",
        //success es el resultado exitoso del metodo ajax
        success:function(respuesta){
            $("#resultClient").empty();
            $("#detalleClient").empty();
            console.log(respuesta);
            mostrarClient(respuesta.items);
            OcultarFormClient();
        } 
    });
}

function mostrarClient(items){
    //creacion de una variable tipo tabla
    let myTable="<table>";
    let thead = "<thead>";
            thead += "<tr>";
            thead += "<th>" +"ID" + "</th>"
            thead += "<th>" + "NOMBRE" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTable+=thead;

    //funcion for para recorrer las columnas de la tabla CLIENT
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
            myTable+="<td align=left>"+items[i].id+"</td>";
            myTable+="<td align=center>"+items[i].name+"</td>";
            myTable+="<td> <button onclick='Consultar1Client("+items[i].id+")'>Ver Detalles</button>";
            myTable+="<td> <button onclick='borrarClient("+items[i].id+")'>Borrar</button>"; //Agregar boton borrar en js
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultClient").append(myTable); //"resultClient" hace referencia al id del <div> creado en el html
}

function Consultar1Client(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/"+idElemento,
        type:"GET",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaid){
            $("#detalle").empty();
            Client1=respuestaid;
            globalThis;
            let dataClient={
                id:Client1.items[0].id,
                name:Client1.items[0].name,
                email:Client1.items[0].email,
                age:Client1.items[0].age,
            } 
            $("#resultClient").empty();
            $("#detalleClient").empty();
            DetalleClient(dataClient)
            globalThis;
            OcultarFormClient();
        } 
    });
}

function DetalleClient(dataClient){
    console.log(dataClient);
    let myTableD="<table>";
    let thead = "<thead>";
            thead += "<tr>";
            thead += "<th>" + "ID" + "</th>"
            thead += "<th>" + "NOMBRE" + "</th>"
            thead += "<th>" + "EMAIL" + "</th>"
            thead += "<th>" + "EDAD" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTableD+=thead;
    myTableD+="<tr>";
        myTableD+="<td align=center>"+dataClient.id+"</td>";
        myTableD+="<td align=center>"+dataClient.name+"</td>";
        myTableD+="<td align=center>"+dataClient.email+"</td>";
        myTableD+="<td align=center>"+dataClient.age+"</td>";
        myTableD+="<td> <button onclick='ModifClient()'>Editar</button>"; 
    myTableD+="</tr>";
    myTableD+="</table>";
    $("#detalleClient").append(myTableD); //"resultado" hace referencia al id del <div> creado en el html
    
}

function mostrarlabelsC(){
    document.getElementById("labidC").removeAttribute("hidden");    
    document.getElementById("labnameC").removeAttribute("hidden");
    document.getElementById("labemail").removeAttribute("hidden");
    document.getElementById("labage").removeAttribute("hidden");   
}

function AgregarClient(){
    $("#resultadoClient").empty();
    $("#detalleClient").empty();
    mostrarlabelsC();
    document.getElementById("idC").removeAttribute("hidden");$("#idC").val("");
    document.getElementById("nameC").removeAttribute("hidden");$("#nameC").val("");
    document.getElementById("email").removeAttribute("hidden");$("email").val("");
    document.getElementById("age").removeAttribute("hidden");$("#age").val("");
    document.getElementById("BGCl").removeAttribute("hidden");
    document.getElementById("BECl").setAttribute("hidden", "true");
}

function ModifClient(){
    $("#resultadoClient").empty();
    $("#detalleClient").empty();
    mostrarlabelsC();
    document.getElementById("idC").removeAttribute("hidden");
    $("#idC").val(Client1.items[0].id);
    document.getElementById("idC").setAttribute("disabled", "disabled");
    document.getElementById("nameC").removeAttribute("hidden");
    $("#nameC").val(Client1.items[0].name);
    document.getElementById("email").removeAttribute("hidden");
    $("#email").val(Client1.items[0].email);
    document.getElementById("age").removeAttribute("hidden");
    $("#age").val(Client1.items[0].age);
    document.getElementById("BECl").removeAttribute("hidden");
}

function OcultarFormClient(){
    document.getElementById("labidC").setAttribute("hidden", "true");
    document.getElementById("labnameC").setAttribute("hidden", "true");
    document.getElementById("labemail").setAttribute("hidden", "true");
    document.getElementById("labage").setAttribute("hidden", "true");
    document.getElementById("idC").setAttribute("hidden", "true");
    document.getElementById("nameC").setAttribute("hidden", "true");
    document.getElementById("email").setAttribute("hidden", "true");
    document.getElementById("age").setAttribute("hidden", "true");
    document.getElementById("BGCl").setAttribute("hidden", "true");
    document.getElementById("BECl").setAttribute("hidden", "true");
}




function guardarClient(){
    let myData={
        id:$("#idC").val(),
        name:$("#nameC").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultClient").empty();
            $("#detalleClient").empty();
            $("#idC").val("");
            $("#nameC").val("");
            $("#email").val("");
            $("#age").val("");
            ConsultarClient();
            alert("se ha guardado el dato");
            OcultarFormClient();
        }
    });
}

function editarClient(){
    let myData={
        id:$("#idC").val(),
        name:$("#nameC").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultClient").empty();
            $("#idC").val("");
            $("#nameC").val("");
            $("#email").val("");
            $("#age").val("");
            ConsultarClient();
            alert("se ha Actualizado");
            OcultarFormClient();
        }
    });
}

function borrarClient(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultClient").empty();
            $("#detalleClient").empty();
            ConsultarClient();
            alert("Se ha Eliminado.")
        }
    });
}


//3.FUNCIONES PARA LA TABLA MESSAGE
function ConsultarMsg(){   
    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"GET",
        datatype:"JSON",
        //success es el resultado exitoso del metodo ajax
        success:function r(respuesta){
            $("#resultMsg").empty();
            console.log(respuesta);
            mostrarMsg(respuesta.items);
            x=respuesta.items.length;
            globalThis; //se usa para q x sea una variable global
            document.getElementById("msg").setAttribute("hidden", "true");
            document.getElementById("BGM").setAttribute("hidden", "true");
        } 
    });
    
}

function mostrarMsg(items){
    //creacion de una variable tipo tabla
    let myTable="<table>";
    let thead = "<thead>";
            thead += "<tr>";
            thead += "<th>" +"ID" + "</th>"
            thead += "<th>" + "MENSAJE" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTable+=thead;

    //funcion for para recorrer las columnas de la tabla MESSAGE
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
            myTable+="<td align=left>"+items[i].id+"</td>";
            myTable+="<td align=center>"+items[i].messagetext+"</td>";
            myTable+="<td> <button onclick='borrarMsg("+items[i].id+")'>Borrar</button>"; //Agregar boton borrar en js
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultMsg").append(myTable); //"resultMsg" hace referencia al id del <div> creado en el html
    
}


function guardarMsg(){
    ConsultarMsg();
    console.log(x);
    let myData={
        id:x+1, //x es el num de items actuales de la tabla
        messagetext:$("#msg").val(),
    };
    console.log($("#msg").val());
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultMsg").empty();
            $("#msg").val("");
            ConsultarMsg();
            document.getElementById("msg").setAttribute("hidden", "true");
            document.getElementById("BGM").setAttribute("hidden", "true");
            alert("se ha guardado el dato")
        }
    });
}

function borrarMsg(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g129b2236c30a40-cabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultMsg").empty();
            ConsultarMsg();
            alert("Se ha Eliminado.")
        }
    });
}

function AgregarMsg(){
    $("#resultMsg").empty();
    document.getElementById("msg").removeAttribute("hidden");$("#msg").val("");
    document.getElementById("BGM").removeAttribute("hidden");
}