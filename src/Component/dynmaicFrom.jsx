import React, { useState } from "react";

const DynamicForm = () => {
  const [fields, setFields] = useState([{ value: "" }]);

  const handleChange = (index, event) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);

    // Check if the last field is not empty
    if (index === fields.length - 1 && event.target.value !== "") {
      setFields([...fields, { value: "" }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", fields);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Dynamic Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            // htmlFor={`field-${index}`}
          >
            {/* Field {index + 1} */}
          </label>
          {fields.map((field, index) => (
            <div key={index}>
              <input
                type="text"
                id={`field-${index}`}
                name={`field-${index}`}
                value={field.value}
                onChange={(event) => handleChange(index, event)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter some text"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
