import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/transaction", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log(response.data);
        setTransactions(response.data);
      } catch (err) {
        console.error(err);
        alert(err?.response?.data?.message || err);
      }
    })();
  }, [user.token]);

  const styles = {
    VERIFIED: "text-green-500",
    REJECTED: "text-red-500",
    PENDING_APPROVAL: "text-slate-400",
  };

  const handleClick = async (transaction, status) => {
    try {
      await axios.get(
        `http://localhost:5000/pay/verify/?id=${transaction._id}&status=${status}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response.data.message || err);
    }
  };

  return (
    <div>
      {transactions.length > 0 ? (
        <>
          {transactions?.map((transaction, idx) => (
            <div
              key={idx}
              className="bg-white border-1 rounded-lg shadow-md p-6 mb-5"
            >
              <div className="flex flex-col">
                <h2 className="text-lg  mr-4">
                  Transaction ID:{" "}
                  <span className="font-bold">{transaction._id}</span>
                </h2>
                <div>
                  Status:{" "}
                  <span className={`font-bold ${styles[transaction.status]}`}>
                    {transaction.status}
                  </span>
                </div>
                <span className="text-gray-500">{transaction.amount}</span>
              </div>

              {transaction.status === "PENDING_APPROVAL" && (
                <>
                  <button
                    className="bg-green-500 mr-10 p-2 rounded"
                    onClick={() => handleClick(transaction, true)}
                  >
                    Verify
                  </button>
                  <button
                    className="bg-red-500 p-2 rounded"
                    onClick={() => handleClick(transaction, false)}
                  >
                    Decline
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      ) : (
        <div className="p-12 flex justify-center items-center min-h-screen text-4xl font-semibold">
          Nothing to see here, no transactions to view.&nbsp;
          <Link className="text-blue-700 underline hover:text-blue-400" to="/">
            Take me home!
          </Link>
        </div>
      )}
    </div>
  );
}
