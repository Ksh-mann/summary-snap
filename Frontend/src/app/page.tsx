'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelStreamingUrl, setModelStreamingUrl] = useState('');

  const getCompletionsResponse = async () => {
    setIsLoading(true);
    const apiRoute = '/api/completions';
    const requestBody = {
      modelStreamingUrl, // Include the model streaming URL
      text: inputText,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    try {
      const response = await fetch(apiRoute, requestOptions);
      const data = await response.json();
      const messageResponse = data.output;
      setMessage(messageResponse);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleModelStreamingUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModelStreamingUrl(event.target.value);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white-500 to-grey-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-2/3">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Summary in a Snap</h1>
        <div className="mb-4">
          <input
            className="w-full rounded-lg border-gray-300 border p-4 h-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            placeholder="Enter your model streaming URL"
            value={modelStreamingUrl}
            onChange={handleModelStreamingUrlChange}
          />
        </div>
        <div className="mb-4">
          <textarea
            className="w-full rounded-lg border-gray-300 border p-4 h-32 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            placeholder="Enter your text"
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
        <button
          className={`w-full rounded-lg py-2 shadow-lg transition duration-150 ease-in-out text-lg font-bold
                ${!inputText || !modelStreamingUrl || isLoading ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
          onClick={getCompletionsResponse}
          disabled={!inputText || !modelStreamingUrl || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Loading Response...
            </div>
          ) : (
            "Get Response"
          )}
        </button>
        <div className="mt-6 bg-gray-100 rounded-lg shadow-md p-6">
          <p className="text-lg leading-relaxed text-gray-800">
            {message || "Your response will appear here..."}
          </p>
        </div>
      </div>
    </main>
  );
}