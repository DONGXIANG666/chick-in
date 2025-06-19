const checkInButton = document.getElementById('check-in-button');
const checkInHistoryList = document.getElementById('check-in-history');
const dailyCountDisplay = document.getElementById('daily-count');
const lastCheckInTimeDisplay = document.getElementById('last-check-in-time');

let checkInHistory = JSON.parse(localStorage.getItem('checkInHistory')) || [];
let dailyCheckIn = JSON.parse(localStorage.getItem('dailyCheckIn')) || { date: '', count: 0 };

function getTodayDate() {
    const today = new Date();
    return today.toDateString(); // e.g., "Mon Jan 01 2024"
}

function updateDailyCount() {
    const todayDate = getTodayDate();
    if (dailyCheckIn.date !== todayDate) {
        dailyCheckIn = { date: todayDate, count: 0 };
    }
    dailyCheckIn.count++;
    localStorage.setItem('dailyCheckIn', JSON.stringify(dailyCheckIn));
    dailyCountDisplay.textContent = dailyCheckIn.count;
}

function updateLastCheckInTime(timestamp) {
    lastCheckInTimeDisplay.textContent = timestamp;
}

function addCheckInRecord() {
    const now = new Date();
    const timestamp = now.toLocaleString();
    const record = { timestamp };
    checkInHistory.unshift(record); // Add to the beginning
    localStorage.setItem('checkInHistory', JSON.stringify(checkInHistory));
    renderCheckInHistory();
    updateLastCheckInTime(timestamp);
    updateDailyCount();
}

function renderCheckInHistory() {
    checkInHistoryList.innerHTML = ''; // Clear existing list
    checkInHistory.forEach(record => {
        const listItem = document.createElement('li');
        listItem.textContent = record.timestamp;
        checkInHistoryList.appendChild(listItem);
    });
}

// Event Listener for the Check-in Button
checkInButton.addEventListener('click', () => {
    addCheckInRecord();
});

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
    if (confirm('确定要清除所有打卡记录吗？这将同时重置今日打卡次数。')) {
        localStorage.removeItem('checkInHistory');
        localStorage.removeItem('dailyCheckIn');
        checkInHistory = [];
        dailyCheckIn = { date: '', count: 0 };
        renderCheckInHistory();
        dailyCountDisplay.textContent = 0;
        lastCheckInTimeDisplay.textContent = '无';
    }
});

// Initial display on page load
const todayDate = getTodayDate();
if (dailyCheckIn.date !== todayDate) {
    dailyCheckIn = { date: todayDate, count: 0 };
    localStorage.setItem('dailyCheckIn', JSON.stringify(dailyCheckIn));
}
dailyCountDisplay.textContent = dailyCheckIn.count;

if (checkInHistory.length > 0) {
    lastCheckInTimeDisplay.textContent = checkInHistory[0].timestamp;
} else {
    lastCheckInTimeDisplay.textContent = '无';
}

renderCheckInHistory(); 