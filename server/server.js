const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const interviewRoutes = require("./routes/interviewRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/", interviewRoutes);

app.use("/",authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});



































// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const mongoose = require("mongoose");                     // 3
// const Interview = require("./models/Interview");          // 3

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// dotenv.config();

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// const app = express();

// app.use(cors());
// app.use(express.json());

// const genAI = new GoogleGenerativeAI(
//   process.env.GEMINI_API_KEY
// );

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",
// });

// app.post("/generate-questions", async (req, res) => {

//   try {

//     const { role } = req.body;

//     const prompt = `
//     Generate exactly 5 interview questions for a ${role} role.

//     Rules:
//     - Only return questions
//     - No explanations
//     - No numbering
//     - No markdown
//     - No extra text
//     - One question per line

//     Include:
//     - HR questions
//     - DSA questions
//     - CS fundamentals questions
//     `;

//     const result = await model.generateContent(prompt);

//     const response = await result.response;

//     const text = response.text();

//     const questions = text
//       .split("\n")
//       .filter((q) => q.trim() !== "");
       
//     await Interview.create({
//         role,
//         questions,
//         });
            
            

//     res.json({
//       questions,
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       error: "Something went wrong",
//     });
//   }
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });







// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.post("/generate-questions", (req, res) => {

//   const { role } = req.body;

//   const questions = [
//     `Tell me about yourself for ${role}`,
//     `What is React?`,
//     `Explain DBMS normalization`
//   ];

//   res.json({
//     questions
//   });
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });