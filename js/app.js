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

    // Elimina el curso del carrito en el DOM
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        // console.log('Click en vaciar carrito');
        articulosCarrito = []; // Reseteamos el arreglo.

        limpiarHTML(); // Eliminamos todo el HTML.
        console.log(articulosCarrito); // Muestra el arreglo vacío.
    })


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

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    // console.log('desde eleminar curso');
    // console.log(e.target.parentElement.classList); // Muestra todas las clases que tiene el elemento.
    if(e.target.parentElement.classList.contains('borrar-curso')) {
        // console.log(e.target.parentElement.getAttribute('data-id')); // Muestra el id del elemento.

        const cursoId = e.target.parentElement.getAttribute('data-id');

        // Elimina del arreglo el objeto con el mismo id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        // console.log(articulosCarrito); // Muestra el arreglo actualizado
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML.
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

    // Revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
// console.log(existe);
if(existe) {
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map(curso => {
        if(curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso; // retorna el objeto actualizado
        }else{
            return curso; // retorna los objetos que no son duplicados
        }
    });
    articulosCarrito = [...cursos]; // Reescribimos el arreglo, con los objetos actualizados.
}else{
    // Agrega el objeto al arreglo de articulosCarrito
    articulosCarrito = [...articulosCarrito, infoCurso];
}

    
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
