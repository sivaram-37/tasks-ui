import { ToggleTheme } from "./toggle-theme";

const Titlebar = () => {
  return (
    <div className="h-16 px-4 flex justify-between items-center bg-secondary border-t-8 border-primary sticky top-0 z-10">
      <header className="text-primary dark:text-primary text-3xl font-bold">My Tasks</header>
      <ToggleTheme />
    </div>
  );
};

export default Titlebar;
