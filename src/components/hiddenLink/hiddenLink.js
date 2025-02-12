import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return children;
  } else {
    return null;
  }
};
export const ShowOnLogout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return children;
  } else {
    return null;
  }
};

// export const PrivateRoute = () => {
//   const { isLoggedIn } = useSelector((state) => state.auth);

//   return isLoggedIn ? <Outlet/> : <Navigate to="/login" />;
// };

export const ChildRoute = () => {
  return (
    <>
      <div className="mainWrapper">
        <Outlet />
      </div>
    </>
  );
};

export default ShowOnLogin;
