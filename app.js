// Centralized state system
let state = {
    spending: 0.00,
    savings: 0.00,
    automation: {
        amount: 0.00,
        lastProcessed: null
    },
    transactions: []
};

// Initialize app data on launch
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    processWeeklyAutomation();
    renderUI();
    setupEventListeners();
});

// Load state data safely from system localStorage
function loadData() {
    const savedData = localStorage.getItem('apex_ledger_data');
    if (savedData) {
        try {
            state = JSON.parse(savedData);
        } catch (e) {
            console.error("Error breaking down saved payload, resetting storage structures", e);
        }
    }
}

// Save active configurations down to Local Storage arrays
function saveData() {
    localStorage.setItem('apex_ledger_data', JSON.stringify(state));
}

// Background checking calculations to catch up on allowance automation values
function processWeeklyAutomation() {
    if (state.automation.amount > 0 && state.automation.lastProcessed) {
        const now = new Date();
        const lastCheck = new Date(state.automation.lastProcessed);
        
        // Calculate the difference in milliseconds and translate to days
        const timeDiff = now.getTime() - lastCheck.getTime();
        const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const weeksPassed = Math.floor(daysPassed / 7);

        if (weeksPassed > 0) {
            const calculatedAllowance = state.automation.amount * weeksPassed;
            state.spending += calculatedAllowance;
            
            // Log the processed tracking into transaction ledger
            state.transactions.unshift({
                id: Date.now(),
                desc: `Automated Allowance (${weeksPassed} Wk${weeksPassed > 1 ? 's' : ''})`,
                amount: calculatedAllowance,
                type: 'income',
                account: 'spending',
                date: now.toLocaleDateString()
            });

            // Advance the tracking stamp by exactly the weeks processed
            lastCheck.setDate(lastCheck.getDate() + (weeksPassed * 7));
            state.automation.lastProcessed = lastCheck.toISOString();
            
            saveData();
        }
    }
}

// Render dynamic elements cleanly into view objects
function renderUI() {
    const total = state.spending + state.savings;
    
    document.getElementById('total-balance').textContent = formatCurrency(total);
    document.getElementById('spending-balance').textContent = formatCurrency(state.spending);
    document.getElementById('savings-balance').textContent = formatCurrency(state.savings);

    // Dynamic automation labels updates
    const autoStatusText = document.getElementById('automation-status');
    if (state.automation.amount > 0) {
        autoStatusText.textContent = `Active: $${state.automation.amount.toFixed(2)} added weekly.`;
        autoStatusText.style.color = 'var(--accent-green)';
    } else {
        autoStatusText.textContent = 'Automation: Inactive / Off';
        autoStatusText.style.color = 'var(--text-muted)';
    }

    // Process out histories records list templates
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
                <p>${tx.date} • Account: ${tx.account}</p>
            </div>
            <div class="tx-amount ${colorClass}">${sign}${formatCurrency(tx.amount)}</div>
        `;
        dynamicHistoryList.appendChild(li);
    });
}

// Form logic helper functions
function setupEventListeners() {
    // Basic Deposit / Expense Log Processing
    document.getElementById('transaction-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('tx-type').value;
        const account = document.getElementById('tx-account').value;
        const amount = parseFloat(document.getElementById('tx-amount').value);
        const desc = document.getElementById('tx-desc').value.trim();

        if (type === 'expense' && state[account] < amount) {
            alert(`Insufficient funds in your ${account} balance to execute this mock expense transaction.`);
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

        saveData();
        renderUI();
        e.target.reset();
    });

    // Account to Account Transfer Processing Actions
    document.getElementById('transfer-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const fromAcc = document.getElementById('tf-from').value;
        const toAcc = document.getElementById('tf-to').value;
        const amount = parseFloat(document.getElementById('tf-amount').value);

        if (fromAcc === toAcc) {
            alert("Origin and destination accounts cannot match.");
            return;
        }

        if (state[fromAcc] < amount) {
            alert(`Insufficient funds in ${fromAcc} to handle this transfer.`);
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

        saveData();
        renderUI();
        e.target.reset();
    });

    // Setup Allowance Rules Configuration Processing
    document.getElementById('automation-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('auto-amount').value);
        
        if (isNaN(amount) || amount <= 0) {
            state.automation.amount = 0;
            state.automation.lastProcessed = null;
            alert("Allowance Automation turned off.");
        } else {
            state.automation.amount = amount;
            state.automation.lastProcessed = new Date().toISOString();
            alert(`Automation active! $${amount.toFixed(2)} will deposit to your Spending account every 7 days.`);
        }
        
        saveData();
        renderUI();
    });

    // Master Clear system triggers
    document.getElementById('clear-data-btn').addEventListener('click', () => {
        if (confirm("Are you sure you want to clear your data? This will clear balances and transaction histories.")) {
            state = { spending: 0, savings: 0, automation: { amount: 0, lastProcessed: null }, transactions: [] };
            saveData();
            renderUI();
        }
    });
}

// UI Tabs management logic helper switcher
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

// Utility text parsers configurations
function formatCurrency(num) {
    return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
