import { promises as fs } from 'fs';
// import * as cities from './Cidades.json';
// import * as states from './Estados.json';

order()

async function order() {
   // await organizeStates(); // 1. Cria um arquivo para cada estado com suas respectivas cidades
}

async function organizeStates() {
   try {
      const statesOfBrazil = JSON.parse(await fs.readFile('Estados.json'));
      const citiesOfBrazil = JSON.parse(await fs.readFile('Cidades.json'));

      for (let i = 0; i < statesOfBrazil.length; i++) { //Loop do estado
         let citiesOfState = [];
         for (let j = 0; j < citiesOfBrazil.length; j++) { //Loop da cidade
            if (citiesOfBrazil[j].Estado == statesOfBrazil[i].ID) {
               citiesOfState.push(citiesOfBrazil[j]);
            }
         }
         await fs.writeFile(statesOfBrazil[i].Sigla + '.json', JSON.stringify(citiesOfState)); //Comando funcionando
      }
      // Lendo as cidades escritas no arquivo
      const citiesOfAM = JSON.parse(await fs.readFile('RO.json'));
      for (let i = 0; i < citiesOfAM.length; i++) {
         console.log(citiesOfAM[i]);
      }
   } catch (error) {
      console.log(error);
   }
}