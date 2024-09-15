// 1. Basic Promise Creation
const basicPromise = new Promise((resolve, reject) => {
    const success = true; // Change this to false to trigger rejection
    if (success) {
      resolve("Promise resolved successfully!");
    } else {
      reject("Promise rejected!");
    }
  });
  
  // Handling the promise with .then() and .catch()
  basicPromise
    .then((result) => {
      console.log(result); // Logs: Promise resolved successfully!
    })
    .catch((error) => {
      console.error(error); // If rejected, logs the error
    });
  
  // 2. Chaining Promises
  const chainedPromise = new Promise((resolve) => {
    resolve(10);
  });
  
  chainedPromise
    .then((result) => {
      console.log(result); // Logs: 10
      return result * 2;
    })
    .then((result) => {
      console.log(result); // Logs: 20
      return result * 2;
    })
    .then((result) => {
      console.log(result); // Logs: 40
    })
    .catch((error) => {
      console.error("Error in chain:", error);
    });
  
  // 3. Using Promise.all() - Runs all promises in parallel
  const promise1 = Promise.resolve(3);
  const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, "foo"));
  const promise3 = Promise.resolve(42);
  
  Promise.all([promise1, promise2, promise3])
    .then((values) => {
      console.log("Promise.all values:", values); // Logs: [3, "foo", 42]
    })
    .catch((error) => {
      console.error("Promise.all error:", error);
    });
  
  // 4. Using Promise.race() - Resolves/rejects as soon as one promise does
  const slowPromise = new Promise((resolve) => setTimeout(resolve, 2000, "slow"));
  const fastPromise = new Promise((resolve) => setTimeout(resolve, 500, "fast"));
  
  Promise.race([slowPromise, fastPromise])
    .then((result) => {
      console.log("Promise.race result:", result); // Logs: fast (because it's quicker)
    })
    .catch((error) => {
      console.error("Promise.race error:", error);
    });
  
  // 5. Using async/await with try/catch
  async function asyncAwaitExample() {
    try {
      const value1 = await promise1;
      console.log("Value1:", value1); // Logs: 3
  
      const value2 = await promise2;
      console.log("Value2:", value2); // Logs: foo
  
      const value3 = await promise3;
      console.log("Value3:", value3); // Logs: 42
    } catch (error) {
      console.error("Error in async/await:", error);
    }
  }
  
  asyncAwaitExample();
  
  // 6. Promise.resolve() and Promise.reject()
  const resolvedPromise = Promise.resolve("Resolved immediately!");
  const rejectedPromise = Promise.reject("Rejected immediately!");
  
  resolvedPromise.then((result) => console.log(result)); // Logs: Resolved immediately!
  rejectedPromise.catch((error) => console.error(error)); // Logs: Rejected immediately!
  
  // 7. Using Promise.finally() - Executes whether the promise is resolved or rejected
  resolvedPromise
    .then((result) => {
      console.log("Finally example:", result);
    })
    .catch((error) => {
      console.error("This will not run for resolvedPromise.");
    })
    .finally(() => {
      console.log("This runs in both success and failure cases.");
    });
  
  // 8. Promise.allSettled() - Waits for all promises and shows result status (either fulfilled or rejected)
  const mixedPromises = [
    Promise.resolve("First"),
    Promise.reject("Second failed"),
    Promise.resolve("Third"),
  ];
  
  Promise.allSettled(mixedPromises).then((results) =>
    results.forEach((result) =>
      console.log(`${result.status}: ${result.value || result.reason}`)
    )
  );
  
  // 9. Promise.any() - Resolves as soon as any one promise resolves (ignores rejections)
  const promisesWithRejection = [
    Promise.reject("Rejected 1"),
    Promise.resolve("First Success"),
    Promise.reject("Rejected 2"),
  ];
  
  Promise.any(promisesWithRejection)
    .then((value) => console.log("Promise.any value:", value)) // Logs: First Success
    .catch((error) => console.error("Promise.any error:", error)); // Only if all reject
  

//     Breakdown of Syntaxes Used:
// new Promise(): Creates a new Promise object.
// .then() and .catch(): Basic handlers for resolved/rejected promises.
// Chaining: .then() can return values that are handled in subsequent .then() blocks.
// Promise.all(): Runs multiple promises in parallel and waits for all to resolve or one to reject.
// Promise.race(): Resolves or rejects as soon as the fastest promise completes.
// async/await: Simplifies working with promises and allows you to write asynchronous code as if it were synchronous.
// Promise.resolve() and Promise.reject(): Immediately resolves or rejects a promise.
// .finally(): A block of code that runs after the promise is settled (either resolved or rejected).
// Promise.allSettled(): Returns results for all promises, including both fulfilled and rejected ones.
// Promise.any(): Resolves when any one of the promises resolves, and rejects only if all promises are rejected.
// This covers almost all common syntaxes and patterns for working with promises in JavaScript.






