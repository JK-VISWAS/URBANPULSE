import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reportList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReports(reportList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="hidden" aria-hidden="true">{reports.length}</div>
  );
}
