let catalogo = [];

function agregarProducto() {
  let agregarOtro = true;

  while (agregarOtro) {
    let nombre = prompt("Ingresa el nombre del producto:");
    let precio = Number(prompt("Ingresa el precio del producto:"));
    let descripcion = prompt("Ingresa la descripción del producto:");
    let talla = prompt("Ingresa la talla del producto:");
    let colores = prompt("Ingresa los colores disponibles del producto (separados por comas):").split(",");

    if (nombre === "" || isNaN(precio) || precio <= 0 || descripcion === "" || talla === "") {
      alert("Por favor, ingresa valores válidos para el producto.");
    } else {
      let producto = {
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        talla: talla,
        colores: colores
      };

      catalogo.push(producto);

      agregarOtro = confirm("¿Deseas agregar otro producto al catálogo?");
    }
  }

  actualizarCatalogo();
  alert("Los productos han sido agregados con éxito.");
}

function buscarPorColor(colorBuscado) {
  return catalogo.filter(producto => producto.colores.includes(colorBuscado));
}

function filtrarPorColor(coloresFiltrados) {
  return catalogo.filter(producto => producto.colores.some(color => coloresFiltrados.includes(color)));
}

function mostrarMenu() {
  let continuar = true;

  while (continuar) {
    let opcion = prompt("¿Qué deseas hacer?\n1. Buscar producto por color\n2. Filtrar productos por color\n3. Salir");

    switch (opcion) {
      case "1":
        let colorBuscado = prompt("Ingresa el color que deseas buscar:");
        let productosConColor = buscarPorColor(colorBuscado);

        if (productosConColor.length > 0) {
          alert("Productos con el color " + colorBuscado + ":\n" + productosConColor.map(producto => producto.nombre).join(", "));
        } else {
          alert("No se encontraron productos con el color " + colorBuscado);
        }

      case "2":
        let coloresFiltrados = prompt("Ingresa los colores que deseas filtrar (separados por comas):").split(",");
        let productosFiltradosPorColor = filtrarPorColor(coloresFiltrados);

        if (productosFiltradosPorColor.length > 0) {
          alert("Productos con los colores filtrados:\n" + productosFiltradosPorColor.map(producto => producto.nombre).join(", "));
        } else {
          alert("No se encontraron productos con los colores filtrados");
        }
        

      case "3":
        continuar = false;
        

    }
  }

}

function actualizarCatalogo() {
  let listaCatalogo = document.getElementById("catalogo");
  listaCatalogo.innerHTML = "";

  for (let i = 0; i < catalogo.length; i++) {
    let producto = catalogo[i];

    let li = document.createElement("li");
    li.innerHTML = "<b>" + producto.nombre + "</b> - $" + producto.precio.toFixed(2) + "<br>" + producto.descripcion + "<br>Talla: " + producto.talla + "<br>Colores disponibles: " + producto.colores.join(", ");

    listaCatalogo.appendChild(li);
  }
}

document.getElementById("agregar").addEventListener("click", agregarProducto);

document.getElementById("mostrarMenu").addEventListener("click", mostrarMenu);
