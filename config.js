// ==========================================
// ⚙️ config.js (Updated for Multi-Level)
// ==========================================
const TAS_CONFIG = {
    SUPABASE_URL: "https://tdcmbskmlrwhbjrjyjkk.supabase.co",
    SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkY21ic2ttbHJ3aGJqcmp5amtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTY4NTYsImV4cCI6MjA3ODE5Mjg1Nn0.FeYe75J8X_2LoQgG_JWyPNCKcuCL_otsmSW0s5bijAg", 
    
    TABLE_USER: "Personnel",
    TABLE_SETTINGS: "Settings",
    TABLE_SOURCE: "TimeStamp", // ใช้ TimeStamp ตามที่คุยกันล่าสุด
    TABLE_TARGET: "TimeStamp"
};

let sbClient = null;

function initSystem() {
    if (typeof window.supabase === 'undefined') return false;
    sbClient = window.supabase.createClient(TAS_CONFIG.SUPABASE_URL, TAS_CONFIG.SUPABASE_KEY);
    return true;
}

// ✅ 1. checkAuth: ตรวจสอบแค่ว่า "ล็อกอินหรือยัง" (ไม่เช็ค Level)
function checkAuth() {
    const stored = localStorage.getItem('tas_user');
    if (!stored) { 
        window.location.href = 'login.html'; 
        return null; 
    }
    return JSON.parse(stored);
}

// ✅ 2. checkAccess: ฟังก์ชันเสริมสำหรับหน้าเฉพาะทาง (เช่น process.html)
// วิธีใช้: checkAccess(['1', '2']) -> อนุญาตเฉพาะ Level 1 และ 2
function checkAccess(allowedLevels) {
    const user = checkAuth();
    if (user) {
        const myLevel = String(user.level);
        if (!allowedLevels.includes(myLevel)) {
            alert(`⛔ คุณไม่มีสิทธิ์เข้าถึงหน้านี้ (Level ${myLevel})`);
            window.location.href = 'menu.html';
            return false;
        }
    }
    return true;
}

function logout() {
    localStorage.removeItem('tas_user');
    window.location.href = 'login.html';
}

function generateID() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const r = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}${r}`;
}

initSystem();
