// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


// Eventos
cargarEventListener();
function cargarEventListener() {
    // Cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);}


// Funciones    
function agregarCurso(e) {  
    e.preventDefault();
    // Verificar que se haga click en el botón. 
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement; // Acceder al elemento padre de la tarjeta.
        leerDatosCurso(cursoSeleccionado);
        // console.log(info);
    }
}

// Leer el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Agrega el objeto al arreglo de articulosCarrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    //articulosCarrito.push(infoCurso); Alternativa
    console.log(articulosCarrito);
    // return infoCurso;
    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>
            ${curso.titulo}
        </td>
        <td>
            ${curso.precio}
        </td>
        <td>
            ${curso.cantidad}
        </td>
        <td>
            <a href="#" class='borrar-curso' data-id="${curso.id}"><i class="fas fa-trash-alt"></i></a>
        </td>
        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Eliminar los cursos de tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma rapida, recomendada.
    while(contenedorCarrito.firstChild) // Mientras exista un hijo, lo elimina. 
    {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild); // Elimina el primer hijo.
    }
}
