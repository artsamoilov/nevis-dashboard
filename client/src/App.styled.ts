import styled, { keyframes } from "styled-components";

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

export const StatusCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  padding: 64px 16px;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: "Inter", Roboto, sans-serif;
  font-size: 14px;
  color: #14141399;
  text-align: center;
`;

export const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #14141314;
  border-top-color: #141413;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const RetryButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #14141329;
  border-radius: 8px;
  background-color: white;
  color: #141413;
  font-family: "Inter", Roboto, sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover,
  &:focus-visible {
    background-color: #1414130a;
  }
`;
