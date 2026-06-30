import { useState } from "react";

function VoiceInput({

    onTranscript

}) {

    const [isListening , setIsListening] = useState(false);

    const [recognition, setRecognition] = useState(null);



    const startListening = () => {

        const SpeechRecognition =

        window.SpeechRecognition ||

        window.webkitSpeechRecognition;


        if(!SpeechRecognition){

            alert("Speech Recognition not supported");

            return;

        }


        const recog = new SpeechRecognition();

        recog.continuous = true;

        recog.interimResults = true;

        recog.lang = "en-US";


        recog.onstart = () => {

            setIsListening(true);

        };


        recog.onresult =

        (event) => {

            let transcript = "";

            for(

                let i=0;

                i<event.results.length;

                i++

            ){

                transcript +=

                event.results[i][0]

                .transcript;

            }

            onTranscript(

                transcript

            );

        };


        recog.onend = () => {

            setIsListening(false);

        };


        recog.start();

        setRecognition(recog);

    };



    const stopListening = () => {

        if(recognition){

            recognition.stop();

        }

    };


    return(

        <div>

            {

            !isListening ?

            (

            <button

            onClick={

            startListening

            }

            >

            🎤 Start Speaking

            </button>

            )

            :

            (

            <button

            onClick={

            stopListening

            }

            >

            🛑 Stop

            </button>

            )

            }

        </div>

    );

}

export default VoiceInput;