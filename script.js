document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const contactsTable = document.getElementById('contactsTable');
  
  // Carregar contatos do localStorage
  loadContacts();
  
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      
      if (name && phone) {
          addContact(name, phone);
          contactForm.reset();
      } else {
          alert('Por favor, preencha todos os campos!');
      }
  });
  
  function addContact(name, phone) {
      // Criar novo contato
      const contact = {
          id: Date.now(),
          name,
          phone
      };
      
      // Adicionar à tabela
      addContactToTable(contact);
      
      // Salvar no localStorage
      saveContact(contact);
  }
  
  function addContactToTable(contact) {
      const row = contactsTable.insertRow();
      
      row.innerHTML = `
          <td>${contact.name}</td>
          <td>${contact.phone}</td>
          <td>
              <button class="btn-action btn-edit" data-id="${contact.id}">
                  <i class="fas fa-edit"></i>
              </button>
              <button class="btn-action btn-delete" data-id="${contact.id}">
                  <i class="fas fa-trash-alt"></i>
              </button>
          </td>
      `;
      
      // Adicionar eventos aos botões
      row.querySelector('.btn-delete').addEventListener('click', function() {
          deleteContact(contact.id);
          row.remove();
      });
      
      row.querySelector('.btn-edit').addEventListener('click', function() {
          editContact(contact);
      });
  }
  
  function saveContact(contact) {
      let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  
  function loadContacts() {
      const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      contacts.forEach(contact => addContactToTable(contact));
  }
  
  function deleteContact(id) {
      let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      contacts = contacts.filter(contact => contact.id !== id);
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  
  function editContact(contact) {
      document.getElementById('name').value = contact.name;
      document.getElementById('phone').value = contact.phone;
      
      // Remover o contato antigo
      deleteContact(contact.id);
  }
});