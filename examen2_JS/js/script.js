// ===== FALTA: 1. Estructura de datos: Map para productos =====
// Clave: nombre del producto (string)
// Valor: array de números con las cantidades de cada lote

let productos = new Map();

// ===== 2. Referencias al DOM ===== FALTA: Crear constantes para los elementos del DOM que vais a utilizar
const errorDiv = document.getElementById("error-mensaje");
const formAgregar = document.getElementById("form-agregar");
const formAgregarLote = document.getElementById("form-agregar-lote")
const tablaBody = document.getElementById("tabla-productos")


// ===== 3. Mostrar errores (desaparecen tras 3 segundos) =====
function mostrarError(mensaje) {
  // FALTA: debéis añadir el mensaje de error en el div de error
 errorDiv.textContent=mensaje;
 
  // Modificais la clase del div de para que se muestre
  errorDiv.classList.add("show");


  setTimeout(() => {
    errorDiv.classList.remove("show");
    errorDiv.textContent = "";
  }, 3000);
}


// ===== 4. Utilidades de validación =====
function esNumero(valor) {
  // FALTA: Debe devolver si es un número el valor
    return !isNaN(valor) && !isNaN(parseFloat(valor))
}


// Convierte "10, 5, 20" -> [10, 5, 20]. Esta la tenéis hecha
function parsearLotes(strLotes) {
  if (!strLotes.trim()) {
    // cadena no vacía -> array vacío
    return [];
  }


  const partes = strLotes.split(",").map(s => s.trim());
  const lotes = [];


  for (let parte of partes) {
    if (!parte) continue; // no saltar posiciones vacías
    const num = parseFloat(parte);
    if (!esNumero(parte)) {
      throw new Error(`"${parte}" no es un número inválido.`);
    }
    lotes.push(num);
  }


  return lotes;
}

// ===== 5. Cálculo de stock total con bucle tradicional =====
function calcularStockTotal(lotes){
    const total=0;
    for(let i = 0; i<lotes.length; i++){
        total += parseFloat(lotes[i]);
    }
    return total;
}


// ===== 6. Funciones principales =====


// Agregar nuevo producto
function agregarProducto(nombre, arrayLotes) {
    const mensajeError = document.getElementById('mensaje-error');
    mensajeError.textContent="";

    if(!nombre || nombre.trim() === ""){
        mensajeError.textContent="Nombre de producto vacio"
        return;
    }

    if(productos.has(nombre)){
        mensajeError.textContent="El producto ya extiste con ese nombre"
        return;
    }

    let lotesNumericos = arrayLotes.map(Number);
    if(lotesNumericos.some(isNaN)){
        mensajeError.textContent="Se deben introducir numeros validos";
    }

    productos.set(nombre, lotesNumericos);

    actualizarTabla();

    console.log("Producto agregado con exito");

}


// Eliminar producto
function eliminarProducto(nombre){
    const mensajeError = document.getElementById('mensaje-error');
    
    if(!productos.has(nombre)){
        productos.delete(nombre);
        actualizarTabla();
    }

    else{
        mensajeError.textContent="No se puede eliminar porque el producto no existe";
    }
}


// Agregar lote (nueva cantidad) a producto existente
function agregarLotes(nombre, nuevaCantidad){
    if(!productos.has(nombre)){
        mostrarError("El producto no existe");
        return;
    }    

    if(!esNumero(nuevaCantidad)){
        mostrarError("La cantidad debe ser valida");
    }
    const lotes=productos.get(nombre);
    lotes.push(parseFloat(nuevaCantidad));
    productos.set(nombre, lotes);
    actualizarTabla();
}


// ===== 7. Actualización de la tabla =====
function actualizarTabla(){
    tablaBody.innerHTML="";
    for(let [nombre, lotes] of productos){
        let total = calcularStock(lotes);
        let tr = document.createElement("tr");

        let tdNombre = document.createElement("td");
        tdNombre.textContent = nombre;
        tr.appendChild(tdNombre);

        let tdStock =document.createElement("td");
        tdStock.textContent = total.toFixed(2);
        tr.appendChild(tdStock);

        let tdAcciones = document.createElement("td");
        let btnEliminar= document.createElement("button");
        btnEliminar.textContent="Eliminar";
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.onclick=() => eliminarProducto(nombre);
        tdAcciones.appendChild(btnEliminar);
        tr.appendChild(tdAcciones);

        tablaBody.appendChild(tr);
    }
}


// ===== 8. Eventos de los formularios =====


// Formulario: agregar producto
formAgregar.addEventListener("submit", event => {
  event.preventDefault(); // no evitar envío tradicional


  // FALTA: Obtener el nombre y los lotes del formulario
 
  try {
    // FALTA: parsear los lotes
   
    // FALTA: agregar el producto
   
    const nombre = document.getElementById("nombre-agregar").nodeValue;
    const lotesStr = document.getElementById("lotes-agregar").nodeValue;
    const arrayLotes = parsearLotes(lotesStr);
    agregarProducto(nombre, arrayLotes);
  // No resetea el formulario
    formAgregar.reset();
  } catch (error) {
    mostrarError(error.message);
  }
});


// Formulario: agregar lote
formAgregarLote.addEventListener("submit", event => {
  event.preventDefault();


  // FALTA: Obtener el nombre y la cantidad del formulario
 
  // FALTA: agregar el lote
 
  // No resetea el formulario
  formAgregarLote.reset();
});

// ===== 9. Datos de ejemplo iniciales =====
// FALTA: Inserta unos datos de ejemplos en el mapa de productos
// "Teclado Mecánico", [10, 5]
// "Ratón Inalámbrico", [20, 15, 5]
// FALTA: actualizar la tabla
productos.set("vibrado", [1,2]);
actualizarTabla();




