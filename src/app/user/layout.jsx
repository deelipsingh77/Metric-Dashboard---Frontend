import NavBar from "@/components/NavBar";
import { Sidebar } from "@/components/Sidebar";
import { ProductionProvider } from "@/context/ProductionContext";
import ProtectedRoute from "@/utils/ProtectedRoute";

const UserLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoute>
        <ProductionProvider>
          <header>
            <NavBar />
          </header>
          <div className="grid grid-cols-12">
            <div className="hidden sm:block sm:col-span-2">
              <Sidebar />
            </div>
            <div className="col-span-12 sm:col-span-10 px-4 sm:p-0">
              {children}
            </div>
          </div>
        </ProductionProvider>
      </ProtectedRoute>
    </>
  );
};
export default UserLayout;
