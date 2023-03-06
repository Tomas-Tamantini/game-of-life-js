import testCases from "./gameOfLifeTestCases.js";

const passedSymbol = "✅";
const failedSymbol = "❌";

let numPassed = 0;
let numFailed = 0;

console.log("Unit test results:");
testCases.forEach(({ testDescription, testExectionsArgs, testFun }) => {
  let testPassed = true;
  try {
    if (testExectionsArgs) {
      for (let arg of testExectionsArgs) testFun(arg);
    } else testFun();
  } catch (error) {
    testPassed = false;
  }
  if (testPassed) {
    numPassed++;
    console.log(`${testDescription} ${passedSymbol}`);
  } else {
    numFailed++;
    console.log(`${testDescription} ${failedSymbol}`);
  }
});
console.log(
  `Passed: ${numPassed}/${testCases.length}, Failed: ${numFailed}/${testCases.length}`
);
