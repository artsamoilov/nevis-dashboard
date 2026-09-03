import * as S from './Layout.styled.ts';
import type {PropsWithChildren} from "react";

export const Layout = ({children}: PropsWithChildren) => <S.LayoutWrapper>{children}</S.LayoutWrapper>