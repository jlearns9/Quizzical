/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { shuffleArray, decodeHtml } from "../functions.js";

// START HERE

export default function Quiz(props) {
    
    // State
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [score, setScore] = useState(null);

    // Function - Handles answer selection
    const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    // Function - Checks user's answers
    const handleCheckAnswers = () => {
        const correctCount = correctAnswers.reduce(
            (count, answer, index) =>
                count + (selectedAnswers[index] === answer ? 1 : 0),
            0
        );
        setScore((correctCount / props.data.length) * 5);
    };

    // Function - Resets everything
    const restartGame = () => {
        setCorrectAnswers([]);
        setSelectedAnswers([]);
        setShuffledAnswers([]);
        setScore(null);
        props.onRestart()
    };

    // useEffect
    useEffect(() => {
        setCorrectAnswers(
            props.data.map((question) => decodeHtml(question.correct_answer))
        );        
        
        setShuffledAnswers(
            props.data.map((question) =>
                shuffleArray([
                    decodeHtml(question.correct_answer),
                    ...question.incorrect_answers.map((answer) =>
                        decodeHtml(answer)
                    ),
                ])
            )
        );
    }, [props.data]);

    // Mapping over shuffledAnswers to create question elements
    const questionElements = props.data.map((question, index) => {
        const answerButtons = shuffledAnswers[index]?.map((answer) => {
            const isSelected = selectedAnswers[index] === answer;
            let answerButtonClass = `answer-button ${
                isSelected ? " selected" : ""
            }`;

            // Adds more classes depending on answer details
            if (score !== null && answer === correctAnswers[index]) {
                answerButtonClass += " green";
            } else if (
                score !== null &&
                answer !== correctAnswers[index] &&
                isSelected
            ) {
                answerButtonClass += " red opaque";
            } else if (score !== null) {
                answerButtonClass += " opaque";
            }

            return (
                <button
                    className={answerButtonClass}
                    key={nanoid()}
                    onClick={() => handleAnswerSelect(index, answer)}
                >
                    {answer}
                </button>
            );
        });

        return (
            <div className="questions" key={index}>
                <div className="questions-title">
                    {decodeHtml(question.question)}
                </div>
                {answerButtons}
                <hr className="questions-divider" />
            </div>
        );
    });

    return (
        <div className="quiz-container">
            {questionElements}
            {score === null ? (
                <button
                    className="check-answers-btn"
                    onClick={handleCheckAnswers}
                >
                    Check answers
                </button>
            ) : (
                <div className="flex score-container">
                    <div className="score-count">
                        You scored {score}/5 correct answers
                    </div>
                    <button className="check-answers-btn" onClick={restartGame}>
                        Play again
                    </button>
                </div>
            )}
        </div>
    );
}
