const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let winner = ''
    lines.forEach(([firstIndex, secondIndex, thirdIndex]) => {
        if (squares[firstIndex]
            && squares[secondIndex] === squares[firstIndex]
            && squares[thirdIndex] === squares[firstIndex]) {
                winner = squares[firstIndex];
        };
    });

    return winner;
};

export default calculateWinner;