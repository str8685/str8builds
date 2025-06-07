declare module 'react-speech-recognition' {
  export interface SpeechRecognitionOptions {
    continuous?: boolean;
    interimResults?: boolean;
    lang?: string;
  }

  export interface SpeechRecognitionListenOptions {
    continuous?: boolean;
    language?: string;
    interimResults?: boolean;
  }

  export interface SpeechRecognitionResult {
    isFinal: boolean;
    transcript: string;
  }

  export interface SpeechRecognitionReturnHook {
    transcript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
    isMicrophoneAvailable: boolean;
  }

  export default class SpeechRecognition {
    static getRecognition(): any;
    static startListening(options?: SpeechRecognitionListenOptions): void;
    static stopListening(): void;
    static abortListening(): void;
    static applyPolyfill(string: string): void;
  }

  export function useSpeechRecognition(): SpeechRecognitionReturnHook;
}