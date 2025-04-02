'use client';

import MobileCards from '@/components/common/mobile-cards';
import { Calendar, Education, FileWithCheck, Info, UserWithStar } from '../../public/assets';
import { motion } from 'framer-motion';
import { useScreenWidth } from '../utils';
import FormTextarea from '@/components/common/form-textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import ChevronRight from '../../public/assets/chevronRight';
import useChatStore from '@/store/chatStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeLayout from '@/components/common/home-layout';

export default function Home() {
  const { session_id, createChatSession, sendMessage, messages } = useChatStore();
  const router = useRouter();

  const screenWidth = useScreenWidth();
  const cardWidth = screenWidth * 0.88;

  const formSchema = z.object({
    question: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    router.push('/chat');
    if (!session_id) {
      await createChatSession();
    }
    await sendMessage(data.question);
  };

  useEffect(() => {
    createChatSession();
  }, [createChatSession]);

  const onCardClick = (cardTitle: string) => {
    form.setValue('question', cardTitle);
    form.handleSubmit(onSubmit)();
  };

  return (
    <HomeLayout>
      <div className="flex h-[calc(100dvh-66px)] flex-col justify-between">
        <p className="px-4 py-16 text-4xl leading-[140%] font-bold tracking-[-0.72px] text-white">
          Hey, How can we help you?
        </p>
        <div className="flex flex-col gap-9">
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

          <div className="flex flex-col gap-4">
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
            <div className="mb-9 flex flex-row items-center justify-center gap-2">
              <Info width={14} height={14} />
              <p className="text-[11px] font-medium text-[#717171]">
                Zephyr may show wrong club details; verify with the{' '}
                <Link href="https://www.gdscjss.in/team" className="text-[#80B0FF]">
                  Team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

const cards = [
  {
    title: 'Explain how can I get into GDSC ?',
    icon: FileWithCheck,
  },
  {
    title: ' Tell me about the members of GDSC ?',
    icon: UserWithStar,
  },
  {
    title: 'What kind of events that GDSC organize ?',
    icon: Calendar,
  },
  {
    title: 'What is the role of Google within GDSC ?',
    icon: Education,
  },
];
