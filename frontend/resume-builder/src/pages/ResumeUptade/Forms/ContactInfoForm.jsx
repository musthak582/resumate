import React from 'react'
import Input from '../../../components/inputs/Input'

const ContactInfoForm = ({ contactInfo, updateSection }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <Input
            value={contactInfo.location || ""}
            onChange={({ target }) => updateSection("location", target.value)}
            label="Address"
            placeholder="Short Address"
            type="text"
          />
        </div>
        <Input
          value={contactInfo.email || ""}
          onChange={({ target }) => updateSection("email", target.value)}
          label="Email"
          placeholder="john@me.com"
          type="email"
        />
        <Input
          value={contactInfo.phone || ""}
          onChange={({ target }) => updateSection("phone", target.value)}
          label="Phone Number"
          placeholder="987654321"
          type="text"
        />
        <Input
          value={contactInfo.linkedIn || ""}
          onChange={({ target }) => updateSection("linkedIn", target.value)}
          label="LinkedIn"
          placeholder="https://linkedin.com/in/john"
          type="text"
        />
        <Input
          value={contactInfo.github || ""}
          onChange={({ target }) => updateSection("github", target.value)}
          label="Github"
          placeholder="https://github.com/john"
          type="text"
        />
      </div>
      <div className="md:col-span-2">
        <Input
          value={contactInfo.website || ""}
          onChange={({ target }) => updateSection("website", target.value)}
          label="Portfolio / Website"
          placeholder="www.example.com"
          type="text"
        />
      </div>
    </div>
  )
}

export default ContactInfoForm