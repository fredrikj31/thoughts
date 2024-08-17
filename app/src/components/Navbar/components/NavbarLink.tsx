import { Link } from "react-router-dom";

interface LinkProps {
  text: string;
  path: string;
  icon: JSX.Element;
}

export const NavbarLink = ({ icon, path, text }: LinkProps) => {
  return (
    <Link className="flex flex-row gap-1 items-center group" to={path}>
      {icon}
      <span className="text-base font-semibold group-hover:text-zinc-300">
        {text}
      </span>
    </Link>
  );
};
