import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, X, CheckCircle, Move } from 'lucide-react';

interface ProprietorPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl: string;
  ownerName: string;
  marathiOwnerName: string;
}

export const ProprietorPhotoModal: React.FC<ProprietorPhotoModalProps> = ({
  isOpen,
  onClose,
  photoUrl,
  ownerName,
  marathiOwnerName,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & pan when opened
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcut for Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, zoomLevel]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(3, +(prev + 0.5).toFixed(1)));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(1, +(prev - 0.5).toFixed(1));
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleToggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomLevel === 1) {
      setZoomLevel(2);
    } else {
      handleReset();
    }
  };

  // Dragging handlers for panning when zoomed in
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    e.preventDefault();
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    // Limit pan boundary relative to zoom
    const maxBound = (zoomLevel - 1) * 350;
    setPosition({
      x: Math.max(-maxBound, Math.min(maxBound, newX)),
      y: Math.max(-maxBound, Math.min(maxBound, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile pan
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartRef.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoomLevel <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStartRef.current.x;
    const newY = touch.clientY - dragStartRef.current.y;
    const maxBound = (zoomLevel - 1) * 350;
    setPosition({
      x: Math.max(-maxBound, Math.min(maxBound, newX)),
      y: Math.max(-maxBound, Math.min(maxBound, newY)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-[#0F5132] text-white flex items-center justify-between shrink-0 border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center font-bold text-sm shadow-sm">
              <CheckCircle className="w-5 h-5 text-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {ownerName}
                </h3>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-800 text-amber-300 border border-emerald-700">
                  {marathiOwnerName}
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                Proprietor & Manager · Sai Provision and General Stores
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 hover:text-white transition-colors cursor-pointer border border-emerald-700"
            title="Close viewer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar with Zoom In, Zoom Out, Reset */}
        <div className="px-4 py-2 sm:px-6 bg-stone-100 border-b border-stone-200 flex items-center justify-between gap-2 flex-wrap shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-600">Zoom:</span>
            <div className="inline-flex items-center rounded-xl bg-white border border-stone-300 p-0.5 shadow-2xs">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-stone-100 text-stone-700 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="px-2.5 sm:px-3 text-xs font-mono font-bold text-emerald-900 select-none">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-stone-100 text-stone-700 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {zoomLevel > 1 && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
                title="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
            {zoomLevel > 1 ? (
              <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
                <Move className="w-3.5 h-3.5" />
                Drag to pan image
              </span>
            ) : (
              <span>Tap or double-click photo to zoom</span>
            )}
          </div>
        </div>

        {/* Image Display Canvas - Preserves Crisp High Resolution without Breaking */}
        <div
          ref={containerRef}
          className={`relative flex-1 bg-stone-900/95 overflow-hidden flex items-center justify-center p-2 sm:p-4 min-h-[340px] sm:min-h-[460px] max-h-[68vh] select-none ${
            zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleToggleZoom}
        >
          <div
            className="transition-transform duration-150 ease-out flex items-center justify-center max-w-full max-h-full"
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
              transformOrigin: 'center center',
            }}
          >
            {/* The Original Photograph */}
            <img
              src={photoUrl}
              alt={ownerName}
              className="max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-2xl pointer-events-none"
              style={{
                imageRendering: 'auto',
              }}
              draggable={false}
            />
          </div>

          {/* Quick Click-to-Zoom Indicator Pill when 1x */}
          {zoomLevel === 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-stone-950/75 backdrop-blur-xs text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Click to Zoom In (200%)</span>
            </div>
          )}
        </div>

        {/* Modal Footer Info */}
        <div className="px-4 py-3 sm:px-6 bg-[#FDFBF7] border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-stone-800">
              Gaytri Nagar, Snehal Colony · Jalgaon
            </span>
          </div>
          <button
            onClick={onClose}
            className="btn-pop px-3.5 py-1.5 rounded-lg bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
