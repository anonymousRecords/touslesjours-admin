'use client';
import { Check, Pencil, X } from 'lucide-react';
import React, { useState } from 'react';

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function EditableField({ label, value, onChange }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
    setTempValue(value);
  };

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      <label className="font-bold">{label}</label>
      <div className="flex items-center relative">
        {isEditing ? (
          <>
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="pr-16 border-b-2 border-gray-400 focus:outline-none"
            />
            <div className="absolute right-0 flex">
              <Check className="w-6 h-6 cursor-pointer text-green-600 mr-2" onClick={handleSave} />
              <X className="w-6 h-6 cursor-pointer text-red-500" onClick={handleCancel} />
            </div>
          </>
        ) : (
          <>
            <span className="mr-2">{value}</span>
            <Pencil className="w-4 h-4 cursor-pointer" onClick={handleEdit} />
          </>
        )}
      </div>
    </div>
  );
}
