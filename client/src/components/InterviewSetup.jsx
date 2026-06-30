
function InterviewSetup({
    role, setRole,

    difficulty, setDifficulty,

    experience, setExperience,

    company, setCompany,
    
    generateQuestions}){

    return(
        <div>
            <h1>BossFight</h1>
            <input type="text" 
                    placeholder="Role"
                    value={role}
                    onChange={ (e)=> setRole(e.target.value) }
            />

            <br /><br />
      
            <label>Difficuly</label>
            <br />
            <select value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>

                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>

            </select>

            <br /><br />

            <label >Experience</label>

            <br />

            <select value={experience} onChange={(e)=>setExperience(e.target.value)}>

                <option>0-1 Years</option>
                <option>2-4 Years</option>
                <option>5+ Years</option>

            </select>

            <br /><br />

            <label >Target Company</label>

            <br />

            <select value={company} onChange={(e)=>setCompany(e.target.value)}>

                <option>General</option>
                <option>Google</option>
                <option>Amazon</option>
                <option>Microsoft</option>
                <option>Meta</option>
                <option>Apple</option>
                <option>Netflix</option>
                <option>Startup</option>


            </select>

            <br /><br />


            <button onClick={generateQuestions}>
                Generate Questions
            </button>
        </div>

    );

}

export default InterviewSetup;