import { FaTimes } from "react-icons/fa";
const Transaction = ({ transaction, onDelete }) => {
  return (
    <div className={`transaction ${transaction.sent ? "sent" : "received"}`}>
      <h3>
        {transaction.amount}
        {transaction.sent ? " envelopes" : " coins"}
        <FaTimes
          style={{ color: "red" }}
          onClick={() => onDelete(transaction.id)}
        />
      </h3>
      <p>{transaction.date}</p>
    </div>
  );
};

export default Transaction;
