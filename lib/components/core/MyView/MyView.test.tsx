import React from 'react';
import { render } from '@testing-library/react-native';
import { MyView } from './MyView';

describe('MyView', () => {
    it('renders correctly', () => {
        const { toJSON } = render(<MyView />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('applies default styles', () => {
        const { getByTestId } = render(<MyView testID="my-view" />);
        const view = getByTestId('my-view');
        expect(view.props.style).toContainEqual({ backgroundColor: '#FFFFFF' });
    });

    it('overrides styles with provided style prop', () => {
        const { getByTestId } = render(
            <MyView testID="my-view" style={{ padding: 10 }} />
        );
        const view = getByTestId('my-view');
        expect(view.props.style).toContainEqual({ padding: 10 });
    });

    it('merges provided styles with default styles', () => {
        const { getByTestId } = render(
            <MyView testID="my-view" style={{ padding: 10 }} />
        );
        const view = getByTestId('my-view');
        expect(view.props.style).toEqual(
            expect.arrayContaining([{ backgroundColor: '#FFFFFF' }, { padding: 10 }])
        );
    });

    it('passes down other props correctly', () => {
        const mockOnLayout = jest.fn();
        const { getByTestId } = render(
            <MyView testID="my-view" onLayout={mockOnLayout} />
        );
        const view = getByTestId('my-view');
        expect(view.props.onLayout).toBe(mockOnLayout);
    });
});
