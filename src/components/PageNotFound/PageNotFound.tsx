import React from "react";
import {StyledPageNotFound, StyledPageNotFoundImg} from "./PageNotFound.styles";

const PageNotFound: React.FC = () => {
return (
    <StyledPageNotFound>
        <h1>404</h1>
        <StyledPageNotFoundImg src="/assets/images/ruffyAvatar.jpg" alt="The future pirate king" />

        <p>I cannot find the page you are looking for...</p>
        <p>But you found the future pirate king! Congrats ;)</p>
    </StyledPageNotFound>
)
};

export default PageNotFound;
