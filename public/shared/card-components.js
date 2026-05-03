/**
 * Shared Digital Card Components
 * Use these variables and functions to avoid code repetition.
 */

const ICONS = {
    phone: `<svg viewBox="0 0 15 15" fill="currentColor"><path fill-rule="evenodd" d="M14.73 12.996c-.463 1.407-2.277 2.109-3.573 1.992-1.77-.16-3.696-1.099-5.158-2.133C3.85 11.335 1.837 8.984.664 6.489-.165 4.726-.351 2.558.882.951c.456-.594.95-.911 1.69-.948C3.6-.047 3.744.541 4.097 1.457c.263.685.614 1.384.81 2.094.367 1.325-.916 1.38-1.078 2.463-.1.683.727 1.599 1.101 2.086a10.105 10.105 0 0 0 2.608 2.403c.57.359 1.488 1.006 2.14.649 1.004-.55.91-2.243 2.313-1.67.727.296 1.431.723 2.125 1.097 1.073.577 1.023 1.175.614 2.417-.306.928.306-.928 0 0"></path></svg>`,
    mail: `<svg viewBox="0 0 512 512" fill="currentColor"><path d="M60.2354 150.588C60.2354 133.955 73.7195 120.471 90.353 120.471H421.647C438.281 120.471 451.765 133.955 451.765 150.588V172.358L255.799 278.118L60.2354 171.409V150.588Z"></path><path d="M60.2354 205.719V361.412C60.2354 378.045 73.7195 391.53 90.353 391.53H421.647C438.281 391.53 451.765 378.045 451.765 361.412V206.581L262.911 308.504C258.426 310.924 253.021 310.912 248.546 308.471L60.2354 205.719Z"></path></svg>`,
    map: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2a8.009,8.009,0,0,0-8,8c0,3.255,2.363,5.958,4.866,8.819,0.792,0.906,1.612,1.843,2.342,2.791a1,1,0,0,0,1.584,0c0.73-.948,1.55-1.885,2.342-2.791C17.637,15.958,20,13.255,20,10A8.009,8.009,0,0,0,12,2Zm0,11a3,3,0,1,1,3-3A3,3,0,0,1,12,13Z"></path></svg>`,
    whatsapp: `<svg viewBox="0 0 737.509 740.824" fill="currentColor"><path fill-rule="evenodd" d="M630.056 107.658C560.727 38.271 468.525.039 370.294 0 167.891 0 3.16 164.668 3.079 367.072c-.027 64.699 16.883 127.855 49.016 183.523L0 740.824l194.666-51.047c53.634 29.244 114.022 44.656 175.481 44.682h.151c202.382 0 367.128-164.689 367.21-367.094.039-98.088-38.121-190.32-107.452-259.707m-259.758 564.8h-.125c-54.766-.021-108.483-14.729-155.343-42.529l-11.146-6.613-115.516 30.293 30.834-112.592-7.258-11.543c-30.552-48.58-46.689-104.729-46.665-162.379C65.146 198.865 202.065 62 370.419 62c81.521.031 158.154 31.81 215.779 89.482s89.342 134.332 89.311 215.859c-.07 168.242-136.987 305.117-305.211 305.117m167.415-228.514c-9.176-4.591-54.286-26.782-62.697-29.843-8.41-3.061-14.526-4.591-20.644 4.592-6.116 9.182-23.7 29.843-29.054 35.964-5.351 6.122-10.703 6.888-19.879 2.296-9.175-4.591-38.739-14.276-73.786-45.526-27.275-24.32-45.691-54.36-51.043-63.542-5.352-9.183-.569-14.148 4.024-18.72 4.127-4.11 9.175-10.713 13.763-16.07 4.587-5.356 6.116-9.182 9.174-15.303 3.059-6.122 1.53-11.479-.764-16.07-2.294-4.591-20.643-49.739-28.29-68.104-7.447-17.886-15.012-15.466-20.644-15.746-5.346-.266-11.469-.323-17.585-.323-6.117 0-16.057 2.296-24.468 11.478-8.41 9.183-32.112 31.374-32.112 76.521s32.877 88.763 37.465 94.885c4.587 6.122 64.699 98.771 156.741 138.502 21.891 9.45 38.982 15.093 52.307 19.323 21.981 6.979 41.983 5.994 57.793 3.633 17.628-2.633 54.285-22.19 61.932-43.616 7.646-21.426 7.646-39.791 5.352-43.617-2.293-3.826-8.41-6.122-17.585-10.714" clip-rule="evenodd"></path></svg>`,
    save: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z"/></svg>`,
    wallet: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 13.913v-3.826c1.161-.319 2-.99 2-1.787 0-1.104-1.614-2.3-4-2.3h-19v15h19c2.386 0 4-1.196 4-2.3 0-.797-.839-1.468-2-1.787zm-18-5.913h15c1.654 0 2 .515 2 .8 0 .285-.346.8-2 .8h-15v-1.6zm15 11.5c-1.654 0-2-.515-2-.8 0-.285.346-.8 2-.8h3v1.6h-3zm-1-6.5c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    share: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 7c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zm0-2c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm14 11c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zm0-2c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0-13c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zm0-2c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z"/></svg>`
};

// Global SVG Constraint
const style = document.createElement('style');
style.textContent = `
    svg { max-width: 100%; max-height: 100%; }
    .icon-box svg, .footer-btn svg, button svg { 
        width: 20px !important; 
        height: 20px !important; 
        display: inline-block; 
        vertical-align: middle;
        fill: currentColor;
        stroke: none;
    }
    .action-circle svg { width: 22px !important; height: 22px !important; }
    .footer-btn { display: flex; align-items: center; justify-content: center; gap: 8px; }
`;
document.head.appendChild(style);

/**
 * Injects a shared Action Grid into a container
 * @param {string} containerId 
 * @param {Array} actions - List of action types ['phone', 'mail', etc]
 */
function renderActionGrid(containerId, actions) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = actions.map(type => `
        <div class="action-circle icon-box" onclick="handleAction('${type}')">
            ${ICONS[type] || ''}
        </div>
    `).join('');
}

/**
 * Shared Wallet Logic
 * @param {Object} cardData 
 */
function saveToWallet(cardData) {
    let wallet = JSON.parse(localStorage.getItem('bizzcards_wallet') || '[]');
    if (!wallet.find(c => c.id === cardData.id)) {
        wallet.push({
            ...cardData,
            url: cardData.url || window.location.pathname,
            timestamp: new Date().getTime()
        });
        localStorage.setItem('bizzcards_wallet', JSON.stringify(wallet));
    }
    showToast('✨ Added to Your Wallet!');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
