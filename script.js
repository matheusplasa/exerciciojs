const form = document.getElementById('form-validate');
const fieldA = document.getElementById('field-a');
const fieldB = document.getElementById('field-b');
const feedbackMessage = document.getElementById('feedback-message');

const messages = {
  empty: 'O campo não pode estar vazio. Por favor, preencha um valor.',
  invalid: 'O valor deve ser maior que zero.',
  success: 'Sucesso! O valor de B é maior que o valor de A.',
  comparison: 'O valor de B deve ser maior que o valor de A.'
};

// Exibe mensagens de erro
function showError(inputElement, messageElement, message) {
  messageElement.classList.add('error');
  messageElement.textContent = message;
  inputElement.classList.add('error-border');
}

// Remove mensagens de erro
function clearError(inputElement, messageElement) {
  messageElement.classList.remove('error');
  messageElement.textContent = '';
  inputElement.classList.remove('error-border');
}

// Valida se o campo está vazio ou contém números inválidos
function validateInputEmpty(value, type = 'text') {
  if (value.trim() === '') {
    return { message: messages.empty, status: false };
  }

  if (type === 'number' && parseFloat(value) <= 0) {
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
    const valueA = parseFloat(fieldA.value);
    const valueB = parseFloat(fieldB.value);

    const comparisonStatus = validateComparison(valueA, valueB);

    if (!comparisonStatus.status) {
      showError(fieldB, document.getElementById('message-field-b'), comparisonStatus.message);
      feedbackMessage.classList.remove('success');
      feedbackMessage.classList.add('error');
      feedbackMessage.textContent = 'Erro: O valor de B deve ser maior que o valor de A.';
    } else {
      clearError(fieldB, document.getElementById('message-field-b'));
      feedbackMessage.classList.remove('error');
      feedbackMessage.classList.add('success');
      feedbackMessage.textContent = 'Sucesso! O valor de B é maior que o valor de A.';
    }
  } else {
    feedbackMessage.classList.remove('success');
    feedbackMessage.classList.add('error');
    feedbackMessage.textContent = 'Erro: Verifique os campos preenchidos.';
  }
});

// Evento de validação ao digitar
document.addEventListener('input', function (e) {
  if (e.target.tagName === 'INPUT') {
    validateInput(e.target);
  }
});