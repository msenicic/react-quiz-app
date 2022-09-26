import { useState } from 'react';
import './Question.css';
import { nanoid } from 'nanoid';

export default function Question(props) {
  const [currAns, setCurrAns] = useState('');
  let array = [];
  const clickAnswer = (e) => {
    const { value } = e.target;
    array = props.currAns;
    array[props.index] = value;
    props.setCurrAns(array);
    setCurrAns(value);
  };

  return (
    <div className="question">
      <p>{atob(props.question)}</p>
      <div className="answers">
        {props.answers &&
          props.answers.map((item) => {
            const id = nanoid();
            const index = props.index;
            return (
              <div
                key={id}
                className={
                  props.check && props.correct_answer === item
                    ? 'answer correct'
                    : props.check && props.currAns[index] === item
                    ? 'answer incorrect'
                    : 'answer'
                }
              >
                <input
                  type="radio"
                  id={id}
                  name={index}
                  value={item}
                  checked={currAns === item}
                  onChange={clickAnswer}
                  disabled={props.check ? true : false}
                />
                <label htmlFor={id}>{atob(item)}</label>
              </div>
            );
          })}
      </div>
    </div>
  );
}