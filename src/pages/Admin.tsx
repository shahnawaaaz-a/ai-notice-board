import { useAppStore } from '../store';
import { Shield, CheckCircle, XCircle, School, Users, AlertTriangle, Ban } from 'lucide-react';

export default function AdminPage() {
  const { currentUser, schools, approveSchool, suspendSchool } = useAppStore();
  if (!currentUser || currentUser.role !== 'super_admin') {
    return <div className="text-center py-16"><Shield className="w-16 h-16 text-gray-300 mx-auto" /><p className="text-gray-500 mt-4">Access denied. Super Admin only.</p></div>;
  }

  const pendingSchools = schools.filter(s => s.status === 'pending');
  const approvedSchools = schools.filter(s => s.status === 'approved');

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Administration</h1><p className="text-gray-600 dark:text-gray-400">Manage schools, users, and platform settings</p></div>

      {/* Pending Schools */}
      {pendingSchools.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-yellow-200 dark:border-yellow-800 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4"><AlertTriangle className="w-5 h-5 text-yellow-500" /> Pending Approvals ({pendingSchools.length})</h3>
          <div className="space-y-3">
            {pendingSchools.map(school => (
              <div key={school.id} className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center"><School className="w-5 h-5 text-yellow-600 dark:text-yellow-400" /></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{school.name}</p>
                    <p className="text-xs text-gray-500">{school.city}, {school.state} • {school.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => approveSchool(school.id)} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Approve</button>
                  <button onClick={() => suspendSchool(school.id)} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Schools */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">All Schools ({schools.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">School</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Principal</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {schools.map(school => (
                <tr key={school.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">{school.name.charAt(0)}</div>
                      <div><p className="text-sm font-medium text-gray-900 dark:text-white">{school.name}</p><p className="text-xs text-gray-500">{school.schoolCode}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{school.city}, {school.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{school.principalName}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${school.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : school.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{school.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    {school.status === 'approved' && <button onClick={() => suspendSchool(school.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500"><Ban className="w-4 h-4" /></button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
