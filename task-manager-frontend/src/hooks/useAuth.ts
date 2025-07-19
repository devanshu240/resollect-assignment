const useAuth = () => {
  return !!localStorage.getItem("accessToken");
};

export default useAuth;
