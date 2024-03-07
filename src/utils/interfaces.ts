export interface CreateLivenessSessionResponse {
  sessionId?: string;
  success: boolean;
  error?: string;
}

export type AnalysisResult = "Success" | "Failed" | "Cancelled";
