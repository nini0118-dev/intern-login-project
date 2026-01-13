// 實習作業：登入系統
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const msg = document.getElementById('msg');

// 顯示訊息的工具函式
function showMessage(text, type) {
    msg.innerText = text;
    msg.style.display = "block";
    if (type === "error") {
        msg.style.backgroundColor = "#ffebee";
        msg.style.color = "#c62828";
    } else {
        msg.style.backgroundColor = "#e8f5e9";
        msg.style.color = "#2e7d32";
    }
}

// 驗證格式的工具函式
function validateFormat(email, pwd) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!emailRegex.test(email)) {
        showMessage("帳號格式錯誤", "error");
        return false;
    }
    if (!pwdRegex.test(pwd)) {
        showMessage("密碼格式錯誤 \n需包括至少8位大小寫字母、數字及符號", "error");
        return false;
    }
    return true;
}

// --- 登入 ---
loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const pwd = document.getElementById('password').value;

    if (!email || !pwd) return showMessage("請輸入帳號與密碼", "error");

    const savedPwd = localStorage.getItem(email);

    if (savedPwd === null) {
        // 如果 localStorage 找不到這個 email
        showMessage("此帳號還未註冊，請先註冊", "error");
    } else if (savedPwd === pwd) {
        showMessage("登入成功！歡迎使用此系統", "success");
    } else {
        showMessage("密碼錯誤，請再試一次", "error");
    }
});

// --- 註冊 ---
registerBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const pwd = document.getElementById('password').value;

    if (!validateFormat(email, pwd)) return;

    if (localStorage.getItem(email) !== null) {
        return showMessage("此帳號已註冊，請點選登入", "error");
    }

    localStorage.setItem(email, pwd);
    showMessage("註冊成功！請點擊登入", "success");
});