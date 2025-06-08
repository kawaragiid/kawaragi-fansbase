// app/admin/users/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/firebase/authContext"; // <<< JALUR DIPERBAIKI DI SINI
import { getAllUsers, setUserRole } from "../../lib/firebase/firestore"; // <<< JALUR DIPERBAIKI DI SINI
import Link from "next/link";

export default function AdminUsersPage() {
  const { user, loading: authLoading, userRole } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState({});

  useEffect(() => {
    if (!authLoading) {
      if (!user || userRole !== "admin") {
        router.push("/admin");
      } else {
        fetchUsers();
      }
    }
  }, [user, authLoading, userRole, router]);

  const fetchUsers = async () => {
    setDataLoading(true);
    setError("");
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
      const initialRoles = {};
      fetchedUsers.forEach((u) => {
        initialRoles[u.id] = u.role || "member";
      });
      setSelectedRole(initialRoles);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Gagal memuat daftar pengguna.");
    } finally {
      setDataLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (window.confirm(`Anda yakin ingin mengubah role pengguna ini menjadi "${newRole}"?`)) {
      setSelectedRole((prev) => ({ ...prev, [userId]: newRole }));
      try {
        await setUserRole(userId, newRole);
        alert(`Role pengguna berhasil diubah menjadi ${newRole}!`);
        fetchUsers();
      } catch (err) {
        console.error("Error changing user role:", err);
        setError("Gagal mengubah role pengguna.");
        setSelectedRole((prev) => ({ ...prev, [userId]: users.find((u) => u.id === userId)?.role || "member" }));
      }
    }
  };

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Memuat...</p>
      </div>
    );
  }

  if (!user || userRole !== "admin") {
    return null;
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center text-white mb-10 border-b-4 border-pink-500 pb-4 inline-block">Manajemen Pengguna</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-end items-center mb-8">
        <button onClick={fetchUsers} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Refresh Data
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">Belum ada pengguna terdaftar.</p>
      ) : (
        <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{u.email}</div>
                    <div className="text-xs text-gray-400">UID: {u.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <select
                      value={selectedRole[u.id]}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
                      disabled={u.id === user.uid}
                    >
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <span className="text-gray-500">{u.id === user.uid ? "Anda" : ""}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
