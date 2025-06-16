import { useState } from "react";
import { airports } from "@/data/airports";

interface AutocompleteInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const AutocompleteInput = ({ label, value, onChange, placeholder }: AutocompleteInputProps) => {
  const [suggestions, setSuggestions] = useState<typeof airports>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    if (inputValue.length > 1) {
      const filtered = airports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(inputValue.toLowerCase()) ||
          airport.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          airport.code.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-semibold mb-1 text-[color:#024b74]">{label}</label>
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-[#0372aa] rounded-lg shadow-sm bg-white text-[#002444] dark:bg-[#002444] dark:text-white"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-[#002444] text-[#002444] dark:text-white shadow-md max-h-48 overflow-y-auto border border-[#0372aa] rounded-lg">
          {suggestions.map((airport, index) => (
            <li
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-[#0372aa] hover:text-white dark:hover:bg-[#0372aa]"
              onClick={() => handleSelect(`${airport.city} (${airport.code}) - ${airport.name}`)}
            >
              {airport.city} ({airport.code}) – {airport.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
