import { Input } from "@material-tailwind/react";
import React, { useState } from "react";

function AutocompleteInput({ suggestions, label }) {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filteredSuggestions);
  };

  const handleItemClick = (value) => {
    setInputValue(value);
    setFilteredSuggestions([]);
  };

  return (
    <div>
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        label={label}
      />
      <ul>
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleItemClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AutocompleteInput;
