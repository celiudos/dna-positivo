import styled from "@emotion/styled";

const DisplayFlex = styled.div`
  display: flex;
`;

const DisplayFlexSpaceBetween = styled(DisplayFlex)`
  justify-content: space-between;
  align-items: center;
`;

const DisplayFlexCenter = styled(DisplayFlex)`
  justify-content: center;
  align-items: center;
`;

export default DisplayFlex;
export { DisplayFlexSpaceBetween, DisplayFlexCenter };
