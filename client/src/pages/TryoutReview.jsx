import { useEffect, useState } from "react";
import watermark from "../assets/images/watermark.png";
import { fetcher } from "../utils/fetcher";
import { useParams, useNavigate } from "react-router-dom";
import TableScore from "../components/app/MyTryout/TableScore";
import { Table } from "flowbite-react";
import LoadingTable from "../components/LoadingTable";
import SplitText from "../components/SplitText";
import parse from "html-react-parser";

const TryoutReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: "",
      imageUrl: "",
      imageExplanation: "",
      type: "",
      choices: [{ text: "", key: "", image: "" }],
      scoreA: "",
      scoreB: "",
      scoreC: "",
      scoreD: "",
      scoreE: "",
      explain: "",
    },
  ]);
  const [score, setScore] = useState({});
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState([""]);

  console.log(score);
  useEffect(() => {
    const getUserAnswers = async () => {
      try {
        const { data } = await fetcher.get(`/user/review/answer/${id}`);
        const format = data.map((item) => item.answer);
        setUserAnswers(format);
      } catch (error) {
        console.error(error);
      }
    };

    getUserAnswers();
  }, [id]);

  useEffect(() => {
    const getScore = async () => {
      try {
        const { data } = await fetcher.get(`/user/myscore/${id}`);
        setScore(data);
      } catch (error) {
        console.error(error);
      }
    };
    getScore();
  }, [id]);

  useEffect(() => {
    const getSoal = async () => {
      setLoading(true);
      const { data } = await fetcher.get(`/user/review/${id}`);
      console.log(data);
      const format = data.map((item) => ({
        question: item.question,
        imageUrl: item.imageUrl,
        type: item.type,
        choices: [
          { text: item.optionA, key: "a", image: item.imageA },
          { text: item.optionB, key: "b", image: item.imageB },
          { text: item.optionC, key: "c", image: item.imageC },
          { text: item.optionD, key: "d", image: item.imageD },
          { text: item.optionE, key: "e", image: item.imageE },
        ],
        scoreA: item.scoreA,
        scoreB: item.scoreB,
        scoreC: item.scoreC,
        scoreD: item.scoreD,
        scoreE: item.scoreE,
        explain: item.explanation,
        imageExplanation: item.imageExplanation,
      }));

      setQuestions(format);
      setLoading(false);
    };

    getSoal();
  }, [id]);

  const handleNavigate = (index) => {
    setCurrentQuestion(index);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const preventCopy = (event) => {
    event.preventDefault();
  };

  const getScore = (answer, questionIndex) => {
    const question = questions[questionIndex];

    if (!question) return 0;

    switch (answer) {
      case "a":
        return question.scoreA;
      case "b":
        return question.scoreB;
      case "c":
        return question.scoreC;
      case "d":
        return question.scoreD;
      case "e":
        return question.scoreE;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const getScore = (answer, questionIndex) => {
      const question = questions[questionIndex];

      if (!question) return 0;

      switch (answer) {
        case "a":
          return question.scoreA;
        case "b":
          return question.scoreB;
        case "c":
          return question.scoreC;
        case "d":
          return question.scoreD;
        case "e":
          return question.scoreE;
        default:
          return 0;
      }
    };
    const score = getScore("a", 0);
    console.log(score);
  }, [questions]);

  return (
    <div style={{ userSelect: "none" }} onCopy={preventCopy}>
      {!userAnswers ? (
        <h1>Anda belum mengerjakan tryout ini!</h1>
      ) : (
        <div className="relative">
          <div className="fixed top-0 left-0 right-0 bg-white z-10">
            <header className="flex justify-between border-b border-black h-20">
              <div className="hidden md:block ml-4">
                <img
                  src="https://azvyntaelgowdhbadqbs.supabase.co/storage/v1/object/public/ui/logo-extend.png"
                  alt=""
                  className="w-auto h-20"
                />
              </div>
              <button
                onClick={() => {
                  navigate("/app/mytryouts");
                }}
                className="w-8 h-8 m-6 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </header>
          </div>
          <div className="flex flex-col md:flex-row md:h-screen">
            <div className="flex flex-col md:w-1/5 border-r border-black">
              <div className="border-b border-black mt-20">
                <div className="flex justify-between mx-12 my-4">
                  <div className="overflow-x-auto flex">
                    {/* <TableScore data={score} /> */}
                    <p className="font-bold text-2xl">Nilai: {score.total}</p>
                  </div>
                </div>
              </div>
              <div className="border-b border-black">
                <div className="text-center p-3 mx-auto w-fit">
                  <h1 className="text-lg">Jumlah Soal</h1>
                  <h1 className="text-3xl font-medium">{questions.length}</h1>
                </div>
              </div>

              {/* Navigation */}
              <div className="w-screen md:w-full navigation overflow-auto flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-y-4 p-4">
                {questions.map((question, index) => (
                  <div
                    key={index}
                    onClick={() => handleNavigate(index)}
                    className={`text-center border border-black cursor-pointer py-2 flex-shrink-0 w-10 h-10 mr-2 ${
                      currentQuestion === index ? "text-white bg-gray-500" : ""
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
            {loading ? (
              <LoadingTable />
            ) : (
              <div
                className="md:w-4/5 md:mt-20 overflow-y-auto"
                style={{
                  backgroundImage: `url(${watermark})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "repeat",
                  backgroundPosition: "center",
                }}
              >
                <div className="md:hidden block">
                  <img
                    src="https://azvyntaelgowdhbadqbs.supabase.co/storage/v1/object/public/ui/logo-extend.png"
                    alt=""
                    className="w-auto h-20"
                  />
                </div>
                <div className="p-5 md:px-10 md:py-5">
                  <h1 className="text-2xl font-semibold mb-2 md:mb-6">
                    Soal {currentQuestion + 1}
                  </h1>
                  {questions[currentQuestion].question && (
                    <p>{parse(questions[currentQuestion].question)}</p>
                  )}
                  {questions[currentQuestion].imageUrl && (
                    <img
                      src={questions[currentQuestion].imageUrl}
                      alt="image"
                    />
                  )}

                  <div className="flex flex-col mt-4">
                    <ul>
                      {questions[currentQuestion].choices.map(
                        (choice, index) => (
                          <li key={index} className="mb-3">
                            <button
                              disabled
                              className={`flex flex-row items-center ${getScore(choice.key, currentQuestion) === 5 ? "bg-[#06C270] p-3 rounded-xl" : ""}`}
                            >
                              <div
                                className={`text-center border border-black pt-1 flex-shrink-0 w-9 h-9 mr-3 ${
                                  choice.key === userAnswers[currentQuestion]
                                    ? "bg-[#FFCB01]"
                                    : ""
                                }`}
                              >
                                {choice.key}
                              </div>
                              <div className="flex flex-col text-start">
                                {choice.text && (
                                  <SplitText text={choice.text} />
                                )}
                                {choice.image && <img src={choice.image} />}
                              </div>

                              {getScore(choice.key, currentQuestion) === 5 && (
                                <span className="ml-2 text-green-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-8 h-8"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                    {getScore(userAnswers[currentQuestion], currentQuestion) ===
                    5 ? (
                      <div className="flex w-fit p-2 bg-gray-200 text-green-600">
                        <span className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <h1>Jawaban Benar</h1>
                      </div>
                    ) : (
                      <div className="flex w-fit p-2 bg-gray-200 text-red-600">
                        <span className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <h1>Jawaban Salah</h1>
                      </div>
                    )}

                    {questions[currentQuestion].type === "tkp" && (
                      <div className="w-fit mt-4">
                        <Table>
                          <Table.Body className="border border-black divide-y divide-black">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                                Opsi
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                A
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                B
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                C
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                D
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                E
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                                Nilai
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {questions[currentQuestion].scoreA}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {questions[currentQuestion].scoreB}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {questions[currentQuestion].scoreC}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {questions[currentQuestion].scoreD}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {questions[currentQuestion].scoreE}
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      </div>
                    )}
                    <h1 className="font-semibold my-2">Pembahasan:</h1>
                    <p>{parse(questions[currentQuestion].explain)}</p>
                    <div>
                      {questions[currentQuestion].imageExplanation && (
                        <img
                          src={questions[currentQuestion].imageExplanation}
                          alt="image"
                        />
                      )}
                    </div>
                  </div>
                  <div className="border-b my-4 border-black"></div>
                  <div className="justify-center md:justify-start mt-4 flex flex-row">
                    <button
                      onClick={handlePrev}
                      disabled={currentQuestion === 0}
                      className={`flex flex-row items-center font-medium mr-4 px-2 py-1 rounded-xl ${
                        currentQuestion === 0 ? "text-gray-300" : "bg-[#FFCB01]"
                      }`}
                    >
                      <span className="mr-2 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      Sebelumnya
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentQuestion === questions.length - 1}
                      className={`flex flex-row items-center font-medium px-2 py-1 rounded-xl ${
                        currentQuestion === questions.length - 1
                          ? "text-gray-300"
                          : "bg-[#FFCB01]"
                      }`}
                    >
                      Selanjutnya
                      <span className="ml-2 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TryoutReview;
