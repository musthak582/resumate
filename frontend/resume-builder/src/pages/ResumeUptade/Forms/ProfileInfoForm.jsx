import React from 'react'
import Input from '../../../components/inputs/Input'
import ProfilePhotoSelector from '../../../components/inputs/ProfilePhotoSelector'

const ProfileInfoForm = ({
  profileData,
  updateSection,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>

      <div className="mt-4">
        <ProfilePhotoSelector
          image={profileData?.profileImg || profileData?.profilePreviewUrl}
          setImage={(value) => updateSection('profileImg', value)}
          preview={profileData?.profilePreviewUrl}
          setPreview={(value) => updateSection('profilePreviewUrl', value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={profileData?.fullName || ""}
            onChange={({ target }) => updateSection("fullName", target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />

          <Input
            value={profileData?.designation || ""}
            onChange={({ target }) => updateSection("designation", target.value)}
            label="Designation"
            placeholder="Software Developer"
            type="text"
          />

          <div className="col-span-2 mt-3">
            <label className="text-xs font-medium text-slate-600">Summary</label>
            <textarea
              placeholder='Short Introduction'
              className="form-input"
              row={5}
              value={profileData.summary || ""}
              onChange={({ target }) => updateSection("summary", target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoForm