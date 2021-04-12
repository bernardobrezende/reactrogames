import { render } from '@testing-library/react';
import GuessStatus from './GuessStatus';

describe('GuessStatus', () => {
    it('should have pristine indication by default', () => {
        const { queryByTestId } = render(<GuessStatus/>);

        expect(queryByTestId(/guess-status-pristine/i)).toBeInTheDocument();
        expect(queryByTestId(/guess-status-success/i)).not.toBeInTheDocument();
        expect(queryByTestId(/guess-status-fail/i)).not.toBeInTheDocument();
    });

    it('should have success indication with guessed true', () => {
        const { queryByTestId } = render(<GuessStatus guessed={ true }/>);

        expect(queryByTestId(/guess-status-success/i)).toBeInTheDocument();
        expect(queryByTestId(/guess-status-fail/i)).not.toBeInTheDocument();
        expect(queryByTestId(/guess-status-pristine/i)).not.toBeInTheDocument();
    });

    it('should have fail indication with guessed false', () => {
        const { queryByTestId } = render(<GuessStatus guessed={ false }/>);

        expect(queryByTestId(/guess-status-success/i)).not.toBeInTheDocument();
        expect(queryByTestId(/guess-status-pristine/i)).not.toBeInTheDocument();
        expect(queryByTestId(/guess-status-fail/i)).toBeInTheDocument();
    });
});