import { motion } from 'framer-motion';
import React from 'react';

const AnswerReveal = ({ answer }: { answer: string }) => {
  const words = answer.split(' ');
  let delayPerWord = 0.05;

  if (words.length > 200) {
    const totalDuration = 5; //in seconds
    delayPerWord = totalDuration / words.length;
  }

  return (
    <div className="text-base leading-[160%] tracking-[-0.16px] text-[#D0D0D0] md:leading-[175%] md:-tracking-normal">
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * (delayPerWord || 0.05), duration: 0.3 }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </div>
  );
};

export default AnswerReveal;
