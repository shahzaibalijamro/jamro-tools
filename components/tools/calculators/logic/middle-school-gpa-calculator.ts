export interface GpaCourse { name?: string; grade: number; credits: number }
export function calculateMiddleSchoolGpa(courses: GpaCourse[]) {
  if (!courses.length) return { gpa: 0, totalCredits: 0, averagePercent: 0, isValid: false };
  let weightedSum = 0;
  let totalCredits = 0;
  for (const course of courses) if (course.credits > 0) { weightedSum += course.grade * course.credits; totalCredits += course.credits; }
  if (totalCredits === 0) return { gpa: 0, totalCredits: 0, averagePercent: 0, isValid: false };
  const gpa = weightedSum / totalCredits;
  return { gpa, totalCredits, averagePercent: Math.round(gpa / 4 * 100), isValid: true };
}
