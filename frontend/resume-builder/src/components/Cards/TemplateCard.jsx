import React from 'react';

const TemplateCard = ({
  label,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`flex flex-col rounded-lg border-2 transition-all overflow-hidden cursor-pointer ${isSelected ? 'border-purple-500 shadow-md' : 'border-gray-200 hover:border-purple-300'
        }`}
      onClick={onSelect}
    >
      <div className="p-3 bg-white">
        <h3 className="font-medium text-gray-900">{label}</h3>
      </div>
    </div>
  );
};

export default TemplateCard;