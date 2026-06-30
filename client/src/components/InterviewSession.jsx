// import Timer from "./Timer";
// import QuestionCard from "./QuestionCard";
// import ReactMarkdown from "react-markdown";

// function InterviewSession({

//     questions,
//     currentQuestion,

//     answers,
//     setAnswers,

//     submitInterview,

//     overallFeedback

// }) {

//     return (

//         <>

//             {

//                 questions.length > 0 && !overallFeedback &&

//                 (
//                     <Timer initialTime={20 * 60} onTimeUp={submitInterview}/>
//                 )

//             }


//             {
//                 questions.length > 0 &&
//                 (
//                     <QuestionCard

//                         question={ questions[currentQuestion] }

//                         index={ currentQuestion }

//                         answers={answers}

//                         setAnswers={setAnswers}

//                     />

//                 )
//             }

//             {

//                 questions.length > 0 &&

//                 currentQuestion ===

//                 questions.length - 1 &&

//                 (

//                     <button onClick={submitInterview}>

//                         Finish Interview

//                     </button>

//                 )

//             }


//             {

//                 overallFeedback &&

//                 (

//                     <>

//                         <h2>

//                             Interview Evaluation

//                         </h2>

//                         <ReactMarkdown>

//                             {overallFeedback}

//                         </ReactMarkdown>

//                     </>

//                 )
//             }
//         </>
//     );
// }

// export default InterviewSession;

import Timer from "./Timer";
import QuestionCard from "./QuestionCard";
import InterviewFeedback from "./InterviewFeedback";


function InterviewSession({

    questions,

    currentQuestion,
    setCurrentQuestion,

    answers,
    setAnswers,

    submitInterview,

    overallFeedback

}) {

    if (questions.length === 0) return null;

    return (

        <>

            {

                !overallFeedback &&

                <Timer

                    initialTime={20 * 60}

                    onTimeUp={submitInterview}

                />

            }

            {

                !overallFeedback &&

                <QuestionCard

                    question={questions[currentQuestion]}

                    index={currentQuestion}

                    answer={answers[currentQuestion] || ""}

                    setAnswer={(text) =>

                        setAnswers(prev => ({

                            ...prev,

                            [currentQuestion]: text

                        }))

                    }

                />

            }

            {

                !overallFeedback &&

                (

                    currentQuestion < questions.length - 1 ?

                    (

                        <button

                            onClick={() =>

                                setCurrentQuestion(

                                    currentQuestion + 1

                                )

                            }

                        >

                            Next →

                        </button>

                    )

                    :

                    (

                        <button

                            onClick={submitInterview}

                        >

                            Finish Interview

                        </button>

                    )

                )

            }

            <InterviewFeedback
                feedback ={overallFeedback}
            />

        

        </>

    );

}

export default InterviewSession;