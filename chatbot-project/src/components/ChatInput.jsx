import {useState} from 'react';
import {Chatbot} from 'supersimpledev';
import '../style/ChatInput.css';

function ChatInput({ chatMessages, setChatMessages }) {
  const [InputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {

    if (isLoading || InputText === '') {
      return;
    }

    setIsLoading(true);

    setInputText('');
    const newChatMessages = [
      ...chatMessages,
      {
        message: InputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: '',
        sender: 'robot',
        id: crypto.randomUUID(),
        isLoading: true
      }
    ]);

    const response = await Chatbot.getResponseAsync(InputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
    else if (event.key === 'Escape') {
      setInputText('');
    }

  }

  return (
    <div className="chat-input-container">
      <input type="text"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={InputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
}

export default ChatInput;