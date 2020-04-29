let count = document.querySelector('#start'),
    result = document.querySelector('.result-table'),
    values = result.querySelectorAll('[class*="value"]'),
    optexpens = document.querySelectorAll('div.data input[class=expenses-item]'),
    expensBtn = document.querySelector('.expenses-item-btn'),
    appr = document.querySelector('div.data  button[class=optionalexpenses-btn]'),
    cntBtn = document.querySelector('.count-budget-btn'),
    optExpInput = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    savingsCheck = document.querySelector('#savings'),
    chooseSum = document.querySelector('#sum'),
    choosePercent = document.querySelector('.choose-percent'),
    openBtn = document.querySelector('.open'),
    date = document.querySelectorAll('div.time-data [class*="value"]'),
    allBtns = document.querySelectorAll('button');

allBtns.forEach(function (item) {
    if (item.classList[0] != 'start') {
        item.toggleAttribute('disabled')
    }
})


let money, time;

let appData = {
    budget: money,
    date: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,

};

savingsCheck.addEventListener('click', function () {
    if (appData.savings) {
        appData.savings = false
    } else {
        appData.savings = true;
    }
});

chooseSum.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        values[6].textContent = appData.monthIncome.toFixed(1);
        values[7].textContent = appData.yearIncome.toFixed(1);

    }
});

choosePercent.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        values[6].textContent = appData.monthIncome.toFixed(1);
        values[7].textContent = appData.yearIncome.toFixed(1);
    }
});

// события инпут происходят когда что то вводят в инпут
// а ченж - когда меняетя фокус с инпута на что то ещё
chooseIncome.addEventListener('input', function () {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    values[5].textContent = appData.income;
});

cntBtn.addEventListener('click', function () {
    if (appData.budget != undefined) {
        let sumexp = 0
        for (key in appData.expenses) {
            sumexp += +appData.expenses[key]
        }
        let total = ((money - sumexp) / 30).toFixed()
        appData.moneyPerDay = total;
        values[1].textContent = total;

        let notation;
        if (total <= 100) {
            notation = 'Budget too low';
        } else if (total > 100 && total < 2000) {
            notation = 'You are a middle-class!';
        } else if (total > 2000) {
            notation = 'You are rich!';
        }
        values[2].textContent = notation
    }
    else {
        values[2].textContent = 'Произошла ошибка';
    }
});

count.addEventListener('click', function () {
    allBtns.forEach(function (item) {
        if (item.classList[0] != 'start') {
            item.toggleAttribute('disabled')
        }
    })
    time = prompt('Write date in YYYY-MM-DD format', '')
    money = +prompt('Your monthly budget:', '')

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt('Your monthly budget:')
        console.log(money)
    }
    appData.budget = money;
    appData.date = time;
    values[0].textContent = money.toFixed();
    date[0].value = new Date(Date.parse(time)).getFullYear();
    date[1].value = new Date(Date.parse(time)).getMonth() + 1;
    date[2].value = new Date(Date.parse(time)).getDate();

});



appr.addEventListener('click', function () {
    for (let i = 0; i < optExpInput.length; i++) {
        //let quest = prompt('Необязательный расход:')
        let opt = optExpInput[i].value;
        appData.optionalExpenses[i] = opt;
        values[4].textContent += appData.optionalExpenses[i] + ' ';
    }

});

expensBtn.addEventListener('click', function () {
    let sum = 0;
    for (let i = 0; i < optexpens.length - 1; i++) {
        let a = optexpens[i].value
        let b = optexpens[++i].value;

        if ((typeof (a) != null) && (a != '') && (b != '') && (b != null) && (a.length < 50)) {
            console.log('done')
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
    }
    values[3].textContent = sum;

});

// for (i in appData) {
//     console.log('Программа включает в себя данные:')
//     console.log(appData[i]);
// }
