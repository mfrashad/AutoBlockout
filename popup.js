let currentEdit = false;
let currentEditingItem = null;

document.getElementById("startBlocking").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "startBlocking" });
});

document.addEventListener('DOMContentLoaded', loadItems);
document.getElementById('addItem').addEventListener('click', function() {
    showModal(false);
});

function showModal(edit, text = '', content = '') {
    document.getElementById('modalListTitle').value = text;
    document.getElementById('modalListContent').value = content;
    document.getElementById('modal').style.display = 'block';
    currentEdit = edit;
}

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    closeModal();
});

function closeModal(){
  document.getElementById('modal').style.display = 'none';
}

document.getElementById('saveItem').addEventListener('click', function() {
    const title = document.getElementById('modalListTitle').value;
    const content = document.getElementById('modalListContent').value;
    if (title.trim()) {
        if (currentEdit) {
            editItem(currentEditingItem.li, currentEditingItem.titleSpan, currentEditingItem.contentSpan, title, content);
        } else {
            addItemToDOM(title, content, false);
            saveItems();
        }
        closeModal();
    }
    
});

function loadItems() {
  chrome.storage.sync.get(['listItems'], async (result) => {
      if (result.listItems && result.listItems.length > 0) {
          // If there are items in storage, use them
          result.listItems.forEach(item => addItemToDOM(item.title, item.content.join('\n'), item.checked));
      } else {
          // If storage is empty, fetch from blacklist.json
          const response = await fetch('https://raw.githubusercontent.com/mfrashad/AutoBlockout/main/blacklist.json');
          const items = await response.json();
          items.forEach(item => addItemToDOM(item.title, item.content.join('\n'), item.checked));
          // Optionally save these items to storage
          chrome.storage.sync.set({ listItems: items });
      }
  });
}

function saveItems() {
  const items = [];
  document.querySelectorAll('#itemList li').forEach(li => {
      const title = li.querySelector('.text').textContent;
      console.log(li.querySelector('.content').textContent)
      const content = li.querySelector('.content').textContent.split('\n').map(url => url.trim()).filter(url => url !== '');
      const checked = li.querySelector('input[type="checkbox"]').checked;
      items.push({ title, content, checked });
  });
  chrome.storage.sync.set({ listItems: items });
}

function addItemToDOM(listTitle, listContent = '', completed) {
  const itemList = document.getElementById('itemList');
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  li.classList.toggle('checked', checkbox.checked);
  checkbox.addEventListener('change', () => {
      li.classList.toggle('checked', checkbox.checked);
      saveItems();
  });

  const titleSpan = document.createElement('span');
  titleSpan.textContent = listTitle;
  titleSpan.className = 'text';

  const contentSpan = document.createElement('span');
  contentSpan.textContent = listContent // Join array into a newline-separated string
  contentSpan.className = 'content';
  contentSpan.style.display = 'none';

  const actions = document.createElement('div');
  actions.className = 'actions';

  const editButton = document.createElement('button');
  editButton.innerHTML = '&#9998;'; // Pencil icon
  editButton.addEventListener('click', () => {
      showModal(true, titleSpan.textContent, contentSpan.textContent);
      currentEditingItem = { li, titleSpan, contentSpan };
  });

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '&#128465;'; // Trash icon
  deleteButton.addEventListener('click', () => {
      li.remove();
      saveItems();
  });

  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  li.appendChild(checkbox);
  li.appendChild(titleSpan);
  li.appendChild(contentSpan);
  li.appendChild(actions);
  itemList.appendChild(li);
}

function editItem(li, titleSpan, contentSpan, newTitle, newContent) {
    titleSpan.textContent = newTitle;
    contentSpan.textContent = newContent;
    saveItems();
}