const apiUrl = 'http://127.0.0.1:5000';  // Замените на URL вашего Flask API

// Регистрация
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Логин
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            if (data.access_token) {
                alert('Login successful! Token: ' + data.access_token);
            }
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Получение всех пользователей
document.getElementById('getUsersBtn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${apiUrl}/auth/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Функция для отображения списка пользователей
function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';  // Очищаем список перед отображением новых данных

    if (users.length === 0) {
        usersList.innerHTML = 'No users found.';
        return;
    }

    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = `Email: ${user.email}`;
        usersList.appendChild(userItem);
    });
}

// Поиск акции по символу
document.getElementById('stockSearchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const stockSymbol = document.getElementById('stockSymbol').value;

    try {
        const response = await fetch(`${apiUrl}/stocks/${stockSymbol}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }        });

        if (!response.ok) {
            throw new Error('Failed to fetch stock data for ${stockSymbol}');
        }

        const stockData = await response.json();
        displayStockInfo(stockData);
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Функция для отображения информации об акции
function displayStockInfo(stockData) {
    const stockInfoDiv = document.getElementById('stockInfo');
    stockInfoDiv.innerHTML = ''; // Очищаем перед отображением новых данных

    // Проверяем наличие данных в Time Series (5min)
    if (!stockData || !stockData["Time Series (5min)"] || Object.keys(stockData["Time Series (5min)"]).length === 0) {
        stockInfoDiv.textContent = 'Stock data not found.';
        return;
    }

    // Извлекаем последний временной ряд
    const lastTimeStamp = Object.keys(stockData["Time Series (5min)"])[0]; // Берем первый элемент, так как он самый последний
    const lastData = stockData["Time Series (5min)"][lastTimeStamp];

    // Создаем HTML с данными
    const stockInfo = `
        <p><strong>Symbol:</strong> ${stockData["Meta Data"]["2. Symbol"]}</p>
        <p><strong>Last Refreshed:</strong> ${stockData["Meta Data"]["3. Last Refreshed"]}</p>
        <p><strong>Price (Close):</strong> ${lastData["4. close"]}</p>
        <p><strong>Volume:</strong> ${lastData["5. volume"]}</p>
    `;
    stockInfoDiv.innerHTML = stockInfo;
}

// Получение популярных акций
document.getElementById('getPopularStocksBtn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${apiUrl}/stocks/popular`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch popular stocks');
        }

        const popularStocks = await response.json();
        displayPopularStocks(popularStocks);
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Функция для отображения популярных акций
function displayPopularStocks(stocks) {
    const popularStocksList = document.getElementById('popularStocksList');
    popularStocksList.innerHTML = '';  // Очищаем список перед отображением новых данных

    if (stocks.length === 0) {
        popularStocksList.innerHTML = 'No popular stocks found.';
        return;
    }

    stocks.forEach(stock => {
        const stockItem = document.createElement('li');
        stockItem.textContent = `Symbol: ${stock.symbol}, Price: ${stock.price}`;
        popularStocksList.appendChild(stockItem);
    });
}