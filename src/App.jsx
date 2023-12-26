import BlobBottomLeft from "./assets/BlobBottomLeft.jsx";
import BlobTopRight from "./assets/BlobTopRight.jsx";
import Start from "./components/Start.jsx";
import Quiz from "./components/Quiz.jsx";
import { useState } from "react";

export default function App() {
    // STATE VARIABLES
    const [startComponent, setStartComponent] = useState(true);
    const [quizData, setQuizData] = useState([]);

    // API INFORMATION
    const apiUrl = () => `https://opentdb.com/api.php?amount=5`;

    // FETCH QUESTIONS FROM API
    const fetchQuestions = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setQuizData(data.results);
    };

    // INITIALIZE THE QUIZ
    const initializeQuiz = () => {
        fetchQuestions(apiUrl());
        setStartComponent(false);
    };

    // RESTART QUIZ
    const restartQuiz = () => {
        setQuizData([]);
        setStartComponent(true);
    };

    return (
        <div className="app">
            <aside>
                <BlobBottomLeft />
                <BlobTopRight />
            </aside>
            {startComponent ? (
                <Start onClick={initializeQuiz} />
            ) : (
                <Quiz data={quizData} onRestart={restartQuiz} />
            )}
        </div>
    );
}