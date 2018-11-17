import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Employees from "../Employees/Employees";
import Companies from "../Companies/Companies";

const Main = props => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/employees" component={Employees} />
                <Route exact path="/companies" component={Companies} />
            </Switch>
        </div>
    )
}

export default Main;