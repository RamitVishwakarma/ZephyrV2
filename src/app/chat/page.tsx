'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { ZephyrLogo } from '../../../public/assets';
import AnswerReveal from './answer-reveal';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormTextarea from '@/components/common/form-textarea';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ChevronRight from '../../../public/assets/chevronRight';
import Header from '@/components/common/header';
import useChatStore from '@/store/chatStore';

const ChatPage = () => {
  const { messages, loading, sendMessage, createChatSession, session_id } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formSchema = z.object({
    question: z.string().min(1, { message: 'Question is required' }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!session_id) {
      await createChatSession();
    }
    form.reset();
    await sendMessage(data.question);
  };

  const { handleSubmit } = form;

  return (
    <>
      <div className="h-dvh bg-[#1C1C1C]">
        <div className="bg-[url('/texture.png')] bg-repeat">
          <Header />

          <div className="relative flex h-[calc(100dvh-66px)] flex-col gap-9 px-4">
            <div className="no-scrollbar overflow-y-scroll pb-[400px]">
              {messages.map((message, index) => (
                <div key={index} className="flex flex-col gap-9">
                  <div className="mt-6 flex justify-end">
                    <p className="flex max-w-11/12 rounded-[32px] bg-[#202222] px-5 py-[15px] text-[#f1f1f1]">
                      {message.question}
                    </p>
                  </div>
                  {/* Answer */}
                  <div className="relative flex flex-col gap-4">
                    {/* LLM logo */}
                    <div className="relative">
                      {loading ? (
                        <motion.div
                          className="size-9 rounded-full bg-[url('/IconBg.svg')] bg-cover bg-center"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 2, ease: 'anticipate' }}
                        ></motion.div>
                      ) : (
                        <div className="size-9 rounded-full bg-[url('/IconBg.svg')] bg-cover bg-center"></div>
                      )}
                      <div className="absolute top-[7px] left-[7px]">
                        <ZephyrLogo width={21} height={21} />
                      </div>
                    </div>
                    {/* Static Content */}
                    <AnswerReveal answer={message.answer} />
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="absolute inset-x-0 bottom-9 z-10 flex flex-col gap-4">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="relative px-4">
                  <FormTextarea
                    className="no-scrollbar flex h-16 items-center rounded-[76px] border-2 border-[#3D3F40] bg-[#1C1C1C] px-5 py-[20px] pt-[14px] pr-15 text-[18px] text-white transition duration-200 placeholder:text-[#BDC1C5] focus:border-[#A2A9AD] focus:bg-[#1C1C1C] focus:ring-0"
                    name="question"
                    placeholder="Type anything"
                    showError={false}
                  />
                  <Button
                    className="absolute top-2.5 right-7 size-[42px] rounded-full bg-[url('/IconBg.svg')] bg-cover bg-center bg-no-repeat opacity-100 disabled:bg-[#1C1C1C] disabled:bg-none disabled:opacity-50"
                    disabled={!form.formState.isValid}
                    type="submit"
                  >
                    <ChevronRight width={24} height={24} />
                  </Button>
                </form>
              </Form>
            </div>
            {/*End of answer 1 */}
          </div>
          <div className="absolute bottom-0 h-[300px] w-full bg-[linear-gradient(180deg,rgba(18,18,18,0.00)_0%,#121212_100%)]"></div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
