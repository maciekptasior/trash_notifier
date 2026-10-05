export interface WasteSchedule {
  [dateString: string]: string[];
}

export const WASTE_SCHEDULE_REGION_1: WasteSchedule = {
  // Wrzesień 2026
  '2026-09-07': ['Zmieszane', 'Biodegradowalne', 'Papier'],
  '2026-09-10': ['Wielkogabaryty'],
  '2026-09-14': ['Zmieszane', 'Biodegradowalne', 'Metale i tworzywa sztuczne'],
  '2026-09-19': ['Tekstylia i odzież'],
  '2026-09-21': ['Zmieszane', 'Biodegradowalne'],
  '2026-09-28': ['Zmieszane', 'Biodegradowalne', 'Metale i tworzywa sztuczne', 'Szkło'],

  // Październik 2026
  '2026-10-05': ['Zmieszane', 'Biodegradowalne', 'Papier'],
  '2026-10-12': ['Zmieszane', 'Biodegradowalne', 'Metale i tworzywa sztuczne'],
  '2026-10-19': ['Zmieszane', 'Biodegradowalne'],
  '2026-10-26': ['Zmieszane', 'Biodegradowalne', 'Metale i tworzywa sztuczne', 'Szkło'],

  // Listopad 2026
  '2026-11-02': ['Zmieszane', 'Biodegradowalne', 'Papier'],
  '2026-11-09': ['Zmieszane', 'Biodegradowalne', 'Metale i tworzywa sztuczne'],
  '2026-11-16': ['Zmieszane', 'Biodegradowalne'],
  '2026-11-23': ['Zmieszane', 'Biodegradowalne', 'Metale i tworzywa sztuczne', 'Szkło'],
  '2026-11-30': ['Zmieszane', 'Biodegradowalne'],

  // Grudzień 2026
  '2026-12-05': ['Tekstylia i odzież'],
  '2026-12-07': ['Zmieszane', 'Biodegradowalne', 'Metale i tworzywa sztuczne'],
  '2026-12-14': ['Zmieszane', 'Biodegradowalne', 'Papier'],
  '2026-12-21': ['Zmieszane', 'Biodegradowalne', 'Metale i tworzywa sztuczne', 'Szkło'],
  '2026-12-28': ['Zmieszane', 'Biodegradowalne'],
};
