import Question from '../question/Question';
import { nanoid } from 'nanoid';
import './Quiz.css';

export default function Quiz(props) {
  const checkAnswers = () => {
    props.currAns.forEach((item, i) => {
      if (item === props.questions[i].correct_answer) {
        props.setScore((prevScore) => prevScore + 1);
      }
    });
    props.setCheck(true);
  };

  return (
    <div className="container">
      {props.questions.map((item, i) => {
        return (
          <Question
            key={nanoid()}
            {...item}
            currAns={props.currAns}
            setCurrAns={props.setCurrAns}
            index={i}
            check={props.check}
          />
        );
      })}
      <div className="results">
        {props.check && (
          <p>
            You scored {props.score}/{props.questions.length} correct answers
          </p>
        )}
        <button
          className="button"
          onClick={props.check ? props.endQuiz : checkAnswers}
        >
          {props.check ? 'Play again' : 'Check answers'}
        </button>
      </div>
    </div>
  );
}