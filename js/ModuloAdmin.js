function EscribirBienvenida(){
   document.getElementById("nombreuser").innerHTML = "Bienvenido Admin"
}

function GetUserData(){
    EscribirBienvenida()
    var user = {
        'userid': sessionStorage.getItem("ID_A_EDITAR")
    }
    fetch("https://ublog-202003585.herokuapp.com/ObtenerUsuario", {
         method: "POST",
         body: JSON.stringify(user),
         cache: "no-cache",
         headers: new Headers({
            "content-type": "application/json"
         })
      })
    .then(respuesta => respuesta.json())
          .catch(error => {
             console.error('Error:', error)
             alert("Ocurrio un error, ver la consola")
          })
        .then(respuestafinal =>{
            document.getElementById("name").value = respuestafinal.name
            document.getElementById("email").value = respuestafinal.email
            document.getElementById("username").value = respuestafinal.username
        })
}

function CargarPosts(){
contienearchivo = document.getElementById("upload")
   archivo = contienearchivo.files[0]
   var fr = new FileReader()
   fr.readAsText(archivo)
   fr.onload = function (){
   var contenidojson = fr.result
      var contenido = {
      "content":contenidojson
      }
    fetch("https://ublog-202003585.herokuapp.com/RecibirPosts",{
         method: "POST",
         body: JSON.stringify(contenido),
         cache: "no-cache",
         headers: new Headers({
            "content-type": "application/json",
         })
      })
        .then(respuesta => respuesta.json())
        .catch(error =>{
            alert("Algo malo paso, revise que su archivo subido sea correcto")
        })
        .then(respuestafinal => {
            if (respuestafinal.estado === "Success"){
                alert("Los posts fueron cargados con éxito")
            }

        })
   }



}

function CargarUsers(){
    contienearchivo = document.getElementById("upload")
   archivo = contienearchivo.files[0]
   var fr = new FileReader()
   fr.readAsText(archivo)
   fr.onload = function (){
   var contenidojson = fr.result
      var contenido = {
      "content":contenidojson
      }
    fetch("https://ublog-202003585.herokuapp.com/RecibirUsers",{
         method: "POST",
         body: JSON.stringify(contenido),
         cache: "no-cache",
         headers: new Headers({
            "content-type": "application/json",
         })
      })
         .then(respuesta => respuesta.json())
        .catch(error =>{
            alert("Algo malo paso, revise que su archivo subido sea correcto")
        })
        .then(respuestafinal => {
            if (respuestafinal.estado === "Success"){
                alert("Los usuarios fueron cargados con éxito")
            }

        })

   }


}

function DisplayTableUsers(){
    EscribirBienvenida()
    fetch("https://ublog-202003585.herokuapp.com/TablaUsuarios")
        .then(respuesta => respuesta.json())
        .catch(error => {
             console.error('Error:', error)
             alert("Ocurrio un error, ver la consola")
            })
        .then(respuestafinal =>{
            ArrayUsers = respuestafinal
            cadena = ""
            for (let i = 0; i <ArrayUsers.length ; i++) {
                cadenaposts=""
                posts_usuario = ArrayUsers[i].posts
                for (let j = 0; j <posts_usuario.length ; j++) {

                    if (posts_usuario[j].type === "images"){
                         cadenaposts =  cadenaposts + `<a target="_blank" href="${posts_usuario[j].url}"> Img_${posts_usuario[j].date}_${posts_usuario[j].category} </a>  <br>`
                    }
                    else {
                         cadenaposts =  cadenaposts +  `<a target="_blank" href="${posts_usuario[j].url}"> Vid_${posts_usuario[j].date}_${posts_usuario[j].category} </a>  <br>`
                    }

                }



                subcadena=`<tr>
            <th scope="row">${ArrayUsers[i].id}</th>
            <td>${ArrayUsers[i].name}</td>
            <td>${ArrayUsers[i].gender}</td>
            <td>${ArrayUsers[i].email}</td>
            <td>${ArrayUsers[i].username}</td>
            <td>${ArrayUsers[i].password}</td>
            <td>${ArrayUsers[i].cantidad_posts}</td>
            <td>${cadenaposts}</td>
            <td>
            
            <button type="button" value="${ArrayUsers[i].username}" class="btn btn-primary" id="View${ArrayUsers[i].id}" onclick="RedirectViewUser(this.id)">Ver</button>
            <button type="button" class="btn btn-success" id="Edit${ArrayUsers[i].id}" onclick="RedirectEditUser(this.id)">Editar</button>
            <button type="button" class="btn btn-danger"  id="Delete${ArrayUsers[i].id}" onclick="DeleteUser(this.id)">Eliminar</button>
              
            </td>
          </tr>
`
                cadena = cadena + subcadena
            }
             document.getElementById("CuerpoTabla").innerHTML = cadena
             PieGraph()

        })
}

