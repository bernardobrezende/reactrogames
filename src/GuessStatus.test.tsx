import { render } from '@testing-library/react';
import GuessStatus from './GuessStatus';

describe('GuessStatus', () => {
    it('should have pristine indication by default', async () => {
        const { queryByTestId } = render(<GuessStatus/>);

        expect(await queryByTestId(/guess-status-pristine/i)).toBeInTheDocument();
        expect(await queryByTestId(/guess-status-success/i)).not.toBeInTheDocument();
        expect(await queryByTestId(/guess-status-fail/i)).not.toBeInTheDocument();
    });

    it('should have success indication with guessed true', async () => {
        const { queryByTestId } = render(<GuessStatus guessed={ true }/>);

        expect(await queryByTestId(/guess-status-success/i)).toBeInTheDocument();
        expect(await queryByTestId(/guess-status-fail/i)).not.toBeInTheDocument();
        expect(await queryByTestId(/guess-status-pristine/i)).not.toBeInTheDocument();
    });

    it('should have fail indication with guessed false', async () => {
        const { queryByTestId } = render(<GuessStatus guessed={ false }/>);

        expect(await queryByTestId(/guess-status-success/i)).not.toBeInTheDocument();
        expect(await queryByTestId(/guess-status-pristine/i)).not.toBeInTheDocument();
        expect(await queryByTestId(/guess-status-fail/i)).toBeInTheDocument();
    });
});