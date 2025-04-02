import { create } from 'zustand';
import axios from 'axios';

type Message = {
  question: string;
  answer: string;
};

type ChatStore = {
  session_id: string | null;
  messages: Message[];
  loading: boolean;
  createChatSession: () => Promise<void>;
  sendMessage: (question: string) => Promise<void>;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  session_id: null,
  messages: [],
  loading: false,

  createChatSession: async () => {
    try {
      set({ loading: true });
      const response = await axios.get<{ session_id: string }[]>(
        `${process.env.NEXT_PUBLIC_ZEPHYR_URL}create_chat`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ZEPHYR_API_KEY}`,
          },
        }
      );
      set({ session_id: response.data[0].session_id, messages: [], loading: false });
    } catch (error) {
      console.error('Error creating chat session:', error);
      set({ loading: false });
    }
  },

  sendMessage: async (question: string) => {
    const { session_id, messages } = get();
    if (!session_id) {
      console.error('No session ID. Start a chat session first.');
      return;
    }
    // optimistic approach
    const userMessage: Message = {
      question,
      answer: '',
    };
    set({ messages: [...messages, userMessage], loading: true });

    try {
      const response = await axios.post<[Message, number]>(
        `${process.env.NEXT_PUBLIC_ZEPHYR_URL}chat`,
        {
          session_id,
          question,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ZEPHYR_API_KEY}`,
          },
        }
      );

      // Update the last message with the API response
      const updatedMessages = [...messages, userMessage];
      const lastMessageIndex = updatedMessages.length - 1;
      updatedMessages[lastMessageIndex] = {
        question,
        answer:
          response.data[1] === 500
            ? 'Some error occurred, kindly resend the message or contact the team'
            : response.data[0].answer,
      };

      set({ messages: updatedMessages, loading: false });
    } catch (error) {
      console.error('Error sending message:', error);
      // Update the last message with error state
      const updatedMessages = [...messages, userMessage];
      const lastMessageIndex = updatedMessages.length - 1;
      updatedMessages[lastMessageIndex] = {
        question,
        answer: 'Failed to send message. Please try again.',
      };
      set({ messages: updatedMessages, loading: false });
    }
  },
}));

export default useChatStore;
