//LL-KqiyTAsqdltM029271kHWCcKWLcUttqY8xvZMxzD3I8qEM5qjNXwWVzC9mT4BOyc
const { LangChain, LAMA } = require('langchain');

// Initialize LangChain with your LAMA API key
const langchain = new LangChain({
  apiKey: 'LL-KqiyTAsqdltM029271kHWCcKWLcUttqY8xvZMxzD3I8qEM5qjNXwWVzC9mT4BOyc'
});

// Initialize LAMA
const lama = new LAMA(langchain);

// Define a function to ask a question to LAMA, fetch the response, and print it to the console
async function askLAMA(question) {
  try {
    const response = await lama.ask(question);
    console.log('Response from LAMA:', response);
  } catch (error) {
    console.error('Error querying LAMA:', error);
  }
}

// Example usage: Ask LAMA a question and print the response
askLAMA("What's the weather like today?");