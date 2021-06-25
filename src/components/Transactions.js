import Transaction from "./Transaction";
const Transactions = ({ transactions, onDelete }) => {
  return (
    <div>
      {transactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
        ></Transaction>
      ))}
    </div>
  );
};

export default Transactions;
