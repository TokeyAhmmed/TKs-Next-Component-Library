'use client'

import React, { useState } from 'react';

const RecentIncidentActivity = () => {
  const [incidents, setIncidents] = useState([
    { id: 1, title: 'Unauthorized access in the library', reportedBy: 'John Doe', reportedDate: '2023-11-05', status: 'Pending' },
    { id: 2, title: 'Suspicious package near dorm', reportedBy: 'Jane Smith', reportedDate: '2023-11-04', status: 'Pending' },
    { id: 3, title: 'Minor injury at sports event', reportedBy: 'Mike Johnson', reportedDate: '2023-11-03', status: 'Resolved' },
    { id: 4, title: 'Lost wallet', reportedBy: 'Alice Brown', reportedDate: '2023-11-02', status: 'Pending' },
    { id: 5, title: 'Vandalism in parking lot', reportedBy: 'Chris Lee', reportedDate: '2023-11-01', status: 'Resolved' },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const sortData = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedIncidents = [...incidents].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setIncidents(sortedIncidents);
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  const handleMarkAsResolved = (id) => {
    setIncidents((prevIncidents) =>
      prevIncidents.map((incident) =>
        incident.id === id ? { ...incident, status: 'Resolved' } : incident
      )
    );
  };

  return (
    <section className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Recent Incident Activity</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th
              className="py-2 px-4 border-b text-left cursor-pointer w-20"
              onClick={() => sortData('id')}
            >
              ID <span className="ml-1">{getSortIndicator('id')}</span>
            </th>
            <th
              className="py-2 px-4 border-b text-left cursor-pointer w-90"
              onClick={() => sortData('title')}
            >
              Incident Title <span className="ml-1">{getSortIndicator('title')}</span>
            </th>
            <th
              className="py-2 px-4 border-b text-left cursor-pointer w-40"
              onClick={() => sortData('reportedBy')}
            >
              Reported By <span className="ml-1">{getSortIndicator('reportedBy')}</span>
            </th>
            <th
              className="py-2 px-4 border-b text-left cursor-pointer w-50"
              onClick={() => sortData('reportedDate')}
            >
              Reported Date <span className="ml-1">{getSortIndicator('reportedDate')}</span>
            </th>
            <th
              className="py-2 px-4 border-b text-left cursor-pointer w-30"
              onClick={() => sortData('status')}
            >
              Status <span className="ml-1">{getSortIndicator('status')}</span>
            </th>
            <th className="py-2 px-4 border-b text-left w-30">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr
              key={incident.id}
              className="hover:bg-gray-100 transition-colors"
            >
              <td className="py-2 px-4 border-b">{incident.id}</td>
              <td className="py-2 px-4 border-b">{incident.title}</td>
              <td className="py-2 px-4 border-b">{incident.reportedBy}</td>
              <td className="py-2 px-4 border-b">{incident.reportedDate}</td>
              <td
                className={`py-2 px-4 border-b font-semibold ${
                  incident.status === 'Resolved'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                {incident.status}
              </td>
              <td className="py-2 px-4 border-b space-x-2">
                <button
                  className="px-4 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  className={`px-4 py-1 text-sm font-semibold rounded ${
                    incident.status === 'Resolved'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  onClick={() => handleMarkAsResolved(incident.id)}
                  disabled={incident.status === 'Resolved'}
                >
                  Mark as Resolved
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RecentIncidentActivity;
