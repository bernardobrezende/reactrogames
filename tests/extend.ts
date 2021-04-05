expect.extend({
    toEqualNonBreakingSpaces(received, expected) {
        return {
            message: () => `Expected ${ received } to equal to ${ expected }. Did you check the non-breaking chars?`,
            pass: received.replace(/\xa0/g, " ") === expected
        };
    }
});