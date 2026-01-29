import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Random() {
  // Stage: 0 = initial, 1 = spinning machines, 2 = balls out (hidden numbers), 3 = revealing numbers
  const [stage, setStage] = useState(0);
  const [machines, setMachines] = useState([
    {
      id: 0,
      isSpinning: false,
      ball: null,
      showNumber: false,
      isRevealing: false,
    },
    {
      id: 1,
      isSpinning: false,
      ball: null,
      showNumber: false,
      isRevealing: false,
    },
    {
      id: 2,
      isSpinning: false,
      ball: null,
      showNumber: false,
      isRevealing: false,
    },
    {
      id: 3,
      isSpinning: false,
      ball: null,
      showNumber: false,
      isRevealing: false,
    },
    {
      id: 4,
      isSpinning: false,
      ball: null,
      showNumber: false,
      isRevealing: false,
    },
    {
      id: 5,
      isSpinning: false,
      ball: null,
      showNumber: false,
      isRevealing: false,
    },
    {
      id: 6,
      isSpinning: false,
      ball: null,
      showNumber: false,
      isRevealing: false,
    },
  ]);
  const [resultName, setResultName] = useState("");

  // ฐานข้อมูลเลขสลากและชื่อ
  const lotteryDatabase = [
    { number: "3140151", name: "สมชาย ใจดี" },
    { number: "2240003", name: "สมหญิง รักเรียน" },
    { number: "3150192", name: "วิชัย สุขสันต์" },
    { number: "2970154", name: "มานี มีทรัพย์" },
    { number: "3190011", name: "ประสิทธิ์ เก่งกาจ" },
    { number: "1000001", name: "สุดา งามเลิศ" },
    { number: "1140002", name: "อนันต์ ชัยชนะ" },
    { number: "2000036", name: "พิมพ์ใจ รักสวย" },
    { number: "3030561", name: "ธนกร เศรษฐี" },
  ];

  const [selectedLottery, setSelectedLottery] = useState(null);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getRandomLotteryNumber = () => {
    const randomIndex = Math.floor(Math.random() * lotteryDatabase.length);
    return lotteryDatabase[randomIndex];
  };

  // Reset function - moved up for use in startSpinning
  const resetGame = useCallback(() => {
    setStage(0);
    setMachines([
      {
        id: 0,
        isSpinning: false,
        ball: null,
        showNumber: false,
        isRevealing: false,
      },
      {
        id: 1,
        isSpinning: false,
        ball: null,
        showNumber: false,
        isRevealing: false,
      },
      {
        id: 2,
        isSpinning: false,
        ball: null,
        showNumber: false,
        isRevealing: false,
      },
      {
        id: 3,
        isSpinning: false,
        ball: null,
        showNumber: false,
        isRevealing: false,
      },
      {
        id: 4,
        isSpinning: false,
        ball: null,
        showNumber: false,
        isRevealing: false,
      },
      {
        id: 5,
        isSpinning: false,
        ball: null,
        showNumber: false,
        isRevealing: false,
      },
      {
        id: 6,
        isSpinning: false,
        ball: null,
        showNumber: false,
        isRevealing: false,
      },
    ]);
    setResultName("");
    setSelectedLottery(null);
  }, []);

  // Stage 1: First Enter press - Start spinning and release balls
  const startSpinning = useCallback(async () => {
    // Allow starting from stage 0 or stage 3 (after showing results)
    if (stage !== 0 && stage !== 3) return;

    setStage(1);
    setResultName(""); // Clear previous result name

    // Pick a random lottery
    const lottery = getRandomLotteryNumber();
    setSelectedLottery(lottery);
    const digits = lottery.number.split("");

    // Start all machines spinning
    setMachines((prev) =>
      prev.map((m) => ({
        ...m,
        isSpinning: true,
        ball: null,
        showNumber: false,
        isRevealing: false,
      })),
    );

    // Wait for 5 seconds of spinning
    await delay(5000);

    // Stop spinning and release balls one by one
    for (let i = 0; i < 7; i++) {
      await delay(400);
      setMachines((prev) =>
        prev.map((m, idx) =>
          idx === i ? { ...m, isSpinning: false, ball: digits[i] } : m,
        ),
      );
    }

    setStage(2); // Ready for second Enter
  }, [stage]);

  // Stage 2: Second Enter press - Reveal numbers from right to left
  const revealNumbers = useCallback(async () => {
    if (stage !== 2) return;

    setStage(3);

    // Reveal each number one by one with smooth horizontal spin (left to right order: 0,1,2,3,4,5,6)
    for (let i = 0; i < 7; i++) {
      // Start revealing animation
      setMachines((prev) =>
        prev.map((m, idx) => (idx === i ? { ...m, isRevealing: true } : m)),
      );

      // Wait for spin animation
      await delay(600);

      // Show the number
      setMachines((prev) =>
        prev.map((m, idx) =>
          idx === i ? { ...m, showNumber: true, isRevealing: false } : m,
        ),
      );

      await delay(200);
    }

    // Show the name
    await delay(500);
    setResultName(selectedLottery.name);
  }, [stage, selectedLottery]);

  // Keydown event listener for Enter key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        if (stage === 0) {
          startSpinning();
        } else if (stage === 2) {
          revealNumbers();
        } else if (stage === 3 && resultName) {
          // Start spinning again directly without reset animation
          startSpinning();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stage, startSpinning, revealNumbers, resultName]);

  // Auto-start spinning after reset when stage becomes 0 and we just reset
  useEffect(() => {
    if (stage === 0 && selectedLottery === null && resultName === "") {
      // This is a fresh state, don't auto-start
    }
  }, [stage, selectedLottery, resultName]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-blue-500 to-blue-900 flex flex-col items-center justify-center p-4 overflow-hidden">
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
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-200 mb-2">
          🎰 AOTH LOTTERY NUMBER
        </h1>
        <p className="text-white/70 text-xl font-semibold">
          Thai Government Lottery Generator
        </p>
      </motion.div>

      {/* Instructions
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 z-10"
      >
        {stage === 0 && (
          <p className="text-yellow-300 font-semibold text-lg animate-pulse">
            กด Enter เพื่อเริ่มหมุน
          </p>
        )}
        {stage === 1 && (
          <p className="text-orange-300 font-semibold text-lg">กำลังหมุน...</p>
        )}
        {stage === 2 && (
          <p className="text-green-300 text-lg animate-pulse">
            กด Enter อีกครั้งเพื่อเปิดเผยตัวเลข
          </p>
        )}
        {stage === 3 && resultName && (
          <p className="text-cyan-300 text-lg animate-pulse">
            กด Enter เพื่อหมุนใหม่
          </p>
        )}
      </motion.div> */}

      {/* 7 Lottery Machines */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 z-10 max-w-6xl">
        {machines.map((machine, index) => (
          <motion.div
            key={machine.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring" }}
            className="flex flex-col items-center"
          >
            {/* Machine label */}
            <div className="text-white/60 text-sm mb-2">
              หลักที่ {index + 1}
            </div>

            {/* Machine body */}
            <motion.div
              className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-br from-blue-600 to-blue-900 border-4 border-white shadow-2xl flex items-center justify-center"
              animate={machine.isSpinning ? { rotate: 360 } : { rotate: 0 }}
              transition={
                machine.isSpinning
                  ? { duration: 0.5, repeat: Infinity, ease: "linear" }
                  : { duration: 0.3 }
              }
            >
              {/* Inner glow */}
              <div className="absolute inset-2 rounded-full bg-white/30 blur-sm" />

              {/* Glass effect */}
              <div className="absolute inset-4 rounded-full bg-white/10" />

              {/* Bouncing balls inside machine when spinning */}
              <AnimatePresence>
                {machine.isSpinning && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-6 h-6 md:w-8 md:h-8 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 shadow-lg"
                        initial={{ x: 0, y: 0, scale: 0 }}
                        animate={{
                          x: [
                            Math.random() * 40 - 20,
                            Math.random() * 40 - 20,
                            Math.random() * 40 - 20,
                          ],
                          y: [
                            Math.random() * 40 - 20,
                            Math.random() * 40 - 20,
                            Math.random() * 40 - 20,
                          ],
                          scale: 1,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          repeat: Infinity,
                          repeatType: "mirror",
                          delay: i * 0.05,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Machine center - 8ball or question mark */}
              {!machine.isSpinning && !machine.ball && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-4xl md:text-5xl"
                >
                  🎱
                </motion.div>
              )}
            </motion.div>

            {/* Ball exit tube */}
            <div className="relative h-8 w-16 md:h-10 md:w-20 bg-linear-to-b from-gray-700 to-gray-800 rounded-b-2xl -mt-2 z-10 border-x-2 border-b-2 border-yellow-500 flex items-end justify-center pb-1">
              <div className="absolute inset-x-1 top-0 h-2 bg-linear-to-b from-black/50 to-transparent rounded-b-lg" />
            </div>

            {/* Ball that comes out */}
            <AnimatePresence>
              {machine.ball && (
                <motion.div
                  initial={{ y: -50, opacity: 0, scale: 0 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mt-2"
                  style={{ perspective: "200px" }}
                >
                  <motion.div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-linear-to-br from-yellow-300 via-yellow-400 to-orange-500 shadow-xl flex items-center justify-center relative overflow-hidden"
                    animate={
                      machine.isRevealing
                        ? { rotateY: [0, -360, -720] }
                        : machine.showNumber
                          ? {
                              boxShadow: [
                                "0 0 20px rgba(255, 200, 0, 0.5)",
                                "0 0 40px rgba(255, 200, 0, 0.8)",
                                "0 0 20px rgba(255, 200, 0, 0.5)",
                              ],
                            }
                          : {}
                    }
                    transition={
                      machine.isRevealing
                        ? { duration: 0.6, ease: "easeOut" }
                        : { duration: 1, repeat: Infinity }
                    }
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Ball shine effect */}
                    <div className="absolute top-1 left-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/50 blur-sm" />
                    <div className="absolute top-2 left-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/80" />

                    {/* Question mark when not revealed */}
                    {!machine.showNumber && (
                      <motion.span
                        className="text-2xl md:text-3xl font-bold text-gray-900"
                        animate={
                          machine.isRevealing
                            ? { opacity: [1, 0] }
                            : { scale: [1, 1.1, 1] }
                        }
                        transition={
                          machine.isRevealing
                            ? { duration: 0.3 }
                            : { duration: 0.5, repeat: Infinity }
                        }
                      >
                        ?
                      </motion.span>
                    )}

                    {/* Number when revealed */}
                    {machine.showNumber && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-2xl md:text-3xl font-bold text-gray-900 relative z-10"
                      >
                        {machine.ball}
                      </motion.span>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Result display with name */}
      <AnimatePresence>
        {resultName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mt-8 z-10"
          >
            <div className="bg-linear-to-r from-yellow-400/20 via-yellow-500/30 to-yellow-400/20 backdrop-blur-lg rounded-2xl px-8 py-6 border border-yellow-400/50">
              <p className="text-white/70 text-sm text-center mb-2">
                เลขที่สุ่มได้
              </p>
              <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400 tracking-widest text-center mb-4">
                {selectedLottery?.number}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white/70 text-sm text-center mb-1">
                  ชื่อผู้โชคดี
                </p>
                <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-300 to-cyan-400 text-center">
                  🎉 {resultName} 🎉
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Random;
