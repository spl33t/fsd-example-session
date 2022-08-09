import { Link } from "atomic-router-react";
import { ReactNode } from "react";
import styled from "styled-components"
import { useUnit } from "effector-react";

import { SessionPanel } from "entities/session";
import { routes } from "shared/routes";
import { $isAuthorized } from "shared/token";


type LayoutProps = {
    children: ReactNode
}

export const Layout = (props: LayoutProps) => {
    const isAuth = useUnit($isAuthorized)

    return (
        <LayoutContainer>
            {isAuth &&
            <Header>
                <LogoLink to={routes.home}>
                    AppTest
                </LogoLink>
                <NavigationMenu>
                    <Link to={routes.home}>Home</Link>
                    <Link to={routes.about}>About</Link>
                </NavigationMenu>
                <SessionPanel/>
            </Header>
            }

            <Content>
                {props.children}
            </Content>

            {isAuth &&
            <Footer>
                Test App
            </Footer>
            }
        </LayoutContainer>
    );
};

const LayoutContainer = styled.div`
max-width: 1240px;
margin: 0 auto;
`

const Header = styled.header`
background: #61dafb;
padding: 20px;
display: flex;
justify-content: space-between;
align-items: center;
`

const LogoLink = styled(Link)`
font-size: 24px;
font-weight: 800;
`
const NavigationMenu = styled.nav`
display: flex;
gap: 20px;
`

const Content = styled.main`
padding: 20px;
background: #eee;
`

const Footer = styled.footer`
padding: 20px;
background: #000;
color: #fff;
`
