export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birthDateArray = birthDate.split('.');
  const birthYear = parseInt(birthDateArray[2]);
  const birthMonth = parseInt(birthDateArray[1]) - 1; // Месяцы начинаются с 0 (январь = 0, февраль = 1, и т.д.)
  const birthDay = parseInt(birthDateArray[0]);

  const age = today.getFullYear() - birthYear;
  const hasBirthdayPassed = today.getMonth() > birthMonth || (today.getMonth() === birthMonth && today.getDate() >= birthDay);

  if (!hasBirthdayPassed) {
    return age - 1;
  }

  return age;
}