import React from 'react'
import Input from '../../../components/inputs/Input'
import { LuPlus, LuTrash2 } from 'react-icons/lu'



const CertificationsInfoForm = ({
  certificationInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="pt-5 px-5">
      <h2 className="text-lg font-semibold text-gray-900">Certifications</h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
        {certificationInfo.map((certification, index) => (
          <div key={index} className="border border-gray-200/80 p-4 rounded-lg relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={certification.title || ""}
                onChange={({ target }) => updateArrayItem(index, "title", target.value)}
                label="Certification Title"
                placeholder="AWS Certified Cloud Practitioner"
                type="text"
              />
              <Input
                value={certification.issuer || ""}
                onChange={({ target }) => updateArrayItem(index, "issuer", target.value)}
                label="Issuer"
                placeholder="AWS/ Google / etc."
                type="text"
              />
              <Input
                value={certification.year || ""}
                onChange={({ target }) => updateArrayItem(index, "year", target.value)}
                label="Year"
                placeholder="2022"
                type="text"
              />
            </div>

            {certificationInfo.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(index)}
                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
              >
                <LuTrash2 />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={() => addArrayItem({ 
            title: "", issuer: "", year: "" 
          })}
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 transition-colors cursor-pointer"
        >
          <LuPlus />
          Add Certification
        </button>
      </div>
    </div>
  )
}

export default CertificationsInfoForm