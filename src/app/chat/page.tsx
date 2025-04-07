'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FormInput from '@/components/common/form-input';
import FormTextarea from '@/components/common/form-textarea';
import Header from '@/components/common/header';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useChatStore from '@/store/chatStore';

import { Info, ZephyrLogo } from '../../../public/assets';
import ChevronRight from '../../../public/assets/chevronRight';

import { AnswerReveal, MarkdownPreviewer } from './answer-reveal';

const ChatPage = () => {
  const { messages, loading, sendMessage, createChatSession, session_id } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      router.push('/');
    }
  }, [messages, router]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (loading) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  };

  const { handleSubmit } = form;

  return (
    <>
      <div className="h-dvh bg-[#1C1C1C]">
        <div className="bg-[url('/texture.png')] bg-repeat">
          <Header />

          <div className="relative mx-auto flex h-[calc(100dvh-66px)] max-w-5xl flex-col gap-9 px-4">
            <div className="no-scrollbar overflow-y-scroll pb-[400px]">
              {messages.map((message, index) => (
                <div key={index} className="flex flex-col gap-9">
                  <div className="mt-6 flex justify-end">
                    <p className="flex max-w-11/12 rounded-[32px] bg-[#202222] px-5 py-[15px] text-[#f1f1f1]">
                      {message.question}
                    </p>
                  </div>
                  {/* Answer */}
                  <div className="relative flex flex-col gap-4 md:hidden">
                    {/* LLM logo */}
                    <div className="relative">
                      {loading && index === messages.length - 1 ? (
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
                    {message.answer.includes('```') ||
                    message.answer.includes('#') ||
                    message.answer.includes('*') ||
                    message.answer.includes('[') ? (
                      <MarkdownPreviewer content={message.answer} />
                    ) : (
                      <AnswerReveal answer={message.answer} />
                    )}
                  </div>
                  <div className="relative hidden gap-4 md:flex">
                    {/* LLM logo */}
                    <div className="relative">
                      {loading && index === messages.length - 1 ? (
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
                    {message.answer.includes('```') ||
                    message.answer.includes('#') ||
                    message.answer.includes('*') ||
                    message.answer.includes('[') ? (
                      <MarkdownPreviewer content={message.answer} />
                    ) : (
                      <AnswerReveal answer={message.answer} />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="absolute inset-x-0 bottom-9 z-10 flex flex-col gap-4">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="relative px-4">
                  <div className="relative mx-auto max-w-5xl">
                    <FormInput
                      className="no-scrollbar flex h-16 items-center rounded-[76px] border-2 border-[#3D3F40] bg-[#1C1C1C] px-5 py-[20px] pt-[14px] pr-15 text-[18px] text-white transition duration-200 placeholder:text-[#BDC1C5] focus:border-[#A2A9AD] focus:bg-[#1C1C1C] focus-visible:ring-0 md:hidden"
                      name="question"
                      placeholder="Type anything"
                    />
                    <FormTextarea
                      className="no-scrollbar md:scrollbar-gutter-stable md:vibrant-scrollbar hidden max-h-36 w-full resize-none items-center rounded-[26px] border-2 border-[#3D3F40] bg-[#1C1C1C] px-5 py-2 pr-15 text-[18px] text-white transition duration-200 placeholder:text-[#BDC1C5] focus:border-[#A2A9AD] focus:bg-[#1C1C1C] focus:ring-0 md:block"
                      name="question"
                      placeholder="Type anything"
                      showError={false}
                      handleKeyDown={handleKeyDown}
                    />
                    <Button
                      className="absolute right-3 bottom-3 size-[42px] rounded-full bg-[url('/buttonBg.svg')] bg-cover bg-center bg-no-repeat opacity-100 disabled:bg-[#1C1C1C] disabled:bg-none disabled:opacity-50"
                      disabled={loading || !form.formState.isValid}
                      type="submit"
                    >
                      <ChevronRight width={24} height={24} />
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="flex flex-row items-center justify-center gap-2 max-md:hidden">
                <Info width={14} height={14} />
                <p className="text-[11px] font-medium text-[#717171]">
                  Zephyr may show wrong club details; verify with our{' '}
                  <Link href="https://www.gdscjss.in/team" className="text-[#80B0FF]">
                    team
                  </Link>
                </p>
              </div>
            </div>
            {/*End of answer 1 */}
          </div>
          <div className="pointer-events-none absolute bottom-0 h-[300px] w-full bg-[linear-gradient(180deg,rgba(18,18,18,0.00)_0%,#121212_100%)]"></div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
