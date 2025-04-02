import { motion } from 'framer-motion';
import React from 'react';

const AnswerReveal = ({ answer }: { answer: string }) => {
  const words = answer.split(' ');

  return (
    <div className="text-base leading-[160%] tracking-[-0.16px] text-[#D0D0D0]">
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </div>
  );
};

export default AnswerReveal;
