const catalogoKey = "catalogo";
let catalogo = cargarCatalogoDesdeLocalStorage() || [];

function cargarCatalogoDesdeLocalStorage() {
    const catalogoGuardado = localStorage.getItem(catalogoKey);
    return catalogoGuardado ? JSON.parse(catalogoGuardado) : [];
}

function guardarCatalogoEnLocalStorage() {
    localStorage.setItem(catalogoKey, JSON.stringify(catalogo));
}

function mostrarFormulario() {
    document.getElementById("formulario").style.display = "block";
}

function agregarProducto() {
    mostrarFormulario();
}

document.getElementById("agregar").addEventListener("click", agregarProducto);

document.getElementById("guardar").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const descripcion = document.getElementById("descripcion").value;
    const talla = document.getElementById("talla").value;
    const colores = document.getElementById("colores").value.split(",");

    if (nombre && !isNaN(precio) && precio > 0 && descripcion && talla) {
        catalogo.push({ nombre, precio, descripcion, talla, colores });
        guardarCatalogoEnLocalStorage();
        actualizarCatalogo();
        document.getElementById("formulario").style.display = "none";

        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("talla").value = "";
        document.getElementById("colores").value = "";
        alert("Los productos han sido agregados con éxito.")
    } else {
        alert("Por favor, ingresa valores válidos para el producto.");
    }
});
function buscarPorColor(colorBuscado) {
  return catalogo.filter(producto => producto.colores.includes(colorBuscado));
}

function filtrarPorColor(coloresFiltrados) {
  return catalogo.filter(producto => coloresFiltrados.some(color => producto.colores.includes(color)));
}

function mostrarMenu() {
  let continuarMenu = true;
  const opciones = {
    "1": () => {
      const colorBuscado = prompt("Ingresa el color que deseas buscar:");
      const productosConColor = buscarPorColor(colorBuscado);
      mostrarProductosEnAlert(productosConColor, `Productos con el color ${colorBuscado}:`);
    },
    "2": () => {
      const coloresFiltrados = prompt("Ingresa los colores que deseas filtrar (separados por comas):").split(",");
      if (coloresFiltrados.length === 0) {
        alert("Por favor, ingresa al menos un color para filtrar.");
      } else {
        const productosFiltradosPorColor = filtrarPorColor(coloresFiltrados);
        mostrarProductosEnAlert(productosFiltradosPorColor, "Productos con los colores filtrados:");
      }
    },
    "3": () => {
      continuarMenu = false;
    },
    "default": () => {
      alert("Por favor, ingresa una opción válida.");
    },
  };
  while (continuarMenu) {
    const opcion = prompt("¿Qué deseas hacer?\n1. Buscar producto por color\n2. Filtrar productos por color\n3. Salir");
    const accion = opciones[opcion] || opciones["default"];
    accion();
  }
}

function mostrarProductosEnAlert(productos, mensaje) {
  const nombresProductos = productos.map(producto => producto.nombre).join(", ");
  const mensajeMostrar = productos.length > 0 ? `${mensaje}\n${nombresProductos}` : `No se encontraron productos con los criterios de búsqueda.`;
  alert(mensajeMostrar);
}


function actualizarCatalogo() {
    const listaCatalogo = document.getElementById("catalogo");
    listaCatalogo.innerHTML = "";
    for (const producto of catalogo) {
        const li = document.createElement("li");
        li.innerHTML = `<b>${producto.nombre}</b> - $${producto.precio.toFixed(2)}<br>${producto.descripcion}<br>Talla: ${producto.talla}<br>Colores disponibles: ${producto.colores.join(", ")}`;
        listaCatalogo.appendChild(li);
        
    }

}

cargarCatalogoDesdeLocalStorage();
actualizarCatalogo();

document.getElementById("mostrarMenu").addEventListener("click", mostrarMenu);
