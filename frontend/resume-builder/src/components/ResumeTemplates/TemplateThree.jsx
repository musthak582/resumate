import React, { useEffect, useRef, useState } from 'react'
import { LuMapPinHouse, LuMail, LuPhone, LuRss, LuGithub, LuUser } from 'react-icons/lu';

import { RiLinkedinLine } from 'react-icons/ri';
import ContactInfo from '../ResumeSections/ContactInfo';
import EducationInfo from '../ResumeSections/EducationInfo';
import { formatYearMonth } from '../../utils/helper';
import LanguageSection from '../ResumeSections/LanguageSection';
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "00B8BD", "#4A5565"];

const Title = ({ text, color }) => {
  return (
    <div className="relative w-fit mb-2.5">
      <span
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ backgroundColor: color }}></span>
      <h2 className={`relative text-sm font-bold`}>{text}</h2>
    </div>
  )
}


const TemplateThree = ({
  resumeData,
  colorPalette,
  containerWidth,
}) => {

  const themeColor = colorPalette.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);// default value
  const [scale, setScale] = useState(1);

  useEffect(() => {
    //calculate the scale factor based on the container width
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);

  return (
    <div
      className="p-3 bg-white"
      ref={resumeRef}
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      < div className="flex items-start gap-5 px-2 mb-5" >
        <div
          className="w-[100px] h-[100px] rounded-2xl max-h-[105px] flex items-center justify-center"
          style={{
            backgroundColor: themeColor[1]
          }}
        >
          {resumeData.profileInfo.profilePreviewUrl ? (
            <img
              src={resumeData.profileInfo.profilePreviewUrl}
              className="w-[90px] h-[90px] rounded-2xl"
            />
          ) : (
            <div
              style={{
                color: themeColor[4]
              }}
              className="w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full">
              <LuUser />
            </div>
          )}
        </div>
        <div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-8">
              <h2 className="text-2xl font-bold">
                {resumeData.profileInfo.fullName}
              </h2>
              <p className="text-[15px] font-semibold mb-2">{resumeData.profileInfo.designation}</p>

              <ContactInfo
                icon={<LuMapPinHouse />}
                iconBG={themeColor[2]}
                value={resumeData.contactInfo.location}
              />
            </div>
            <div className="col-span-4 flex flex-col gap-5 mt-2">
              <ContactInfo
                icon={<LuMail />}
                iconBG={themeColor[2]}
                value={resumeData.contactInfo.email}
              />

              <ContactInfo
                icon={<LuPhone />}
                iconBG={themeColor[2]}
                value={resumeData.contactInfo.phone}
              />
            </div>
          </div>
        </div>
      </div >
      <div className="grid grid-cols-12 gap-8">
        <div
          className="col-span-4 py-5"
          style={{
            backgroundColor: themeColor[0]
          }}
        >
          <div className="my-6 mx-6">
            <div className="flex flex-col gap-4">
              {resumeData.contactInfo.linkedIn && (
                <ContactInfo
                  icon={<RiLinkedinLine />}
                  iconBG={themeColor[2]}
                  value={resumeData.contactInfo.linkedIn}
                />
              )}

              {resumeData.contactInfo.github && (
                <ContactInfo
                  icon={<LuGithub />}
                  iconBG={themeColor[2]}
                  value={resumeData.contactInfo.github}
                />
              )}

              <ContactInfo
                icon={<LuRss />}
                iconBG={themeColor[2]}
                value={resumeData.contactInfo.website}
              />
            </div>

            <div className="mt-5">
              <Title text="Education" color={themeColor[1]} />

              {resumeData.education.map((edu, index) => (
                <EducationInfo
                  key={`edu_${index}`}
                  degree={edu.degree}
                  institution={edu.institution}
                  duration={`${formatYearMonth(edu.startDate)} - ${formatYearMonth(edu.endDate)}`}
                />
              ))}
            </div>

            <div className="mt-5">
              <Title text="Languages" color={themeColor[1]} />

              <LanguageSection
                languages={resumeData.languages}
                accentColor={themeColor[3]}
                bgColor={themeColor[2]}
              />
            </div>
          </div>
        </div>

        <div className="col-span-8 pt-10 mr-10 pb-5">
          <div>
            <Title text="Professional Summary" color={themeColor[1]} />
            <p className="text-sm font-medium">{resumeData.profileInfo.summary}</p>
          </div>

          <div className="mt-4">
            <Title text="Work Experience" color={themeColor[1]} />

            {resumeData.workExperience.map((data, index) => (
              <WorkExperience
                key={`work_${index}`}
                company={data.company}
                role={data.role}
                duration={`${formatYearMonth(data.startDate)}-${formatYearMonth(data.endDate)}`}
                durationColor={themeColor[4]}
                description={data.description}
              />
            ))}
          </div>

          <div className="mt-4">
            <Title text="Projects" color={themeColor[1]} />

            {resumeData.projects.map((project, index) => (
              <ProjectInfo
                key={`project_${index}`}
                title={project.title}
                description={project.description}
                githubLink={project.github}
                liveDemoUrl={project.liveDemo}
                bgColor={themeColor[2]}
              />
            ))}
          </div>

          <div className="mt-4">
            <Title text="Skills" color={themeColor[1]} />

            <SkillSection
              skills={resumeData.skills}
              accentColor={themeColor[3]}
              bgColor={themeColor[2]}
            />
          </div>

          <div className="mt-4">
            <Title text="certifications" color={themeColor[1]} />

            <div className="grid grid-cols-2 gap-2">
              {resumeData.certifications.map((certificate, index) => (
                <CertificationInfo
                  key={`certificate_${index}`}
                  title={certificate.title}
                  issuer={certificate.issuer}
                  year={certificate.year}
                  bgColor={themeColor[2]}
                />
              ))}
            </div>
          </div>

          {resumeData.interests.length > 0 && resumeData.interests[0] && (
            <div className="mt-4">
              <Title text="Interests" color={themeColor[1]} />

              <div className="flex items-center flex-wrap gap-3 mt-4">
                {resumeData.interests.map((interest, index) => {
                  if (!interest) return null;
                  return (
                    <div
                      key={`interest_${index}`}
                      className="text-[10px] font-medium py-1 px-3 rounded-lg"
                      style={{
                        backgroundColor: themeColor[2]
                      }}
                    >
                      {interest}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TemplateThree




