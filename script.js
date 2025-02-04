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

// Exibe mensagens de erro no feedback geral
function showError(message) {
  feedbackMessage.classList.remove('success');
  feedbackMessage.classList.add('error');
  feedbackMessage.textContent = message;
}

// Remove mensagens de erro
function clearError() {
  feedbackMessage.classList.remove('error');
  feedbackMessage.textContent = '';
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
  const fieldType = inputElement.type;
  const validationStatus = validateInputEmpty(inputElement.value, fieldType);

  if (!validationStatus.status) {
    return { status: false, message: validationStatus.message };
  }

  return { status: true };
}

// Evento de submit do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formFields = document.querySelectorAll('form input');
  let allValid = true;
  let errorMessage = '';

  // Valida cada campo
  formFields.forEach(field => {
    const validationResult = validateInput(field);

    if (!validationResult.status) {
      allValid = false;
      errorMessage = validationResult.message; // Captura a mensagem de erro
    }
  });

  if (allValid) {
    const valueA = parseFloat(fieldA.value);
    const valueB = parseFloat(fieldB.value);

    const comparisonStatus = validateComparison(valueA, valueB);

    if (!comparisonStatus.status) {
      showError(comparisonStatus.message);
    } else {
      clearError();
      feedbackMessage.classList.remove('error');
      feedbackMessage.classList.add('success');
      feedbackMessage.textContent = 'Sucesso! O valor de B é maior que o valor de A.';
    }
  } else {
    showError(errorMessage); // Exibe a mensagem de erro capturada
  }
});

// Evento de validação ao digitar
document.addEventListener('input', function (e) {
  if (e.target.tagName === 'INPUT') {
    clearError(); // Limpa a mensagem de erro ao digitar
  }
});