import React, { useState } from 'react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
  onBlur?: () => void; // <-- add this
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  setTags,
  placeholder = 'Type and press Enter',
  onBlur,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const commitTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim() !== '') {
      e.preventDefault();
      commitTag();
    }
  };

  const removeTag = (indexToRemove: number) => {
    const next = tags.filter((_, index) => index !== indexToRemove);
    setTags(next);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="border border-gray-300 rounded p-1.5 flex flex-wrap gap-2 min-h-[40px]">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-green-500 hover:text-green-700 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-grow outline-none p-1 text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default TagInput;
=======
export default TagInput;
>>>>>>> tester
