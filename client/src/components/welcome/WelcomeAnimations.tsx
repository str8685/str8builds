import React from "react";
import { motion } from "framer-motion";

interface FloatingElementProps {
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  delay = 0,
  duration = 3,
  className = "",
  children,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{
        y: [0, -15, 0],
        transition: {
          delay,
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
      data-oid="b8v26pm"
    >
      {children}
    </motion.div>
  );
};

interface PulsingElementProps {
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

export const PulsingElement: React.FC<PulsingElementProps> = ({
  delay = 0,
  duration = 2,
  className = "",
  children,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1, opacity: 0.7 }}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
          delay,
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
      data-oid="9.jtw9."
    >
      {children}
    </motion.div>
  );
};

interface FadingElementProps {
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

export const FadingElement: React.FC<FadingElementProps> = ({
  delay = 0,
  duration = 4,
  className = "",
  children,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay,
          duration: duration / 2,
          ease: "easeOut",
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: duration / 2,
          ease: "easeIn",
        },
      }}
      data-oid="dxflxej"
    >
      {children}
    </motion.div>
  );
};

interface SlideInElementProps {
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "top" | "bottom";
  distance?: number;
  className?: string;
  children: React.ReactNode;
}

export const SlideInElement: React.FC<SlideInElementProps> = ({
  delay = 0,
  duration = 0.5,
  direction = "left",
  distance = 50,
  className = "",
  children,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -distance, y: 0 };
      case "right":
        return { x: distance, y: 0 };
      case "top":
        return { x: 0, y: -distance };
      case "bottom":
        return { x: 0, y: distance };
      default:
        return { x: -distance, y: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={{
        ...getInitialPosition(),
        opacity: 0,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          delay,
          duration,
          ease: "easeOut",
        },
      }}
      exit={{
        ...getInitialPosition(),
        opacity: 0,
        transition: {
          duration,
          ease: "easeIn",
        },
      }}
      data-oid="0wndhgb"
    >
      {children}
    </motion.div>
  );
};

// Component for animated construction logo with neon glow effect
export const AnimatedLogo: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`relative ${className}`} data-oid="1u-vn6a">
      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-500 blur-xl"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        data-oid="3q_sifq"
      />

      {/* STR8 BUILD text logo */}
      <motion.div
        className="relative z-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
        animate={{
          textShadow: [
            "0 0 5px rgba(0, 230, 255, 0.7)",
            "0 0 20px rgba(0, 230, 255, 0.9)",
            "0 0 5px rgba(0, 230, 255, 0.7)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        data-oid="_jj4n-6"
      >
        STR8 BUILD
      </motion.div>
    </div>
  );
};

// Animated construction elements that appear in sequence
export const ConstructionElements: React.FC = () => {
  return (
    <div className="relative h-40 w-full" data-oid=".39ty7d">
      {/* Foundation */}
      <SlideInElement
        direction="bottom"
        delay={0.3}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-4 bg-gray-700 rounded-lg"
        data-oid="-p5ch2i"
      >
        <div className="w-full h-full" data-oid="4oox:k7" />
      </SlideInElement>

      {/* Building structure */}
      <SlideInElement
        direction="bottom"
        delay={0.8}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-space-800 border border-cyan-500/30 rounded-sm"
        data-oid=".upuz_a"
      >
        <div className="w-full h-full" data-oid="_mm7ovu" />
      </SlideInElement>

      {/* Windows */}
      <SlideInElement
        direction="left"
        delay={1.3}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 -translate-x-8 w-6 h-8 bg-cyan-500/20 border border-cyan-500/50 rounded-sm"
        data-oid="l8ixkar"
      >
        <div className="w-full h-full" data-oid="ckclhqv" />
      </SlideInElement>

      <SlideInElement
        direction="right"
        delay={1.4}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-x-8 w-6 h-8 bg-cyan-500/20 border border-cyan-500/50 rounded-sm"
        data-oid="-qxhw0u"
      >
        <div className="w-full h-full" data-oid="bt26xuv" />
      </SlideInElement>

      {/* Roof */}
      <SlideInElement
        direction="top"
        delay={1.8}
        className="absolute bottom-36 left-1/2 transform -translate-x-1/2 w-36 h-4 bg-cyan-800/70 rounded-sm"
        data-oid="e.ajfqz"
      >
        <div className="w-full h-full" data-oid=":9ux2hq" />
      </SlideInElement>

      {/* Construction crane */}
      <SlideInElement
        direction="right"
        delay={2.2}
        className="absolute bottom-40 left-1/2 transform -translate-x-1/2 translate-x-16"
        data-oid="drle2dc"
      >
        <motion.div
          className="w-2 h-24 bg-orange-500 origin-bottom"
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          data-oid="48-e98t"
        >
          <motion.div
            className="absolute top-0 left-0 w-20 h-2 bg-orange-500 -translate-x-20"
            animate={{ translateY: [0, -2, 0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            data-oid="si_8duk"
          >
            <div
              className="absolute bottom-0 left-0 w-1 h-8 bg-gray-500 origin-top"
              data-oid="szbbv0j"
            >
              <div
                className="absolute bottom-0 left-0 w-2 h-2 bg-gray-400 rounded-full transform -translate-x-1/2"
                data-oid="akpeqzr"
              />
            </div>
          </motion.div>
          <div
            className="absolute top-0 left-0 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            data-oid="bpwo.61"
          />
        </motion.div>
      </SlideInElement>
    </div>
  );
};

// Typing text effect component
interface TypingTextProps {
  text: string;
  delay?: number;
  typingSpeed?: number;
  className?: string;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  delay = 0,
  typingSpeed = 50,
  className = "",
}) => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (delay > 0) {
      timeout = setTimeout(() => {
        startTyping();
      }, delay * 1000);
    } else {
      startTyping();
    }

    function startTyping() {
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, currentIndex, delay, typingSpeed]);

  return (
    <div className={className} data-oid=".9m6r94">
      <span data-oid="nl0runi">{displayedText}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-2 h-4 ml-1 bg-cyan-500"
        data-oid="1vv9mrf"
      />
    </div>
  );
};
