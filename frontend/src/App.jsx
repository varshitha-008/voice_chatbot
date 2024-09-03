import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './App.css'; // Import a CSS file for custom styling
import ChatBox from './components/ChatBox';
import { Box, ChakraProvider, Heading } from '@chakra-ui/react';

const App = () => {
  
  return(
<ChakraProvider>
    <Box  >
     <Box h={'50px'} bg={'#1a202c'}mt={'5px'} >
      <Heading   color='white'  verticalAlign={'middle'} textAlign={'center'} > Voice Chatbot</Heading>
      </Box> 
    <ChatBox></ChatBox>
    </Box>
    </ChakraProvider>
  )
};

export default App;
