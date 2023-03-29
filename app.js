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

  maxValueTextField.textContent = `R$ ${maxValue.toFixed(2)}`;
}

function verifyMinValue(data) {
  let minValue = 10000000;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if ((data[i].valor < data[j].valor) & (data[i].valor < minValue)) {
        minValue = data[i].valor;
      }
    }
  }
  minValueTextField.textContent = `R$ ${minValue.toFixed(2)}`;
}

function calculateMonthMedia(data) {
  let monthSum = 0;
  for (let i = 0; i < data.length; i++) {
    monthSum = monthSum + data[i].valor;
  }
  const monthMedia = monthSum / data.length;
  verifyDaysOverAverage(monthMedia, data);
}

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
