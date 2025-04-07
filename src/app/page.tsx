'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FormInput from '@/components/common/form-input';
import FormTextarea from '@/components/common/form-textarea';
import HomeLayout from '@/components/common/home-layout';
import MobileCards from '@/components/common/mobile-cards';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cards } from '@/lib/constants';
import useChatStore from '@/store/chatStore';

import { Info } from '../../public/assets';
import ChevronRight from '../../public/assets/chevronRight';
import { useScreenWidth } from '../utils';

export default function Home() {
  const { session_id, createChatSession, sendMessage, messages, loading } = useChatStore();
  const router = useRouter();

  const screenWidth = useScreenWidth();
  const cardWidth = screenWidth * 0.88;

  const formSchema = z.object({
    question: z.string().min(1, { message: 'Question is required' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!session_id) {
      await createChatSession();
    }
    await sendMessage(data.question);
    router.push('/chat');
  };

  useEffect(() => {
    createChatSession();
  }, [createChatSession]);

  const onCardClick = (cardTitle: string) => {
    form.setValue('question', cardTitle);
    form.handleSubmit(onSubmit)();
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

  return (
    <HomeLayout>
      <div className="flex h-[calc(100dvh-66px)] flex-col justify-between">
        <p className="px-4 py-16 text-4xl leading-[140%] font-bold tracking-[-0.72px] text-white md:m-auto">
          Hey, how can we help you?
        </p>
        <div className="flex flex-col gap-9">
          <div className="md:hidden">
            <motion.div
              className="flex snap-x snap-mandatory space-x-2 px-4"
              drag="x"
              dragConstraints={{ right: 0, left: -cardWidth * 3 - 8 }} // 8 px -8 to make the space even
              dragElastic={1}
            >
              {cards.map((card, i) => (
                <MobileCards
                  onClick={() => onCardClick(card.title)}
                  key={i}
                  cardTitle={card.title}
                  Icon={() => <card.icon width={18} height={18} />}
                />
              ))}
            </motion.div>
          </div>
          <div className="mx-auto hidden max-w-5xl grid-cols-2 gap-5 md:grid">
            {cards.map((card, i) => (
              <MobileCards
                onClick={() => onCardClick(card.title)}
                key={i}
                cardTitle={card.title}
                Icon={() => <card.icon width={21} height={21} />}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="px-4">
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
                  {loading && (
                    <>
                      <motion.div
                        className="absolute right-3 bottom-3 size-9 rounded-full bg-[url('/IconBg.svg')] bg-cover bg-center"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'anticipate' }}
                      ></motion.div>
                      <div className="absolute right-5 bottom-5">
                        <ChevronRight width={20} height={20} />
                      </div>
                    </>
                  )}
                </div>
              </form>
            </Form>
            <div className="mb-9 flex flex-row items-center justify-center gap-2">
              <Info width={14} height={14} />
              <p className="text-[11px] font-medium text-[#717171]">
                Zephyr may show wrong club details; verify with our{' '}
                <Link href="https://www.gdscjss.in/team" className="text-[#80B0FF]">
                  team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
