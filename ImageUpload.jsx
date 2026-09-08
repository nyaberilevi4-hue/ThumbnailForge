import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function ImageUpload({ value, uploading, onChange, onClear, onError }) {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onError?.('Please choose an image file.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      onError?.('Images must be 10 MB or smaller.');
      return;
    }

    onChange(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-[#E5E5E5]/70 uppercase tracking-wide block">Base Image (Optional)</label>
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-green-400/50 bg-green-400/10">
          <img src={value} alt="Base" className="w-full h-32 object-cover" />
          <button
            type="button"
            onClick={onClear}
            aria-label="Remove base image"
            className="absolute top-2 right-2 p-1 bg-[#FF0000] rounded-lg text-white hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-[#FF0000]/50 transition-colors">
          <div className="text-center">
            <Upload size={20} className="mx-auto mb-1 text-[#E5E5E5]/60" />
            <p className="text-xs text-[#E5E5E5]/60">Drop image or click to upload</p>
          </div>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
        </label>
      )}
    </div>
  );
}