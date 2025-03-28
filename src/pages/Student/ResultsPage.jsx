"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  XCircle,
  BadgeCheck,
  Clipboard,
  CheckCircle,
} from "lucide-react";
import Button from "../../components/UI/Button";
import { submitFeedback } from "../../services/feedbackService";
import { getTestResult } from "../../services/testService";
import { toast } from "react-toastify";

const emojis = [
  { id: 1, emoji: "🥵", label: "Very Dissatisfied" },
  { id: 2, emoji: "😔", label: "Dissatisfied" },
  { id: 3, emoji: "😐", label: "Neutral" },
  { id: 4, emoji: "😌", label: "Satisfied" },
  { id: 5, emoji: "🥰", label: "Very Satisfied" },
];

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const testResult = await getTestResult(location.state.testId);

        setTestResult(testResult);
      } catch (error) {
        console.error("Error fetching test results:", error);
        toast.error("Failed to fetch test results");
      }
    };

    fetchResults();
  }, [location.state]);

  useEffect(() => {
    if (!location.state?.testId) {
      navigate("/student/", { replace: true });
    }
  }, [location.state, navigate]);

  const handleCopy = () => {
    if (testResult?.user._id) {
      navigator.clipboard.writeText(testResult.user._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    }
  };

  const handleSubmitFeedback = async () => {
    if (!selectedEmoji) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setIsSubmitting(true);
      const emoji = emojis.find((e) => e.id === selectedEmoji)?.emoji;

      const res = await submitFeedback({
        testResultId: testResult?._id,
        emoji,
        comments: feedback,
      });
      toast.success("Feedback submitted successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate score if testResult is available
  const calculateScore = () => {
    if (!testResult || !testResult.answers) return "Loading...";

    return `${testResult.totalMarks}/${testResult.answers.reduce(
      (acc, curr) => {
        const questionMarks =
          testResult?.questions?.find((q) => q._id === curr.questionId)
            ?.marks || 5; // Default to 5 if marks are undefined
        return acc + questionMarks;
      },
      0
    )}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex flex-col items-center justify-center py-6 px-4 sm:py-8 sm:px-6">
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <div
                className={`p-3 sm:p-4 rounded-full ${
                  testResult?.totalMarks > 30 ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {testResult?.totalMarks > 30 ? (
                  <BadgeCheck className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
                ) : (
                  <XCircle className="h-12 w-12 sm:h-16 sm:w-16 text-red-500" />
                )}
              </div>
            </div>

            <h1 className="text-lg md:text-xl text-gray-800 mb-2 px-2">
              {testResult?.totalMarks > 30
                ? "Congratulations! You have Successfully Completed The Test"
                : "Test Completed - Better Luck Next Time!"}
            </h1>

            <div className="flex flex-col items-center space-y-4 mt-6 sm:mt-8">
              <div className="flex items-center">
                <span className="text-lg sm:text-xl font-medium mr-2">
                  Score:
                </span>
                <span className="bg-[#FAC167] text-[#2A586F] px-3 sm:px-4 py-1 rounded-full font-bold">
                  {calculateScore()}
                </span>
              </div>

              <div className="bg-[#2A586F] text-white px-4 sm:px-6 py-2 sm:py-3 rounded flex items-center text-sm sm:text-base">
                <span className="font-bold select-none">
                  Your Id :{" "}
                  <span className="tracking-wider">
                    {testResult?.user._id?.slice(0, 10)}
                  </span>
                </span>
                <button onClick={handleCopy} className="ml-2">
                  {copied ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                  ) : (
                    <Clipboard className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg font-bold mb-2">Feedback</h2>

            <div className="mt-4 sm:mt-6">
              <h3 className="text-xl sm:text-2xl font-medium">
                Give us a feedback !
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Your input is important for us. We take customer feedback very
                seriously.
              </p>

              <div className="flex justify-between mb-6 w-full sm:w-3/4 md:w-1/2">
                {emojis.map((item) => (
                  <button
                    key={item.id}
                    className={`flex flex-col items-center p-1 rounded-full transition-all ${
                      selectedEmoji === item.id
                        ? "bg-gray-200 scale-110"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedEmoji(item.id)}
                  >
                    <span
                      className={`text-xl sm:text-2xl transition-all ${
                        selectedEmoji === item.id
                          ? "filter-none"
                          : "filter grayscale"
                      }`}
                    >
                      {item.emoji}
                    </span>
                    {/* <span className="text-xs text-gray-500">{item.label}</span> */}
                  </button>
                ))}
              </div>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Any additional comments or suggestions?"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A586F] min-h-[80px] sm:min-h-[100px]"
              />

              <Button
                className="w-full sm:w-1/2 mt-3 text-sm sm:text-base"
                onClick={handleSubmitFeedback}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="flex items-center bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Back to home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
