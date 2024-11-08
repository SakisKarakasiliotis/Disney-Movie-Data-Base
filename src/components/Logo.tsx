import styled from "styled-components";

interface LogoProps {
  url: string;
}

function Logo({ url }: LogoProps) {
  return (
    <StyledLogo>
      <img src={url} alt="" />
      <a href="/">Home</a>
    </StyledLogo>
  );
}

const StyledLogo = styled.figure`
  display: flex;
  width: 80px;
  position: relative;
  margin: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  a {
    position: absolute;
    inset: 0;
    opacity: 0;
  }
`;

export default Logo;
