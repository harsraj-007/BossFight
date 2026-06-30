import { useEffect, useState } from "react";
import BASE_URL, { authHeaders } from "../services/api";

import ReactMarkdown from "react-markdown";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {

    // const token = localStorage.getItem("token");

    const response = await fetch(
      
        `${BASE_URL}/history`,
      
      {
        headers: authHeaders(),

        // headers: {
        //   Authorization:
        //     `Bearer ${token}`,
        // },
      }
    );

    const data =
      await response.json();

    setHistory(data);
  };

  return (

    <div>

      <h1>Interview History</h1>

      {

        history.map((item) => (

          <div

            key={item._id}

            style={{

              border: "1px solid gray",

              padding: "20px",

              marginBottom: "20px",

            }}

          >

            <h2>

              Role:

              {item.role}

            </h2>

            <p>

              Date:

              {

                new Date(

                  item.createdAt

                ).toLocaleString()

              }

            </p>

            <p>
              <b>Difficulty: </b>
              {item.difficulty}
            </p>

            <p>
              <b>Experience: </b>
              {item.experience}
            </p>

            <p>
              <b>Target Company: </b>
              {item.company}
            </p>

            <h3>

              Questions & Answers

            </h3>

            {

              item.questions.map(

                (question,index)=>(

                  <div

                    key={index}

                    style={{

                      marginBottom:

                      "20px"

                    }}

                  >

                    <b>

                      Question

                      {

                        index+1

                      }

                      :

                    </b>

                    <p>

                      {question}

                    </p>

                    <b>

                      Your Answer:

                    </b>

                    <p>

                      {

                        item.answers[index]

                        ||

                        "No answer"

                      }

                    </p>

                  </div>

                )

              )

            }

            <h3>

              Overall Feedback

            </h3>

            <ReactMarkdown>

              {

                item.overallFeedback

              }

            </ReactMarkdown>

          </div>

        ))

      }

    </div>

  );
}

export default History;