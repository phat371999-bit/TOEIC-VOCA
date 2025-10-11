
import { useState, useCallback, RefObject, useEffect } from 'react';
import { getWordDefinition } from '../services/geminiService';
import { addOrUpdateVocabularyWord } from '../services/vocabularyService';
import { VocabularyWord } from '../types';

interface SelectionPopupState {
    top: number;
    left: number;
    word: string;
    context: string;
}

export const useWordSelection = (containerRef: RefObject<HTMLElement>) => {
    const [selectionPopup, setSelectionPopup] = useState<SelectionPopupState | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const handleMouseUp = useCallback(() => {
        if (!containerRef.current) return;
        
        // Timeout to allow other click events to fire first
        setTimeout(() => {
            const selection = window.getSelection();
            if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
                const selectedText = selection.toString().trim();
                
                // Simple validation for a single word
                if (selectedText.length > 2 && selectedText.length < 30 && !/^\d+$/.test(selectedText) && selectedText.split(' ').length === 1) {
                    const range = selection.getRangeAt(0);

                    // Ensure the selection is within the intended container
                    if (!containerRef.current?.contains(range.commonAncestorContainer)) {
                        setSelectionPopup(null);
                        return;
                    }

                    const rect = range.getBoundingClientRect();
                    
                    const contextRange = document.createRange();
                    const startNode = range.startContainer;
                    const endNode = range.endContainer;
                    
                    contextRange.setStart(startNode, Math.max(0, range.startOffset - 50));
                    contextRange.setEnd(endNode, Math.min(endNode.textContent?.length ?? 0, range.endOffset + 50));
                    const context = contextRange.toString().replace(/\s+/g, ' ').trim();

                    setSelectionPopup({
                        top: rect.top + window.scrollY,
                        left: rect.left + window.scrollX + rect.width / 2,
                        word: selectedText,
                        context: `...${context}...`,
                    });
                    return;
                }
            }
            setSelectionPopup(null);
        }, 0);
    }, [containerRef]);

    const handleSaveWord = useCallback(async () => {
        if (!selectionPopup) return;
        const { word, context } = selectionPopup;
        setSelectionPopup(null);
        setToastMessage(`Saving "${word}"...`);

        try {
            const definition = await getWordDefinition(word, context);

            if (definition && !definition.toLowerCase().includes("could not retrieve")) {
                const newWord: VocabularyWord = {
                    id: word.toLowerCase(),
                    word: word,
                    definition: definition,
                    srsLevel: 0,
                    nextReviewDate: Date.now(),
                    lastReviewedDate: null,
                    sourceText: context,
                };
                await addOrUpdateVocabularyWord(newWord);
                setToastMessage(`"${word}" saved successfully!`);
            } else {
                setToastMessage(`Could not save "${word}". Definition not found.`);
            }
        } catch (error) {
            console.error("Error saving word:", error);
            setToastMessage(`Failed to save "${word}".`);
        }


        const timer = setTimeout(() => setToastMessage(null), 3000);
        return () => clearTimeout(timer);
    }, [selectionPopup]);

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (selectionPopup) {
                const target = event.target as HTMLElement;
                if (!target.closest('.vocab-popup-button-class')) {
                     setSelectionPopup(null);
                }
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, [selectionPopup]);

    return {
        selectionPopup,
        toastMessage,
        handleMouseUp,
        handleSaveWord,
    };
};
