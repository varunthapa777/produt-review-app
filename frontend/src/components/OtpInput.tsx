import React, { useEffect, useRef, useState } from "react";

interface OtpInputProps {
  inputLength: number;
  onSubmitOtp: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ inputLength, onSubmitOtp }) => {
  const [otp, setOtp] = useState(Array(inputLength).fill(""));
  const inputRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === inputLength) {
      onSubmitOtp(combinedOtp);
    }

    // move to next input
    if (value && index < inputLength - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  };
  const handleClick = (index: number) => {
    inputRef.current[index].setSelectionRange(1, 1);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !otp[index] &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            id={`otp-input-${index}`}
            value={digit}
            ref={(input) =>
              (inputRef.current[index] = input as HTMLInputElement)
            }
            onChange={(e) => handleChange(e, index)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 appearance-none"
            placeholder="-"
            autoComplete="off"
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
