import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Welcome from "../views/Welcome";

const Router = () => {
    return (
        <Routes>
            <Route index element={<Welcome />} />
        </Routes>
    );
};

export default Router;