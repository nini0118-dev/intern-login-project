new Vue({
    el: '#app',
    data: {
        email: '',
        password: '',
        message: {
            text: '',
            type: '' // 'success' 或 'error'
        }
    },
    methods: {
        // 顯示訊息
        showMessage(text, type) {
            this.message.text = text;
            this.message.type = type;
        },

        // 驗證格式
        validateFormat() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

            if (!emailRegex.test(this.email)) {
                this.showMessage("帳號格式錯誤", "error");
                return false;
            }
            if (!pwdRegex.test(this.password)) {
                this.showMessage("密碼格式錯誤\n（需 8 字元以上，含大小寫英數及符號）", "error");
                return false;
            }
            return true;
        },
        // 登入邏輯

        handleLogin() {
            if (!this.email || !this.password) {
                return this.showMessage("請輸入帳號與密碼", "error");
            }

            const savedPwd = localStorage.getItem(this.email);

            if (savedPwd === null) {
                this.showMessage("此帳號還未註冊，請先註冊", "error");
            } else if (savedPwd === this.password) {
                this.showMessage("登入成功！歡迎使用此系統", "success");
            } else {
                this.showMessage("密碼錯誤，請再試一次", "error");
            }
        },

        // 註冊邏輯
        handleRegister() {
            if (!this.validateFormat()) return;

            if (localStorage.getItem(this.email) !== null) {
                return this.showMessage("此帳號已註冊，請點選登入", "error");
            }

            localStorage.setItem(this.email, this.password);
            this.showMessage("註冊成功！請點擊登入", "success");
        }
    }
});