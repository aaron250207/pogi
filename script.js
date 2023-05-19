document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const loginSection = document.getElementById('loginSection');
    const loginForm = document.getElementById('loginForm');
    const dashboardSection = document.getElementById('dashboardSection');
    const planSection = document.getElementById('planSection');
    const foodForm = document.getElementById('food-form');
    const foodInput = document.getElementById('food-input');
    const workoutForm = document.getElementById('workout-form');
    const workoutInput = document.getElementById('workout-input');
    const foodList = document.getElementById('foodList');
    const workoutList = document.getElementById('workoutList');
    const welcomeSection = document.getElementById('welcomeSection');
    const goToPlanButton = document.getElementById('goToPlanButton');
    const backButton = document.getElementById('backButton');
    const logoutButton = document.getElementById('logoutButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
  
    const username = "john";
    const password = "galingana";
  
    let isLoggedIn = false;
  
    startButton.addEventListener('click', function() {
      welcomeSection.style.display = 'none';
      loginSection.style.display = 'block';
    });
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const enteredUsername = usernameInput.value;
      const enteredPassword = passwordInput.value;
  
      if (enteredUsername === username && enteredPassword === password) {
        isLoggedIn = true;
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        loadItemsFromStorage('foodItems');
        loadItemsFromStorage('workoutItems');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    });
  
    logoutButton.addEventListener('click', function() {
      isLoggedIn = false;
      planSection.style.display = 'none';
      loginSection.style.display = 'block';
      usernameInput.value = '';
      passwordInput.value = '';
    });
  
    foodForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const foodItem = foodInput.value.trim();
  
      if (foodItem && isLoggedIn) {
        const listItem = createListItem(foodItem);
        foodList.appendChild(listItem);
        foodInput.value = '';
        saveItemToStorage('foodItems', foodItem);
      }
    });
  
    workoutForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const workoutItem = workoutInput.value.trim();
  
      if (workoutItem && isLoggedIn) {
        const listItem = createListItem(workoutItem);
        workoutList.appendChild(listItem);
        workoutInput.value = '';
        saveItemToStorage('workoutItems', workoutItem);
      }
    });
  
    goToPlanButton.addEventListener('click', function() {
      if (isLoggedIn) {
        dashboardSection.style.display = 'none';
        planSection.style.display = 'block';
      }
    });
  
    backButton.addEventListener('click', function() {
      planSection.style.display = 'none';
      dashboardSection.style.display = 'block';
    });
  
    planSection.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-button')) {
        const listItem = event.target.closest('.item');
        listItem.remove();
      }
    });
  
    // Load items from localStorage when the page is loaded
    function loadItemsFromStorage(key) {
      const storedItems = localStorage.getItem(key);
      if (storedItems) {
        const items = JSON.parse(storedItems);
        items.forEach(function(item) {
          const listItem = createListItem(item);
          if (key === 'foodItems') {
            foodList.appendChild(listItem);
          } else if (key === 'workoutItems') {
            workoutList.appendChild(listItem);
          }
        });
      }
    }
  
    // Save item to localStorage
    function saveItemToStorage(key, item) {
      let storedItems = localStorage.getItem(key);
      if (!storedItems) {
        storedItems = JSON.stringify([item]);
      } else {
        const items = JSON.parse(storedItems);
        items.push(item);
        storedItems = JSON.stringify(items);
      }
      localStorage.setItem(key, storedItems);
    }
  
    function createListItem(text) {
      const listItem = document.createElement('li');
      listItem.classList.add('item');
  
      const itemText = document.createElement('span');
      itemText.textContent = text;
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.textContent = 'Delete';
  
      listItem.appendChild(itemText);
      listItem.appendChild(deleteButton);
  
      return listItem;
    }
  });
  