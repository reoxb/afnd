// readline para leer el contenido de un archivo por linea
const fs = require('fs');
const readline = require('readline');
const readlineSync = require('readline-sync');
const path = require('path');

const array = [];

// creamos el objeto de lectura/escritura rl
// redirigimos el flujo de entrada de tty a un archivo
const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'entrada/', '1.txt'))
});

// lee las lineas del fichero
rl.on('line', (line) => array.push(line));

// Una vez terminadas de leer las lineas aplica una funcion 
rl.on('close', () => {
  AFND(array);
});

function AFND (automata) {
  // un afnd consta de 5 elementos
  const estados = automata[0].split(',');
  // console.log(estados);
  const alfabeto = automata[1].split(',');
  // console.log(alfabeto);
  const estadoInicial = automata[2].split(',');
  // console.log(estadoInicial);
  const estadoFinal = automata[3].split(',');
  // console.log(estadoFinal);
  //la funcion de transicion es lo ultimo del archivo
  const funcionTransicion = [];
  
//lee la funcion de transicion 
  for (let i = 4; i <= automata.length - 1; i++) {
    funcionTransicion.push(automata[i].split(','));
  } // estado, simbolo, estado

  if (estadoInicial != null) {
    const funcionTransicionCompleta = completaFuncionTransicion(estados, alfabeto, funcionTransicion);
    const entrada = leerEntrada();

    if(notIncludes(alfabeto, entrada)) {
      console.log('Algun caracter de la cadena de entrada no es valido');
      console.log('Finaliza funcion principal con errores!');
      return 0;
    } else {
      console.log('Los caracteres de la cadena de entrada son validos');
      console.log('Continua con el flujo de la ejecucion... ');
      // ---> Continuar con el flujo aqui
    }

  } // fin del if
  console.log('Finaliza funcion principal....');
} // fin del AFND

function completaFuncionTransicion (estados, alfabeto, funcionTransicion) {
  // genera una copia por valor del arreglo funcionTransicion 
  let funcionTransicionCompleta = [...funcionTransicion];
  // para cada simbolo del alfabeto existe un estado de tracision
  alfabeto.forEach(simbolo => {
    estados.forEach(estado => {
      let existeEstadoTransicion = false;
      funcionTransicion.forEach(transicion => {
        // elimina el ultimo elemento al final de la transicion
        let trans = transicion.slice(0, transicion.length - 1);
        if (trans.includes(estado) && trans.includes(simbolo)) {
          existeEstadoTransicion = true;
        } // fin del if
      }); // fin forEach funciontransicion
      if (!existeEstadoTransicion) {
        funcionTransicionCompleta = [...funcionTransicionCompleta, [estado, simbolo, 'P']];
      }
    }); // fin forEach estados
    // agrega el estado de transicion epsilon por cada simbolo del alfabeto
    funcionTransicionCompleta = [...funcionTransicionCompleta, ['P', simbolo, 'P']];
  }); // fin forEach alfabeto
  return funcionTransicionCompleta;
}

function leerEntrada () {
  let entrada = '';
  // capturamos la entrada del usuario sincrono
  entrada = readlineSync.question('Introduzca una cadena de simbolos...');
  return entrada;
}

function notIncludes(alfabeto, entrada) {
    let notIncludes = false;
    for (const simbolo of entrada) {
      if(!(alfabeto.includes(simbolo))){
        notIncludes = true;
      } // fin del if
    } // fin del for
    return notIncludes;
}