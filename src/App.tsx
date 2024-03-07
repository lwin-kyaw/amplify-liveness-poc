import React, { useState } from 'react';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsexports from './aws-exports';
import { Completion } from './Completion';
import { Liveness } from './Liveness';
import { AnalysisResult } from './utils/interfaces';

Amplify.configure(awsexports);

export default function App() {
  const [livnessResult, setLivenessResult] = useState<AnalysisResult | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<string | undefined>();

  const onTryAgain = () => {
    setLivenessResult(null);
  }

  const onCompleteAnalysis = (result: AnalysisResult, error?: string) => {
    setLivenessResult(result);
    setAnalysisStatus(error);
  }

  return (
    <ThemeProvider>
      {
        livnessResult 
          ? <Completion result={livnessResult} onTryAgain={onTryAgain} statusText={analysisStatus} /> 
          : <Liveness onCancelAnalysis={onTryAgain} onCompleteAnalysis={onCompleteAnalysis}/>
      }
    </ThemeProvider>
  );
}