const notificationsNum = document.getElementById('notifications-num');
const readAllBtn = document.getElementById('read-all-btn');
const unreads = document.querySelectorAll('.unread')

readAllBtn.addEventListener('click', e => {
  notificationsNum.innerText = 0;

  unreads.forEach(unread => unread.classList.remove('unread'))
})

console.log('li')