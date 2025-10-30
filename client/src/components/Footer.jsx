import React from "react";
import styled from "styled-components";
import ThedhakaXpress from "../assets/ThedhakaXpress.png";

const FooterWrapper = styled.footer`
  background-color: #1f2937;
  color: #d1d5db;
  padding: 2rem 1rem;
  text-align: center;
  margin-top: auto;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Links = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;

  a {
    color:#eeeeee;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #f97316;
    }
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 1rem;

  img {
    max-height: 40px;
    width: auto;
  }
`;

const Info = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
  line-height: 1.6;
`;

const Highlight = styled.span`
  color: #f97316;
  font-weight: 500;
`;

const Copy = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1rem;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Links>
          <li><a href="/">Dashboard</a></li>
          <li><a href="/videolist">Video List</a></li>
          <li><a href="/admin">Admin Panel</a></li>
          <li><a href="/login">Login</a></li>
        </Links>

        <LogoContainer>
          <img src={ThedhakaXpress} alt="Dhaka Xpress Logo" height="40" />
        </LogoContainer>

        <Info>
          <p><Highlight>Dhaka Xpress</Highlight> — A concern of SuXes Multimedia Limited.</p>
          <p>Office Address: House 22, Road 8/C, Nikunja-1, Khilkhet, Dhaka-1229, Bangladesh</p>
          <p>Contact: +880 1712 252 541</p>
          <p>
            <a href="mailto:info@thedhakaxpress.com">info@thedhakaxpress.com</a> |
            <a href="mailto:marketing@thedhakaxpress.com"> marketing@thedhakaxpress.com</a>
          </p>
          <p><em>Pioneering the Future of Journalism</em> — Dhaka Xpress is the first Artificial Intelligence (AI)-powered news media in Bangladesh. Delivering news digitally, 24/7, with unmatched accuracy, speed, and innovation.</p>
        </Info>

        <Copy>© 2025 Dhaka Xpress. All Rights Reserved.</Copy>
      </Container>

      {/* 
        * Developed by Md Aldehan Kabir Rhyme
        * Portfolio: https://aldehankabir.com
        * GitHub: https://github.com/githubkabir123
        * Email: dev@aldehankabir.com
      */}
    </FooterWrapper>
  );
};

export default Footer;
