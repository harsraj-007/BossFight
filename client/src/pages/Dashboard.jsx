import { useState } from "react";
import {useNavigate} from "react-router-dom";
import BASE_URL , {authHeaders} from "../services/api";
import ReactMarkdown from "react-markdown";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import InterviewSetup from "../components/InterviewSetup";
import InterviewSession from "../components/InterviewSession";


function Dashboard() {

  const [role, setRole] = useState("");

  const [difficulty, setDifficulty] = useState("Medium");

  const [experience, setExperience] = useState("0-1 Years");

  const [company, setCompany] = useState("General");

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [interviewId, setInterviewId] = useState("");  //to update same interview later with ans 

  const [answers, setAnswers] = useState({});

  const [overallFeedback, setOverallFeedback] = useState("");

  const navigate = useNavigate();

  const generateQuestions = async () => {

    //const token = localStorage.getItem("token");

    const response = await fetch(

      `${BASE_URL}/generate-questions`,

      {
        method: "POST",

        headers: authHeaders(),

        // headers: {
        //   "Content-Type":
        //     "application/json",

        //   Authorization:
        //     `Bearer ${token}`,
        // },

        body: JSON.stringify({
          role,
          difficulty,
          experience,
          company
        }),
      }
    );

    const data = await response.json();

    // const data = await response.json();

    console.log(data);

    if (data.questions) {
        setQuestions(data.questions);
        setInterviewId(data.interviewId);
    } 

    else {
        console.log(data);
        alert(data.error || "Something went wrong");
    }

    // setQuestions(data.questions);
  };

    const submitInterview = async () => {


    const responses = questions.map(
        (question, index) => ({
        question,
        answer: answers[index] || "",
        })
    );

    const response = await fetch(
        `${BASE_URL}/evaluate-interview`,
        {
        method: "POST",

        headers: authHeaders(),

        body: JSON.stringify({
            role,
            responses,
            interviewId
        }),
        }
    );

    const data =
        await response.json();

    console.log(data);

    setOverallFeedback(
        data.feedback
    );
    };    


  return (

    <div>

      <InterviewSetup

          role={role}
          setRole={setRole}

          difficulty={difficulty}
          setDifficulty={setDifficulty}

          experience={experience}
          setExperience={setExperience}

          company={company}
          setCompany={setCompany}

          generateQuestions={generateQuestions}

      />

      <InterviewSession

          questions={questions}

          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}

          answers={answers}
          setAnswers={setAnswers}

          submitInterview={submitInterview}

          overallFeedback={overallFeedback}

      />

      
      {/* { questions.length > 0 && !overallFeedback &&

      ( <Timer initialTime={20*60} onTimeUp={submitInterview} /> )

      }


      {
        questions.length > 0 && 
        (<QuestionCard 
          question={questions[currentQuestion]}
          index = {currentQuestion}
          answer = {answers[currentQuestion] || ""}
          
          setAnswer={(text) => setAnswers(prev => ({...prev,[currentQuestion]:text}))}/>)
      }


      {

        questions.length > 0  && currentQuestion

        <
          questions.length - 1

        &&

        (

        <button

        onClick={()=>

        setCurrentQuestion(

        currentQuestion + 1

        )

        }

        >

        Next →

        </button>

        )
      }
        {
            questions.length > 0 && // submit button only visible when all the questions are answered
            currentQuestion === questions.length-1 && 
            (<button onClick={submitInterview}>
            Submit Interview           
            </button>)

        }
        
        {
            overallFeedback && (
                <>
                <h2>
                Interview Evaluation
                </h2>

                <ReactMarkdown>
                {overallFeedback}
                </ReactMarkdown>
                </>
            
            )
        } */}

        <button
            onClick={() =>
            navigate("/history")
        }
        >
            View History
        </button>  

        <button
            onClick={() => { localStorage.removeItem( "token" );

                navigate("/login");

            }}
        >
        Logout
        </button>    

    </div>
  );
}

export default Dashboard;


