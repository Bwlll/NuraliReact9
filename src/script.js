let users = []; 
let currentPage = 1;
const usersPerPage = 5;

function togglePassword(index) {
    const passwordDiv = document.getElementById(`password-${index}`);
    passwordDiv.style.display = (passwordDiv.style.display === "none" || passwordDiv.style.display === "") ? "block" : "none";
}

function searchUsers() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchValue) || 
        user.email.toLowerCase().includes(searchValue)
    );
    displayUsers(filteredUsers);
}

function displayUsers(usersToDisplay) {
    const start = (currentPage - 1) * usersPerPage;
    const end = start + usersPerPage;
    const paginatedUsers = usersToDisplay.slice(start, end);

    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    paginatedUsers.forEach((user, index) => {
        const userItem = document.createElement('li');
        userItem.classList.add('user-card');
        userItem.innerHTML = `
            <div>
                <strong>Name:</strong> ${user.name} <br>
                <strong>Email:</strong> ${user.email} <br>
                <button onclick="togglePassword(${index})" class="btn-toggle">
                    Show Password
                </button>
                <div id="password-${index}" class="password" style="display:none;">
                    <strong>Password:</strong> ${user.password} <br />
                </div>
            </div>
        `;
        userList.appendChild(userItem);
    });
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayUsers(users);
    }
}

function nextPage() {
    const totalPages = Math.ceil(users.length / usersPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayUsers(users);
    }
}

axios.get('https://fakeapi.platzi.com/en/rest/users/')
    .then(response => {
        users = response.data;
        displayUsers(users);
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
