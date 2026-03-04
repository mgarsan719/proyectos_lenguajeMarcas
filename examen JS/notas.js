let alumnos = new Map();

//Funcion agregar alumno
function agregarAlumno(mapa, nombre, arrayNotas) {
    mapa.set(nombre, arrayNotas);
}

//Funcion eliminarAlumno
function eliminarAlumno(mapa, nombre) {
    mapa.delete(nombre);
}

//Funcion agregarNotas
function agregarNota(mapa, nombre, nuevaNota) {
    if (mapa.has(nombre)) {
        let notas = mapa.get(nombre);
        notas.push(nuevaNota);
    } 
    
    else {
        console.log("El alumno no existe en el registro.");
    }
}

//Funcion calcularMedia
function calcularMedia(arrayNotas) {
    let suma = 0;
    
    for (let i = 0; i < arrayNotas.length; i++) {
        suma = suma + arrayNotas[i];
    }
    
    return arrayNotas.length > 0 ? suma / arrayNotas.length : 0;
}

//Funcion Imprimir
function imprimir(mapa) {   
    console.log("=== REPORTE DE ALUMNOS ===")
    mapa.forEach(function(notas, nombre) {
        
        let media = calcularMedia(notas);
        console.log("Alumno " + nombre + " | Media: " + media);
    });
        console.log("=========================")

}

// Añadimos datos
        agregarAlumno(alumnos, "Ana", [7, 8, 6]);
        agregarAlumno(alumnos, "Luis", [4, 5, 5]);
        agregarAlumno(alumnos, "Marta", [9, 8, 10]);

        console.log("Estado inicial:");
        imprimir(alumnos);

        // Modificamos datos
        console.log("\nAñadimos un 9 a Luis y eliminamos a Ana...");
        agregarNota(alumnos, "Luis", 9);
        eliminarAlumno(alumnos, "Ana");

        // Mostramos el resultado final
        console.log("\nEstado final:");
        imprimir(alumnos);

// Al final del archivo notas.js del alumno, deben poner esto:
module.exports = {
    agregarAlumno,
    eliminarAlumno,
    agregarNota,
    calcularMedia,
    imprimir
};
