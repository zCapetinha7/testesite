document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/server-info')
        .then(response => response.json())
        .then(data => {
            document.getElementById('server-name').textContent = data.name;
            document.getElementById('member-count').textContent = data.memberCount;
            document.getElementById('online-count').textContent = data.onlineCount;

            const adminList = document.getElementById('admin-list');
            data.admins.forEach(admin => {
                const li = document.createElement('li');
                li.textContent = `${admin.username} (ID: ${admin.id})`;
                adminList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao obter informações do servidor:', error));
});