function DisplayTablePosts(){
     EscribirBienvenida()
     fetch("https://ublog-202003585.herokuapp.com/VerPosts")
        .then(respuesta => respuesta.json())
        .catch(error => {
             console.error('Error:', error)
             alert("Ocurrio un error, ver la consola")
            })
        .then(respuestafinal =>{
            ArrayPosts = respuestafinal
            console.log(ArrayPosts)
             cadena = ""
            for (let i = 0; i <ArrayPosts.length ; i++) {
                subcadena=`<tr>
            <th scope="row">${ArrayPosts[i].id}</th>
            <td>${ArrayPosts[i].type}</td>
            <td>${ArrayPosts[i].date}</td>
            <td>${ArrayPosts[i].category}</td>
            <td>${ArrayPosts[i].likes}</td>
            <td>${ArrayPosts[i].author}</td>
            <td><a href="${ArrayPosts[i].url}"> Enlace</a></td>
            <td>
            
            <button type="button" class="btn btn-primary" id="View${ArrayPosts[i].id}" onclick="RedirectViewPost(this.id)">Ver</button>
            <button type="button" class="btn btn-success" id="Edit${ArrayPosts[i].id}" onclick="RedirectEditPost(this.id)">Editar</button>
            <button type="button" class="btn btn-danger"  id="Delete${ArrayPosts[i].id}" onclick="DeletePost(this.id)">Eliminar</button>
              
            </td>
          </tr>
`
                cadena = cadena + subcadena
            }
             document.getElementById("CuerpoTabla").innerHTML = cadena
            BarGraph()

        })
}

function DeleteUser(idboton){
    var resultado = confirm("¿Desea eliminar a este usuario?")
    if (resultado){
      var id = parseInt(idboton.replace("Delete", ""))
    fetch(`https://ublog-202003585.herokuapp.com/DeleteUser/${id}`, {
         method: "DELETE",
         cache: "no-cache",
      })
    .then(respuesta => respuesta.json())
    .catch(error => {
             console.error('Error:', error)
             alert("Ocurrio un error, ver la consola")
            })
    .then(respuestafinal =>{
        if (respuestafinal.estado === "exito"){
            alert("Usuario eliminado")
             window.location.reload()
        }

    })
    }


}

function RedirectEditUser(idboton){
    var id = parseInt(idboton.replace("Edit", ""))
    console.log("el id del user a editar es: "+ id)
    sessionStorage.setItem("ID_A_EDITAR", id)
    location.href = "ModificarUserAdmin.html"
}

function EditUser(){
   var name = document.getElementById("name").value
   var gender = document.getElementById("gender").value
   var username = document.getElementById("username").value
   var email = document.getElementById("email").value
   var password = document.getElementById("password").value
   var password2 = document.getElementById("password2").value
   if (name !== "" && username !== "" && password===password2 && username !=="admin" && username!=="" && email!=="" && password!=="") {
      var Actualizar = {
         'name': name,
         'gender': gender,
         'username': username,
         'email': email,
         'password': password,
         'id': sessionStorage.getItem("ID_A_EDITAR")
      }
      console.log(Actualizar)
      fetch(`https://ublog-202003585.herokuapp.com/ModificaUserAdmin/${sessionStorage.getItem("ID_A_EDITAR")}` ,{
         method: "PUT",
         body: JSON.stringify(Actualizar),
         cache: "no-cache",
         headers: new Headers({
            "content-type": "application/json"
         })
      })
          .then(respuesta => respuesta.json())
          .catch(error => {
              console.error('Error:', error)
              alert("Ocurrio un error, ver la consola")
          })
          .then(respuestafinal=>{
             if (respuestafinal.estado === "Success"){
                alert("Sus datos han sido modificados exitosamente")
                location.href = "VisualizarUsuarios.html"
             }
             else if (respuestafinal.estado === "Fallo"){
                alert("Revise la contraseña. Recuerde que debe de tener 8 caracteres como minimo, letras mayúsculas y minúsculas y un símbolo especial(\"@#$%^&*()-+?_=,<>/\"\" \") ")
             }
             else if(respuestafinal.estado ==="repetido"){
                alert("El nombre de usuario o email que usted ingresó ya se encuentra registrado")
             }
             else if(respuestafinal.estado ==="invalid"){
                alert("Ingrese un email válido")

             }
          })
   }
   else {
      alert("Llene todos los campos")
   }
}

