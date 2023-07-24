import { Quasar } from 'quasar';

export const SALARY_PER_SECOND_IN_EUR = 22;

export const format = (value: number) => {
  const locale = Quasar.lang.getLocale();

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
};
