import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { PlayIcon, PauseIcon } from './icons';

interface AudioPlayerProps {
    audioScript?: string;
    audioSrc?: string;
}

const isGoogleDriveId = (id: string | undefined): id is string => {
    // A simple check: Google Drive IDs are typically long, without slashes, and don't start with http or /.
    return !!id && !id.includes('/') && !id.startsWith('http') && id.length > 20;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioScript, audioSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(null);
    const [speechRate, setSpeechRate] = useState(1.0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const isPlayingRef = useRef(isPlaying);
    isPlayingRef.current = isPlaying;

    const finalAudioSrc = useMemo(() => {
        if (!audioSrc) return undefined;
        if (isGoogleDriveId(audioSrc)) {
            return `https://drive.google.com/uc?export=download&id=${audioSrc}`;
        }
        return audioSrc;
    }, [audioSrc]);

    // Effect for loading system voices and settings for TTS
    useEffect(() => {
        const loadVoicesAndSettings = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                const savedVoiceURI = localStorage.getItem('tts-voice');
                const defaultVoice = availableVoices.find(v => v.default) || availableVoices[0];
                const initialVoice = availableVoices.find(v => v.voiceURI === savedVoiceURI) || defaultVoice;
                setSelectedVoiceURI(initialVoice?.voiceURI || null);
            }
            const savedRate = localStorage.getItem('tts-rate');
            if (savedRate) {
                setSpeechRate(parseFloat(savedRate));
            }
        };

        window.speechSynthesis.addEventListener('voiceschanged', loadVoicesAndSettings);
        loadVoicesAndSettings();

        return () => {
            window.speechSynthesis.removeEventListener('voiceschanged', loadVoicesAndSettings);
        };
    }, []);

    // Effect for preparing the TTS utterance
    useEffect(() => {
        if (!audioScript) {
            window.speechSynthesis.cancel();
            utteranceRef.current = null;
            return;
        }

        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(audioScript);
        
        if (voices.length > 0) {
            const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
            if (selectedVoice) {
                u.voice = selectedVoice;
            }
        }
        
        u.rate = speechRate;
        u.onend = () => setIsPlaying(false);
        utteranceRef.current = u;

        if (isPlayingRef.current) {
            synth.cancel();
            synth.speak(u);
        }

        return () => {
            if (synth.speaking) {
                synth.cancel();
            }
        };
    }, [audioScript, selectedVoiceURI, voices, speechRate]);

    // Effect for handling <audio> element events
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        setHasError(false);
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => setIsPlaying(false);
        const onError = () => {
            console.error("Error loading audio source:", audio.src, "Falling back to Text-to-Speech if available.");
            setIsPlaying(false);
            setHasError(true);
        };
        const onTimeUpdate = () => {
            if (audio) setCurrentTime(audio.currentTime);
        };
        const onLoadedMetadata = () => {
            if (audio) setDuration(audio.duration);
        };

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('error', onError);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onLoadedMetadata);

        setIsPlaying(false);
        if (!audio.paused) audio.pause();
        audio.currentTime = 0;
        setCurrentTime(0);
        setDuration(0);

        return () => {
            if (audio) {
                audio.removeEventListener('play', onPlay);
                audio.removeEventListener('pause', onPause);
                audio.removeEventListener('ended', onEnded);
                audio.removeEventListener('error', onError);
                audio.removeEventListener('timeupdate', onTimeUpdate);
                audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            }
        };
    }, [finalAudioSrc]);
    
    // Global cleanup for unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
            if (audioRef.current && !audioRef.current.paused) {
                audioRef.current.pause();
            }
        };
    }, []);

    const canUseAudioFile = finalAudioSrc && !hasError;

    const handlePlayPause = useCallback(() => {
        if (canUseAudioFile && audioRef.current) {
            const audio = audioRef.current;
            if (isPlaying) {
                audio.pause();
            } else {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Audio playback was prevented:", error);
                        setIsPlaying(false);
                    });
                }
            }
        } else if (audioScript && utteranceRef.current) {
            const synth = window.speechSynthesis;
            if (isPlaying) {
                synth.cancel();
                setIsPlaying(false);
            } else {
                synth.cancel(); // Ensure any prior speech is stopped
                synth.speak(utteranceRef.current);
                setIsPlaying(true);
            }
        }
    }, [isPlaying, canUseAudioFile, audioScript]);
    
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = Number(e.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };
    
    const handleSeekRelative = (delta: number) => {
        if (canUseAudioFile && audioRef.current) {
            const audio = audioRef.current;
            const newTime = Math.max(0, Math.min(audio.duration, audio.currentTime + delta));
            audio.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case ' ':
                e.preventDefault();
                handlePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                handleSeekRelative(-10);
                break;
            case 'ArrowRight':
                e.preventDefault();
                handleSeekRelative(10);
                break;
        }
    };

    const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const uri = e.target.value;
        setSelectedVoiceURI(uri);
        localStorage.setItem('tts-voice', uri);
    };
    
    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRate = parseFloat(e.target.value);
        setSpeechRate(newRate);
        localStorage.setItem('tts-rate', newRate.toString());
    };
    
    const getHelperText = () => {
        if (hasError) return "Audio file failed. Using text-to-speech.";
        return "Press play to hear the text-to-speech audio.";
    };
  
    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds) || timeInSeconds === Infinity) {
            return '00:00';
        }
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div 
            className="w-full bg-slate-100 rounded-lg p-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Audio Player. Focus to use keyboard shortcuts (Space bar for play/pause, Left/Right Arrows to seek)."
        >
            <div className="flex items-center">
                {finalAudioSrc && <audio ref={audioRef} src={finalAudioSrc} hidden preload="metadata" />}
                <button 
                    onClick={handlePlayPause}
                    className="flex-shrink-0 bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label={isPlaying ? "Stop audio" : "Play audio"}
                >
                    {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                </button>
                <div className="ml-4 flex-grow">
                    {canUseAudioFile ? (
                        <div className="flex items-center space-x-3 w-full">
                            <span className="text-sm font-mono text-slate-600 w-12 text-center" aria-hidden="true">{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                aria-label="Audio progress bar"
                            />
                            <span className="text-sm font-mono text-slate-600 w-12 text-center" aria-hidden="true">{formatTime(duration)}</span>
                        </div>
                    ) : (
                        <div className="text-slate-700">
                            <p className="font-semibold">Listen to the dictation</p>
                            <p className={`text-sm ${hasError ? 'text-orange-600 font-semibold' : 'text-slate-500'}`}>{getHelperText()}</p>
                        </div>
                    )}
                </div>
            </div>
            {voices.length > 0 && (!finalAudioSrc || hasError) && (
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                    <div>
                        <label htmlFor="voice-select" className="block text-sm font-medium text-slate-600 mb-1">
                            Speech Voice
                        </label>
                        <select
                            id="voice-select"
                            value={selectedVoiceURI || ''}
                            onChange={handleVoiceChange}
                            className="w-full p-2 border border-slate-300 rounded-md bg-white text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            {voices.map((voice) => (
                                <option key={voice.voiceURI} value={voice.voiceURI}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                         <label htmlFor="rate-select" className="block text-sm font-medium text-slate-600 mb-1">
                            Speech Speed ({speechRate.toFixed(2)}x)
                        </label>
                        <input
                            id="rate-select"
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={speechRate}
                            onChange={handleRateChange}
                            className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            aria-label="Speech speed"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AudioPlayer;