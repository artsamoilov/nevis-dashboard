import styled from "styled-components";

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #14141314;

  & img {
    display: block;
    width: 100%;
    height: auto;
  }

  & span {
    font-size: 10px;
    line-height: 16px;
  }
`;
