import { Link } from "react-router-dom";

const SocialIcons = ({ to, icon: Icon, className }) => {
  return (
    <Link 
      to={to}
      className={`text-gray-300 text-xl p-2 rounded-full hover:text-[#ff6b00] transition-all duration-300 ${className}`}
    >
      <Icon />
    </Link>
  );
};

export default SocialIcons;