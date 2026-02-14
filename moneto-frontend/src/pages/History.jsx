import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import TrendChart from "../components/charts/TrendChart";

export default function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "assessment_history")
      );

      const records = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          credit_index: data.credit_index,
          stress_probability: data.stress_probability * 100,
          life_state: data.life_state,
          date: new Date(data.createdAt.seconds * 1000)
            .toLocaleDateString()
        };
      });

      setHistory(records);
    };

    fetchHistory();
  }, [user]);

  if (!history.length)
    return (
      <Layout>
        <p>No historical data yet.</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <TrendChart
          data={history}
          dataKey="credit_index"
          title="Credit Index Trend"
        />

        <TrendChart
          data={history}
          dataKey="stress_probability"
          title="Stress Probability Trend (%)"
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="mb-4 font-semibold">Assessment Timeline</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Date</th>
              <th>Credit Index</th>
              <th>Stress %</th>
              <th>Life State</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.date}</td>
                <td>{item.credit_index}</td>
                <td>{item.stress_probability.toFixed(1)}%</td>
                <td>{item.life_state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
