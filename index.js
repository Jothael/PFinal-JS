let catalogo = [];

function agregarProducto() {
  while (true) {
    let nombre = prompt("Ingresa el nombre del producto:");
    let precio = Number(prompt("Ingresa el precio del producto:"));
    let descripcion = prompt("Ingresa la descripción del producto:");
    let talla = prompt("Ingresa la talla del producto:");

    if (nombre === '' || isNaN(precio) || precio <= 0 || descripcion === '' || talla === '') {
      alert("Por favor, ingresa valores válidos para el producto.");
    } else {
      let producto = {
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        talla: talla
      };

      catalogo.push(producto);
      break;
    }
  }

  let agregarOtro = confirm("¿Deseas agregar otro producto al catálogo?");

  if (agregarOtro) {
    agregarProducto();
  } else {
    actualizarCatalogo();
    alert("Los productos han sido agregados con éxito.")
  }
}

function actualizarCatalogo() {
  let listaCatalogo = document.getElementById("catalogo");
  listaCatalogo.innerHTML = "";

  for (let i = 0; i < catalogo.length; i++) {
    let producto = catalogo[i];

    let li = document.createElement('li');
    li.innerHTML = "<b>" + producto.nombre + "</b> - $" + producto.precio.toFixed(2) + "<br>" + producto.descripcion + "<br>Talla: " + producto.talla;

    listaCatalogo.appendChild(li);
  }
}

document.getElementById("agregar").addEventListener("click", agregarProducto);
