import { create } from "zustand";
import axios from "axios";

type Message = {
  question: string;
  answer: string;
};

type ChatStore = {
  session_id: string | null;
  messages: Message[];
  createChatSession: () => Promise<void>;
  sendMessage: (question: string) => Promise<void>;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  session_id: null,
  messages: [],

  createChatSession: async () => {
    try {
      const response = await axios.get<{ session_id: string }[]>(
        `${process.env.NEXT_PUBLIC_ZEPHYR_URL}create_chat`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ZEPHYR_API_KEY}`,
          },
        }
      );
      set({ session_id: response.data[0].session_id, messages: [] });
    } catch (error) {
      console.error("Error creating chat session:", error);
    }
  },

  sendMessage: async (question: string) => {
    const { session_id, messages } = get();
    if (!session_id) {
      console.error("No session ID. Start a chat session first.");
      return;
    }

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

      const newMessage: Message = {
        question,
        answer:
          response.data[1] === 500
            ? "Some error occurred, kindly resend the message or contact the team"
            : response.data[0].answer,
      };

      set({ messages: [...messages, newMessage] });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },
}));

export default useChatStore;
