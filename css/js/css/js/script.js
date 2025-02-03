const form = document.getElementById('form-validate');
const fieldA = document.getElementById('field-a');
const fieldB = document.getElementById('field-b');
const messageSuccess = document.getElementById('sucess-message');

const messages = {
  empty: 'O campo não pode estar vazio. Por favor, preencha um valor.',
  invalid: 'O valor deve ser maior que zero.',
  success: 'Sucesso! O valor foi registrado corretamente.',
  comparison: 'O valor de B deve ser maior que o valor de A.'
};

// Exibe mensagens de erro
function showError(inputElement, messageElement, message) {
  messageElement.classList.add('error');
  messageElement.textContent = message;
  inputElement.style.borderColor = '#dc3545';
}

// Remove mensagens de erro
function clearError(inputElement, messageElement) {
  messageElement.classList.remove('error');
  messageElement.textContent = '';
  inputElement.style.borderColor = '#cccccc';
}

// Valida se o campo está vazio ou contém números inválidos
function validateInputEmpty(value, type = 'text') {
  if (value.trim() === '') {
    return { message: messages.empty, status: false };
  }

  if (type === 'number' && value <= 0) {
    return { message: messages.invalid, status: false };
  }

  return { message: messages.success, status: true };
}

// Valida se o valor de B é maior que o valor de A
function validateComparison(valueA, valueB) {
  if (valueB <= valueA) {
    return { message: messages.comparison, status: false };
  }

  return { message: messages.success, status: true };
}

// Valida um campo individual
function validateInput(inputElement) {
  const messageElement = document.getElementById(`message-${inputElement.id}`);
  const fieldType = inputElement.type;

  const validationStatus = validateInputEmpty(inputElement.value, fieldType);

  if (!validationStatus.status) {
    showError(inputElement, messageElement, validationStatus.message);
    return false;
  } else {
    clearError(inputElement, messageElement);
  }

  // Valida comparação entre fieldA e fieldB
  if (inputElement.id === 'field-a' || inputElement.id === 'field-b') {
    const valueA = parseFloat(fieldA.value);
    const valueB = parseFloat(fieldB.value);

    if (!isNaN(valueA) && !isNaN(valueB)) {
      const comparisonStatus = validateComparison(valueA, valueB);

      if (!comparisonStatus.status) {
        showError(fieldB, document.getElementById('message-field-b'), comparisonStatus.message);
        return false;
      } else {
        clearError(fieldB, document.getElementById('message-field-b'));
      }
    }
  }

  return true;
}

// Evento de submit do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formFields = document.querySelectorAll('form input');
  let allValid = true;

  formFields.forEach(field => {
    if (!validateInput(field)) {
      allValid = false;
    }
  });

  if (allValid) {
    messageSuccess.classList.add('sucess');
    messageSuccess.textContent = `${fieldB.value} é maior que ${fieldA.value}. Agradecemos o envio!`;
    fieldA.value = '';
    fieldB.value = '';
  } else {
    messageSuccess.classList.remove('sucess');
    messageSuccess.textContent = '';
  }
});

// Evento de validação ao digitar
document.addEventListener('keyup', function (e) {
  if (e.target.tagName === 'INPUT') {
    validateInput(e.target);
  }
});