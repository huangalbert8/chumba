import { useState } from "react";

const AddSent = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!amount) {
      alert("Please add an amount.");
      return;
    } else if (isNaN(amount)) {
      alert("Please enter a number.");
      return;
    }
    onAdd({ amount, date });
    setAmount("");
    setDate("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Transaction</label>
        <input
          type="text"
          placeholder="Add Amount of Envelopes Sent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
      </div>
      <div className="form-control">
        <label>Add Date Sent</label>
        <input
          type="text"
          placeholder="Add Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
      </div>
      <input
        type="submit"
        value="Save Transaction"
        className="btn btn-block"
      ></input>
    </form>
  );
};

export default AddSent;
