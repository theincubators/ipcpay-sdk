const Done = ({ title, text }) => {
  return (
    <li className="relative pb-10">
      <div
        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
        aria-hidden="true"
      ></div>
      <a href="#" className="group relative flex items-start">
        <span className="flex h-9 items-center">
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
            <svg
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </span>
        <span className="ml-4 flex min-w-0 flex-col">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-sm text-gray-500">{text}</span>
        </span>
      </a>
    </li>
  );
};

export default Done;
