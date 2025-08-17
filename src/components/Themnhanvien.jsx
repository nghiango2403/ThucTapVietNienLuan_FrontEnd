import React, { useState } from 'react';

const Themnhanvien = ({ onAdd, onClose }) => {
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        position: '',
        sdt: '',
        email: '',
        ngaySinh: '',
        diaChi: '',
        gioiTinh: '0',
        matKhau: '',
        maChucVu: ''
    });

    const addEmployee = (e) => {
        e.preventDefault();
        if (newEmployee.name && newEmployee.position) {
            onAdd({ id: Date.now(), ...newEmployee });
            setNewEmployee({
                name: '',
                position: '',
                sdt: '',
                email: '',
                ngaySinh: '',
                diaChi: '',
                gioiTinh: '0',
                matKhau: '',
                maChucVu: ''
            });
        }
    };

    return (
        <form onSubmit={addEmployee} className="bg-white p-4 border rounded shadow-md w-96">
            <h2 className="text-xl mb-4">Thêm nhân viên</h2>
            <button type="button" onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
            <input type="text" placeholder="Họ và tên nhân viên" value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                required className="border rounded px-2 py-1 mb-2 w-full" 
            />
            <input type="text" placeholder="Chức vụ" value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                required className="border rounded px-2 py-1 mb-2 w-full"
            />
            <input type="text" placeholder="SDT" value={newEmployee.sdt}
                onChange={(e) => setNewEmployee({ ...newEmployee, sdt: e.target.value })}
                className="border rounded px-2 py-1 mb-2 w-full"
            />
            <input type="email" placeholder="Email" value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                className="border rounded px-2 py-1 mb-2 w-full"
            />
            <input type="date" placeholder="Ngày Sinh" value={newEmployee.ngaySinh}
                onChange={(e) => setNewEmployee({ ...newEmployee, ngaySinh: e.target.value })}
                className="border rounded px-2 py-1 mb-2 w-full"
            />
            <input type="text" placeholder="Địa Chỉ" value={newEmployee.diaChi}
                onChange={(e) => setNewEmployee({ ...newEmployee, diaChi: e.target.value })}
                className="border rounded px-2 py-1 mb-2 w-full"
            />
            <select value={newEmployee.gioiTinh} onChange={(e) => setNewEmployee({ ...newEmployee, gioiTinh: e.target.value })} className="border rounded px-2 py-1 mb-2 w-full">
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
            </select>
            <input type="password" placeholder="Mật Khẩu" value={newEmployee.matKhau}
                onChange={(e) => setNewEmployee({ ...newEmployee, matKhau: e.target.value })}
                className="border rounded px-2 py-1 mb-2 w-full"
            />
            <input type="text" placeholder="Mã Chức Vụ" value={newEmployee.maChucVu}
                onChange={(e) => setNewEmployee({ ...newEmployee, maChucVu: e.target.value })}
                className="border rounded px-2 py-1 mb-4 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Thêm nhân viên</button>
        </form>
    );
};

export default Themnhanvien;
