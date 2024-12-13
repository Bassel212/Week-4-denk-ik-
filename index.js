// Countdown Timer for New Year
let countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();

let counter = setInterval(() => {
    // Get Current Time
    let dataNow = new Date().getTime();

    // Calculate the Difference
    let dateDiff = countDownDate - dataNow;

    // Time Units
    let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

    // Display Results
    document.querySelector("#days").textContent = days;
    document.querySelector("#hours").textContent = hours;
    document.querySelector("#minutes").textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.querySelector("#seconds").textContent = seconds < 10 ? `0${seconds}` : seconds;

    // Stop Countdown if Past
    if (dateDiff < 0) {
        clearInterval(counter);
        document.querySelector("#countdown").textContent = "🎉 Happy New Year!";
    }
}, 1000);

// Cookie Banner Management
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
}

function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner && !getCookie('cookieConsent')) {
        banner.style.display = 'block';
    }
}

function handleCookieConsent(consent) {
    setCookie('cookieConsent', consent, 365); // Save for 1 year
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';
}

document.getElementById('accept-cookies')?.addEventListener('click', () => {
    handleCookieConsent('accepted');
});

document.getElementById('reject-cookies')?.addEventListener('click', () => {
    handleCookieConsent('rejected');
});

document.addEventListener('DOMContentLoaded', showCookieBanner);

// Dark Mode Toggle
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

if (toggleButton) {
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '☀️';
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            toggleButton.textContent = '☀️';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggleButton.textContent = '🌙';
        }
    });
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.link');

hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

// Greeting Based on Time
function showGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;

    const currentHour = new Date().getHours();
    let greetingMessage = "Hallo";

    if (currentHour >= 5 && currentHour < 12) {
        greetingMessage = "Goedemorgen!";
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingMessage = "Goedemiddag!";
    } else if (currentHour >= 18 && currentHour < 22) {
        greetingMessage = "Goedenavond!";
    } else {
        greetingMessage = "Goedenacht!";
    }

    greetingElement.textContent = greetingMessage;
}

document.addEventListener('DOMContentLoaded', showGreeting);
