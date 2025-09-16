export interface RecordDto {
  id?: number;
  recordDate: string; // ISO 8601
  recordValue: number;
  description?: string;
  recordCategoryId: number;
  unitId: number;
}
