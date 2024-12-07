import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import OtpInput from "../../components/OtpInput";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const [timer, setTimer] = useState({ minutes: 2, seconds: 0 });
  const [resendDisabled, setResendDisabled] = useState(false);

  const startTimer = () => {
    setResendDisabled(true);
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        const { minutes, seconds } = prevTimer;
        if (minutes === 0 && seconds === 0) {
          clearInterval(countdown);
          setResendDisabled(false);
          return { minutes: 2, seconds: 0 };
        } else if (seconds === 0) {
          return { minutes: minutes - 1, seconds: 59 };
        } else {
          return { minutes, seconds: seconds - 1 };
        }
      });
    }, 1000);
  };

  const handleResendOtpClick = () => {
    handleSendOtpClick();
  };
  const navigate = useNavigate();
  const location = useLocation();

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtpClick = async () => {
    setLoading(true);
    const email = location.state.email;
    if (!email) {
      navigate("/signin");
      return;
    }

    try {
      await axios.post("/api/users/verify-email", { email });
      startTimer();
      setLoading(false);
      setShowOtpInput(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  const handleOtpSubmit = (otp: string) => {
    const email = location.state.email;
    if (!email) {
      navigate("/signin");
      return;
    }

    const verifyOtp = async () => {
      try {
        const response = await axios.post("/api/users/verify-otp/email", {
          email,
          otp,
        });
        toast.success(response.data.message);
        navigate("/signin");
      } catch (error) {
        toast.error("an error occurred");

        console.error("Error verifying OTP:", error);
        navigate("/verify-email", { state: { email } });
      }
    };

    verifyOtp();
  };

  return (
    <>
      {!showOtpInput ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              Verify Your Email
            </h2>
            {loading ? (
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-6 h-6 border-4 border-t-4 border-t-transparent border-indigo-600 rounded-full"
                />
              </div>
            ) : (
              <button
                onClick={handleSendOtpClick}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Send OTP
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              Verify Your Email
            </h2>
            <OtpInput inputLength={6} onSubmitOtp={handleOtpSubmit} />
            <div className="text-center">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Didn’t receive the OTP?{" "}
                <button
                  onClick={handleResendOtpClick}
                  className={`font-medium ${
                    resendDisabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-indigo-600 hover:underline dark:text-indigo-400"
                  }`}
                  disabled={resendDisabled}
                >
                  Resend OTP
                </button>
              </p>
              {resendDisabled && (
                <p className=" dark:text-white">
                  You can resend OTP in {timer.minutes}:
                  {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyEmailPage;
