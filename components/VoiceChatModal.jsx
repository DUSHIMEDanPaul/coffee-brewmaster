
import React, { useEffect, useRef, useState } from 'react';
import { connectToVoiceChat, encode, decode, decodeAudioData } from '../services/geminiService';

const VoiceChatModal = ({ onClose }) => {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const sessionRef = useRef(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set());

  useEffect(() => {
    const startSession = async () => {
      try {
        const outCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
        audioContextRef.current = outCtx;

        const sessionPromise = connectToVoiceChat({
          onAudioData: async (base64Data) => {
            setIsPlaying(true);
            const audioBuffer = await decodeAudioData(
              decode(base64Data),
              outCtx,
              24000,
              1
            );
            
            const source = outCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outCtx.destination);
            
            // scheduling for gapless playback
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            
            sourcesRef.current.add(source);
            source.onended = () => {
              sourcesRef.current.delete(source);
              if (sourcesRef.current.size === 0) setIsPlaying(false);
            };
          },
          onInterrupted: () => {
            sourcesRef.current.forEach(s => {
              try { s.stop(); } catch (e) {}
            });
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
            setIsPlaying(false);
          },
          onError: (e) => console.error('Voice Error:', e),
          onClose: () => onClose(),
        });

        const session = await sessionPromise;
        sessionRef.current = session;
        setIsConnecting(false);

        // Setup Microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const inCtx = new AudioContext({ sampleRate: 16000 });
        const source = inCtx.createMediaStreamSource(stream);
        const processor = inCtx.createScriptProcessor(4096, 1, 1);

        processor.onaudioprocess = (e) => {
          const inputData = e.inputBuffer.getChannelData(0);
          const l = inputData.length;
          const int16 = new Int16Array(l);
          for (let i = 0; i < l; i++) {
            int16[i] = inputData[i] * 32768;
          }
          const pcmData = encode(new Uint8Array(int16.buffer));
          
          sessionPromise.then(activeSession => {
            activeSession.sendRealtimeInput({
              media: { data: pcmData, mimeType: 'audio/pcm;rate=16000' }
            });
          });
          setIsListening(true);
        };

        source.connect(processor);
        processor.connect(inCtx.destination);

      } catch (err) {
        console.error('Failed to start voice chat:', err);
        onClose();
      }
    };

    startSession();

    return () => {
      sessionRef.current?.close();
      audioContextRef.current?.close();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3d2b1f]/95 backdrop-blur-xl transition-all">
      <div className="flex flex-col items-center max-w-sm w-full p-8 text-center">
        <div className="relative mb-12">
          {/* Pulsing Visualizer */}
          <div className={`absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse transition-all ${isPlaying ? 'scale-150' : 'scale-100'}`}></div>
          <div className="relative w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl border-8 border-white/10 overflow-hidden">
            <div className="flex items-center gap-1 h-12">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 bg-[#8b5e3c] rounded-full transition-all duration-150 ${
                    isPlaying ? 'animate-bounce' : isListening ? 'h-4' : 'h-1'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s`, height: isPlaying ? '3rem' : '' }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-white text-3xl font-serif font-bold mb-4">
          {isConnecting ? 'Brewing Connection...' : isPlaying ? 'Elias is Speaking' : 'Listening for Elias...'}
        </h2>
        <p className="text-white/60 text-sm mb-12 leading-relaxed">
          Talk naturally to Elias. Ask about our EAC origins, brewing secrets, or your global logistics status.
        </p>

        <button 
          onClick={onClose}
          className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold transition-all border border-white/20"
        >
          End Conversation
        </button>
      </div>
    </div>
  );
};

export default VoiceChatModal;
