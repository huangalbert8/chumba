const Total = ({ transactions }) => {
  function totalSent(transactions, getSent) {
    let sum = 0;
    for (var i = 0; i < transactions.length; i++) {
      if (getSent) {
        if (transactions[i].sent) {
          sum = sum + parseInt(transactions[i].amount);
        }
      } else {
        if (!transactions[i].sent) {
          sum = sum + parseInt(transactions[i].amount);
        }
      }
    }
    return sum;
  }
  return (
    <div className="float-container">
      <div className="float-child-sent">
        <h4>{totalSent(transactions, true)} Envelopes Sent</h4>
      </div>

      <div className="float-child-received">
        <h4>{totalSent(transactions, false)} Coins Received</h4>
      </div>
    </div>
  );
};

export default Total;
