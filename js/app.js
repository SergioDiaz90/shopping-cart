// variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargaEventListeners();
function cargaEventListeners() {
	// Add course the card in the car
	listaCursos.addEventListener('click', agregarCurso);
	// Eliminar cursos
	carrito.addEventListener('click', eliminarCurso);
	// vaciar el carrito
	vaciarCarritoBtn.addEventListener('click', () => {
		articulosCarrito = [];
		limpiarHTML(); // eliminamos todo el html
	});
}

function agregarCurso(e) {
	e.preventDefault();
	if (e.target.classList.contains('agregar-carrito')) {
		const cursoSeleccionado = e.target.parentElement.parentElement;
		leerDatosCurso(cursoSeleccionado);
	}
}

// eliminar curso del carrito
function eliminarCurso (e) {
	if (e.target.classList.contains('borrar-curso')){
		const cursoId = e.target.getAttribute('data-id');
		console.log(cursoId);
		// elimina del arreglo 
		articulosCarrito = articulosCarrito.filter( cursos => cursos.id !== cursoId);
		console.log(articulosCarrito);

		// eliminar elementos e iterar sobre el nuevo articulo
		carritoHTML();
	}

}

//leer y extrarer info del curso
function leerDatosCurso(curso) {
	// crear un objeto con el contenido del curso
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1
	}

	// revisar si un elemento existe en el carrito
	const existe = articulosCarrito.some( curso => curso.id == infoCurso.id);
	if (existe) {
		//actualizamos la cantidad
		const cursos = articulosCarrito.map(curso => {
			if (curso.id == infoCurso.id) {
				curso.cantidad += 1;
				return curso; // obj actualizado
			} else { return curso; } // obj no duplicados
		});
		articulosCarrito = [...cursos];
	} else {
		//agregar elementos al arreglo del carrito
		articulosCarrito = [...articulosCarrito, infoCurso];
		console.log(articulosCarrito);
	}
	carritoHTML(infoCurso);
}

// muestra el carrito de compras en el html
function carritoHTML() {
	// Eliminar cursos del carrito
	limpiarHTML();
	// Guardar cursos en el carrito
	articulosCarrito.forEach((curso) => {
		const { imagen, titulo, precio, cantidad, id} = curso;
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src=${imagen} width="100">
			</td>
			<td>${titulo}</td>
			<td>${precio}</td>
			<td>${cantidad}</td>
			<td>
				<a href="#" class="borrar-curso" data-id="${id}"> X </a>
			</td>
		`
		contenedorCarrito.appendChild(row);
	});
}

function limpiarHTML () {
	//forma lenta
	// contenedorCarrito.innerHTML = '';
	while(contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}