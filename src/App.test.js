import MainApp from "./App";
import React from "react";
import * as root from "react-dom";


it("renders without crashing", () => {
    const div = document.createElement('div')

    root.render(
        <MainApp/>, div
    )
    root.unmountComponentAtNode(div)
})
