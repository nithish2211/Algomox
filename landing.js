document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.getElementById('create-button');
    const modal = document.getElementById('modal');
    const listNameInput = document.getElementById('list-name-input');
    const submitListName = document.getElementById('submit-list-name');
    const closeModalButton = document.getElementById('close-modal');
    const listsGrid = document.querySelector('.lists-grid');

    
    createButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    submitListName.addEventListener('click', () => {
        const listName = listNameInput.value.trim();
        if (listName) {
         
            saveList(listName);
            window.location.href = 'index.html';
        }
    });

    function saveList(listName) {
        const lists = JSON.parse(localStorage.getItem('lists')) || [];
        const listExists = lists.some(list => list.name === listName); // Check for duplicates
        if (!listExists) {
            lists.push({ name: listName, url: 'firstlist.html' }); // Add the list with a default URL
            localStorage.setItem('lists', JSON.stringify(lists));
        }
    }
    

function addListToGrid(list) {
    
    const listWrapper = document.createElement('div');
    listWrapper.classList.add('list-wrapper');

    
    const listCard = document.createElement('div');
    listCard.classList.add('list-card');
    const listLink = document.createElement('a');
    listLink.href = list.url; 
    listLink.textContent = list.name;
    listLink.style.flex = "1"; 


    const deleteButton = document.createElement('button');
    deleteButton.classList.add('remove-btn');
    deleteButton.textContent = 'Delete';

    
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        deleteList(list.name, listWrapper);
    });

    
    listCard.appendChild(listLink);
    listCard.appendChild(deleteButton);
    listWrapper.appendChild(listCard);

    listsGrid.appendChild(listWrapper);
}
function deleteList(listName, listWrapper) {
 
    listWrapper.remove();

    const lists = JSON.parse(localStorage.getItem('lists')) || [];
    const updatedLists = lists.filter(list => list.name !== listName);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
}
const savedLists = JSON.parse(localStorage.getItem('lists')) || [];
savedLists.forEach(list => addListToGrid(list));
});