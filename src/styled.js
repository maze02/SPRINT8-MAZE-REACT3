import styled, { css, createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
:root {
  --white: #ffffff;
  --grey1: #edf2f6;
  --grey2: #2f3848;
  --grey3: #1a202d;
  --black: #000000;
  --headingFont: "Raleway", sans-serif;
  --textFont: "Roboto", sans-serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
html {
  box-sizing: border-box;
  height: 100%;
  font-size: 62.5%;
}
body {
  min-height: 100%;
  background-color: var(--grey1);
  font-size: 16px;
  font-size: 1.6rem;
  font-family: var(--textFont);
}`;

export const Button = styled.button`
  margin-top: 2rem;
  font-family: "Raleway", sans-serif; //heading font
  padding: 1.5rem;
  font-size: 1.4;
  font-weight: 400;
  border-radius: 0.5rem;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    cursor: pointer;
  }
`;

export const Btn_Primary = styled(Button)`
  background-color: #2f3848; //grey 2
  color: var(--white);

  &:hover {
    background: #1a202d; //grey 3
  }
`;

export const Btn_Secondary = styled(Button)`
  background-color: #edf2f6; //grey 1
`;

/*
.field-form:last-of-type {
  margin: 0;
}
.field-form label {
  flex: 0 0 100px;
  font-family: var(--textFont);
}
.field-form input[type="password"],
.field-form input[type="email"],
.field-form input[type="text"] {
  border: 1px solid #e1e1e1;
  padding: 1rem;
  flex: 1;
}
*/

export const Field_Form = styled.div`
  &:last-of-type {
    margin: 0;
  }
`;
