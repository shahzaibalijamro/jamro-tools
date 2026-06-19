"use client";

import { useState, useEffect } from "react";

export default function QueriesPage() {
  const [queries, setQueries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQueries() {
      try {
        const res = await fetch("/api/admin/queries");
        const data = await res.json();
        if (data.success) {
          setQueries(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchQueries();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-headline-md text-on-surface mb-2">Contact Queries</h1>
        <p className="text-body-md text-on-surface-variant">View messages submitted through the contact form.</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-outline-variant">
        {isLoading ? (
          <div className="p-12 flex justify-center items-center">
            <span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span>
          </div>
        ) : queries.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant">
            No contact queries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="p-4 text-label-md text-on-surface-variant font-medium">Date</th>
                  <th className="p-4 text-label-md text-on-surface-variant font-medium">Name</th>
                  <th className="p-4 text-label-md text-on-surface-variant font-medium">Email</th>
                  <th className="p-4 text-label-md text-on-surface-variant font-medium">Subject</th>
                  <th className="p-4 text-label-md text-on-surface-variant font-medium w-1/3">Message</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((q) => (
                  <tr key={q._id} className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors">
                    <td className="p-4 text-body-sm text-on-surface whitespace-nowrap">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-body-sm text-on-surface font-medium">{q.name}</td>
                    <td className="p-4 text-body-sm text-primary">
                      <a href={`mailto:${q.email}`}>{q.email}</a>
                    </td>
                    <td className="p-4 text-body-sm text-on-surface">{q.subject}</td>
                    <td className="p-4 text-body-sm text-on-surface-variant">
                      <div className="max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                        {q.message}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
