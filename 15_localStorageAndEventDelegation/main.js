const itemsList = document.querySelector('.plates');
const form = document.querySelector('.add-items');
const items = JSON.parse(localStorage.getItem("items")) || [];


function addItem(e) {
    e.preventDefault();
    const text = this.querySelector('[name="item"]').value;
    // This is the best way cause we have to store isChecked in localStorage
    items.push({
        text,
        isChecked: false
    });
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
    this.reset();
}

function populateList(items, itemsList, index) {
    itemsList.innerHTML = items.map((item, index) => {
        return `
        <li>
            <input type="checkbox" id="item${index}" data-index=${index} ${item.isChecked ? 'checked' : ''}>
            <label for="item${index}">${item.text}</label>
        </li>
    
    `}).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return; //Return if not clicked on input
    const el = e.target;
    const index = el.dataset.index;
    items[index].isChecked = !items[index].isChecked;
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
}

function handleAll(value, items) {
    console.log(value);
    items.forEach(item => {
        item.isChecked = value;
    });
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
}

populateList(items, itemsList);

form.addEventListener('submit', addItem);

document.querySelector('.check').addEventListener('click', () => handleAll(true, items));
document.querySelector('.clear').addEventListener('click', () => handleAll(false, items));

itemsList.addEventListener('click', toggleDone);