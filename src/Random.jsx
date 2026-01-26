import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Random() {
  const [balls, setBalls] = useState([]);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
  const [currentRevealIndex, setCurrentRevealIndex] = useState(-1);

  // ฐานข้อมูลเลขสลากที่จะสุ่ม
  const lotteryDatabase = [
    "3140151",
    "2240003",
    "3150192",
    "2970154",
    "3190011",
    "1000001",
    "1140002",
    "2000036",
    "3030561",
  ];

  const getRandomLotteryNumber = () => {
    const randomIndex = Math.floor(Math.random() * lotteryDatabase.length);
    return lotteryDatabase[randomIndex];
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const startRandomize = useCallback(async () => {
    if (isRandomizing) return; // Prevent multiple calls while randomizing

    setIsRandomizing(true);
    setShowBalls(false);
    setCurrentRevealIndex(-1);
    setBalls([]);

    // Pick a random lottery number from database
    const selectedNumber = getRandomLotteryNumber();
    const digits = selectedNumber.split("");

    const newBalls = digits.map((digit, i) => ({
      id: i,
      number: digit,
      isRevealed: false,
    }));

    // Wait for randomizing animation
    await delay(2000);

    setIsRandomizing(false);
    setBalls(newBalls);
    setShowBalls(true);

    // Reveal each ball one by one
    for (let i = 0; i < 7; i++) {
      await delay(600);
      setCurrentRevealIndex(i);
    }
  }, [isRandomizing]);

  // Keydown event listener for Enter key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        startRandomize();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [startRandomize]);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center mb-8 z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-pink-400 to-purple-400 mb-2">
          🎰 สุ่มสลากกินแบ่งรัฐบาล
        </h1>
        <p className="text-white/70 text-lg">
          Thai Government Lottery Generator
        </p>
      </motion.div>

      {/* Lottery Machine - Hidden after random */}
      <AnimatePresence>
        {!showBalls && (
          <motion.div
            key="lottery-machine"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="relative w-80 h-80 md:w-96 md:h-96 rounded-full bg-linear-to-br from-gray-800 to-gray-900 border-8 border-yellow-500 shadow-2xl flex items-center justify-center z-10"
              animate={isRandomizing ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isRandomizing
                  ? { duration: 1, repeat: Infinity, ease: "linear" }
                  : { duration: 0.5 }
              }
            >
              {/* Inner glow */}
              <div className="absolute inset-4 rounded-full bg-linear-to-br from-indigo-600/30 to-purple-600/30 blur-sm" />

              {/* Glass effect */}
              <div className="absolute inset-8 rounded-full bg-linear-to-br from-white/10 to-transparent" />

              {/* Bouncing balls inside machine */}
              <AnimatePresence>
                {isRandomizing && (
                  <>
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 shadow-lg flex items-center justify-center font-bold text-gray-900"
                        initial={{
                          x: 0,
                          y: 0,
                          scale: 0,
                        }}
                        animate={{
                          x: [
                            Math.random() * 100 - 50,
                            Math.random() * 100 - 50,
                            Math.random() * 100 - 50,
                          ],
                          y: [
                            Math.random() * 100 - 50,
                            Math.random() * 100 - 50,
                            Math.random() * 100 - 50,
                          ],
                          scale: 1,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "mirror",
                          delay: i * 0.1,
                        }}
                      >
                        {Math.floor(Math.random() * 10)}
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Machine center */}
              {!isRandomizing && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl"
                >
                  🎱
                </motion.div>
              )}
            </motion.div>

            {/* Ball exit tube */}
            <div className="relative h-16 w-32 bg-linear-to-b from-gray-700 to-gray-800 rounded-b-3xl -mt-4 z-10 border-x-4 border-b-4 border-yellow-500">
              <div className="absolute inset-x-2 top-0 h-4 bg-linear-to-b from-black/50 to-transparent rounded-b-lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed balls container - Shows after machine hides */}
      <AnimatePresence>
        {showBalls && (
          <motion.div
            key="balls-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex gap-3 md:gap-5 z-10"
          >
            {balls.map((ball, index) => (
              <motion.div
                key={ball.id}
                initial={{ y: -200, opacity: 0, scale: 0 }}
                animate={
                  index <= currentRevealIndex
                    ? {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        y: -200,
                        opacity: 0,
                        scale: 0,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
                className="relative"
              >
                {/* Ball */}
                <motion.div
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-linear-to-br from-yellow-300 via-yellow-400 to-orange-500 shadow-xl flex items-center justify-center relative overflow-hidden"
                  animate={
                    index <= currentRevealIndex
                      ? {
                          boxShadow: [
                            "0 0 20px rgba(255, 200, 0, 0.5)",
                            "0 0 40px rgba(255, 200, 0, 0.8)",
                            "0 0 20px rgba(255, 200, 0, 0.5)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {/* Ball shine effect */}
                  <div className="absolute top-1 left-2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-white/50 blur-sm" />
                  <div className="absolute top-2 left-3 w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/80" />

                  {/* Number */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      index <= currentRevealIndex
                        ? { opacity: 1, scale: 1, rotateY: 360 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-2xl md:text-3xl font-bold text-gray-900 relative z-10"
                  >
                    {ball.number}
                  </motion.span>
                </motion.div>

                {/* Ball index */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index <= currentRevealIndex ? 1 : 0 }}
                  className="text-center mt-2 text-white/60 text-sm"
                >
                  หลักที่ {index + 1}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result display */}
      <AnimatePresence>
        {currentRevealIndex === 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mt-8 z-10"
          >
            <div className="bg-linear-to-r from-yellow-400/20 via-yellow-500/30 to-yellow-400/20 backdrop-blur-lg rounded-2xl px-8 py-4 border border-yellow-400/50">
              <p className="text-white/70 text-sm text-center mb-2">
                เลขที่สุ่มได้
              </p>
              <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400 tracking-widest text-center">
                {balls.map((b) => b.number).join("")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Random;
