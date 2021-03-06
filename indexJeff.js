import { debug } from 'console';
import { promises as fs } from 'fs';
// import * as cities from './Cidades.json';
// import * as states from './Estados.json';

// order()
mostPopulousStatesReborn()

async function order() {
   // citiesOfState('ro'); // 2. Mostra a quantidade de municípios do estado do parâmetro.
   // await organizeStates(); // 1. Cria um arquivo para cada estado com suas respectivas cidades
   mostPopulousStates();
}

async function organizeStates() {
   try {
      const statesOfBrazil = JSON.parse(await fs.readFile('Estados.json'));
      const citiesOfBrazil = JSON.parse(await fs.readFile('Cidades.json'));

      for (let i = 0; i < statesOfBrazil.length; i++) { //Loop do estado
         let citiesOfState = []; //Array para guardar as cidades do estado
         for (let j = 0; j < citiesOfBrazil.length; j++) { //Loop da cidade
            if (citiesOfBrazil[j].Estado == statesOfBrazil[i].ID) { //Verifica se a cidade corresponde ao estado
               citiesOfState.push(citiesOfBrazil[j]); //Acumula as cidades.
            }
         }
         await fs.writeFile('./states/' + statesOfBrazil[i].Sigla + '.json', JSON.stringify(citiesOfState)); //Grava as cidades acumuladas
      }
      // Lendo as cidades escritas no arquivo
      // const citiesOfRO = JSON.parse(await fs.readFile('./states/RO.json'));
      // for (let i = 0; i < citiesOfRO.length; i++) {
      //    console.log(citiesOfRO[i]);
      // }
   } catch (error) {
      console.log(error);
   }
}

async function citiesOfState(uf) {
   try {
      let countCities = 0;
      let ufUpperCase = uf.toUpperCase();
      let cities = JSON.parse(await fs.readFile('./states/' + ufUpperCase + '.json'));
      cities.forEach(city => countCities++); //Conta as cidades
      console.log('O estado de ' + ufUpperCase + ' possui ' + countCities + ' municípios!');
      // console.log(cities);
   } catch (error) {
      console.log(error);
   }
}

/**Criar um método que imprima no console um array com o UF dos cinco estados
que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Você
pode usar a função criada no tópico 2. Exemplo de impressão: 
[“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”]
 */
async function mostPopulousStates() {
   try {
      const statesOfBrazil = JSON.parse(await fs.readFile('Estados.json'));
      const statesByCities = {}; //Armazena os estados e suas quantidades de cidades
      // console.log(statesOfBrazil);

      for (let i = 0; i < statesOfBrazil.length; i++) { //Conta as cidades do estado.
         const UF = statesOfBrazil[i].Sigla; //Coloca UF na variável para melhor leitura posteriormente
         const citiesOfState = JSON.parse(await fs.readFile('./states/' + UF + '.json'));
         const countCities = citiesOfState.length; //Conta as cidades
         statesByCities[UF] = countCities;
      }
      console.log(statesByCities);

      /**Até o momento estamos contando e mostrando a quantidade de cidades dos estados */
   } catch (error) {
      console.log(error);
   }
}

async function mostPopulousStatesReborn() {
   try {
      const statesOfBrazil = JSON.parse(await fs.readFile('Estados.json'));
      // Acredito q variaveis mais descritiveis são melhores
      // de nada adianta ser curta se quando vc lê fica se perguntando pra q serve
      let statesWithAmountOfCities = []

      for (let i = 0; i < statesOfBrazil.length; i++) {
         const uf = statesOfBrazil[i].Sigla
         // Aqui eu só quebrei pra ficar um pouco mais legível
         const buffer = await fs.readFile(`./states/${uf}.json`)
         const cities = JSON.parse(buffer)

         // O push q antes estava errado, agora eu adiciono um objeto
         statesWithAmountOfCities.push({
            uf,
            amountOfCities: cities.length,
         })
      }

      // Primeiro ordem decrescente
      statesWithAmountOfCities = statesWithAmountOfCities.sort((a, b) => {
         if (a.amountOfCities > b.amountOfCities) {
            return -1
         }
         if (a.amountOfCities < b.amountOfCities) {
            return 1
         }

         return 0
      })
      // Depois cortamos o array e pegamos só os 5 primeiros
      statesWithAmountOfCities = statesWithAmountOfCities.slice(0, 5)

      // Agora é só formatar como é pedido
      console.debug(statesWithAmountOfCities)
   } catch (error) {
      console.log(error);
   }
}