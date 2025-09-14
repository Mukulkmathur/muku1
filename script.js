// ===========================
// Translation Dictionary
// ===========================
const translations = {
  en: {
    nav_home: "Home",
    nav_features: "Features",
    nav_about: "About",
    nav_contact: "Contact",
    login: "Login",
    register_here: "Register here",
    already_account: "Already have an account?",
    dont_have_account: "Don't have an account?",
    email_label: "Email:",
    password_label: "Password:",
    confirm_password_label: "Confirm Password:",
    hero_title: "Welcome to Krishi Setu",
    hero_subtitle: "Your Agri-Tech Knowledge Partner",
    hero_description: "AI-powered farming solution at your fingertips. Get instant crop advice, disease detection, and weather updates in your local language.",
    ask_question: "Ask your Question",
    upload_image: "Upload Image",
    chat_placeholder: "Type your message..."
  },
  hi: {
    nav_home: "होम",
    nav_features: "विशेषताएँ",
    nav_about: "हमारे बारे में",
    nav_contact: "संपर्क करें",
    login: "लॉगिन",
    register_here: "यहाँ पंजीकरण करें",
    already_account: "क्या आपके पास पहले से खाता है?",
    dont_have_account: "खाता नहीं है?",
    email_label: "ईमेल:",
    password_label: "पासवर्ड:",
    confirm_password_label: "पासवर्ड पुष्टि करें:",
    hero_title: "कृषि सेतु में आपका स्वागत है",
    hero_subtitle: "आपका कृषि-टेक ज्ञान साथी",
    hero_description: "एआई-संचालित खेती समाधान आपकी उंगलियों पर। तुरंत फसल सलाह, रोग पहचान, और मौसम अपडेट अपनी स्थानीय भाषा में प्राप्त करें।",
    ask_question: "अपना प्रश्न पूछें",
    upload_image: "छवि अपलोड करें",
    chat_placeholder: "अपना संदेश टाइप करें..."
  },
  ml: {
    nav_home: "ഹോം",
    nav_features: "സവിശേഷതകൾ",
    nav_about: "ഞങ്ങളെക്കുറിച്ച്",
    nav_contact: "ബന്ധപ്പെടുക",
    login: "ലോഗിൻ",
    register_here: "ഇവിടെ രജിസ്റ്റർ ചെയ്യുക",
    already_account: "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?",
    dont_have_account: "അക്കൗണ്ട് ഇല്ലേ?",
    email_label: "ഇമെയിൽ:",
    password_label: "പാസ്വേഡ്:",
    confirm_password_label: "പാസ്വേഡ് സ്ഥിരീകരിക്കുക:",
    hero_title: "കൃഷി സേതുവിലേക്ക് സ്വാഗതം",
    hero_subtitle: "നിങ്ങളുടെ അഗ്രി-ടെക് നോളജ് പാർട്ണർ",
    hero_description: "എഐ-പവർഡ് ഫാമിംഗ് സൊല്യൂഷൻ നിങ്ങളുടെ വിരലടികളിൽ. ഉടൻ വിളവെടുപ്പ് ഉപദേശം, രോഗം കണ്ടെത്തൽ, കാലാവസ്ഥ അപ്‌ഡേറ്റുകൾ നിങ്ങളുടെ പ്രാദേശിക ഭാഷയിൽ.",
    ask_question: "നിങ്ങളുടെ ചോദ്യം ചോദിക്കുക",
    upload_image: "ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    chat_placeholder: "നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക..."
  }
};

// ===========================
// Function to update all translatable elements
// ===========================
function setLanguage(lang) {
  if (!translations[lang]) {
    console.warn(`Language '${lang}' not found. Falling back to English.`);
    lang = 'en';
  }

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders separately (for inputs)
  const placeholdersMap = {
    'login-email': 'email_label',
    'login-password': 'password_label',
    'register-email': 'email_label',
    'register-password': 'password_label',
    'register-password-confirm': 'confirm_password_label'
  };

  Object.entries(placeholdersMap).forEach(([id, key]) => {
    const input = document.getElementById(id);
    if (input && translations[lang][key]) {
      input.placeholder = translations[lang][key];
    }
  });

  // Update chat input placeholder if exists
  const chatInput = document.querySelector(".chat-input input[type='text']");
  if (chatInput && translations[lang].chat_placeholder) {
    chatInput.placeholder = translations[lang].chat_placeholder;
  }

  // Update current language label in dropdown
  const currentLangSpan = document.getElementById('current-lang');
  if (currentLangSpan) {
    const langNames = { en: "English", hi: "Hindi", ml: "Malayalam" };
    currentLangSpan.textContent = langNames[lang] || "English";
  }
}

// ===========================
// Language Dropdown Event Listeners
// ===========================
document.querySelectorAll('.dropdown-content a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const selectedLangText = link.textContent.trim().toLowerCase();
    let selectedLang = 'en'; // default

    if (selectedLangText === 'hindi') selectedLang = 'hi';
    else if (selectedLangText === 'malayalam') selectedLang = 'ml';

    setLanguage(selectedLang);
  });
});

// ===========================
// Modal Open/Close Logic
// ===========================
const authModal = document.getElementById('auth-modal');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const navLoginBtn = document.querySelector('button.nav-item'); // Assuming only one login button
const modalCloseBtn = authModal ? authModal.querySelector('.modal-close') : null;

function openModal() {
  if (!authModal || !loginForm || !registerForm) return;

  authModal.classList.add('show');
  authModal.setAttribute('aria-hidden', 'false');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
  const firstInput = loginForm.querySelector('input');
  if (firstInput) firstInput.focus();
}

function closeModal() {
  if (!authModal) return;

  authModal.classList.remove('show');
  authModal.setAttribute('aria-hidden', 'true');
}

if (navLoginBtn) {
  navLoginBtn.addEventListener('click', openModal);
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

if (authModal) {
  authModal.addEventListener('click', e => {
    if (e.target === authModal) closeModal();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && authModal && authModal.classList.contains('show')) {
    closeModal();
  }
});

// Switch between login and register forms
document.addEventListener('click', e => {
  if (!loginForm || !registerForm) return;

  if (e.target && e.target.id === 'show-register') {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
    const firstInput = registerForm.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  if (e.target && e.target.id === 'show-login') {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
    const firstInput = loginForm.querySelector('input');
    if (firstInput) firstInput.focus();
  }
});

// ===========================
// Initialize default language
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  setLanguage('en');
});
