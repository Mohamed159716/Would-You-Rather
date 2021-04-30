import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, loading, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                loading === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

function mapStateToProps({ authedUser }) {
    return {
        loading: authedUser !== null,
    };
}

export default connect(mapStateToProps)(PrivateRoute);
