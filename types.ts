export interface SurveyRow {
  // Input fields
  BS: string;
  FS: string;
  RL: string; // Can be input for BM, or output

  // Calculated fields (internal)
  HI: number | null;

  // For React keys
  id: string; 
}