const CAREER_START_YEAR = 2018
const CAREER_START_MONTH = 11

export const getExperienceYears = (now = new Date()) => {
  const totalMonths = (now.getUTCFullYear() - CAREER_START_YEAR) * 12
    + (now.getUTCMonth() - CAREER_START_MONTH)

  return Math.max(0, Math.floor(totalMonths / 12))
}

export const getExperienceYearsLabel = (now = new Date()) => `${getExperienceYears(now)}+ years`
