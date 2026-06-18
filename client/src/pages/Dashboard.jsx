import { useState } from "react";
import {useNavigate} from "react-router-dom";
import BASE_URL , {authHeaders} from "../services/api";
import ReactMarkdown from "react-markdown";


function Dashboard() {

  const [role, setRole] = useState("");

  const [questions, setQuestions] = useState([]);

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

      <h1>Dashboard</h1>

      <input
        type="text"
        placeholder="Role"
        onChange={(e) =>
          setRole(e.target.value)
        }
      />

      <button
        onClick={generateQuestions}
      >
        Generate Questions
      </button>


        {questions.map((q, index) => (

        <div key={index}>

        <h3>
        Question {index + 1}
        </h3>

        <p>{q}</p>

        <textarea

        placeholder="Write your answer"

        value={
            answers[index] || ""
        }

        onChange={(e) =>

            setAnswers((prev) => ({
            ...prev,
            [index]: e.target.value,
            }))
        }

        rows="5"
        cols="60"

        />

        <br />

        <hr />

    </div>

    ))}

        {
            questions.length > 0 && // submit button only visible when all the questions are answered
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
        }

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


