import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "contents/styles/main.scss";
import PageNotFound from "components/AppScreens/PageNotFound";
import { appRoutes } from "routes";
import AppTemplate from "components/AppTemplate";
import LoadingScreen from "components/AppScreens/LoadingScreen";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoading: true,
    };
  }
  componentDidMount() {
    setTimeout(() => this.setState({ isFirstLoading: false }), 1000);
    console.log(window.innerHeight);
  }

  componentWillUnmount() {
    this.setState({ isFirstLoading: true });
  }
  renderAppTemplate = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((route, index) => {
        return (
          <AppTemplate
            key={index}
            exact={route.exact}
            path={route.path}
            Component={route.component}
          ></AppTemplate>
        );
      });
    }
  };
  render() {
    return (
      <div className="sas" style={{ height: window.innerHeight }}>
        <div className="sas__background">
          {this.state.isFirstLoading ? (
            <LoadingScreen />
          ) : (
            <BrowserRouter>
              <Switch>
                {this.renderAppTemplate(appRoutes)}
                <Route path="" component={PageNotFound} />
              </Switch>
            </BrowserRouter>
          )}
        </div>
      </div>
    );
  }
}
