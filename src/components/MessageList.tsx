import React from 'react';
import { Typewriter } from './Typewriter';
import { Loading } from './Loading';

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  choices?: Array<{ id: string; label: string }>;
  askFreeInput?: boolean;
}

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  className?: string;
  onScrollToBottom?: () => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading = false,
  className = "",
  onScrollToBottom,
}) => {
  return (
    <div className={`messages ${className}`}>
      {messages.map((message) => (
        <div key={message.id} className={`message ${message.type}`}>
          <div className="message-content">
            {message.type === "assistant" ? (
              <Typewriter 
                text={message.content} 
                onUpdate={onScrollToBottom}
              />
            ) : (
              <div>{message.content}</div>
            )}

            <div className="message-time">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="typing">
          <div className="typing-content">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};