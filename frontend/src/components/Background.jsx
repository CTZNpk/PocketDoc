const Background = ({ children, className = "" }) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 ${className}`}
    >
      {children}
    </div>
  );
};

export default Background;
