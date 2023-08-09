import { useState, useEffect } from 'react';
import './Home.css';

export default function Home(props) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => setCategory(data.trivia_categories));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    props.setOption((prevOption) => {
      return {
        ...prevOption,
        [name]: value,
      };
    });
  }

  return (
    <div className="container">
      <p className="title">Quizzical</p>
      <p className="description">
        Choose the number, category, difficulty and type of questions and play
        the quiz
      </p>
      <form>
        <div className="input">
          <input
            className="inner"
            type="number"
            required
            onChange={handleChange}
            name="number"
            value={props.option.number}
          />
        </div>
        <div className="input">
          <select
            className="inner"
            onChange={handleChange}
            name="category"
            value={props.option.category}
          >
            <option value="">Any Category</option>
            {category.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input">
          <select
            className="inner"
            onChange={handleChange}
            name="difficulty"
            value={props.option.difficulty}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="input">
          <select
            className="inner"
            onChange={handleChange}
            name="type"
            value={props.option.type}
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
        <button className="button" onClick={props.startQuiz}>
          Start quiz
        </button>
      </form>
    </div>
  );
}