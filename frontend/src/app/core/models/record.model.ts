export interface Record {
  id: number;
  recordDate: string; // ISO 8601 Format (z.B. "2025-09-15T12:00:00Z")
  recordValue: number;
  description?: string;

  recordCategoryId: number;
  recordCategoryName: string;

  unitId: number;
  unitName: string;
}
