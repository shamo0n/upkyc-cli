// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import Modal from './ChatBox';
// import './ChatbotWidget.css';

// // Import assets from your src/assets folder
// import PlayIcon from '../../assets/images/play.png';
// import StopIcon from '../../assets/images/stopchat.png';
// import VideoGif from '../../assets/images/robot.gif';

// const ChatbotWidget = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');
  
//   // TTS State
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [lastSpokenText, setLastSpokenText] = useState('');
//   const [voices, setVoices] = useState([]);
  
//   // Modal State
//   const [modalContent, setModalContent] = useState(null);

//   const chatMessagesRef = useRef(null);
//   const synth = window.speechSynthesis;

//   // --- TTS Logic ---

//   // Load voices asynchronously
//   useEffect(() => {
//     const loadVoices = () => setVoices(synth.getVoices());
//     loadVoices();
//     if (synth.onvoiceschanged !== undefined) {
//       synth.onvoiceschanged = loadVoices;
//     }
//     // Cleanup function to stop speaking if the component unmounts
//     return () => synth.cancel();
//   }, [synth]);

//   const speakResponse = useCallback((text) => {
//     synth.cancel();
//     if (!text?.trim()) return;

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.rate = 1;
//     utterance.pitch = 1;
//     utterance.lang = 'en-US';

//     const ziraVoice = voices.find(voice => voice.name.includes("Zira"));
//     if (ziraVoice) {
//         utterance.voice = ziraVoice;
//     }

//     // Keep React state in sync with the browser's speech state
//     utterance.onstart = () => setIsPlaying(true);
//     utterance.onend = () => setIsPlaying(false);
//     utterance.onerror = (e) => {
//         console.error("Speech synthesis error:", e);
//         setIsPlaying(false);
//     };

//     synth.speak(utterance);
//   }, [synth, voices]);

//   const toggleSpeaking = () => {
//     if (isPlaying) {
//       synth.cancel();
//       // When manually cancelled, we must set isPlaying to false ourselves
//       setIsPlaying(false); 
//     } else if (lastSpokenText) {
//       speakResponse(lastSpokenText);
//     }
//   };

//   // --- Chat Logic ---

//   const sendMessage = async () => {
//     if (!userInput.trim()) return;

//     synth.cancel(); // Stop previous speech when sending a new message
//     setIsPlaying(false);

//     const currentUserInput = userInput;
//     setMessages(prev => [...prev, { text: currentUserInput, sender: 'user' }]);
//     setUserInput('');

//     try {
//       const response = await fetch('https://amlhlep.com:44318//chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: currentUserInput }),
//       });
//       const data = await response.json();

//       setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
//       setLastSpokenText(data.response);
//       speakResponse(data.response);

//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => [...prev, { text: "Error communicating with server.", sender: 'bot' }]);
//     }
//   };

//   // Scroll to bottom on new message
//   useEffect(() => {
//     if (chatMessagesRef.current) {
//       chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // --- Modal/Popup Logic ---

//   // PDFs and Videos are assumed to be in the /public/Documents folder
//   const openDocument = () => setModalContent({ type: 'iframe', src: '/Documents/UAE-DNFBPs.pdf' });
//   const openVideoList = () => setModalContent({ type: 'videoList' });
//   const playVideo = (videoUrl) => setModalContent({ type: 'videoPlayer', src: videoUrl });
//   const closeModal = () => setModalContent(null);

//   const renderModal = () => {
//     if (!modalContent) return null;

//     let content;
//     if (modalContent.type === 'iframe') {
//         content = <iframe src={modalContent.src} width="100%" height="100%" style={{ border: 'none' }} title="Document Viewer" />;
    
//     } else if (modalContent.type === 'videoPlayer') {
//         content = (
//           <video width="100%" height="100%" controls autoPlay>
//             <source src={modalContent.src} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         );

//     } else if (modalContent.type === 'videoList') {
//         content = (
//           <div style={{ padding: '20px' }}>
//             <h3>Select a Video</h3>
//             <ul>
//               <li>
//                 <a href="#" onClick={(e) => { e.preventDefault(); playVideo('/Documents/ImageForged.mp4'); }}>
//                   <img src={VideoGif} alt="Thumbnail" style={{ width: 50, height: 50, marginRight: 10, verticalAlign: 'middle' }} />
//                   Image Forged Guide
//                 </a>
//               </li>
//               <li>
//                 <a href="#" onClick={(e) => { e.preventDefault(); playVideo('/Documents/easiloadbot.mp4'); }}>
//                   <img src={VideoGif} alt="Thumbnail" style={{ width: 50, height: 50, marginRight: 10, verticalAlign: 'middle' }} />
//                   Easy Load Guide
//                 </a>
//               </li>
//             </ul>
//           </div>
//         );
//     }

//     return <Modal onClose={closeModal}>{content}</Modal>;
//   };

//   // --- Component Render ---

//   return (
//     <div className="chatbot-widget-container">
//       {renderModal()}

//       <div className="widget-controls">
//         <button onClick={() => setIsChatOpen(!isChatOpen)}>
//             {isChatOpen ? 'Close Chat' : 'Open Chat'}
//         </button>
//         {/* Added buttons to trigger the modals as examples */}
//         <button onClick={openDocument}>View PDF</button>
//         <button onClick={openVideoList}>View Videos</button>
//       </div>

//       {isChatOpen && (
//         <div className="chat-box">
//           <div className="chat-messages" ref={chatMessagesRef}>
//             {messages.map((msg, index) => (
//               <div key={index} className={`message ${msg.sender}-message`}>
//                 <strong>{msg.sender === 'user' ? 'You: ' : 'Chatbot: '}</strong>
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           <div className="chat-input-area">
//             <input
//               type="text"
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//               placeholder="Type your message..."
//             />
//             <button onClick={sendMessage}>Send</button>
            
//             <button
//                 onClick={toggleSpeaking}
//                 title={isPlaying ? "Stop Speaking" : "Replay Last Message"}
//                 className="tts-button"
//                 style={{ 
//                     backgroundImage: `url(${isPlaying ? StopIcon : PlayIcon})`,
//                 }}
//                 disabled={!lastSpokenText && !isPlaying} // Disable if nothing to play/stop
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatbotWidget;