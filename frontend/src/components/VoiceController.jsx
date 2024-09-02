import React, { useState, useEffect } from 'react';

const VoiceController = ({ onMessageReceived, onBotResponse }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  useEffect(() => {
    if (isListening) {
      recognition.start();
    }
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onMessageReceived(transcript);
      handleResponse(transcript);
    };
    
    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
  }, [isListening, recognition, onMessageReceived]);

  const handleResponse = async (userMessage) => {
    const responseText = await fetchResponseFromLLM(userMessage);
    onBotResponse(responseText);
    speak(responseText);
  };

  const fetchResponseFromLLM = async (userMessage) => {
    const apiKey = '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';  // Replace with your OpenAI API key
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userMessage }],
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Ensure data.choices exists and has elements
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error("Invalid response from LLM");
      }
  
    } catch (error) {
      console.error('Error fetching response from LLM:', error);
      return "Sorry, I'm having trouble responding right now.";
    }
  };

  const speak = (text) => {
    setIsSpeaking(true);
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
    speech.onend = () => {
      setIsSpeaking(false);
      setIsListening(true); // Restart listening after speaking ends
    };
  };

  return (
    <div className="voice-controller">
      <button 
        onClick={() => setIsListening(!isListening)} 
        disabled={isListening || isSpeaking}
      >
        {isListening ? 'Listening...' : 'Start Voice Input'}
      </button>
    </div>
  );
};

export default VoiceController;
