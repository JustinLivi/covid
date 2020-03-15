/* eslint-disable no-console */
import { add, filter, map, reduce } from 'lodash';
import numeral from 'numeral';

const usDailyNewCases = [5, 7, 25, 24, 34, 63, 98, 116, 106, 163, 290, 307, 396, 550, 696];
const usPopulation = 331002651;
let totalCases = 2943;

const dailyGrowthRate = map(usDailyNewCases, (covidCase, index) =>
  index > 0 ? covidCase / usDailyNewCases[index - 1] : 0,
);

const averageDailyGrowthRate = reduce(dailyGrowthRate, add, 0) / dailyGrowthRate.length;

const squaredDifference = map(dailyGrowthRate, covidCase => (covidCase - averageDailyGrowthRate) ** 2);

const squaredMean = reduce(squaredDifference, add, 0) / squaredDifference.length;

const stdDeviation = Math.sqrt(squaredMean);

const filteredValues = filter(
  dailyGrowthRate,
  growthRate =>
    growthRate > averageDailyGrowthRate - stdDeviation && growthRate < averageDailyGrowthRate + stdDeviation,
);

const averageFiltered = reduce(filteredValues, add, 0) / filteredValues.length;

console.log({ averageDailyGrowthRate, stdDeviation, averageFiltered });

let prevGrowth = 696;
const criticalPercent = 0.1;
const baseVentilators = 160000;
const percentVentilatorsAvailable = 0.5;
const totalVentilators = baseVentilators * percentVentilatorsAvailable;
const baseBeds = 924100;
const percentBedsAvailable = 0.1;
const totalBeds = baseBeds * percentBedsAvailable;

for (let i = 0; i < 100; i += 1) {
  const bestCaseDeaths = totalCases * 0.02;
  let worstCaseDeaths = totalCases * 0.06;
  const criticalCases = totalCases * criticalPercent;
  console.log('');
  console.log(
    `day: ${i} cases: ${numeral(totalCases).format('0,0')}, criticalCases: ${numeral(criticalCases).format('0,0')}`,
  );
  console.log(`% infected: ${numeral(totalCases / usPopulation).format('0,0.00%')}`);
  if (criticalCases > totalVentilators) {
    const withoutVentilators = criticalCases - totalVentilators;
    console.log(`Critical cases without ventilators ${numeral(withoutVentilators).format('0,0')}`);
    worstCaseDeaths += withoutVentilators;
  }
  if (criticalCases > totalBeds) {
    const withoutBeds = criticalCases - totalBeds;
    console.log(`Critical cases without beds ${numeral(withoutBeds).format('0,0')}`);
  }
  console.log(`Best case deaths: ${numeral(bestCaseDeaths).format('0,0')}`);
  console.log(`Worst case deaths: ${numeral(worstCaseDeaths).format('0,0')}`);
  console.log(`% of population dead worst case: ${numeral(worstCaseDeaths / usPopulation).format('0,0.00%')}`);
  if (totalCases >= usPopulation) {
    console.log(`Total population infected at day ${i}`);
    break;
  }
  // prevGrowth *= averageFiltered;
  prevGrowth *= averageDailyGrowthRate;
  totalCases += prevGrowth;
  if (totalCases > usPopulation) {
    totalCases = usPopulation;
  }
}
