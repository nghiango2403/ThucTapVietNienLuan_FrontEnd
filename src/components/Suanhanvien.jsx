import React, { useState } from 'react';

const Suanhanvien = ({ employee, onEdit, onClose }) => {
    const [updatedEmployee, setUpdatedEmployee] = useState(employee);

    const handleEdit = (e) => {
        e.preventDefault();
        onEdit(updatedEmployee);
    };

    return (
        <form onSubmit={handleEdit} className="bg-white p-4 border rounded shadow-md w-96">
            <h2 className="text-xl mb-4">Sửa thông tin nhân viên</h2>
            <button type="button" onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
            <input type="text" placeholder="Họ và tên nhân viên" value={updatedEmployee.name}
                onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, name: e.target.value })}
                required className="border rounded px-2 py-1 mb-2 w-full" 
            />
            <input type="text" placeholder="Chức vụ" value={updatedEmployee.position}
                onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, position: e.target.value })}
                required className="border rounded px-2 py-1 mb-2 w-full"
            />
            <input type="text" placeholder="SDT" value={updatedEmployee.sdt}
                onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, sdt: e.target.value })}
                className="border rounded px-2 py-1 mb-2 w-full"
            />
            <input type="email" placeholder="Email" value={updatedEmployee.email}
                onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, email: e.target.value })}
                className="border rounded px-2 py-1 mb-2 w-full"
            />
            <input type="date" placeholder="Ngày Sinh" value={updatedEmployee.ngaySinh}
                onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, ngaySinh: e.target.value })}
                className="border rounded px-2 py-1 mb-2 w-full"
            />
            <input type="text" placeholder="Địa Chỉ" value={updatedEmployee.diaChi}
                onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, diaChi: e.target.value })}
                className="border rounded px-2 py-1 mb-2 w-full"
            />
            <select value={updatedEmployee.gioiTinh} onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, gioiTinh: e.target.value })} className="border rounded px-2 py-1 mb-2 w-full">
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
            </select>
            <input type="password" placeholder="Mật Khẩu" value={updatedEmployee.matKhau}
                onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, matKhau: e.target.value })}
                className="border rounded px-2 py-1 mb-2 w-full"
            />
            <input type="text" placeholder="Mã Chức Vụ" value={updatedEmployee.maChucVu}
                onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, maChucVu: e.target.value })}
                className="border rounded px-2 py-1 mb-4 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Cập nhật thông tin</button>
        </form>
    );
};

export default Suanhanvien;
