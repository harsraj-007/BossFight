import { Routes,Route, } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
        <ProtectedRoute>
            <History />
        </ProtectedRoute>}  
      />


    </Routes>
  );
}

export default App;


// import { useState } from "react";

// function App() {
//   const [role, setRole] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [history, setHistory] = useState([]);

//   const generateQuestions = async () => {

//     const response = await fetch(
//       "http://localhost:5000/generateQuestions",
//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           role: role,
//         }),
//       }
//     );

//     const data = await response.json();

//     setQuestions(data.questions);
//   };

//   const fetchHistory = async () => {

//     const response = await fetch(
//       "http://localhost:5000/history"
//     );

//     const data = await response.json();

//     setHistory(data);
//   };

//   return (
//     <div>
//       <h1>PrepMate AI</h1>

//       <input
//         type="text"
//         placeholder="Enter role"
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//       />

//       <button onClick={generateQuestions}>
//         Generate Questions
//       </button>

//       <button onClick={fetchHistory}>
//         Show History
//       </button>
    

//       <div>
//         <h2>Questions:</h2>

//         {questions.map((q, index) => (
//           <p key={index}>{q}</p>
//         ))}


//         <h2>Interview History</h2>

//         {history.map((item, index) => (
//           <div key={index}>

//             <h3>{item.role}</h3>

//             <ul>
//               {item.questions.map((q, i) => (
//                 <li key={i}>{q}</li>
//               ))}
//             </ul>

//             <hr />

//           </div>
//         ))}

//       </div>

      

//     </div>


//   );
// }

// export default App;

// import { useState } from "react";

// function App() {
//   const [role, setRole] = useState("");
//   const [questions, setQuestions] = useState([]);

//   const generateQuestions = () => {
//     const sampleQuestions = [
//       "Tell me about yourself",
//       "Explain DBMS normalization",
//       "What is React?"
//     ];

//     setQuestions(sampleQuestions);
//   };

//   return (
//     <div>
//       <h1>PrepMate AI</h1>

//       <input
//         type="text"
//         placeholder="Enter role"
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//       />

//       <button onClick={generateQuestions}>
//         Generate Questions
//       </button>

//       <div>
//         <h2>Questions:</h2>

//         {questions.map((q, index) => (
//           <p key={index}>{q}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;