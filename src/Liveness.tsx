import { useEffect, useState } from "react";
import { Loader, Heading } from "@aws-amplify/ui-react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import { LivenessError } from "@aws-amplify/ui-react-liveness/dist/types/components/FaceLivenessDetector/service";
import { AnalysisResult } from "./utils/interfaces";
import { get } from "aws-amplify/api";
import "./liveness.css";

interface ILivenessProps {
  onCompleteAnalysis: (result: AnalysisResult, error?: string) => void;
  onCancelAnalysis: () => void;
}

export function Liveness({ onCompleteAnalysis }: ILivenessProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [sessionId, setSessionId] = useState<{
    sessionId: string;
  } | null>(null);
  const [success, setSuccess] = useState('');

  const fetchCreateLiveness = async () => {
    const createSession = get({
      apiName: "livenesspocapi",
      path: "/sessions/create"
    });
    const response = await createSession.response;
    const json = await response.body.json() as { sessionId: string; };
    console.log("json", json.sessionId);
    setSessionId({ sessionId: json.sessionId });
    setLoading(false);
  };

  useEffect(() => {
    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    if (sessionId) {
      const getSessionResult = get({
        apiName: "livenesspocapi",
        path: "/sessions/result",
        options: {
          queryParams: {
            sessionId: sessionId.sessionId
          }
        }
      });
      const response = await getSessionResult.response;
  
      const data = await response.body.json() as { isLive: boolean };
      console.log(data);
      if (data.isLive) {
        setSuccess("Liveness check success");
      } else {
        setSuccess("Liveness check failed");
      }
      onCompleteAnalysis(data.isLive ? "Success" : "Failed");
    }
  };

  const handleOnUserCancel = () => {
    console.log("handleOnUserCancel");
    onCompleteAnalysis("Cancelled");
  }

  const handleError = (error: LivenessError) => {
    console.log("got error", error);
    onCompleteAnalysis("Failed", error.error.message);
  };
  return (
    <div className="liveness-container">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <FaceLivenessDetector
            sessionId={sessionId?.sessionId ?? "1"}
            region="ap-south-1"
            onAnalysisComplete={handleAnalysisComplete}
            onError={handleError}
            onUserCancel={handleOnUserCancel}
          />
          <Heading level={2}>{success}</Heading>
        </div>
      )}
    </div>
  );
}
