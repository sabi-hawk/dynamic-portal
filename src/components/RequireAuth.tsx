import { useAppState } from "hooks";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const {
    auth: { user },
  } = useAppState();
  const isRehydrated = useSelector((state: any) => state._persist?.rehydrated);

  if (!isRehydrated) {
    return (
      <div style={{ textAlign: "center", marginTop: "20vh" }}>Loading...</div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
