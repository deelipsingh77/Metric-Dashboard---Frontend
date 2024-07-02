import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/utils/ProtectedRoute";

const UserLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoute>
        <header>
          <NavBar />
        </header>
        {children}
      </ProtectedRoute>
    </>
  );
};
export default UserLayout;
