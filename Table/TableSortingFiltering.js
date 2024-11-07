'use client'
import React, { useState, useMemo } from 'react';

const RecentIncidentActivity = () => {
  const initialIncidents = [
    { id: 'INC001', description: 'Unauthorized access in the library', severity: 'High', dateReported: '2023-11-05', status: 'Resolved' },
    { id: 'INC002', description: 'Suspicious package found near dorm', severity: 'Medium', dateReported: '2023-11-04', status: 'Under Review' },
    { id: 'INC003', description: 'Minor injury during sports event', severity: 'Low', dateReported: '2023-11-03', status: 'Closed' },
    { id: 'INC004', description: 'Lost property: Wallet', severity: 'Low', dateReported: '2023-11-02', status: 'Open' },
    { id: 'INC005', description: 'Vandalism in the parking lot', severity: 'Medium', dateReported: '2023-11-01', status: 'Resolved' },
  ];

  const [filterSeverity, setFilterSeverity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const filteredIncidents = useMemo(() => {
    return initialIncidents
      .filter((incident) =>
        (!filterSeverity || incident.severity === filterSeverity) &&
        (!filterStatus || incident.status === filterStatus)
      )
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        const order = sortConfig.direction === 'asc' ? 1 : -1;
        return a[sortConfig.key] > b[sortConfig.key] ? order : -order;
      });
  }, [filterSeverity, filterStatus, sortConfig, initialIncidents]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const direction = prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc';
      return { key, direction };
    });
  };

  return (
    <section className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Recent Incident Activity</h2>
      
      {/* Filter Controls */}
      <div className="flex mb-4">
        <select 
          className="mr-4 p-2 border rounded" 
          value={filterSeverity} 
          onChange={(e) => setFilterSeverity(e.target.value)}
        >
          <option value="">All Severities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        
        <select 
          className="p-2 border rounded" 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Resolved">Resolved</option>
          <option value="Under Review">Under Review</option>
          <option value="Closed">Closed</option>
          <option value="Open">Open</option>
        </select>
      </div>

      {/* Incident Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('id')}>Incident ID</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('description')}>Description</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('severity')}>Severity</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('dateReported')}>Date Reported</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('status')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncidents.map((incident) => (
            <tr key={incident.id}>
              <td className="py-2 px-4 border-b">{incident.id}</td>
              <td className="py-2 px-4 border-b">{incident.description}</td>
              <td className="py-2 px-4 border-b">{incident.severity}</td>
              <td className="py-2 px-4 border-b">{incident.dateReported}</td>
              <td className="py-2 px-4 border-b">{incident.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RecentIncidentActivity;
