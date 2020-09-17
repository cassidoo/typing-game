export default function HighScoreTable({ scores }) {
  // [{ score: x, date: y }]

  if (scores?.length < 1 || scores === undefined) {
    return null;
  }

  return (
    <>
      <table className="nes-table is-bordered is-centered">
        <thead>
          <tr>
            <th colSpan="2">High Scores</th>
          </tr>
        </thead>
        <tbody>
          {scores?.map((s) => {
            return (
              <tr>
                <td>{s.score}</td>
                <td className="date">{s.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <style jsx>{`
        .nes-table {
          margin: 40px;
          min-width: 320px;
        }

        .date {
          text-align: right;
        }
      `}</style>
    </>
  );
}
