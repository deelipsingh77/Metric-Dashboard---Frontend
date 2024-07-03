import NavBar from "@/components/NavBar";
import { Sidebar } from "@/components/Sidebar";
import ProtectedRoute from "@/utils/ProtectedRoute";

const UserLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoute>
        <header>
          <NavBar />
        </header>
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <Sidebar />
          </div>
          <div className="col-span-10">
          {children}
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};
export default UserLayout;
