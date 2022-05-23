import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
`;

const PageWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PageWrapper;
