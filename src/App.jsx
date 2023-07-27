import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import ClickableWithSound from './components/ClickableWithSound.jsx';
import "./App.css";
import axios from 'axios'


function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([
    {
      id: '26c4806d-fe05-4344-84ca-3c0092d15477',
      question: 'What does CPU stand for?',
      correctAnswer: 'Central Processing Unit',
      answers: [
        'Central Processing Unit',
        'Computer Personal Unit',
        'Central Process Unit',
        'Central Processor Unit',
      ],
      userAnswer: '',
    },
    {
      id: 'cd647d49-62e0-4ff9-8b4d-71e0b4099767',
      question: 'The following Spanish provinces are located in the northern area of Spain except:',
      correctAnswer: 'Murcia',
      answers: ['Le&oacute;n', 'Asturias', 'Navarre', 'Murcia'],
      userAnswer: '',
    },
    {
      id: 'd52c4a1c-8c33-4308-831b-916fa989ef21',
      question: 'What is the name of the first &quot;Star Wars&quot; film by release order?',
      correctAnswer: 'A New Hope',
      answers: ['The Force Awakens', 'The Phantom Menace', 'A New Hope', 'Revenge of the Sith'],
      userAnswer: '',
    },
    {
      id: '258d5be5-7e3b-44cc-bbb1-fb6c1a03bbda',
      question:
        'The metric prefix &quot;atto-&quot; makes a measurement how much smaller than the base unit?',
      correctAnswer: 'One Quintillionth',
      answers: ['One Septillionth', 'One Quintillionth', 'One Billionth', 'One Quadrillionth'],
      userAnswer: '',
    },
    {
      id: '179e8915-189d-4643-8a52-5801a5a1fc84',
      question: 'Pamina and Papageno are characters in what Mozart opera?',
      correctAnswer: 'The Magic Flute',
      answers: ['The Magic Flute', 'The Marriage of Figaro', 'The Goose of Cairo', 'The Impresario'],
      userAnswer: '',
    },
    {
      id: '4e7f9530-93d4-4d73-9ee5-75d9267b2a7d',
      question: 'Which of the following awards do Matt Stone and Trey Parker NOT have?',
      correctAnswer: 'Oscar',
      answers: ['Tony', 'Oscar', 'Grammy', 'Emmy'],
      userAnswer: '',
    },
  ])

  useEffect(() => {
    getQuestions()
  }, [])

  const getQuestions = () => {
    axios.get('https://wd40-trivia.onrender.com/api/questions')
      .then(res => {
        console.log(res.data)
        setQuestions(res.data)
      })
      .catch(error => console.log(error))
  }

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (obj, text) => {
    // get all the ones in the array
    let payload = questions.filter(element => element.id != obj.id)
    payload = [...payload, { ...obj, userAnswer: text }]
    console.log(payload);

    // change the questions array userAnswer in the corresponding object
    setQuestions(payload)

    // Increment the score
    if (obj.correctAnswer == text) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    getQuestions()
  };

 
//<audio id="sound" src={optionClick}> </audio>


  return (
    <>
      {
        !questions ?
          <p>Loading</p>
          :
          <div className="App">
            {/* 1. Header  */}
            <h1 id="heading">Welcome to your daily Quiz</h1>

    

            {/* 2. Current Score  */}
            <h2 id="scoring">Score: {score}</h2>

            {/* 3. Show results or show the question game  */}
            {showResults ? (
              /* 4. Final Results */
              <div className="final-results">
                <h1>Final Results</h1>
                <h2>
                  {score} out of {questions.length} correct - (
                  {(score / questions.length) * 100}%)
                </h2>

                {/* CREATE A COMPONENT THAT TAKES THE QUESTIONS ARRAY AND DISPLAYS THE RIGHT ONES IN GREEN AND THE WRONG ONES IN RED */}
                {questions.map(ele => {
                  return (
                    <div className={ele.userAnswer == ele.correctAnswer ? "correct" : "incorrect"}>
                      <h4>{ele.question}</h4>
                      <p>You chose: {ele.userAnswer}</p>
                      <p>The correct answer was: {ele.correctAnswer}</p>
                    </div>
                  )
                })}



                <button onClick={() => restartGame()}>Restart game</button>
              </div>
            ) : (
              /* 5. Question Card  */
              <div className="question-card">
                     
                {/* Current Question  */}
                <h2>
                  Question: {currentQuestion + 1} out of {questions.length}
                </h2>
                <h3 className="question-text">{questions[currentQuestion].question}</h3>

                {/* List of possible answers  */}
                <ul>
                  {questions[currentQuestion].answers.map((option) => {
                    return (
                      <li class='optionsClicked'
                        // key={option.id}
                        onClick={() =>{optionClicked(questions[currentQuestion], option)
                       }}
                      >
                        {option} 
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          }
    </>
  );
}

export default App;