function RedirectViewUser(idboton){

    var id = parseInt(idboton.replace("View", ""))
    sessionStorage.setItem("ID_A_EDITAR", id)
    sessionStorage.setItem("ID_BOTON", document.getElementById(idboton).value)
    location.href = "VisualizaUserAdmin.html"
}

function PostsDelUsuario(){
     var username = sessionStorage.getItem("ID_BOTON")
       var user = {
        'usernameauthor': username
    }

         fetch("https://ublog-202003585.herokuapp.com/MisPosts", {
         method: "POST",
         body: JSON.stringify(user),
         cache: "no-cache",
         headers: new Headers({
            "content-type": "application/json"
         })
      })
          .then(respuesta => respuesta.json())
          .catch(error => {
             console.error('Error:', error)
             alert("Ocurrio un error, ver la consola")
          })
          .then(respuestafinal => {
              ArrayPosts = respuestafinal
              cadena = ""
              for (let i = 0; i <ArrayPosts.length ; i++) {
                  subcadena = ""
                  if (ArrayPosts[i].type ==="videos"){
                      console.log(i)
                      subcadena = `<div class="col">
                   <div class="card">
                      <iframe width="420" height="235" src="${ArrayPosts[i].url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                   </div>
                          <div class="card shadow-sm">
                            <div class="card-body">
                              <p class="card-text">
                                  Autor: ${ArrayPosts[i].author}
                                  <br>
                                  Categoria: ${ArrayPosts[i].category}
                                  <br>
                                  Cantidad de likes: ${ArrayPosts[i].likes}
                                  <br>
                                  Posición:  ${ArrayPosts[i].posicion}

                              </p>
                               <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                  

                    </div>
                <small class="text-muted">${ArrayPosts[i].date}</small>
              </div>
            </div>
          </div>
        </div>`
                      cadena = cadena +subcadena
                  }
                  else {
                      subcadena = `<div class="col">
                   <div class="card">
                       <img
                          src=${ArrayPosts[i].url}
                          class="card-img-top"
                          alt="..."
                          width="420"
                          height="235"
                       />
          </div>
          <div class="card shadow-sm">
            <div class="card-body">
                  <p class="card-text">
                                  Autor: ${ArrayPosts[i].author}
                                  <br>
                                  Categoria:${ArrayPosts[i].category}
                                  <br>
                                  Cantidad de likes: ${ArrayPosts[i].likes}
                                   <br>
                                   Posición:  ${ArrayPosts[i].posicion}

                              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                </div>
                <small class="text-muted">${ArrayPosts[i].date}</small>
              </div>
            </div>
          </div>
        </div>`
                       cadena = cadena +subcadena
                  }
              }
               document.getElementById("row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3").innerHTML = cadena
          })

}

function DatosUser(){
    var user = {
        'userid': sessionStorage.getItem("ID_A_EDITAR")
    }
    fetch("https://ublog-202003585.herokuapp.com/ObtenerUsuario", {
         method: "POST",
         body: JSON.stringify(user),
         cache: "no-cache",
         headers: new Headers({
            "content-type": "application/json"
         })
      })
    .then(respuesta => respuesta.json())
          .catch(error => {
             console.error('Error:', error)
             alert("Ocurrio un error, ver la consola")
          })
        .then(respuestafinal =>{
            document.getElementById("ID").innerHTML = "ID: " + respuestafinal.id
            document.getElementById("NAME").innerHTML = "Name: " + respuestafinal.name
            document.getElementById("GENDER").innerHTML = "Gender: " + respuestafinal.gender
            document.getElementById("EMAIL").innerHTML = "Email:" + respuestafinal.email
            document.getElementById("USERNAME").innerHTML = "Username: " + respuestafinal.username
            document.getElementById("CANTPOSTS").innerHTML = "Num posts: " + respuestafinal.cant_posts
            document.getElementById("PASSWORD").innerHTML = "Password: " + respuestafinal.password



        })
}

function DisplayPostsUser(){
    EscribirBienvenida()
    PostsDelUsuario()
    DatosUser()

}

