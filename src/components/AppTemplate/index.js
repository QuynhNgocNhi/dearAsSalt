import NavBar from "components/AppLayout/NavBar";
import React from "react";
import { Route } from "react-router-dom";

function AppLayout(props) {
  return (
    <div>
      <div className="sas__container" style={{ height: window.innerHeight }}>
        <NavBar />
        {props.children}
      </div>
    </div>
  );
}
export default function AppTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => (
        <AppLayout>
          <Component {...propsComponent} />
        </AppLayout>
      )}
    />
  );
}
