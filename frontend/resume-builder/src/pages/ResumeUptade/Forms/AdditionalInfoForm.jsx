import React from 'react'
import Input from '../../../components/inputs/Input'
import { LuPlus, LuTrash2 } from 'react-icons/lu'
import RatingInput from '../../../components/ResumeSections/RatingInput'


const AdditionalInfoForm = ({
  languages,
  interests,
  updateArrayItem,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>

      {/* languages section */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Languages</h3>
        <div className="flex flex-col gap-4">
          {languages.map((language, index) => (
            <div key={index} className="border border-gray-200/80 p-4 rounded-lg relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  value={language.name || ""}
                  onChange={({ target }) => updateArrayItem("languages", index, "name", target.value)}
                  label="Language"
                  placeholder="English"
                  type="text"
                />
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-7 block">
                    Proficiency
                  </label>
                  <RatingInput
                    value={language.progress || 0}
                    onChange={(newValue) => updateArrayItem("languages", index, "progress", newValue)}
                    total={5}
                    activeColor="#0ea5e9"
                    inactiveColor="#e0f2fe"
                  />
                </div>
              </div>
              {languages.length > 1 && (
                <button
                  type="button"
                  className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                  onClick={() => removeArrayItem("languages", index)}
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 transition-colors cursor-pointer"
            onClick={() => addArrayItem("languages", { name: "", progress: 0 })}
          >
            <LuPlus />
            Add Language
          </button>
        </div>
      </div>

      {console.log(interests)}

      {/* interests section */}
      <div className="mt-8 mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Interests</h3>
        <div className="flexd flex-col">
          {interests?.map((interest, index) => (
            <div key={index} className="relative rounded-lg">
              <Input
                value={interest || ""}
                onChange={({ target }) => updateArrayItem("interests", index, null, target.value)}
                placeholder="Coding"
                type="text"
              />
              {interests.length > 1 && (
                <button
                  className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                  onClick={() => removeArrayItem("interests", index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}

          <button
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 transition-colors cursor-pointer"
            onClick={() => addArrayItem("interests", "")}
            type="button"
          >
            <LuPlus />
            Add Interest
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdditionalInfoForm