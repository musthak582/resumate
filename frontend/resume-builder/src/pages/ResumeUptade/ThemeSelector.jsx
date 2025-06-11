import React, { useRef, useState, useEffect } from 'react'
import {
  DUMMY_RESUME_DATA,
  TEMPLATE_OPTIONS,
  themeColorPalette,
} from "../../utils/data"
import { LuCircleCheckBig } from 'react-icons/lu'
import TemplateCard from '../../components/Cards/TemplateCard';
import RenderResume from '../../components/ResumeTemplates/RenderResume';
import Tap from '../../components/Tap';



const TAB_DATA = [
  {
    label: "Templates",
  },
  {
    label: "Color Palettes",
  },
];


const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  onClose,
}) => {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);// default value

  const [tabValue, setTabValue] = useState("Templates");
  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette,
    index: -1,
  });

  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });

  // Handle theme chnage

  const handleThemeSelection = () => {
    setSelectedTheme({
      colorPalette: selectedColorPalette?.colors,
      theme: selectedTemplate?.theme,
    });
    onClose();
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <div className="container mx-auto px-2 md:px-0">
      <div className="flex items-center justify-between mb-5 mt-2">
        <Tap
          tabs={TAB_DATA}
          activeTab={tabValue}
          setActiveTab={setTabValue}
        />

        <button
          className="btn-small-light"
          onClick={() => handleThemeSelection()}
        >
          <LuCircleCheckBig className="text-[16px]" />
          Done
        </button>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-5 bg-white">
          <div className="grid grid-cols-2 gap-5 max-h-[80vh] overflow-scroll custom-scrollbar md:pr-5">

            {tabValue === "Templates" && (
              TEMPLATE_OPTIONS.map((template, index) => (
                <TemplateCard
                  key={`template_${index}`}
                  label={template.label}
                  description={template.description}
                  isSelected={selectedTemplate?.index === index}
                  onSelect={() => {
                    setSelectedTemplate({
                      theme: template.id,
                      index,
                    });
                  }}
                />
              ))
            )}

            {tabValue === "Color Palettes" &&
              themeColorPalette.themeOne.map((colors, index) => (
                <ColorPalette
                  key={`palette_${index}`}
                  colors={colors}
                  isSelected={selectedColorPalette?.index === index}
                  onSelect={() => {
                    setSelectedColorPalette({
                      colors,
                      index,
                    });
                  }}
                />
              ))
            }
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 bg-white -mt-3" ref={resumeRef}>
          <RenderResume
            templateId={selectedTemplate?.theme || ""}
            resumeData={DUMMY_RESUME_DATA}
            containerWidth={baseWidth}
            colorPalette={selectedColorPalette?.colors || []}
          />
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector

const ColorPalette = ({ colors, isSelected, onSelect }) => {
  return (
    <div
      className={`h-28 bg-purple-50 flex rounded-lg overflow-hidden border-2 ${isSelected ? 'border-purple-400' : 'border-none'
        }`}
      onClick={onSelect} // optional: move onClick here for whole palette selection
    >
      {colors.map((color, index) => (
        <div
          key={`color_${index}`}
          className="flex-1 cursor-pointer"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};