function DeletePost(idboton){
     var resultado = confirm("¿Desea eliminar este post?")
    if (resultado){
      var id = parseInt(idboton.replace("Delete", ""))
    fetch(`https://ublog-202003585.herokuapp.com/DeletePost/${id}`, {
         method: "DELETE",
         cache: "no-cache",
      })
    .then(respuesta => respuesta.json())
    .catch(error => {
             console.error('Error:', error)
             alert("Ocurrio un error, ver la consola")
            })
    .then(respuestafinal =>{
        if (respuestafinal.estado === "exito"){
            alert("Post eliminado")
             window.location.reload()
        }

    })
    }


}

function RedirectEditPost(idboton){
    var id = parseInt(idboton.replace("Edit", ""))
    console.log("el id del post a editar es: "+ id)
    sessionStorage.setItem("ID_A_EDITAR", id)
    location.href = "EditPost.html"
}

function EditPost(){
    id = sessionStorage.getItem("ID_A_EDITAR")
    var type = document.getElementById("type").value
    var url = document.getElementById("url").value
    var category = document.getElementById("category").value
    var author = document.getElementById("author").value
    var date = (document.getElementById("date").value).replace("T", "  ")
    var datefinal = date.replace("-", "/")
    var datefinal2 = datefinal.replace("-", "/")
    var cadena = datefinal2.split(" ")
    var datos_fecha = cadena[0].split("/")
    var fechaoficial = datos_fecha[2] + datos_fecha[1] + datos_fecha[0] + cadena[1]
    var Actualizar = {
        'type': type,
        'url': url,
        'category': category,
        'author': author,
        'date': fechaoficial
    }
    if (category!=="" && author!=="" && date!=="" ){
        fetch(`https://ublog-202003585.herokuapp.com/EditPost/${id}` ,{
         method: "PUT",
         body: JSON.stringify(Actualizar),
         cache: "no-cache",
         headers: new Headers({
            "content-type": "application/json"
         })
      })
          .then(respuesta => respuesta.json())
          .catch(error => {
              console.error('Error:', error)
              alert("Por favor revisa el enlace que has ingresado")
          })
            .then(respuestafinal =>{
                if (respuestafinal.estado === "exito"){
                    alert("Datos modificados exitosamente")
                    location.href = "VisualizarPosts.html"
                }
                else if (respuestafinal.estado ==="NonExistent") {
                    alert("EL usuario al que desea asignarle el post no existe")
                }
                else if (respuestafinal.estado ==="invalid"){
                    alert("Revise que el link sea válido")
                }
            })
    }
    else {
        alert("Por favor asegurese de haber llenado todos los campos y de que su url sea válida")
    }
}

function RedirectViewPost(idboton){
     var id = parseInt(idboton.replace("View", ""))
    sessionStorage.setItem("ID_A_EDITAR", id)
    location.href = "VisualizaPostAdmin.html"
}

function PieGraph(){
fetch("https://ublog-202003585.herokuapp.com/TopUsers")
    .then(respuesta => respuesta.json())
    .catch(Error =>{
        alert("Algo malo ha sucedido")
    })
    .then(respuestafinal =>{
       if (respuestafinal.data === "NoData"){

       }
       else{
           console.log(respuestafinal.data)
           datos = respuestafinal.data
           var migrafica = document.getElementById("GraficaBarras").getContext('2d')
           var barchart = new Chart(migrafica,{
               type: 'pie',
               data:{
                   labels: [datos[0].username,datos[1].username, datos[2].username, datos[3].username, datos[4].username],
                   datasets: [{
                       label: 'Cantidad de posts',
                       data:  [datos[0].CanPosts,datos[1].CanPosts, datos[2].CanPosts, datos[3].CanPosts, datos[4].CanPosts],
                       backgroundColor:['blue', 'red', 'green', 'yellow', 'purple']
                   }]
               },
               options: {
               responsive: true,
               plugins: {
                legend: {
                position: 'top',
                },
              title: {
              display: true,
              text: 'Top 5 usuarios con más posts'
                    }
                 }
               }
           })
       }
    })
}

