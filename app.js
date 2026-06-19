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
            // Ensure schema updates exist for older versions
            if (!state.automation.hasOwnProperty('dayOfWeek')) {
                state.automation.dayOfWeek = "5"; // Default to Friday
            }
        } catch (e) {
            console.error("Error reading storage formats, restoring structural defaults.", e);
        }
    }
}

function saveData() {
    localStorage.setItem('apex_ledger_data', JSON.stringify(state));
}

// Scans calendar dates between access windows to grant exact allowance packages
function processWeeklyAutomation() {
    if (state.automation.amount > 0 && state.automation.lastProcessed && state.automation.dayOfWeek !== null) {
        const now = new Date();
        let lastCheck = new Date(state.automation.lastProcessed);
        
        // Zero hours to lock checks exclusively on calendar dates
        now.setHours(0,0,0,0);
        lastCheck.setHours(0,0,0,0);

        let triggerCount = 0;
        let runningDayTracker = new Date(lastCheck);
        
        // Advance tracking one step forward from the last processed date
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
        
        // Populate current options into inputs for quick reference/editing
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
    // Standard Manual Logging Structures
    document.getElementById('transaction-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('tx-type').value;
        const account = document.getElementById('tx-account').value;
        const amount = parseFloat(document.getElementById('tx-amount').value);
        const desc = document.getElementById('tx-desc').value.trim();

        if (type === 'expense' && state[account] < amount) {
            alert(`Insufficient funds in your ${account} balance.`);
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

    // Vault to Vault Internal System Transfers
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
            alert(`Insufficient funds in ${fromAcc} to complete transfer.`);
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

    // Save or Edit Automation Rules
    document.getElementById('automation-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('auto-amount').value);
        const day = document.getElementById('auto-day').value;
        
        if (isNaN(amount) || amount <= 0) {
            alert("Please provide an amount greater than zero.");
            return;
        }

        // Apply parameters instantly without wiping bank history
        state.automation.amount = amount;
        state.automation.dayOfWeek = day;
        
        // Establish standard anchor baseline if configuring from scratch
        if (!state.automation.lastProcessed) {
            state.automation.lastProcessed = new Date().toISOString();
        }
        
        alert("Weekly schedule updated successfully!");
        saveData();
        renderUI();
    });

    // Isolate Automation Rules and Remove Them Cleanly
    document.getElementById('cancel-auto-btn').addEventListener('click', () => {
        if (confirm("Are you sure you want to stop your weekly allowance automation? Your current balances will not be altered.")) {
            state.automation.amount = 0;
            state.automation.dayOfWeek = null;
            state.automation.lastProcessed = null;
            
            document.getElementById('automation-form').reset();
            
            saveData();
            renderUI();
        }
    });

    document.getElementById('clear-data-btn').addEventListener('click', () => {
        if (confirm("Master reset? This wipes your entire history and settings.")) {
            state = { spending: 0, savings: 0, automation: { amount: 0, dayOfWeek: null, lastProcessed: null }, transactions: [] };
            saveData();
            renderUI();
        }
    });
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

// Basic security checks to handle input strings cleanly
function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
