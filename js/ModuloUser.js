var Username_Logueado
var id_logueado




function CrearUsuario(){
   var name = document.getElementById("name").value
   var gender = document.getElementById("gender").value
   var username = document.getElementById("username").value
   var email = document.getElementById("email").value
   var password = document.getElementById("password").value
   var password2 = document.getElementById("password2").value
   if (name !== "" && username !== "" && password===password2 && username !=="admin" && username!=="" && email!=="" && password!=="") {
      var NuevoUser = {
         'name': name,
         'gender': gender,
         'username': username,
         'email': email,
         'password': password
      }
      console.log(NuevoUser)
      fetch("https://ublog-202003585.herokuapp.com/Crear_Usuario", {
         method: "POST",
         cache: "no-cache",
         body: JSON.stringify(NuevoUser),
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
             if (respuestafinal.estado === "exito"){
                alert("Bienvenido a ublog: " + username + " ya puedes iniciar sesión con tu cuenta")
                 location.href = "login.html"
             }
             else if (respuestafinal.estado ==="repetido"){
                alert("El nombre de usuario o correo que ingresó ya se encuentra registrado")
             }
             else if (respuestafinal.estado ==="fallo"){
                alert("Por favor revise la contraseña ingresada, esta debe de contener 8 caracteres minimo, una mayúscula, una minúscula, un número y un caracter especial(@#$%^&*()-+?_=,<>/\"\")")
             }
             else if(respuestafinal.estado ==="invalid"){
                alert("Ingrese un email válido")

             }
          })
   }
   else {
      alert("Llene todos los campos y asegurese de haber ingresado bien la contraseña dos veces")
   }
}

function Login(){
   var username = document.getElementById("username").value
   var password = document.getElementById("password").value
   console.log(username)
   console.log(password)
   if (username === "" || password ==="" ){
      alert("Llene todos los campos")
   }
   else {
      var user = {
         'username':username,
         'password': password
      }
      console.log(user)


      fetch("https://ublog-202003585.herokuapp.com/LoginUser",{
         method: "POST",
         body: JSON.stringify(user),
         cache: "no-cache",
         headers: new Headers({
            "content-type": "application/json",
         })
      })
          .then(async respuesta => await respuesta.json())
          .catch(error =>{
             console.error('Error:', error)
             alert("Ocurrio un error, ver la consola")

          })
          .then(respuestafinal => {
             if (respuestafinal.user==="admin"){
                 alert("Bienvenido admin")
                 Username_Logueado = "admin"
                 id_logueado = respuestafinal.id
                 sessionStorage.setItem("USER", respuestafinal.user)
                 sessionStorage.setItem("ID", 0)
                 location.href = "ModuloAdmin.html"
             }
             else if (respuestafinal.user===username ){
                Username_Logueado = username
                id_logueado = respuestafinal.id
                sessionStorage.setItem("ID", respuestafinal.id)
                sessionStorage.setItem("USER", respuestafinal.user)
                alert("Bienvenido: " + Username_Logueado)
                location.href = "Muro.html"

             }
              else if (respuestafinal.user==="null"){
                alert("No se ha encontrado ningún usuario")
             }
          })
   }



}

function ModificarUsuario(){
   var name = document.getElementById("name").value
   var gender = document.getElementById("gender").value
   var username = document.getElementById("username").value
   var email = document.getElementById("email").value
   var password = document.getElementById("password").value
   var password2 = document.getElementById("password2").value
   console.log("el id actual es:  " + sessionStorage.getItem("ID"))
   if (name !== "" && username !== "" && password===password2 && username !=="admin" && username!=="" && email!=="" && password!=="") {
      var Actualizar = {
         'name': name,
         'gender': gender,
         'username': username,
         'email': email,
         'password': password,
         'id': sessionStorage.getItem("ID"),
          'oldusername': sessionStorage.getItem("USER")
      }
      console.log(Actualizar)
      fetch("https://ublog-202003585.herokuapp.com/ModificaUser" ,{
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
                sessionStorage.setItem("USER", username)
                location.href = "Muro.html"
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

function CrearPost() {
   var type = document.getElementById("type").value
   var url = document.getElementById("url").value
   var category = document.getElementById("category").value
   var NuevoPost = {
      'type': type,
      'url': url,
      'category': category,
      'author': sessionStorage.getItem("USER")
   }
   console.log(NuevoPost)
   if (type !== "" && category !== "") {
         fetch("https://ublog-202003585.herokuapp.com/CreaPost", {
         method: "POST",
         body: JSON.stringify(NuevoPost),
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
          .then(respuestafinal => {
             if (respuestafinal.estado === "Success") {
                alert("Post agregado correctamente")
                  window.location.reload()
             }
             else {
                alert("Revise que la url ingresada sea válida")
             }
          })
   } else {
      alert("Por favor llena todos los campos y asegurate de que hayas ingresado una url válida")
   }

}


function EscribirBienvenida(){
   document.getElementById("nombreuser").innerHTML = "Bienvenido: " + sessionStorage.getItem("USER").toString()
}




function Like(idboton){
    idpost = parseInt(idboton)
    var like = {
        'idauthor': sessionStorage.getItem("ID"),
        'idpost': idpost
    }
    fetch("https://ublog-202003585.herokuapp.com/DarLike", {
         method: "POST",
         body: JSON.stringify(like),
         cache: "no-cache",
         headers: new Headers({
            "content-type": "application/json"
         })
      })
     window.location.reload()
}

function DisplayPosts(){
      fetch("https://ublog-202003585.herokuapp.com/VerPosts")
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

                              </p>
                               <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                   <form>
                                        <button  onclick="Like(this.id)" name="like" type="button" class="btn btn-sm btn-outline-secondary" id = ${ArrayPosts[i].id} value=${ArrayPosts[i].id}>Like</button>
                                    </form>

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

                              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <form>
                     <button onclick="Like(this.id)"  name="like" type="button" class="btn btn-sm btn-outline-secondary" id = ${ArrayPosts[i].id} value=${ArrayPosts[i].id}>Like</button>
                 </form>
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

function DisplayRanking(){
     fetch("https://ublog-202003585.herokuapp.com/Ranking")
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
                                  Posición: ${i+1}

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
                                  Posición: ${i+1}

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


function DisplayMyPosts(){
    var user = {
        'usernameauthor': sessionStorage.getItem("USER")
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

function InicializarMuro(){
    EscribirBienvenida()
    DisplayPosts()
}

function InicializarRanking(){
     EscribirBienvenida()
     DisplayRanking()
}

function InicializarMisPosts(){
    EscribirBienvenida()
    DisplayMyPosts()
}

function GetUserData(){
    EscribirBienvenida()
    var user = {
        'userid': sessionStorage.getItem("ID")
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
