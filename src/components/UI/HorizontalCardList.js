import styled from "styled-components";

const HorizontalCardList = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  .pilotListWrapper {
    display: inline-flex;
    flex-direction: horizontal;
    justify-content: center !important;
    margin-left: -12%;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    width: 100rem;
  }

  .spacerList {
    margin-top: -2rem;
    margin-bottom: 5rem;
    text-align: center;
  }
`;

export default HorizontalCardList;
