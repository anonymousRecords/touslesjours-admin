import { Edit2, Trash2, Save, X } from "lucide-react";
import React, { useState } from "react";
import { Reservation } from "../../../haengdoo-monorepo/packages/haengdoo-main/types/types";

interface ReservationListProps {
  reservations: Reservation[];
  onUpdate: (reservation: Reservation) => void;
  onDelete: (id: string) => void;
}

export function ReservationList({
  reservations,
  onUpdate,
  onDelete,
}: ReservationListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

  const handleEdit = (reservation: Reservation) => {
    setEditingId(reservation.id);
    setEditingReservation({ ...reservation });
  };

  const handleSave = () => {
    if (editingReservation) {
      onUpdate(editingReservation);
      setEditingId(null);
      setEditingReservation(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingReservation(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditingReservation((prev) => prev && { ...prev, [name]: value });
  };

  const renderCell = (
    reservation: Reservation,
    field: keyof Reservation,
    type = "text"
  ) => {
    const isEditing = editingId === reservation.id;
    const value = isEditing ? editingReservation?.[field] : reservation[field];

    if (!isEditing) {
      return <span className="block w-full p-2">{value as string}</span>;
    }

    switch (type) {
      case "select":
        return (
          <select
            name={field}
            value={value as string}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {field === "payment_status" ? (
              <>
                <option value="완결">완결</option>
                <option value="미결">미결</option>
              </>
            ) : (
              <>
                <option value="준비 예정">준비 예정</option>
                <option value="준비 완료">준비 완료</option>
              </>
            )}
          </select>
        );
      case "date":
        return (
          <input
            type="date"
            name={field}
            value={value as string}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case "textarea":
        return (
          <textarea
            name={field}
            value={value as string}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      default:
        return (
          <input
            type={type}
            name={field}
            value={value as string}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">결제 여부</th>
            <th className="py-2 px-4 border-b">준비 상태</th>
            <th className="py-2 px-4 border-b">제품</th>
            <th className="py-2 px-4 border-b">예약일</th>
            <th className="py-2 px-4 border-b">고객명</th>
            <th className="py-2 px-4 border-b">고객 전화번호</th>
            <th className="py-2 px-4 border-b">비고</th>
            <th className="py-2 px-4 border-b">액션</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                {renderCell(reservation, "payment_status", "select")}
              </td>
              <td className="py-2 px-4 border-b">
                {renderCell(reservation, "preparation_status", "select")}
              </td>
              <td className="py-2 px-4 border-b">
                {renderCell(reservation, "product")}
              </td>
              <td className="py-2 px-4 border-b">
                {renderCell(reservation, "reservation_date", "date")}
              </td>
              <td className="py-2 px-4 border-b">
                {renderCell(reservation, "customer_name")}
              </td>
              <td className="py-2 px-4 border-b">
                {renderCell(reservation, "customer_phone", "tel")}
              </td>
              <td className="py-2 px-4 border-b">
                {renderCell(reservation, "notes", "textarea")}
              </td>
              <td className="py-2 px-4 border-b">
                {editingId === reservation.id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(reservation)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(reservation.id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationList;
