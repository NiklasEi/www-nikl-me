import React from 'react';
import { Link } from 'gatsby';

const NavBar: React.FC = () => {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/projects">projects</Link>
    </div>
  );
};

export default NavBar;
