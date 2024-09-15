// Asynchronous function with async/await
async function fetchData() {
    console.log("Fetching data...");
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulates a 2 second delay
    console.log("Data fetched!");
  }
  
  // Other synchronous code
  console.log("Starting...");
  
  fetchData();  // Calls the async function, but this doesn't block the rest of the code
  
  console.log("Continuing with other operations...");
  
  // Output will be:
  // Starting...
  // Fetching data...
  // Continuing with other operations...
  // (After 2 seconds) Data fetched!

  
//   but what if we have a asynchronous function with await statement but otside the function there are multiple operations those are happening 
// so will those operations wait for the asynchronous function created by async wait or they keep exicuting and only the async function will exicute
//  in synchronous manner
// ChatGPT said:
// ChatGPT
// Great question! When you use async/await in JavaScript, only the code inside the async function behaves in a synchronous-like manner 
// (i.e., it waits for each await statement to resolve). However, code outside that async function still behaves asynchronously, meaning it does 
// not wait for the async function to complete.

// In other words:

// The code inside the async function follows the await behavior, so each await will pause the execution of that function until the asynchronous 
// operation resolves.
// Code outside the async function does not wait for the async function to finish, and it will continue to execute immediately, independently of 
// the async function.

// Breakdown:
// "Starting..." prints first because it is synchronous.
// fetchData() is called, and "Fetching data..." is logged immediately, but since it contains an await (which pauses the function internally),
//  the rest of the function (i.e., "Data fetched!") will be delayed by 2 seconds.
// The console.log("Continuing with other operations...") outside the async function executes immediately — it doesn't wait for fetchData() to 
// complete because JavaScript doesn't block the execution of other code.
// Key Point:
// Code outside the async function doesn't wait for await to resolve — it continues executing asynchronously.
// Code inside the async function executes in a sequential, synchronous-like manner, respecting the await statements.