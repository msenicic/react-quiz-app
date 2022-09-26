import { useState, useEffect } from 'react';
import Home from './components/home/Home';
import Quiz from './components/quiz/Quiz';
import Loader from './components/loader/Loader';
import './App.css';

export default function App() {
  const [questions, setQuestions] = useState(undefined);
  const [quiz, setQuiz] = useState(false);
  const [option, setOption] = useState({
    number: 5,
    category: '',
    difficulty: '',
    type: '',
  });
  const [check, setCheck] = useState(false);
  const [score, setScore] = useState(0);
  const [currAns, setCurrAns] = useState([]);
  const [token, setToken] = useState({ token: '', response_code: 0 });

  useEffect(() => {
    // If token is not valid
    if (token.response_code === 4) {
      fetch(
        `https://opentdb.com/api_token.php?command=reset&token=${token.token}`
      )
        .then((res) => res.json())
        .then((data) =>
          setToken({ token: data.token, response_code: data.response_code })
        );
    } else {
      fetch('https://opentdb.com/api_token.php?command=request')
        .then((res) => res.json())
        .then((data) =>
          setToken((prevToken) => ({ ...prevToken, token: data.token }))
        );
    }
  }, [token.response_code]);

  const startQuiz = (e) => {
    // Fetch using token
    fetch(
      `https://opentdb.com/api.php?amount=${option.number}${
        option.category ? `&category=${option.category}` : ''
      }${option.difficulty ? `&difficulty=${option.difficulty}` : ''}${
        option.type ? `&type=${option.type}` : ''
      }&encode=base64&token=${token.token}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.response_code);
        // If token is not valid (ex 50 and Science category)
        if (data.response_code === 4) {
          setToken((prevToken) => ({
            ...prevToken,
            response_code: data.response_code,
          }));
          // Early escape, start quiz
          return startQuiz();
        }
        setToken((prevToken) => ({
          ...prevToken,
          response_code: data.response_code,
        }));
        const question = data.results.map((item) => {
          const handleShuffle = (options) => {
            return options.sort(() => Math.random() - 0.5);
          };
          const answers = [item.correct_answer, ...item.incorrect_answers];
          return { ...item, answers: handleShuffle(answers) };
        });
        setQuestions(question);
        setCurrAns(Array(question.length).fill(''));
      });
    e.preventDefault();
    setQuiz(true);
  };

  const endQuiz = () => {
    setQuiz(false);
    setCheck(false);
    setOption({
      number: 5,
      category: '',
      difficulty: '',
      type: '',
    });
    setQuestions(undefined);
    setScore(0);
    setCurrAns([]);
  };

  return (
    <div className={quiz ? 'App quiz' : 'App'}>
      {quiz ? (
        questions ? (
          <Quiz
            endQuiz={endQuiz}
            questions={questions}
            setCheck={setCheck}
            check={check}
            score={score}
            setScore={setScore}
            currAns={currAns}
            setCurrAns={setCurrAns}
          />
        ) : (
          <Loader />
        )
      ) : (
        <Home startQuiz={startQuiz} option={option} setOption={setOption} />
      )}
    </div>
  );
}