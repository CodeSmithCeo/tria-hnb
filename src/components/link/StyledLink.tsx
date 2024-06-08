import React from 'react';
import "./StyledLink.css"


type Component = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => JSX.Element;

// simple styled link that wraps a regular link, passes props and edits style
const StyledLink: Component = ({ children, ...rest }) => {
    return (
        <a {...rest} className="styled-link">
            {children}
        </a>
    );
};

export default StyledLink;
