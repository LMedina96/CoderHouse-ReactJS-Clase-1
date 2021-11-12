var cleanForm = () =>{
    document.getElementById("idName").value = "";
    document.getElementById("idContact").value = "";
    document.getElementById("idComentary").value = "";
}

document.addEventListener("submit", (e) =>{

    e.preventDefault();

    let name = document.getElementById("idName").value;
    let email = document.getElementById("idContact").value;
    let commentary = document.getElementById("idComentary").value;

    if (name != '' && email != '' && commentary != ''){
        var newDiv = document.createElement("div");
        newDiv.innerHTML = 
        `<fieldset class='forum'>
            <p>Usuario: ${name}</p>
            <p>Email: ${email}</p>
            <p>Mensaje: </p>
            <p>${commentary}</p>
        </fieldset>`
    
        document.body.appendChild(newDiv);
    
        cleanForm();
    }else{
        alert("Por favor llena todos los campos");
    }
})