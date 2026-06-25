import LogoutButton from "./logout-button";
import { ToggleTheme } from "./toggle-theme";
import UserAvatar from "./user-avatar";

const Titlebar = () => {
  return (
    <div className="h-16 px-4 flex justify-between items-center bg-secondary border-t-8 border-primary sticky top-0 z-10">
      <header className="text-primary dark:text-primary text-3xl font-bold">My Tasks</header>
      <div className="flex items-center gap-2"></div>
      <div className="flex items-center gap-2">
        <LogoutButton />
        <ToggleTheme />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Titlebar;
