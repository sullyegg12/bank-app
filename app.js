let state = {
    spending: 0.00,
    savings: 0.00,
    automation: {
        amount: 0.00,
        dayOfWeek: null,
        lastProcessed: null
    },
    transactions: []
};

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    processWeeklyAutomation();
    renderUI();
    setupEventListeners();
});

function loadData() {
    const savedData = localStorage.getItem('apex_ledger_data');
    if (savedData) {
        try {
            state = JSON.parse(savedData);
            if (!state.automation.hasOwnProperty('dayOfWeek')) {
                state.automation.dayOfWeek = "5"; 
            }
        } catch (e) {
            console.error("Error reading storage formats, restoring structural defaults.", e);
        }
    }
}

function saveData() {
    localStorage.setItem('apex_ledger_data', JSON.stringify(state));
}

function processWeeklyAutomation() {
    if (state.automation.amount > 0 && state.automation.lastProcessed && state.automation.dayOfWeek !== null) {
        const now = new Date();
        let lastCheck = new Date(state.automation.lastProcessed);
        
        now.setHours(0,0,0,0);
        lastCheck.setHours(0,0,0,0);

        let triggerCount = 0;
        let runningDayTracker = new Date(lastCheck);
        
        runningDayTracker.setDate(runningDayTracker.getDate() + 1);

        while (runningDayTracker <= now) {
            if (runningDayTracker.getDay() === parseInt(state.automation.dayOfWeek)) {
                triggerCount++;
            }
            runningDayTracker.setDate(runningDayTracker.getDate() + 1);
        }

        if (triggerCount > 0) {
            const compiledEarnings = state.automation.amount * triggerCount;
            state.spending += compiledEarnings;
            
            state.transactions.unshift({
                id: Date.now(),
                desc: `Automated Allowance (${triggerCount} Wk${triggerCount > 1 ? 's' : ''})`,
                amount: compiledEarnings,
                type: 'income',
                account: 'spending',
                date: new Date().toLocaleDateString()
            });

            state.automation.lastProcessed = now.toISOString();
            saveData();
        }
    }
}

function renderUI() {
    const total = state.spending + state.savings;
    
    document.getElementById('total-balance').textContent = formatCurrency(total);
    document.getElementById('spending-balance').textContent = formatCurrency(state.spending);
    document.getElementById('savings-balance').textContent = formatCurrency(state.savings);

    const autoStatusText = document.getElementById('automation-status');
    const cancelBtn = document.getElementById('cancel-auto-btn');
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (state.automation.amount > 0 && state.automation.dayOfWeek !== null) {
        const targetDayName = weekdays[parseInt(state.automation.dayOfWeek)];
        autoStatusText.textContent = `Active: $${state.automation.amount.toFixed(2)} automatically arriving every ${targetDayName}.`;
        autoStatusText.style.color = '#34d399';
        cancelBtn.classList.remove('hidden');
        
        document.getElementById('auto-amount').value = state.automation.amount;
        document.getElementById('auto-day').value = state.automation.dayOfWeek;
    } else {
        autoStatusText.textContent = 'Automation: Off';
        autoStatusText.style.color = 'var(--text-muted)';
        cancelBtn.classList.add('hidden');
    }

    const dynamicHistoryList = document.getElementById('transaction-history');
    dynamicHistoryList.innerHTML = '';

    if (state.transactions.length === 0) {
        dynamicHistoryList.innerHTML = `<li class="history-item" style="justify-content: center; color: var(--text-muted); font-size: 13px;">No transactions logged yet.</li>`;
        return;
    }

    state.transactions.forEach(tx => {
        const li = document.createElement('li');
        li.className = 'history-item';
        
        let sign = '';
        let colorClass = 'neutral';
        
        if (tx.type === 'income') { sign = '+'; colorClass = 'positive'; }
        else if (tx.type === 'expense') { sign = '-'; colorClass = 'negative'; }
        
        li.innerHTML = `
            <div class="tx-info">
                <h4>${escapeHTML(tx.desc)}</h4>
                <p>${tx.date} • ${tx.account}</p>
            </div>
            <div class="tx-amount ${colorClass}">${sign}${formatCurrency(tx.amount)}</div>
        `;
        dynamicHistoryList.appendChild(li);
    });
}

