const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

//html input값 정수로 변환
function getUserNumberInput() {
  return parseInt(userInput.value);
}

//페이지에 결과값과 수식 표기
function createAndWriteOutput(operator, resultBeforeCalc, CalcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${CalcNumber}`;
  outputResult(currentResult, calcDescription);
}

//로그를 객체로 기록
function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

//계산기
function calc(calculationType) {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  let mathOperator;
  if (calculationType === 'ADD') {
    currentResult += enteredNumber;
    mathOperator = '+';
  } else if (calculationType === 'SUBTRACT') {
    currentResult -= enteredNumber;
    mathOperator = '-';
  } else if (calculationType === 'MULTIPLY') {
    currentResult *= enteredNumber;
    mathOperator = '*';
  } else if (calculationType === 'DIVIDE') {
    currentResult /= enteredNumber;
    mathOperator = '/';
  } else {
    return;
  }
  createAndWriteOutput(mathOperator, initialResult, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}
addBtn.addEventListener('click', calc.bind(this, 'ADD'));
subtractBtn.addEventListener('click', calc.bind(this, 'SUBTRACT'));
multiplyBtn.addEventListener('click', calc.bind(this, 'MULTIPLY'));
divideBtn.addEventListener('click', calc.bind(this, 'DIVIDE'));
