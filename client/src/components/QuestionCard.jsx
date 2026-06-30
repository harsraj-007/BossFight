import VoiceInput from "./VoiceComponent";


function QuestionCard({ question , index , answer , setAnswer }){

    return(
        <div>
            <h3>
                question {index + 1} 
            </h3>
            <p>
                {question}
            </p>

            <VoiceInput

            onTranscript={

            (text)=>

            setAnswer(text)

            }

            />

            <textarea placeholder="Write you answer"
                    value={answer}
                    onChange={(e)=> setAnswer(e.target.value)}
                    
                    row = "5"
                    cols = "60"
            />

            <hr />

        </div>
    )

}

export default QuestionCard;