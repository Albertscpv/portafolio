import { motion } from "motion/react";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * Splits a headline into words and lifts them in sequence. Words, not letters:
 * per-character staggers on a long line read as noise and wreck screen-reader
 * output. The full string stays in one accessible label.
 */
export default function AnimatedHeading({ text, className = "", delay = 0 }: AnimatedHeadingProps) {
  const words = text.split(" ");

  return (
    <h1 className={className} aria-label={text}>
      <span aria-hidden="true" className="inline-block">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.85,
                delay: delay + index * 0.075,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );
}
