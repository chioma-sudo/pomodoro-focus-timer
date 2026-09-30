import { useState, useEffect } from "react";

function PomodoroTimer() {
  const [studyMinutes, setStudyMinutes] = useState("");
  const [breakMinutes, setBreakMinutes] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStudy, setIsStudy] = useState(true);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      if (isStudy) {
        alert("Study time done! Break starts now !!");
        setTimeLeft(breakMinutes * 60);
        setIsStudy(false);
      } else {
        alert("Break over! Back to studying ");
        setIsRunning(false);
        setIsStudy(true);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isStudy, breakMinutes]);

  const handleStart = () => {
    if (!studyMinutes || !breakMinutes) return alert("Please enter both times!");
    setTimeLeft(studyMinutes * 60);
    setIsRunning(true);
    setIsStudy(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-yellow-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Study & Break Timer</h1>

      {!isRunning ? (
        <div className="space-y-4">
          <div>
            <label className="block text-lg">Study Minutes:</label>
            <input
              type="number"
              value={studyMinutes}
              onChange={(e) => setStudyMinutes(e.target.value)}
              className="p-2 border rounded-md w-40 text-center"
            />
          </div>
          <div>
            <label className="block text-lg">Break Minutes:</label>
            <input
              type="number"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(e.target.value)}
              className="p-2 border rounded-md w-40 text-center"
            />
          </div>
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg mt-4"
          >
            Start Timer
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">
            {isStudy ? "Study Time" : "Break Time"}
          </h2>
          <div className="text-6xl font-bold mb-6">{formatTime(timeLeft)}</div>
          <button
            onClick={() => setIsRunning(false)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
}
export default PomodoroTimer;

