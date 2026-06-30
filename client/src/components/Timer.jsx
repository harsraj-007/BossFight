import { useState,useEffect } from "react";

function Timer({initialTime, onTimeUp}){

    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() =>{
        const timer = setInterval( ()=>{

            setTimeLeft((prev) => {

                if(prev <= 1){
                    clearInterval(timer);
                    onTimeUp();

                    return 0;
                }

                return prev - 1;
            });


        },1000);

        return () => clearInterval(timer);
    
    },[]);

    const minutes = Math.floor(timeLeft/60);

    const seconds = timeLeft % 60;

    return (

        <div>

            <h2>

                ⏱

                {String(minutes).padStart(2, "0")}

                :

                {String(seconds).padStart(2, "0")}

            </h2>

        </div>

    );

}

export default Timer;