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
        displayUsers(users); // Отображаем список пользователей
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Функция для отображения списка пользователей
function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';  // Очищаем список перед отображением новых данных

    // Если нет пользователей
    if (users.length === 0) {
        usersList.innerHTML = 'No users found.';
        return;
    }

    // Создаем элементы списка для каждого пользователя
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = `Email: ${user.email}`;  // Можно добавить другие поля, если нужно
        usersList.appendChild(userItem);
    });
}