var express = require('express');
var router = express.Router();
var con = require('../database');
var shortid = require('shortid');

router.get('/', async function (req, res, next) {
    [incomes, fields] = await con.promise().query('select sum(price) as income, date from customerOrder group by date;');
    [outcomes, fields] = await con.promise().query('select sum(price) as outcome, date from storeOrder group by date;');
    [logs, fields] = await con.promise().query('select * from Logs;');
    let groupedIncomes = {}
    incomes.forEach((income) => {
        if (income.date in groupedIncomes) {
            groupedIncomes[income.date].push(income)
        } else {
            groupedIncomes[income.date] = []
            groupedIncomes[income.date].push(income)
        }
    })
    let groupedOutcomes = {}
    outcomes.forEach((outcome) => {
        if (outcome.date in groupedOutcomes) {
            groupedOutcomes[outcome.date].push(outcome)
        } else {
            groupedOutcomes[outcome.date] = []
            groupedOutcomes[outcome.date].push(outcome)
        }
    })
    var result1 = {}
    for (incomeDate in groupedIncomes) {
        for (outcomeDate in groupedOutcomes) {
            if (incomeDate === outcomeDate) {
                result1[incomeDate] = {}
                result1[incomeDate]['totalIncome'] = groupedIncomes[incomeDate][0].income;
                result1[incomeDate]['totalOutcome'] = groupedOutcomes[outcomeDate][0].outcome;
                result1[incomeDate]['totalBenefit'] = result1[incomeDate]['totalIncome'] - result1[incomeDate]['totalOutcome'];
            }
        }
    }
    var result2 = {}
    for (incomeDate in groupedIncomes) {
        if (!groupedOutcomes.hasOwnProperty(incomeDate)) {
            result2[incomeDate] = {}
            result2[incomeDate]['totalIncome'] = groupedIncomes[incomeDate][0].income;
            result2[incomeDate]['totalOutcome'] = 0;
            result2[incomeDate]['totalBenefit'] = result2[incomeDate]['totalIncome'];
        }
    }
    var result3 = {}
    for (outcomeDate in groupedOutcomes) {
        if (!groupedIncomes.hasOwnProperty(outcomeDate)) {
            result3[outcomeDate] = {}
            result3[outcomeDate]['totalIncome'] = 0;
            result3[outcomeDate]['totalOutcome'] = groupedOutcomes[outcomeDate][0].outcome;
            result3[outcomeDate]['totalBenefit'] = -result3[outcomeDate]['totalOutcome'];
        }
    }
    var results = Object.assign(result1, result2, result3)
    res.render('report', {results: results, logs: logs})
});

module.exports = router;
