import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {

    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("SUBSCRIBE TO BASIC");
    });

    test("after creation <span> span should be displayed with status", () => {
        const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC"/>);
        const root = component.root;
        let span = root.findByType("span")
        expect(span).not.toBeNull();
    });

    test("after creation <input> span should be displayed with status", () => {
        const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC"/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input")
        }).toThrow()
    });

    test("after creation <span> span should be displayed with status", () => {
        const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC"/>);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe("SUBSCRIBE TO BASIC");
    });

    test("after creation <span> span should be displayed with status", () => {
        const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC"/>);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe("SUBSCRIBE TO BASIC");
    });
});