import styled from "styled-components";

export const AppLoader = () => {
    return (
        <Loader>
            Loading...
        </Loader>
    );
};

export const Loader = styled.div`
height: 100vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
font-size: 3vw;
`
