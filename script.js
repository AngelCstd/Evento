let div_anuncio = document.getElementById("anuncio_mostrar")
let h1_anuncio = document.getElementById("title_anuncio")
let p_anuncio = document.getElementById("p_anuncio")
document.getElementById('eventForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    let formData = {};

    if (document.getElementById('anuncio').value == "otro" && !document.querySelector("#anuncio_otro")) {
        let divProvisional = document.querySelector("#provisional")
        // Crear el elemento label
        const label = document.createElement('label');
        label.setAttribute('for', 'anuncio_otro');
        label.textContent = 'Describe como te enteraste del anuncio:';

        // Crear el elemento input
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'anuncio_otro';
        input.name = 'anuncio_otro';
        input.className = 'provicional';
        input.required = true;

        // Añadir los elementos al DOM
        divProvisional.appendChild(label);
        divProvisional.appendChild(input);
        input.focus()

    } else if (document.getElementById('anuncio').value == "otro" && document.querySelector("#anuncio_otro").value == "") {
        document.querySelector("#anuncio_otro").focus()
    } else if (document.getElementById('anuncio').value != "otro") {
        formData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            codigo_postal: document.getElementById('codigo_postal').value,
            ciudad: document.getElementById('ciudad').value,
            anuncio: document.getElementById('anuncio').value,
            anuncio_otro: "",
            objetivo: document.getElementById('objetivo').value,
            dia: document.getElementById('dia').value
        };
        await enviarDatos(formData)
    } else if (document.getElementById('anuncio').value == "otro" && document.querySelector("#anuncio_otro").value != "") {
        formData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            codigo_postal: document.getElementById('codigo_postal').value,
            ciudad: document.getElementById('ciudad').value,
            anuncio: document.getElementById('anuncio').value,
            anuncio_otro: document.getElementById("anuncio_otro").value,
            objetivo: document.getElementById('objetivo').value,
            dia: document.getElementById('dia').value
        };
        await enviarDatos(formData)
    }
});

async function enviarDatos(formData) {
    try {
        const data = await fetch('https://backexp-angelcstds-projects.vercel.app/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json());
        if (data.ok) {
            p_anuncio.innerHTML = "Te haremos llegar un correo con tu folio <strong>dentro de las proximas 24 horas </strong> por favor <strong>contactanos por las redes sociales en caso de que no te llegue el correo</strong> y te daremos pronta respuesta"
            h1_anuncio.innerHTML = "Tu registro se realizo con exito"
            div_anuncio.style.display = "block"
        }
        if (!data.ok){
            p_anuncio.innerHTML = `<strong class="error">${data.message}</strong>`
            h1_anuncio.innerHTML = `${data.error}`
            div_anuncio.style.display = "block"
            throw new Error(data.message)
        }

    } catch (error) {
        console.log(error)
    }
}
document.getElementById("aceptar_anuncio").addEventListener("click", () => {
    div_anuncio.style.display = "none"
})