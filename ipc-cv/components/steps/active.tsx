const Active = ({ title, text }) => {
  return (
    <li className="relative pb-10">
      <div
        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
        aria-hidden="true"
      ></div>
      <a
        href="#"
        className="group relative flex items-start"
        aria-current="step"
      >
        <span className="flex h-9 items-center" aria-hidden="true">
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
          </span>
        </span>
        <span className="ml-4 flex min-w-0 flex-col">
          <span className="text-sm font-medium text-indigo-600">{title}</span>
          <span className="text-sm text-gray-500">{text}</span>
        </span>
      </a>
    </li>
  );
};

export default Active;
