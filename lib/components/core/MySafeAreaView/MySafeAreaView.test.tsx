import renderer from 'react-test-renderer';
import {MySafeAreaView} from "./index";
import * as React from "react";

it(`renders correctly`, () => {
    const tree = renderer.create(<MySafeAreaView>Test</MySafeAreaView>).toJSON();

    expect(tree).toMatchSnapshot();
});
