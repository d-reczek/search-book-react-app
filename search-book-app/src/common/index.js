import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const PageWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PageWrapper;
