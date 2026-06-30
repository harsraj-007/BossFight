import ReactMarkdown from "react-markdown";


function InterviewFeedback({feedback}){
    if(!feedback) return null;

    return(
        <>
            <h2>Interview Evaluation</h2>
            <ReactMarkdown>
                feedback
            </ReactMarkdown>
        </>
    )

}

export default InterviewFeedback;