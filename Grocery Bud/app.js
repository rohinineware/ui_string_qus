

document.addEventListener("DOMContentLoaded", () => {
    const alert = document.querySelector('.alert');
    const form = document.querySelector('.grocery-form');
    const groceryInput = document.getElementById('grocery');
    const submitBtn = document.querySelector('.submit-btn');
    const container = document.querySelector('.container');
    const list = document.querySelector('.grocery-list');
    const clearBtn = document.querySelector('.clear-btn');

    let editElement = null;
    let editFlag = false;

    // Event Listeners
    form.addEventListener('submit', addItem);
    clearBtn.addEventListener('click', clearItems);

    function addItem(e) {
        e.preventDefault();
        const value = groceryInput.value.trim();

        if (value && !editFlag) {
            createListItem(value);
            displayAlert('Item added to the list', 'success');
            container.classList.add('show-container');
            saveToLocalStorage();
            setBackToDefault();
        } else if (value && editFlag) {
            editElement.innerHTML = value;
            displayAlert('Item updated', 'success');
            saveToLocalStorage();
            setBackToDefault();
        } else {
            displayAlert('Please enter a value', 'danger');
        }
    }

    function displayAlert(message, action) {
        alert.textContent = message;
        alert.classList.add(`alert-${action}`);
        setTimeout(() => {
            alert.textContent = '';
            alert.classList.remove(`alert-${action}`);
        }, 1000);
    }

    function clearItems() {
        list.innerHTML = '';
        container.classList.remove('show-container');
        displayAlert('All items cleared', 'success');
        localStorage.removeItem('groceryList');
        setBackToDefault();
    }

    function setBackToDefault() {
        groceryInput.value = '';
        editFlag = false;
        editElement = null;
        submitBtn.textContent = 'Submit';
    }

    function createListItem(value) {
        const listItem = document.createElement('div');
        listItem.classList.add('grocery-item');
        listItem.innerHTML = `
            <p>${value}</p>
            <div class="btn-container">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        list.appendChild(listItem);

        listItem.querySelector('.edit-btn').addEventListener('click', () => editItem(listItem, value));
        listItem.querySelector('.delete-btn').addEventListener('click', () => deleteItem(listItem));
    }

    function editItem(item, value) {
        groceryInput.value = value;
        editFlag = true;
        editElement = item.querySelector('p');
        submitBtn.textContent = 'Edit';
    }

    function deleteItem(item) {
        list.removeChild(item);
        if (list.children.length === 0) {
            container.classList.remove('show-container');
        }
        displayAlert('Item removed', 'danger');
        saveToLocalStorage();
        setBackToDefault();
    }

    function saveToLocalStorage() {
        const items = Array.from(list.children).map(item => item.querySelector('p').textContent);
        localStorage.setItem('groceryList', JSON.stringify(items));
    }

    function loadFromLocalStorage() {
        const items = JSON.parse(localStorage.getItem('groceryList') || '[]');
        items.forEach(item => createListItem(item));
        if (items.length > 0) {
            container.classList.add('show-container');
        }
    }

    loadFromLocalStorage();
});
