// readline para leer el contenido de un archivo por linea
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const array = [];

// redirigimos el flujo de entrada de tty a un archivo
const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'entrada/', '1.txt'))
});

rl.on('line', (line) => array.push(line));

rl.on('close', () => {
  AFND(array);
});

function AFND (automata) {
  const estados = automata[0].split(',');
  // console.log(estados);
  const alfabeto = automata[1].split(',');
  // console.log(alfabeto);
  const estadoInicial = automata[2].split(',');
  // console.log(estadoInicial);
  const estadoFinal = automata[3].split(',');
  // console.log(estadoFinal);
  const funcionTransicion = [];

  for (let i = 4; i <= automata.length - 1; i++) {
    funcionTransicion.push(automata[i].split(','));
  } // estado, simbolo, estado
  // console.log(funcionTransicion);

  const funcionTransicionCompleta = completaFuncionTransicion(estados, alfabeto, funcionTransicion);
  console.log(funcionTransicionCompleta);
  // if (estadoInicial != null || undefined) {
  // }
} // fin del AFND

function completaFuncionTransicion (estados, alfabeto, funcionTransicion) {
  let funcionTrancisionCompleta = [...funcionTransicion];
  // para cada simbolo del alfabeto existe un estado de tracision
  alfabeto.forEach(simbolo => {
    estados.forEach(estado => {
      let existeEstadoTransicion = false;
      funcionTransicion.forEach(transicion => {
        // elimina el ultimo elemento al final de la trancision
        let trans = transicion.slice(0, transicion.length - 1);
        if (trans.includes(estado) && trans.includes(simbolo)) {
          existeEstadoTransicion = true;
        } // fin del if
      }); // fin forEach funcionTrancision
      if (!existeEstadoTransicion) {
        funcionTrancisionCompleta = [...funcionTrancisionCompleta, [estado, simbolo, 'P']];
      }
    }); // fin forEach estados
    // agrega el estado de transicion epsilon por cada simbolo del alfabeto
    funcionTrancisionCompleta = [...funcionTrancisionCompleta, ['P', simbolo, 'P']];
  }); // fin forEach alfabeto
  return funcionTrancisionCompleta;
}