function setupEventListeners() {
    // Manual Transaction Form
    document.getElementById('transaction-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('tx-type').value;
        const account = document.getElementById('tx-account').value;
        const amount = parseFloat(document.getElementById('tx-amount').value);
        const desc = document.getElementById('tx-desc').value.trim();

        // Premium Inline Feedback instead of crashing popups
        if (type === 'expense' && state[account] < amount) {
            flashButton('#transaction-form .btn-primary', 'Insufficient Funds!', 'var(--danger)');
            return;
        }

        if (type === 'income') { state[account] += amount; } 
        else { state[account] -= amount; }

        state.transactions.unshift({
            id: Date.now(),
            desc: desc,
            amount: amount,
            type: type,
            account: account,
            date: new Date().toLocaleDateString()
        });

        flashButton('#transaction-form .btn-primary', 'Logged!', '#34d399');
        saveData();
        renderUI();
        e.target.reset();
    });

    // Internal Transfers Form
    document.getElementById('transfer-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const fromAcc = document.getElementById('tf-from').value;
        const toAcc = document.getElementById('tf-to').value;
        const amount = parseFloat(document.getElementById('tf-amount').value);

        if (fromAcc === toAcc || state[fromAcc] < amount) {
            flashButton('#transfer-form .btn-primary', 'Invalid Transfer!', 'var(--danger)');
            return;
        }

        state[fromAcc] -= amount;
        state[toAcc] += amount;

        state.transactions.unshift({
            id: Date.now(),
            desc: `Transfer: ${fromAcc} to ${toAcc}`,
            amount: amount,
            type: 'transfer',
            account: `${fromAcc} → ${toAcc}`,
            date: new Date().toLocaleDateString()
        });

        flashButton('#transfer-form .btn-primary', 'Transferred!', '#34d399');
        saveData();
        renderUI();
        e.target.reset();
    });

    // Save or Edit Allowance Automation (Simply changes configuration, leaves cash alone!)
    document.getElementById('automation-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('auto-amount').value);
        const day = document.getElementById('auto-day').value;
        
        if (isNaN(amount) || amount <= 0) return;

        state.automation.amount = amount;
        state.automation.dayOfWeek = day;
        
        if (!state.automation.lastProcessed) {
            state.automation.lastProcessed = new Date().toISOString();
        }
        
        flashButton('#automation-form .btn-primary', 'Schedule Saved!', '#34d399');
        saveData();
        renderUI();
    });

    // Cancel / Delete Weekly Automation without touching current money pools
    document.getElementById('cancel-auto-btn').addEventListener('click', () => {
        state.automation.amount = 0;
        state.automation.dayOfWeek = null;
        state.automation.lastProcessed = null;
        
        document.getElementById('automation-form').reset();
        
        saveData();
        renderUI();
    });

    // Master clear data button
    document.getElementById('clear-data-btn').addEventListener('click', () => {
        state = { spending: 0, savings: 0, automation: { amount: 0, dayOfWeek: null, lastProcessed: null }, transactions: [] };
        saveData();
        renderUI();
    });
}

// Micro-interaction helper for beautiful visual feedback
function flashButton(selector, text, color) {
    const btn = document.querySelector(selector);
    const oldText = btn.textContent;
    const oldBg = btn.style.background;
    
    btn.textContent = text;
    btn.style.background = color;
    btn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        btn.textContent = oldText;
        btn.style.background = oldBg;
        btn.style.pointerEvents = 'auto';
    }, 1800);
}

window.switchTab = function(tabName) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById('transaction-form').classList.add('hidden');
    document.getElementById('transfer-form').classList.add('hidden');

    if (tabName === 'deposit') {
        document.getElementById('transaction-form').classList.remove('hidden');
        tabs[0].classList.add('active');
    } else {
        document.getElementById('transfer-form').classList.remove('hidden');
        tabs[1].classList.add('active');
    }
}

function formatCurrency(num) {
    return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
