import { ModeToggle } from "@/components/DarkMode";
import NavBar from "@/components/NavBar";

const UserLayout = ({ children }) => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      {children}
    </>
  );
};
export default UserLayout;
