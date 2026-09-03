import styled from 'styled-components';

export const LayoutWrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    max-width: 1440px;
    padding: 24px 16px;
    box-sizing: border-box;
    gap: 16px;
    
    & h1 {
        margin: 0;
        font-family: 'Inter Display', Roboto, sans-serif;
        font-weight: 400;
        font-size: 35px;
        line-height: 125%;
        letter-spacing: 0;
    }
`;