function BarGraph(){
fetch("https://ublog-202003585.herokuapp.com/TopPosts")
    .then(respuesta => respuesta.json())
    .catch(Error =>{
        alert("Algo malo ha sucedido")
    })
    .then(respuestafinal =>{
       if (respuestafinal.data === "NoData"){

       }
       else{
           console.log(respuestafinal.data)
           datos = respuestafinal.data
           var migrafica = document.getElementById("GraficaBarras").getContext('2d')
           var barchart = new Chart(migrafica,{
               type: 'bar',
               data:{
                   labels: ["Post id: " + datos[0].id ,
                       "Post id: " + datos[1].id,
                       "Post id: " + datos[2].id,
                       "Post id: " + datos[3].id,
                       "Post id: " + datos[4].id],
                   datasets: [{
                       label: 'Likes',
                       data:  [datos[0].likes,datos[1].likes, datos[2].likes, datos[3].likes, datos[4].likes],
                       backgroundColor:['blue', 'red', 'green', 'yellow', 'purple']
                   }]
               },
               options: {
               responsive: true,
               plugins: {
                legend: {
                position: 'top',
                },
              title: {
              display: true,
              text: 'Top 5 posts con más likes'
                    }
                 }
               }
           })
       }
    })
}

function ObtenerDatosPost(){
    id = sessionStorage.getItem("ID_A_EDITAR")
    fetch(`https://ublog-202003585.herokuapp.com/InfoPost/${id}`)
        .then(respuesta => respuesta.json())
        .catch(error => {
            alert("Un error ha sucedido, revise la consola")
        })
        .then(respuestafinal =>{
            console.log(respuestafinal)
            document.getElementById("ID").innerHTML = "ID: " + respuestafinal.id
            document.getElementById("AUTHOR").innerHTML ="Author: " + respuestafinal.author
            document.getElementById("CATEGORY").innerHTML = "Category: " + respuestafinal.category
            document.getElementById("DATE").innerHTML = "Date: " + respuestafinal.date
            document.getElementById("TYPE").innerHTML = "Type: " + respuestafinal.type
             document.getElementById("LIKES").innerHTML = "Likes : " + respuestafinal.Likes
             document.getElementById("URL").innerHTML = "Url: "  + `<a href="${respuestafinal.url}"> Link</a></h2>`
            if (respuestafinal.type === "images"){
                 document.getElementById("multimediaa").innerHTML = `<img src="${respuestafinal.url}"  width="900" height="500">`
            }
            else {
                document.getElementById("multimediaa").innerHTML = `<iframe width="900" height="500" src="${respuestafinal.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            }



        })
}

function GetPostData(){
    EscribirBienvenida()
    id = sessionStorage.getItem("ID_A_EDITAR")
    fetch(`https://ublog-202003585.herokuapp.com/InfoPost/${id}`)
        .then(respuesta => respuesta.json())
        .catch(error => {
            alert("Un error ha sucedido, revise la consola")
        })
        .then(respuestafinal =>{
            console.log(respuestafinal)
            document.getElementById("url").value = respuestafinal.url
            document.getElementById("author").value = respuestafinal.author
            document.getElementById("category").value = respuestafinal.category
            document.getElementById("date").value =  respuestafinal.date
        })
}

function GeneratePDF(){


    var ctxbar = document.getElementById("GraficaBarras")
    let imgcanvas = ctxbar.toDataURL("image/png", 1.0);


    var doc = new jsPDF('landscape')
    doc.text("REPORTE USUARIOS", 120, 20)
    doc.addImage(imgcanvas, 'JPEG', 60, 25, 180, 180)


    var datos = doc.autoTableHtmlToJson(document.getElementById("tablita"))
    var columns = [datos.columns[0], datos.columns[1], datos.columns[2], datos.columns[3], datos.columns[4], datos.columns[5], datos.columns[6]]
    doc.addPage()
    doc.text("LISTA USUARIOS", 120, 20)
    doc.autoTable(columns, datos.data, {startY: 40});


    doc.save("Reporte_Usuarios")
}

function GeneratePDF2(){


    var ctxbar = document.getElementById("GraficaBarras")
    let imgcanvas = ctxbar.toDataURL("image/png", 1.0);


    var doc = new jsPDF('landscape')
    doc.text("REPORTE POSTS", 120, 20)
    doc.addImage(imgcanvas, 'JPEG', 5, 25, 260, 150)


    var datos = doc.autoTableHtmlToJson(document.getElementById("tablita"))
    var columns = [datos.columns[0], datos.columns[1], datos.columns[2], datos.columns[3], datos.columns[4], datos.columns[5]]
    doc.addPage()
    doc.text("LISTA POSTS", 120, 20)
    doc.autoTable(columns, datos.data, {startY: 40});


    doc.save("Reporte_Posts")
}

