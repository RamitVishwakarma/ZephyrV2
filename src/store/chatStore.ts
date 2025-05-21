// import axios from 'axios';
import { create } from 'zustand';

type Message = {
  question: string;
  answer: string;
};

type ChatStore = {
  session_id: string | null;
  messages: Message[];
  loading: boolean;
  createChatSessionLoading: boolean;
  createChatSession: () => Promise<void>;
  sendMessage: (question: string) => Promise<void>;
};

// Dummy questions and answers
const dummyResponses: Record<string, string> = {
  hello: 'Hello! This is a portfolio demonstration. How can I help you today?',
  'what is this project about?':
    'This project showcases a chat interface. In a real scenario, it would connect to a powerful LLM backend, but for this demo, it uses predefined responses to avoid backend costs.',
  'how does it work?':
    'You type a question, and the interface displays it along with a simulated answer. The animations and UI are fully functional!',
  'tell me a joke':
    "Why don't scientists trust atoms? Because they make up everything! (Simulated joke for demo purposes)",
  'explain how can i get into gdsc ?':
    "To get into GDSC, you typically look for announcements from our university's GDSC chapter regarding recruitment drives or information sessions. These are often held at the start of second semester of the year. You need to sign up on our recruitment platform. We have 5 domains: web, android, design, ML, and programming. We conduct programming contests on the platform for programmers and tasks for the rest, along with aptitude questions. This is followed by a technical interview and then an HR interview.",
  'tell me about the members of gdsc ?':
    "GDSC members are usually students from various disciplines who are passionate about technology, learning, and community building. You'll find developers, designers, and enthusiasts eager to explore Google technologies and other tech domains. The core team often consists of leads for different areas like tech, events, marketing, etc., all working together to organize activities.",
  'what kind of events that gdsc organize ?':
    'GDSCs organize a wide array of events! These can include hands-on workshops on technologies like Android development, Web development, Cloud computing, AI/ML, and more. They also host speaker sessions with industry professionals, hackathons, coding competitions, study jams, and community-building activities. The goal is to provide learning opportunities and a platform for students to connect and grow.',
  'what is the role of google within gdsc ?':
    "Google supports Google Developer Student Clubs by providing resources, learning materials, and access to a global network of student developers. Google offers guidance, mentorship opportunities through Google Developer Experts, and platforms for GDSCs to share their learning and projects. While GDSCs are student-run, Google's backing helps ensure access to up-to-date information and technologies.",
};

const UNAVAILABLE_MESSAGE =
  'Due to high costs of the backend, this service is currently unavailable for this particular query. We are working on optimizing our resources and hope to restore full functionality soon. Thank you for your understanding.';

export const useChatStore = create<ChatStore>((set, get) => ({
  session_id: null,
  messages: [],
  loading: false,
  createChatSessionLoading: false,

  // Original createChatSession using axios (commented out)
  /*
  createChatSession: async () => {
    const { createChatSessionLoading } = get();
    if (createChatSessionLoading) return; 

    try {
      set({ createChatSessionLoading: true });
      const response = await axios.get<{ session_id: string }[]>(
        `${process.env.NEXT_PUBLIC_ZEPHYR_URL}create_chat`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ZEPHYR_API_KEY}`,
          },
        }
      );
      set({ session_id: response.data[0].session_id, messages: [], loading: false, createChatSessionLoading: false });
    } catch (error) {
      console.error('Error creating chat session:', error);
      set({ loading: false, createChatSessionLoading: false });
    }
  },
  */

  // Portfolio demo createChatSession
  createChatSession: async () => {
    set({ createChatSessionLoading: true });
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({
      session_id: 'portfolio-demo-session', // Dummy session ID
      messages: [],
      loading: false,
      createChatSessionLoading: false,
    });
  },

  // Original sendMessage using axios (commented out)
  /*
  sendMessage: async (question: string) => {
    const { session_id, messages } = get();
    if (!session_id) {
      console.error('No session ID. Start a chat session first.');
      return;
    }
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

      const updatedMessages = [...get().messages]; 
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
      const updatedMessages = [...get().messages];
      const lastMessageIndex = updatedMessages.length - 1;
      updatedMessages[lastMessageIndex] = {
        question,
        answer: 'Failed to send message. Please try again.',
      };
      set({ messages: updatedMessages, loading: false });
    }
  },
  */

  // Portfolio demo sendMessage
  sendMessage: async (question: string) => {
    const { session_id, messages } = get();
    if (!session_id) {
      console.warn('No session ID. Attempting to create a new session for demo.');
      await get().createChatSession();
      const currentSessionId = get().session_id;
      if (!currentSessionId) {
        console.error('Failed to create a session for demo. Cannot send message.');
        const userMessageWithError: Message = {
          question,
          answer: 'Error: Could not establish a session for the demo. Please try refreshing.',
        };
        set({ messages: [...messages, userMessageWithError], loading: false });
        return;
      }
    }

    const userMessage: Message = {
      question,
      answer: '',
    };
    set({ messages: [...messages, userMessage], loading: true });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const normalizedQuestion = question.toLowerCase().trim();
    const answer = dummyResponses[normalizedQuestion] || UNAVAILABLE_MESSAGE;

    const updatedMessages = [...get().messages];
    const lastMessageIndex = updatedMessages.length - 1;

    if (lastMessageIndex >= 0 && updatedMessages[lastMessageIndex].question === question) {
      updatedMessages[lastMessageIndex] = {
        question,
        answer,
      };
      set({ messages: updatedMessages, loading: false });
    } else {
      const botMessage: Message = { question, answer };
      set({ messages: [...get().messages, botMessage], loading: false });
    }
  },
}));

export default useChatStore;
