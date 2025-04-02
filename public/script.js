// Динамическое обновление времени
function updateTime() {
    document.getElementById('live-time').textContent = new Date().toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// Показ кода сервера
document.getElementById('show-code').addEventListener('click', async () => {
    const codeBlock = document.getElementById('server-code');
    
    if (codeBlock.style.display === 'block') {
        codeBlock.style.display = 'none';
        return;
    }

    try {
        const response = await fetch('/server.js');
        const code = await response.text();
        codeBlock.textContent = code;
        codeBlock.style.display = 'block';
    } catch (error) {
        codeBlock.textContent = 'Ошибка загрузки кода: ' + error.message;
        codeBlock.style.display = 'block';
    }
});

// Установка текущего года
document.getElementById('current-year').textContent = new Date().getFullYear();

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '/') return;
        
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
