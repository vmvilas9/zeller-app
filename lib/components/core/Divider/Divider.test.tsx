import renderer from 'react-test-renderer';
import {Divider} from "./index";
import * as React from "react";

it(`renders correctly`, () => {
    const tree = renderer.create(<Divider/>).toJSON();

    expect(tree).toMatchSnapshot();
});
