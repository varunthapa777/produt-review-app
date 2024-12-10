import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children?: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal"
      className="fixed inset-0 z-[80] overflow-x-hidden overflow-y-auto flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-labelledby="modal-label"
    >
      <div className="w-full sm:max-w-lg sm:w-full bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
          <h3
            id="modal-label"
            className="font-bold text-gray-800 dark:text-white"
          >
            {title}
          </h3>
          <button
            type="button"
            className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
