import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  // Options for surprise button
  const surpriseOptions = [
    'Who won the latest Nobel Peace Prize?',
    'Where does Pizza come from?',
    'How do you make a BLT Sandwich?'
  ];

  // Function to clear input and error
  const clear = () => {
    setValue('');
    setError(null);
    setChatHistory([]);
  };

  // Function to randomly set a question from surpriseOptions
  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  // Function to handle user input and communicate with server
  const getResponse = async () => {
    if (!value) {
      setError('Error! Please ask a question');
      return;
    }

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await fetch('http://localhost:8000/gemini', options);
      const data = await response.json();

      // Update chat history with user message and AI response
      const newChatHistory = [
        ...chatHistory,
        { role: 'user', parts: [value] },
        { role: 'model', parts: [data.message] }
      ];

      setChatHistory(newChatHistory);
      setValue('');
    } catch (error) {
      console.error(error);
      setError('Something went wrong! Please try again later');
    }
  };

  return (
    <div className='app'>
      <p>
        What do you want to know?
        <button className='surprise' onClick={surprise} disabled={!chatHistory.length}>
          Surprise Me
        </button>
      </p>
      <div className='input-container'>
        <input
          value={value}
          placeholder='Ask a question...'
          onChange={(e) => setValue(e.target.value)}
        />
        {!error && <button onClick={getResponse}>Ask me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}

      <div className='search-result'>
        {chatHistory.map((chatItem, index) => (
          <div key={index}>
            <p className='answer'>{chatItem.role}: {chatItem.parts.join(' ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
