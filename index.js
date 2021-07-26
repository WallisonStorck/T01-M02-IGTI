import { promises as fs } from 'fs';
// import * as cities from './Cidades.json';
// import * as states from './Estados.json';

order()

async function order() {
   // await organizeStates(); // 1. Cria um arquivo para cada estado com suas respectivas cidades
   // citiesOfState('ro'); // 2. Mostra a quantidade de municípios do estado do parâmetro.
   // mostPopulousStates(); // 3. Estados com mais cidades no Brasil.
   // lessPopulousSates(); // 4. Estados com menos cidades no Brasil.
   // citiesWithBiggestName(); // 5. Cidade com maior nome de cada estado.
   // citiesWithLesserName(); // 6. Cidade com menor nome de cada estado.
   // biggestCityNameInBrazil(); // 7. Cidade de maior nome entre todos os estados.
   lesserCityNameInBrazil(); // 8. Cidade de menor nome entre todos os estados.
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

async function mostPopulousStates() {
   try {
      const statesOfBrazil = JSON.parse(await fs.readFile('Estados.json'));
      let statesWithAmountOfCities = []; //Armazena os estados e suas quantidades de cidades.
      let biggestStatesByNumberOfCities = []; //Armazena os estados com mais cidades

      for (let i = 0; i < statesOfBrazil.length; i++) { //Conta as cidades do estado.
         const uf = statesOfBrazil[i].Sigla; //Coloca UF na variável para melhor leitura posteriormente
         const citiesOfState = JSON.parse(await fs.readFile(`./states/${uf}.json`));
         const countCities = citiesOfState.length; //Conta as cidades
         statesWithAmountOfCities.push({ uf, amountOfCities: countCities });
      }

      statesWithAmountOfCities.sort((a, b) => {
         return b.amountOfCities - a.amountOfCities;
      });

      statesWithAmountOfCities = statesWithAmountOfCities.slice(0, 5); //Cortando array deixando somente os 5 primeiros.

      statesWithAmountOfCities.forEach(state => { //Adicionando-os no array
         biggestStatesByNumberOfCities.push(`${state.uf} - ${state.amountOfCities}`);
      })
      console.log('Os estados com maiores números de cidades são: ');
      console.log(biggestStatesByNumberOfCities);

   } catch (error) {
      console.log(error);
   }
}

async function lessPopulousSates() {
   try {
      const statesOfBrazil = JSON.parse(await fs.readFile('Estados.json'));
      let statesWithAmountOfCities = []; //Armazena os estados e suas quantidades de cidades.
      let smallestStatesByNumberOfCities = []; //Armazena os estados com menos cidades

      for (let i = 0; i < statesOfBrazil.length; i++) { //Conta as cidades do estado.
         const uf = statesOfBrazil[i].Sigla; //Coloca UF na variável para melhor leitura posteriormente
         const citiesOfState = JSON.parse(await fs.readFile(`./states/${uf}.json`));
         const countCities = citiesOfState.length; //Conta as cidades
         statesWithAmountOfCities.push({ uf, amountOfCities: countCities });
      }

      //Ordena crescente para tirar os menores.
      statesWithAmountOfCities.sort((a, b) => {
         return a.amountOfCities - b.amountOfCities;
      });

      //Cortando array deixando somente os 5 primeiros.
      statesWithAmountOfCities = statesWithAmountOfCities.slice(0, 5);

      //Ordena decrescente para mostrar.
      statesWithAmountOfCities.sort((a, b) => {
         return b.amountOfCities - a.amountOfCities;
      });

      statesWithAmountOfCities.forEach(state => { //Adicionando-os no array
         smallestStatesByNumberOfCities.push(`${state.uf} - ${state.amountOfCities}`);
      })
      console.log('Os estados com maiores números de cidades são: ');
      console.log(smallestStatesByNumberOfCities);

   } catch (error) {
      console.log(error);
   }
}

async function citiesWithBiggestNameOLD() {
   try {
      const statesOfBrazil = JSON.parse(await fs.readFile('Estados.json'));
      const cityWithBiggestNameOfStates = []; //Guardar a cidade de maior nome de cada estado

      for (let i = 0; i < statesOfBrazil.length; i++) {
         const uf = statesOfBrazil[i].Sigla; //Guarda a sigla do estado
         const citiesInThisState = JSON.parse(await fs.readFile(`./states/${uf}.json`));

         //Cria um novo array somente com os nomes das cidades
         const onlyName = citiesInThisState.map((city) => {
            return {
               Nome: `${city.Nome} - ${uf}`
            }
         });

         //Ordena para obter cidade de maior nome
         onlyName.sort((a, b) => {
            return b.Nome.length - a.Nome.length;
         });

         //Corta na posição 0, 1 valor, ou seja, corta e deixa somente a de maior nome
         const cityWithBiggestName = onlyName.slice(0, 1);

         //Insere no array geral que recebe a cidade de cada estado.
         cityWithBiggestNameOfStates.push(cityWithBiggestName);
      }
      console.log('A cidade de maior nome de cada estado: ');
      console.log(cityWithBiggestNameOfStates);

   } catch (error) {
      console.log(error);
   }
}

async function citiesWithBiggestName() {
   try {
      const statesOfBrazil = JSON.parse(await fs.readFile('Estados.json'));
      const cityWithBiggestNameOfStates = []; //Guardar a cidade de maior nome de cada estado

      for (let i = 0; i < statesOfBrazil.length; i++) {
         const uf = statesOfBrazil[i].Sigla; //Guarda a sigla do estado
         const citiesInThisState = JSON.parse(await fs.readFile(`./states/${uf}.json`));
         let biggestCurrentName = ''; //Usada para comparar os tamanhos de nomes.

         //Cria um novo array somente com os nomes das cidades
         const onlyName = citiesInThisState.map((city) => {
            return {
               Nome: `${city.Nome} - ${uf}`
            }
         });

         //Compara o tamanho dos nomes das cidades de deixa guardado em "biggestCurrentName";
         onlyName.forEach(city => {
            if (biggestCurrentName.length < city.Nome.length) {
               biggestCurrentName = city.Nome;
            }
         });

         //Insere no array geral que recebe a cidade de cada estado.
         cityWithBiggestNameOfStates.push(biggestCurrentName);
      }
      console.log('A cidade de maior nome de cada estado: ');
      console.log(cityWithBiggestNameOfStates);

   } catch (error) {
      console.log(error);
   }
}

async function citiesWithLesserName() {
   try {
      const statesOfBrazil = JSON.parse(await fs.readFile('Estados.json'));
      const cityWithLesserNameOfStates = []; //Guardar a cidade de menor nome de cada estado

      for (let i = 0; i < statesOfBrazil.length; i++) {
         const uf = statesOfBrazil[i].Sigla; //Guarda a sigla do estado
         const citiesInThisState = JSON.parse(await fs.readFile(`./states/${uf}.json`));
         let lesserCurrentName = ''; //Usada para comparar os tamanhos de nomes.

         //Cria um novo array somente com os nomes das cidades
         const onlyName = citiesInThisState.map((city) => {
            return {
               Nome: `${city.Nome} - ${uf}`
            }
         });

         //Compara o tamanho dos nomes das cidades de deixa guardado em "lesserCurrentName";
         onlyName.forEach(city => {
            if (lesserCurrentName.length == 0 || lesserCurrentName.length > city.Nome.length) {
               lesserCurrentName = city.Nome;
            }
         });

         //Insere no array geral que recebe a cidade de cada estado.
         cityWithLesserNameOfStates.push(lesserCurrentName);
      }
      console.log('A cidade de menor nome de cada estado: ');
      console.log(cityWithLesserNameOfStates);

   } catch (error) {
      console.log(error);
   }
}

async function biggestCityNameInBrazil() {
   try {
      const statesOfBrazil = JSON.parse(await fs.readFile('Estados.json'));
      let biggestCityNameInBrazil = ''; //Guardar a cidade de menor nome de cada estado

      for (let i = 0; i < statesOfBrazil.length; i++) {
         const uf = statesOfBrazil[i].Sigla; //Guarda a sigla do estado
         const citiesInThisState = JSON.parse(await fs.readFile(`./states/${uf}.json`));

         //Cria um novo array somente com os nomes das cidades
         const onlyName = citiesInThisState.map((city) => {
            return {
               Nome: `${city.Nome} - ${uf}`
            }
         });

         //Compara o tamanho dos nomes das cidades de deixa guardado em "biggestCityNameInBrazil";
         onlyName.forEach(city => {
            if (biggestCityNameInBrazil.length == 0 || biggestCityNameInBrazil.length < city.Nome.length) {
               biggestCityNameInBrazil = city.Nome;
            }
         });

      }
      console.log('A cidade de maior nome no Brasil é: ' + biggestCityNameInBrazil);

   } catch (error) {
      console.log(error);
   }
}

async function lesserCityNameInBrazil() {
   try {
      const statesOfBrazil = JSON.parse(await fs.readFile('Estados.json'));
      let lesserCityNameInBrazil = ''; //Guardar a cidade de menor nome de cada estado

      for (let i = 0; i < statesOfBrazil.length; i++) {
         const uf = statesOfBrazil[i].Sigla; //Guarda a sigla do estado
         const citiesInThisState = JSON.parse(await fs.readFile(`./states/${uf}.json`));

         //Cria um novo array somente com os nomes das cidades
         const onlyName = citiesInThisState.map((city) => {
            return {
               Nome: `${city.Nome} - ${uf}`
            }
         });

         onlyName.forEach(city => {
            if (lesserCityNameInBrazil.length == 0 || lesserCityNameInBrazil.length > city.Nome.length) {
               lesserCityNameInBrazil = city.Nome;
               console.log('Conteudo em "lesserCityNameInBrazil":' + lesserCityNameInBrazil);
               console.log('Conteudo em "city.Nome":' + city.Nome);
            }
         });

      }
      console.log('A cidade de menor nome no Brasil é: ' + lesserCityNameInBrazil);

   } catch (error) {
      console.log(error);
   }
}
