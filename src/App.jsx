import { useState } from 'react'
import { processData, getOperationCode } from "./api";


// const App = () => {
//   const [jsonInput, setJsonInput] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [responseData, setResponseData] = useState(null);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleInputChange = (e) => {
//     setJsonInput(e.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Validate JSON
//       const parsedJson = JSON.parse(jsonInput);
//       setErrorMessage(""); // Clear any previous error

//       // Call the backend API with the input data
//       const response = await processData(parsedJson);
//       if (response) {
//         setResponseData(response);
//         setIsSubmitted(true);
//       }
//     } catch (error) {
//       setErrorMessage("Invalid JSON format");
//       setIsSubmitted(false);
//     }
//   };

//   const handleDropdownChange = (e) => {
//     const options = Array.from(e.target.selectedOptions, (option) => option.value);
//     setSelectedOptions(options);
//   };

//   const renderResponse = () => {
//     if (!responseData || selectedOptions.length === 0) return null;

//     return (
//       <div className="mt-4">
//         {selectedOptions.includes("Alphabets") && (
//           <div>
//             <strong>Alphabets:</strong> {JSON.stringify(responseData.alphabets)}
//           </div>
//         )}
//         {selectedOptions.includes("Numbers") && (
//           <div>
//             <strong>Numbers:</strong> {JSON.stringify(responseData.numbers)}
//           </div>
//         )}
//         {selectedOptions.includes("Highest lowercase alphabet") && (
//           <div>
//             <strong>Highest Lowercase Alphabet:</strong> {JSON.stringify(responseData.highest_lowercase_alphabet)}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Data Processor</h1>

//       <textarea
//         value={jsonInput}
//         onChange={handleInputChange}
//         className="border p-2 w-full mb-4"
//         rows="5"
//         placeholder="Enter JSON data here"
//       />

//       {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Submit
//       </button>

//       {isSubmitted && (
//         <div className="mt-4">
//           <h2 className="text-xl font-bold mb-2">Select Response to View:</h2>

//           <select
//             multiple
//             onChange={handleDropdownChange}
//             className="border p-2 w-full mb-4"
//           >
//             <option value="Alphabets">Alphabets</option>
//             <option value="Numbers">Numbers</option>
//             <option value="Highest lowercase alphabet">Highest Lowercase Alphabet</option>
//           </select>

//           {/* Render the filtered response based on selected options */}
//           {renderResponse()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await processData(parsedInput);
      setResponseData(response);
      setErrorMessage(null); // Clear any previous errors
    } catch (error) {
      setErrorMessage('Invalid JSON input or server error');
      console.error("Error processing data:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter(filter => filter !== value));
    }
  };

  // Function to filter the response based on selected filters
  const getFilteredResponse = () => {
    if (!responseData) return null;
    let filteredResponse = {};

    if (selectedFilters.includes('Alphabets')) {
      filteredResponse.alphabets = responseData.alphabets;
    }
    if (selectedFilters.includes('Numbers')) {
      filteredResponse.numbers = responseData.numbers;
    }
    if (selectedFilters.includes('Highest Lowercase Alphabet')) {
      filteredResponse.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }
    return filteredResponse;
  };

  const filteredResponse = getFilteredResponse();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">JSON Input Form</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder='Enter valid JSON, e.g. { "data": ["A", "1", "b", "2"] }'
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {responseData && (
        <div>
          <h2 className="text-xl font-bold mb-2">Response</h2>
          <pre className="bg-gray-100 p-2 rounded mb-4">{JSON.stringify(responseData, null, 2)}</pre>

          <div className="mb-4">
            <label className="mr-2">
              <input type="checkbox" value="Alphabets" onChange={handleFilterChange} />
              Alphabets
            </label>
            <label className="mr-2">
              <input type="checkbox" value="Numbers" onChange={handleFilterChange} />
              Numbers
            </label>
            <label className="mr-2">
              <input type="checkbox" value="Highest Lowercase Alphabet" onChange={handleFilterChange} />
              Highest Lowercase Alphabet
            </label>
          </div>

          {selectedFilters.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-2">Filtered Response</h2>
              <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(filteredResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;