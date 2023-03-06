const testCases = [
  {
    testDescription: "Passing test",
    testFun: () => true,
  },
  {
    testDescription: "Another passing test",
    testFun: () => true,
  },
  {
    testDescription: "Failing test",
    testFun: () => false,
  },
];
const passedSymbol = "✅";
const failedSymbol = "❌";

let numPassed = 0;
let numFailed = 0;

console.log("Unit test results:");
testCases.forEach(({ testDescription, testFun }) => {
  let testPassed = false;
  testFun();
  try {
    testPassed = testFun();
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
