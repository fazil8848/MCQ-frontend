"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookmarkIcon, Timer } from "lucide-react";
import { Radio } from "../../components/UI/Input";
import { getQuestions, submitTest } from "../../services/testService";
import { toast } from "react-toastify";

export default function TestPage({ id }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [bookmarked, setBookmarked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open on desktop
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [validationError, setValidationError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Separate state for mobile

  useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        if (Array.isArray(response) && response.length > 0) {
          setQuestions(response);
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const formatAnswersForSubmission = () => {
    return Object.entries(selectedAnswers).map(
      ([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      })
    );
  };

  const handleAutoSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formattedAnswers = formatAnswersForSubmission();

      const response = await submitTest({
        testId: id,
        answers: formattedAnswers,
      });

      console.log(response);

      if (response.success) {
        navigate("/student/results", { state: { testId: id } });
      } else {
        toast.error(response.message || "Automatic submission failed");
      }
    } catch (error) {
      console.error("Error auto-submitting answers:", error);
      toast.error("Failed to automatically submit answers");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formattedAnswers = formatAnswersForSubmission();

      // Validate at least 5 questions are answered
      if (formattedAnswers.length < 5) {
        setValidationError(true);
        toast.error("Please answer at least 5 questions before submitting!");
        const firstUnanswered = questions.findIndex(
          (q) => !selectedAnswers[q._id]
        );
        if (firstUnanswered !== -1) {
          setCurrentQuestion(firstUnanswered);
        }
        return;
      }

      // Submit to API
      const response = await submitTest(formattedAnswers);

      if (response) {
        toast.success("Answers submitted successfully!");
        navigate("/student/results", {
          state: { testId: response.testResultId },
        });
      } else {
        toast.error(response.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error("Failed to submit answers");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectAnswer = (optionId) => {
    if (!selectedAnswers[question._id]) {
      setAnsweredQuestions((prev) => prev + 1);
    }

    setSelectedAnswers((prev) => ({
      ...prev,
      [question._id]: optionId,
    }));

    setValidationError(false);
  };

  const handleBookmark = () => {
    setBookmarked((prev) =>
      prev.includes(question._id)
        ? prev.filter((id) => id !== question._id)
        : [...prev, question._id]
    );
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">No questions available</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen">
      <div className="flex relative justify-center mb-2">
        <h1 className="text-3xl sm:text-4xl capitalize font-semibold relative inline-block px-2">
          <span className="text-[#2A586F]">Assess your</span> &nbsp;
          <span className="relative text-[#2A586F]">
            <span className="relative z-10">knowledge</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FAC167] z-0" />
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 relative gap-2 w-full min-h-[70vh] px-4 sm:px-6 md:px-10">
        {/* Desktop Sidebar */}
        {isSidebarOpen && (
          <div className="hidden md:block md:col-span-2 relative">
            <img
              onClick={() => setIsSidebarOpen(false)}
              src="/grid-5.png"
              alt="Toggle sidebar"
              className="w-8 h-8 absolute -top-10 right-0 cursor-pointer"
            />
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 border-r-4 rounded-r-xs py-2 pr-4 border-gray-300">
              {questions.map((q, index) => {
                const isAnswered = selectedAnswers[q._id] !== undefined;
                const isCurrent = currentQuestion === index;
                const isBookmarked = bookmarked.includes(q._id);

                return (
                  <div
                    key={q._id}
                    className={`border text-center md:p-1 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-10 xl:h-10 xl:p-2 col-span-1 rounded-md cursor-pointer relative
                        ${
                          isAnswered
                            ? "bg-[#2BB673]"
                            : validationError &&
                              currentQuestion === questions.length - 1
                            ? "bg-red-500 text-white"
                            : isCurrent
                            ? "bg-white"
                            : "bg-[#d7d7d7]"
                        }`}
                    onClick={() => {
                      setCurrentQuestion(index);
                      setValidationError(false);
                    }}
                  >
                    {index + 1}
                    {isBookmarked && (
                      <div className="absolute -top-1 -right-1 text-[#FAC167]">
                        <BookmarkIcon size={12} fill="#FAC167" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="hidden md:flex h-2/3 items-end">
              <div className="p-2 w-full h-fit">
                <div className="flex items-center gap-2 mb-1">
                  <div className="rounded-full bg-[#2BB673] border h-4 w-4"></div>
                  <span className="text-sm">Answered</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="rounded-full bg-[#e5e5e5] border h-4 w-4"></div>
                  <span className="text-sm">Unanswered</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="rounded-full bg-white border h-4 w-4"></div>
                  <span className="text-sm">Current</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="rounded-full bg-red-500 border h-4 w-4"></div>
                  <span className="text-sm">Required</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar Toggle (when closed) */}
        {!isSidebarOpen && (
          <div className="hidden md:block md:col-span-1">
            <img
              onClick={() => setIsSidebarOpen(true)}
              src="/grid-5.png"
              alt="Toggle sidebar"
              className="w-8 h-8 cursor-pointer absolute -top-10 left-10"
            />
          </div>
        )}

        {/* Mobile sidebar toggle */}
        <div className="md:hidden flex justify-end mb-2">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 bg-gray-100 rounded-md"
            aria-label="Toggle question navigation"
          >
            <img
              src="/grid-5.png"
              alt="Toggle navigation"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Mobile sidebar - shown when toggled */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white p-4 md:hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Questions</h2>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const isAnswered = selectedAnswers[q._id] !== undefined;
                const isCurrent = currentQuestion === index;
                const isBookmarked = bookmarked.includes(q._id);

                return (
                  <div
                    key={q._id}
                    className={`border text-center p-2 w-full h-10 rounded-md cursor-pointer relative
                        ${
                          isAnswered
                            ? "bg-[#2BB673]"
                            : validationError &&
                              currentQuestion === questions.length - 1
                            ? "bg-red-500 text-white"
                            : isCurrent
                            ? "bg-white"
                            : "bg-[#d7d7d7]"
                        }`}
                    onClick={() => {
                      setCurrentQuestion(index);
                      setValidationError(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {index + 1}
                    {isBookmarked && (
                      <div className="absolute -top-1 -right-1 text-[#FAC167]">
                        <BookmarkIcon size={12} fill="#FAC167" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#2BB673] border h-4 w-4"></div>
                <span className="text-sm">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#e5e5e5] border h-4 w-4"></div>
                <span className="text-sm">Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-white border h-4 w-4"></div>
                <span className="text-sm">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-red-500 border h-4 w-4"></div>
                <span className="text-sm">Required</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div
          className={`col-span-1 ${
            isSidebarOpen ? "md:col-span-10" : "md:col-span-11"
          } p-3 sm:p-5 bg-[#F4F4F4] rounded-md`}
        >
          {/* Progress bar and timer */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-5 mb-4">
            <div className="flex items-center col-span-1 sm:col-span-11 gap-2 m-2">
              <div className="w-full bg-white rounded-full h-2">
                <div
                  className="bg-[#2A586F] h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(answeredQuestions / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="font-medium text-sm sm:text-base whitespace-nowrap">
                {answeredQuestions}/{questions.length}
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-center p-2 bg-amber-300 rounded-md">
              <Timer className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium text-sm sm:text-base">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Question */}
          <div className="flex flex-wrap sm:flex-nowrap items-center min-h-[44px] gap-2 m-2">
            <div className="rounded-full flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 text-white bg-[#2A586F] font-medium flex-shrink-0">
              {currentQuestion + 1}
            </div>
            <h2 className="text-base sm:text-xl font-medium flex-grow">
              {question?.question}
            </h2>
            <span className="text-gray-600 text-sm sm:text-base ml-auto flex-shrink-0">
              {question.marks} marks
            </span>
          </div>

          {/* Options */}
          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md mb-6">
            {validationError && !selectedAnswers[question._id] && (
              <p className="text-red-500 mb-4 font-medium">
                Please select an answer to continue!
              </p>
            )}
            {question?.options.map((option) => (
              <Radio
                key={option._id}
                label={option.text}
                checked={selectedAnswers[question._id] === option._id}
                onChange={() => handleSelectAnswer(option._id)}
                className="min-w-52 w-fit mb-2"
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-4 sm:mt-6">
            <button
              onClick={handleBookmark}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Bookmark question"
            >
              <BookmarkIcon
                className={
                  bookmarked.includes(question._id)
                    ? "text-[#FAC167] fill-[#FAC167]"
                    : "text-gray-500"
                }
                size={20}
              />
            </button>
            <div className="flex space-x-2 sm:space-x-4">
              {currentQuestion > 0 && (
                <button
                  className="flex items-center gap-1 bg-[#2A586F] text-white rounded-md px-3 sm:px-4 py-2 hover:bg-[#1E4559] transition-colors text-sm sm:text-base"
                  onClick={handlePrevious}
                  disabled={isSubmitting}
                >
                  <ArrowLeft size={16} className="hidden sm:inline" />
                  Previous
                </button>
              )}
              <button
                className="flex items-center gap-1 bg-[#2A586F] text-white rounded-md px-3 sm:px-4 py-2 hover:bg-[#1E4559] transition-colors disabled:opacity-70 text-sm sm:text-base"
                onClick={handleNext}
                disabled={isSubmitting}
              >
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Next <ArrowRight size={16} className="hidden sm:inline" />
                  </>
                ) : isSubmitting ? (
                  "Submitting..."
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
