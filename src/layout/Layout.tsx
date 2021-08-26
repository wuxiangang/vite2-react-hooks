import React, { ReactElement, ReactChild } from "react";

function Layout({ children }: { children: ReactChild }): ReactElement {
  return (
    <div className="Layout">
      <div className="Layout-bar">this is bar</div>
      <div className="Layout-body">
        <header className="Layout-header">this is header</header>
        <div className="Layout-main">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
