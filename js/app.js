let periodMoney,
  budgetOnTheMonth,
  startCalculation = document.getElementById("start"),
  budgetValue = document.querySelector(".budget-value"),
  dayBudgetValue = document.querySelector(".daybudget-value"),
  levelValue = document.querySelector(".level-value"),
  expensesValue = document.querySelector(".expenses-value"),
  optionalExpensesValue = document.querySelector(".optionalexpenses-value"),
  incomeValue = document.querySelector(".income-value"),
  monthSavingsValue = document.querySelector(".monthsavings-value"),
  yearSavingsValue = document.querySelector(".yearsavings-value"),
  yearValue = document.querySelector(".year-value"),
  monthValue = document.querySelector(".month-value"),
  dayValue = document.querySelector(".day-value"),
  expensesItenBtn = document.querySelector(".expenses-item-btn"),
  optionalExpensesItemBtn = document.querySelector(".optionalexpenses-btn"),
  countBudget = document.querySelector(".count-budget-btn"),
  optionalExpenses = document.getElementsByClassName("optionalexpenses-item"),
  expensesItem = document.getElementsByClassName("expenses-item"),
  chooseIncomeInput = document.querySelector(".choose-income"),
  chooseSum = document.querySelector(".choose-sum"),
  choosePercent = document.querySelector(".choose-percent"),
  checkSavings = document.getElementById("savings");

const appData = {
  budgetOnTheMonth,
  timeData: periodMoney,
  dayOfMonth: 30,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
  isDisabledBtn: true,
  budgetOfTheDay: function () {
    this.budgetOnTheDay = (this.budgetOnTheMonth - this.sumExpenses) / this.dayOfMonth.toFixed();
    dayBudgetValue.textContent = this.budgetOnTheDay;
    this.detectLevel();
  },
  detectLevel: function () {
    if (this.budgetOnTheDay < 100) {
      levelValue.textContent = "Низкий достаток";
    } else if (this.budgetOnTheDay < 1000) {
      levelValue.textContent = "Средний достаток";
    } else if (this.budgetOnTheDay < 10000) {
      levelValue.textContent = "Высокий достаток";
    } else {
        levelValue.textContent = "Пока неизвестен достаток!"
    }
  },
  chooseOptExpenses: function (item) {
    for (let i = 0; i < item.length; i++) {
      let opt = item[i].value;
      this.optionalExpenses[i] = opt;
      optionalExpensesValue.textContent += this.optionalExpenses[i] + " ";
    }
  },
  chooseExpenses: function (item) {
    this.sumExpenses = 0;
    for (let i = 0; i < item.length; i++) {
      let firstQuestion = item[i].value,
        secondQuestion = item[++i].value;

      if (
        typeof firstQuestion === "string" &&
        typeof firstQuestion != null &&
        typeof secondQuestion &&
        firstQuestion != "" &&
        secondQuestion != "" &&
        firstQuestion.length < 50
      ) {
        appData.expenses[firstQuestion] = secondQuestion;
        this.sumExpenses += +secondQuestion;
      } else {
        i = i - 1;
      }
    }
    expensesValue.textContent = this.sumExpenses;
  },
  percentCheck: function () {
    if (this.savings === true) {
      if (this.savings === true) {
        let sum = +chooseSum.value,
          percent = +choosePercent.value;
        this.monthIncome = (sum / 100 / 12) * percent;
        this.yearIncome = (sum / 100) * percent;

        monthSavingsValue.textContent = this.monthIncome.toFixed(1);
        yearSavingsValue.textContent = this.yearIncome.toFixed(1);
      }
    }
  },
  checkSavingsData: function () {
    if (this.savings === true) {
      let sum = +chooseSum.value,
        percent = +choosePercent.value;
      this.monthIncome = (sum / 100 / 12) * percent;
      this.yearIncome = (sum / 100) * percent;

      monthSavingsValue.textContent = this.monthIncome.toFixed(1);
      yearSavingsValue.textContent = this.yearIncome.toFixed(1);
    }
  },
  chooseIncome: function () {
    let item = chooseIncomeInput.value;
    appData.income = item.split(",");
    incomeValue.textContent = appData.income;
  },
  savingCond: function () {
    appData.savings === true
      ? (appData.savings = false)
      : (appData.savings = true);
  },
};

startCalculation.addEventListener("click", function () {
  let disabledBtn = ['.expenses-item-btn', '.optionalexpenses-btn', '.count-budget-btn'];

  for(let elem of disabledBtn) {
      document.querySelector(elem).removeAttribute('disabled');
  }

  periodMoney = prompt("Введите дату в формате YYYY-MM-DD");
  if (typeof periodMoney === "string") {
    yearValue.value = new Date(Date.parse(periodMoney)).getFullYear();
    monthValue.value = new Date(Date.parse(periodMoney)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(periodMoney)).getDate();
  } else {
    alert("Пожалуйста, введите дату");
    return;
  }
  budgetOnTheMonth = +prompt("Ваш бюджет на месяц?");

  while (
    isNaN(budgetOnTheMonth) ||
    budgetOnTheMonth == "" ||
    budgetOnTheMonth == null
  ) {
    budgetOnTheMonth = +prompt("Ваш бюджет на месяц?");
  }

  appData.budgetOnTheMonth = budgetOnTheMonth;
  appData.timeData = periodMoney;
  budgetValue.textContent = budgetOnTheMonth.toFixed();
});

expensesItenBtn.addEventListener("click", () =>
  appData.chooseExpenses(expensesItem)
);

optionalExpensesItemBtn.addEventListener("click", () =>
  appData.chooseOptExpenses(optionalExpenses)
);

countBudget.addEventListener("click", () => appData.budgetOfTheDay());
chooseIncomeInput.addEventListener("input", () => appData.chooseIncome());
checkSavings.addEventListener("click", () => appData.savingCond());
chooseSum.addEventListener("input", () => appData.checkSavingsData());
choosePercent.addEventListener("input", () => appData.percentCheck());
