import React, { useState } from 'react';
import Themnhanvien from '../../components/Themnhanvien';
import Suanhanvien from '../../components/Suanhanvien';

const Quanlynhanvien = () => {
    const [search, setSearch] = useState('');
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Ngô Nam', position: 'Nhân viên' },
        { id: 2, name: 'Nguyễn Văn Nam', position: 'Quản lý' }
    ]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const addEmployeeHandler = (employee) => {
        setEmployees([...employees, employee]);
        setShowAddForm(false);
    };

    const editEmployeeHandler = (updatedEmployee) => {
        setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
        setShowEditForm(false);
    };

    const openEditForm = (employee) => {
        setCurrentEmployee(employee);
        setShowEditForm(true);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Nhân viên</h1>
            <div className="flex items-center mb-4">
                <button 
                    className="bg-green-500 text-white rounded-full p-2 mr-2"
                    onClick={() => setShowAddForm(true)}
                >
                    <span className="text-2xl">+</span>
                </button>
                <input
                    type="text"
                    className="border rounded px-4 py-2 flex-grow mr-2"
                    placeholder="Tìm kiếm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="bg-green-500 text-white rounded px-4 py-2">Tìm</button>
            </div>

            {showAddForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Themnhanvien onAdd={addEmployeeHandler} onClose={() => setShowAddForm(false)} />
                </div>
            )}

            {showEditForm && currentEmployee && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Suanhanvien 
                        employee={currentEmployee} 
                        onEdit={editEmployeeHandler} 
                        onClose={() => setShowEditForm(false)} 
                    />
                </div>
            )}

            <table className="min-w-full border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">STT</th>
                        <th className="border px-4 py-2">Họ và tên nhân viên</th>
                        <th className="border px-4 py-2">Chức vụ</th>
                        <th className="border px-4 py-2">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {employees
                        .filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()))
                        .map((emp, index) => (
                            <tr key={emp.id} className={index % 2 ? "bg-gray-50" : "bg-white"}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{emp.name}</td>
                                <td className="border px-4 py-2">{emp.position}</td>
                                <td className="border px-4 py-2">
                                    <button 
                                        className="text-blue-500" 
                                        onClick={() => openEditForm(emp)}
                                    >
                                        Sửa
                                    </button>
                                    <button className="text-red-500 ml-2">Xóa</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Quanlynhanvien;
