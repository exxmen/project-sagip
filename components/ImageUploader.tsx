import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  image: string | null;
  onImageSelect: (base64: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageSelect, onClear, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  if (image) {
    return (
      <div className="relative w-full overflow-hidden rounded-xl border border-gray-300 shadow-sm bg-gray-50 group">
        <img 
          src={image} 
          alt="Student Quiz" 
          className="w-full h-64 object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-4 pointer-events-none">
          <span className="text-white text-sm font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
            Ready to Analyze
          </span>
        </div>
        {!isLoading && (
          <button 
            onClick={onClear}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors z-10"
          >
            <X size={20} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={!isLoading ? triggerUpload : undefined}
      className={`
        border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer h-64
        ${isLoading ? 'border-gray-300 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-deped-blue/30 bg-blue-50/50 hover:bg-blue-50 hover:border-deped-blue'}
      `}
    >
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isLoading}
      />
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <Upload className="text-deped-blue" size={32} />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">Scan Student Work</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-xs">
        Tap to upload a photo of a math or english quiz.
      </p>
      <div className="mt-4 flex gap-2 text-xs text-gray-400">
        <span className="flex items-center"><ImageIcon size={12} className="mr-1"/> JPG</span>
        <span className="flex items-center"><ImageIcon size={12} className="mr-1"/> PNG</span>
      </div>
    </div>
  );
};

export default ImageUploader;