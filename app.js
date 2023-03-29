// Variáveis com os campos de texto do HTML em que os valores serão inseridos
const maxValueTextField = document.querySelector(
  ".main__section__container__max--value__text"
);
const minValueTextField = document.querySelector(
  ".main__section__container__min--value__text"
);
const averageTextField = document.querySelector(
  ".main__section__container__average__text"
);

//Coleta dados do JSON
async function collectJsonData() {
  //Busca dados brutos do arquivo disponibilizado
  const response = await fetch("./service/dados.json");
  //Transforma os dados em JSON
  const data = await response.json();

  //Chama a função de remover dados sem valores e envia a variável data
  removeEmptyData(data);
}

//Função que recebe um objeto e remove os dados vazios
function removeEmptyData(data) {
  /*Filtra os dados que possuem um valor diferente de 0 e armazena 
  em uma nova variável data*/
  data = data.filter((item) => item.valor !== 0);

  //Chama a função de verificar o maior valor
  verifyMaxValue(data);
  //Chama a função de verificar o menor valor
  verifyMinValue(data);
  //Chama a função de calcular a média mensal
  calculateMonthMedia(data);
}

//Função que recebe os dados e verifica qual o valor mais alto
function verifyMaxValue(data) {
  //Variável para armazenar o valor mais alto
  let maxValue = 0;

  /*Laço de repetição que utiliza o índice i 
  para percorrer por todo array até chegar ao final da lista*/
  for (let i = 0; i < data.length; i++) {
    /*Segundo laço de repetição que passa por todo o array 
    antes do laço anterior para que seja comparado cada valor da lista*/
    for (let j = 0; j < data.length; j++) {
      /*Condicional que verifica se o valor fixado no laço i é maior que 
      o valor do laço j e se o valor do laço i é maior que o valor máximo
      já fixado na variável*/
      if ((data[i].valor > data[j].valor) & (data[i].valor > maxValue)) {
        /*Se as condições acima forem satisfeitas o valor do laço i é armazenado
        na variável valor máximo*/
        maxValue = data[i].valor;
      }
    }
  }
  //Adiciona ao HTML o valor máximo da distribuidora
  maxValueTextField.textContent = `R$ ${maxValue.toFixed(2)}`;
}

//Função que recebe os dados e verifica qual o menor valor
function verifyMinValue(data) {
  /*Variável criada para armazenas o menor valor, inicia 
  com um valor alto para que sejam feitas as comparações*/
  let minValue = 10000000;

  /* Laço de repetição, que assim como o da função anterior, utiliza o índice i
  para fixar um valor e compará-lo */
  for (let i = 0; i < data.length; i++) {
    /* Laço de repetição que fixa o valor com o índice j */
    for (let j = 0; j < data.length; j++) {
      /* Condicional para verificar se o valor com o índice i é menor que o valor
      com o índice j e menor que o valor armazenado na variável valor mínimo */
      if ((data[i].valor < data[j].valor) & (data[i].valor < minValue)) {
        // Se a condicional for verdadeira o valor com o índice i será armazenado na variável
        minValue = data[i].valor;
      }
    }
  }
  //Adiciona ao HTML o valor mínimo da distribuidora
  minValueTextField.textContent = `R$ ${minValue.toFixed(2)}`;
}

// Função que recebe os dados e calcula a média de arrecadação mensal
function calculateMonthMedia(data) {
  // Variável que armazena o valor total do mês
  let monthSum = 0;
  // Laço de repetição para somar os valores de cada dia
  for (let i = 0; i < data.length; i++) {
    // O valor da soma do mês é somado ao valor de cada dia
    monthSum = monthSum + data[i].valor;
  }
  /* Variável em que é armazenada a média mensal, que é calculada 
  com a divisão da soma dos valores do mês, pela quantidade de dias */
  const monthMedia = monthSum / data.length;
  /* Função para calcular a quantidade de dias acima da média em que 
  são passados os dados do mês e a média mensal */
  verifyDaysOverAverage(monthMedia, data);
}

/* Função que recebe a média e os dados totais e verifica a quantidade 
de dias acima da média */
function verifyDaysOverAverage(average, data) {
  let daysOverAverage = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].valor > average) {
      daysOverAverage.push(data[i].valor);
    }
  }
  const numberOfDaysOverAverage = daysOverAverage.length;

  averageTextField.textContent = numberOfDaysOverAverage;
}

collectJsonData();
