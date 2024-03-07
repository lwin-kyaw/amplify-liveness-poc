import { DEFAULT_SUCCESS_TEXT, DEFAULT_ERROR_TEXT, DEFAULT_CANCEL_TEXT } from "./utils/constants";
import { AnalysisResult } from "./utils/interfaces";
import "./Completion.css";



interface ICompletionProps {
  result: AnalysisResult;
  statusText?: string;
  onTryAgain: () => void;
}

export function Completion({
  result,
  statusText,
  onTryAgain,
}: ICompletionProps) {
  const renderStatusText = () => {
    if (statusText) {
      return statusText;
    }
    switch(result) {
      case "Success":
        return DEFAULT_SUCCESS_TEXT;
      case "Failed":
        return DEFAULT_ERROR_TEXT;
      case "Cancelled":
        return DEFAULT_CANCEL_TEXT;
      default:
        throw new Error(`invalid result: ${result}`);
    }
  }

  return (
    <div className="completion-container">
      <span className={`big-text ${result.toLowerCase()}`}>{ result }</span>
      <span className="result-text">{ renderStatusText() }</span>
      <button onClick={onTryAgain}>Try again</button>
    </div>
  )
}