const Interview = require("../models/Interview");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    // model: "gemini-2.5-flash"
    // model : "gemini-embedding-1"
    model : "gemini-3.1-flash-lite"

});


const generateQuestions = async (req,res) =>{
    try {
        const { role } = req.body;


        const prompt = `
        Generate exactly 5 interview questions for a ${role} role.

        Rules:
        - Only return questions
        - No explanations
        - No numbering
        - One question per line

        Include:
        - HR questions
        - DSA questions
        - CS fundamentals questions
        `;

        const result = await model.generateContent(prompt);
        
        const response = await result.response;

        const text = response.text();

        
        const questions = text
            .split("\n")
            .filter((q) => q.trim() !== "");

        const interview = await Interview.create({
            userId: req.user.userId,
            role,
            questions,
        });


        // await Interview.create({
        //     userId: req.user.userId,
        //     role,
        //     questions,
        // });

        res.json({
            questions,
            interviewId: interview._id
        });

        
        // res.json({
        //     questions
        // });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            error : "Something went wrong",
        });

    }
};

const getHistory = async (req,res) =>{
    try{

        const interviews = await Interview.find({userId: req.user.userId,})
            .sort({createdAt: -1});

        res.json(interviews);

    }

    catch(error){
        console.log(error);

        res.status(500).json({
            error: "Failed to fetch history",
        });

    }
};

const getInterviewById = async (

    req,

    res

) => {

    try {

        const interview =

        await Interview.findOne({

            _id: req.params.id,

            userId:

            req.user.userId,

        });

        if (!interview) {

            return res.status(404)

            .json({

                error:

                "Interview not found"

            });

        }

        res.json(interview);

    }

    catch(error){

        console.log(error);

        res.status(500)

        .json({

            error:

            "Failed to fetch interview"

        });

    }

};


const evaluateAnswer = async (req, res) => {

  try {

    const { question, answer } = req.body;

    const prompt = `
You are an interview evaluator.

Question:
${question}

Candidate Answer:
${answer}

Provide:

Strengths:
Weaknesses:
Suggestions:

Keep response concise.
`;

    const result =
      await model.generateContent(prompt);

    const response = await result.response;

    const feedback = response.text();


    res.json({
      feedback,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Evaluation failed",
    });
  }
};

const evaluateInterview = async (req, res) => {

  try {

    const { role, responses, interviewId } = req.body;

    console.log("Interview ID:", interviewId);

    console.log("Responses:", responses);
    
    const answers = responses.map(
                      item => item.answer
                    );

    console.log("Answers:", answers);

    let prompt = `
      You are a senior software engineering interviewer.

      Role: ${role}

      Evaluate this complete interview.

      `;

          responses.forEach((item, index) => {

            prompt += `
      Question ${index + 1}:
      ${item.question}

      Answer ${index + 1}:
      ${item.answer}

      `;
          });

    prompt += `

Provide:

1. Overall Score (out of 10)

2. Strong Areas

3. Weak Areas

4. Technical Assessment

5. Communication Assessment

6. Suggestions for Improvement

`;

    const result =
      await model.generateContent(prompt);

    const response =
      await result.response;

  const feedback =
    response.text();


  console.log("Updating MongoDB...");

  const updatedInterview =

  await Interview.findByIdAndUpdate(

      interviewId,

      {

          answers,

          overallFeedback: feedback,

      },

      {

          new: true

      }

  );

  console.log(updatedInterview);


  res.json({ feedback, });



  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Interview evaluation failed",
    });
  }
};



module.exports = {
    generateQuestions,
    getHistory,
    getInterviewById,
    evaluateAnswer,
    evaluateInterview
}


