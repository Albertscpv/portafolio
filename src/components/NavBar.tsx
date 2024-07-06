import { Link } from "react-router-dom";
//Return navbar with links

function NavBar() {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Projects", path: "/projects" },
    { title: "Work", path: "/work" },
    { title: "Contact", path: "https://assjopryt8b.typeform.com/to/NCjLtPLe"},
    { title: "Designs", path: "/designs"}
  ];
  return(
      <ul className="flex text-white gap-4 mb-16">
        {navLinks.map((navLink => (
            <li key={navLink.path}>
                <Link to={navLink.path}>{navLink.title}</Link>
            </li>
        )))}
      </ul>
    )
}



export default NavBar;