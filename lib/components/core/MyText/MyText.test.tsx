import React from 'react';
import { render } from '@testing-library/react-native';
import { MyText } from './MyText';

describe('MyText', () => {
    it('renders correctly with default props', () => {
        const { toJSON } = render(<MyText>Default Text</MyText>);
        expect(toJSON()).toMatchSnapshot();
    });

    it('applies the default style when type is "default"', () => {
        const { getByText } = render(<MyText>Default Text</MyText>);
        const textElement = getByText('Default Text');
        expect(textElement.props.style).toContainEqual({ fontSize: 16, lineHeight: 24 });
    });

    it('applies the title style when type is "title"', () => {
        const { getByText } = render(<MyText type="title">Title Text</MyText>);
        const textElement = getByText('Title Text');
        expect(textElement.props.style).toContainEqual({ fontSize: 32, fontWeight: 'bold', lineHeight: 32 });
    });

    it('applies the defaultSemiBold style when type is "defaultSemiBold"', () => {
        const { getByText } = render(<MyText type="defaultSemiBold">SemiBold Text</MyText>);
        const textElement = getByText('SemiBold Text');
        expect(textElement.props.style).toContainEqual({ fontSize: 16, lineHeight: 24, fontWeight: '600' });
    });

    it('applies the subtitle style when type is "subtitle"', () => {
        const { getByText } = render(<MyText type="subtitle">Subtitle Text</MyText>);
        const textElement = getByText('Subtitle Text');
        expect(textElement.props.style).toContainEqual({ fontSize: 20, fontWeight: 'bold' });
    });

    it('applies the link style when type is "link"', () => {
        const { getByText } = render(<MyText type="link">Link Text</MyText>);
        const textElement = getByText('Link Text');
        expect(textElement.props.style).toContainEqual({ lineHeight: 30, fontSize: 16, color: '#0a7ea4' });
    });

    it('applies custom styles passed through the style prop', () => {
        const customStyle = { color: 'red', marginTop: 10 };
        const { getByText } = render(<MyText style={customStyle}>Custom Style Text</MyText>);
        const textElement = getByText('Custom Style Text');
        expect(textElement.props.style).toContainEqual(customStyle);
    });

    it('passes additional props to the Text component', () => {
        const testID = 'test-text';
        const { getByTestId } = render(<MyText testID={testID}>Additional Props</MyText>);
        const textElement = getByTestId(testID);
        expect(textElement).toBeTruthy();
    });
});
