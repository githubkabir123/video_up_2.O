import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Styled Components

const Nav = styled.nav`
  background-color: #1f2937; /* Tailwind bg-gray-800 */
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  user-select: none;
`;

// Desktop menu
const DesktopMenu = styled.ul`
  display: flex;
  gap: 1.5rem;
  list-style: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.li``;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ danger }) => (danger ? "#f87171" : "#f97316")}; /* red-400 or orange-400 */
  }
`;

// Hamburger button for mobile
const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }

  user-select: none;
`;

// Slide in animation for mobile menu
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

// Mobile menu container
const MobileMenu = styled.ul`
  list-style: none;
  padding: 2rem 1.5rem;
  margin: 0;
  background-color: #1f2937;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.4);
  transform: translateX(${({ open }) => (open ? "0" : "100%")});
  animation: ${({ open }) => (open ? slideIn : slideOut)} 0.3s forwards;
  transition: transform 0.3s ease-in-out;
  z-index: 1500;
`;

const Overlay = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1400;
  cursor: pointer;
`;

const Navbar = () => {
  const role = localStorage.getItem("role");
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on link click (mobile)
  const handleLinkClick = () => {
    setMenuOpen(false);
  };
  const handleLogout = () => {
    // Clear all localStorage items related to login
     localStorage.clear();
     setMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <Logo>
            <img src="/src/assets/ThedhakaXpress.png" alt="The Dhaka Xpress" height="40" />
          </Logo>


          <DesktopMenu>
            <MenuItem>
              <StyledLink to="/dashboard">Dashboard</StyledLink>
            </MenuItem>

            {role === "journalist" && (
              <>
                <MenuItem>
                  <StyledLink to="/upload">Upload Video</StyledLink>
                </MenuItem>
                <MenuItem>
                  <StyledLink to="/my-videos">My Videos</StyledLink>
                </MenuItem>
              </>
            )}

            {(role === "editor" ) && (
              <MenuItem>
                <StyledLink to="/videolist/">Video List</StyledLink>
              </MenuItem>
            )}

            {role === "admin" && (
              <>
                <MenuItem>
                  <StyledLink to="/admin">Admin Panel</StyledLink>
                </MenuItem>
                {/* <MenuItem>
                  <StyledLink to="/stats">Stats</StyledLink>
                </MenuItem> */}
                {/* <MenuItem>
                  <StyledLink to="/export">Export Videos</StyledLink>
                </MenuItem> */}
                {/* <MenuItem>
                  <StyledLink to="/districtsmanage">Manage Districts</StyledLink>
                </MenuItem> */}
                <MenuItem>
                  <StyledLink to="/allroute">All Route</StyledLink>
                </MenuItem>
                {/* <MenuItem>
                  <StyledLink to="/districts/">District List</StyledLink>
                </MenuItem> */}
                <MenuItem>
                  <StyledLink to="/videodeletionlogs/">videodeletionlogs</StyledLink>
                </MenuItem>
              </>
            )}

            <MenuItem>
              <StyledLink onClick={handleLogout}>
                Logout
              </StyledLink>
            </MenuItem>
          </DesktopMenu>

          <MenuButton
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {!menuOpen ? "☰" : "❌"}
          </MenuButton>
        </NavContainer>
      </Nav>

      {/* Overlay */}
      <Overlay open={menuOpen} onClick={() => setMenuOpen(false)} />

      {/* Mobile Menu */}
      <MobileMenu open={menuOpen}>
        <MenuItem>
          <StyledLink to="/dashboard" onClick={handleLinkClick}>
            Dashboard
          </StyledLink>
        </MenuItem>

        {role === "journalist" && (
          <>
            <MenuItem>
              <StyledLink to="/upload" onClick={handleLinkClick}>
                Upload Video
              </StyledLink>
            </MenuItem>
            <MenuItem>
              <StyledLink to="/my-videos" onClick={handleLinkClick}>
                My Videos
              </StyledLink>
            </MenuItem>
          </>
        )}

        {(role === "editor" || role === "journalist") && (
          <MenuItem>
            <StyledLink to="/videolist/" onClick={handleLinkClick}>
              Video List
            </StyledLink>
          </MenuItem>
        )}

        {role === "admin" && (
          <>
            <MenuItem>
              <StyledLink to="/admin" onClick={handleLinkClick}>
                Admin Panel
              </StyledLink>
            </MenuItem>
            <MenuItem>
              <StyledLink to="/stats" onClick={handleLinkClick}>
                Stats
              </StyledLink>
            </MenuItem>
            <MenuItem>
              <StyledLink to="/export" onClick={handleLinkClick}>
                Export Videos
              </StyledLink>
            </MenuItem>
            {/* <MenuItem>
              <StyledLink to="/districtsmanage" onClick={handleLinkClick}>
                Manage Districts
              </StyledLink>
            </MenuItem> */}
            <MenuItem>
              <StyledLink to="/videolist/" onClick={handleLinkClick}>
                Video List
              </StyledLink>
            </MenuItem>
            <MenuItem>
              <StyledLink to="/allroute/" onClick={handleLinkClick}>
               All Route
              </StyledLink>
            </MenuItem>
            <MenuItem>
              <StyledLink to="/videodeletionlogs/" onClick={handleLinkClick}>
               video deletion logs
              </StyledLink>
            </MenuItem>
          </>
        )}

        <MenuItem>
          <StyledLink   onClick={handleLogout}>
            Logout
          </StyledLink>
        </MenuItem>
      </MobileMenu>
      {/* /**
      * Developed by Md Aldehan Kabir Rhyme
      * Portfolio: https://aldehankabir.com
      * GitHub: https://github.com/githubkabir123
      * Email: dev@aldehankabir.com
      *
      * Description:
      * This component/file is part of a project developed by Md Aldehan Kabir Rhyme.
      * Please visit the website to learn more about the developer and their work.
      */ }
    </>
  );
};

export default Navbar;
