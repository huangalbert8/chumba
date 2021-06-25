// serve -s build -p 8000   connects to port at localhost8000
// npm i json-server   mock json backend
// nvm ls lists all versions of node
// nvm use ... changes versions
//to run
//on one terminal npm run server
//on another npm start
import Header from "./components/Header";
import AddSent from "./components/AddSent";
import Transactions from "./components/Transactions";
import { useState, useEffect } from "react";
import AddReceived from "./components/AddReceived";
import Total from "./components/Total";

const App = () => {
  const [showSent, setShowSent] = useState(false);
  const [showReceived, setShowReceived] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const transactionsFromServer = await fetchTransactions();
      for (var i in transactionsFromServer) {
        transactionsFromServer[i].id = parseInt(transactionsFromServer[i].id);
        transactionsFromServer[i].sent =
          transactionsFromServer[i].sent === "TRUE";
      }
      setTransactions(transactionsFromServer);
    };
    getTransactions();
  }, []); // dependancy array

  const fetchTransactions = async () => {
    const res = await fetch(
      "https://v1.nocodeapi.com/alberthuang/google_sheets/wwEBlDpfkmgtLQDd?tabId=Sheet1"
    );
    const data = await res.json();
    return data.data;
  };

  const addSent = async (transaction) => {
    transaction.sent = true;
    transaction.id = Math.floor(Math.random() * 100000) + 1;

    const response = await fetch(
      "https://v1.nocodeapi.com/alberthuang/google_sheets/wwEBlDpfkmgtLQDd?tabId=Sheet1",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify([
          [
            transaction.id,
            transaction.amount,
            transaction.date,
            transaction.sent,
          ],
        ]),
      }
    );
    await response.json();
    setTransactions([...transactions, transaction]); // sets tasks to an array with old tasks and new task
  };

  const addReceived = async (transaction) => {
    transaction.sent = false;
    transaction.id = Math.floor(Math.random() * 100000) + 1;
    const response = await fetch(
      "https://v1.nocodeapi.com/alberthuang/google_sheets/wwEBlDpfkmgtLQDd?tabId=Sheet1",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify([
          [
            transaction.id,
            transaction.amount,
            transaction.date,
            transaction.sent,
          ],
        ]),
      }
    );
    await response.json();
    setTransactions([...transactions, transaction]); // sets tasks to an array with old tasks and new task
  };

  const deleteTransaction = async (id) => {
    // build version of same function
    var row_id = 0;
    for (var i in transactions) {
      if (id === transactions[i].id) {
        row_id = i + 2;
      }
    }

    await fetch(
      `https://v1.nocodeapi.com/alberthuang/google_sheets/wwEBlDpfkmgtLQDd?tabId=Sheet1&row_id=${row_id}`,
      {
        method: "DELETE",
      }
    );
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const switchForms = () => {
    setShowSent(!showSent);
    setShowReceived(!showReceived);
  };
  return (
    <div className="container">
      <Header onAdd={switchForms} showSent={showSent} />
      {showSent && <AddSent onAdd={addSent} />}
      {showReceived && <AddReceived onAdd={addReceived} />}
      <Transactions transactions={transactions} onDelete={deleteTransaction} />
      <Total transactions={transactions} />
    </div>
  );
};
export default App;
