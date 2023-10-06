import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const email: string | null = localStorage.getItem("user");

  return email !== null ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
