const Greeting = ({ title, text }) => {
  return (
    <li className="relative">
      <a href="#" className="group relative flex items-start">
        <span className="flex h-9 items-center" aria-hidden="true">
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"></span>
          </span>
        </span>
        <span className="ml-4 flex min-w-0 flex-col">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          <span className="text-sm text-gray-500">{text}</span>
        </span>
      </a>
    </li>
  );
};

export default Greeting;
