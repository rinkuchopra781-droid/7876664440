
import React, { useRef } from 'react';
import { UploadIcon } from './Icons';

interface FileInputProps {
    onFileSelect: (file: File) => void;
    fileName: string | null;
    disabled: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({ onFileSelect, fileName, disabled }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload Survey Readings CSV
                <span className="text-xs text-slate-500 block">Must contain 'Station', 'Type', 'Value' columns.</span>
            </label>
            <div
                onClick={handleClick}
                className={`relative w-full border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-cyan-500 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".csv, text/csv"
                    disabled={disabled}
                />
                <div className="flex flex-col items-center justify-center text-slate-400">
                    <UploadIcon className="w-10 h-10 mb-2" />
                    <span className="font-medium text-slate-300">
                        {fileName ? 'Click to change file' : 'Click to upload'}
                    </span>
                    <p className="text-sm">
                        {fileName || 'or drag and drop'}
                    </p>
                </div>
            </div>
            {fileName && (
                <p className="mt-2 text-sm text-slate-400">
                    Selected file: <span className="font-semibold text-cyan-400">{fileName}</span>
                </p>
            )}
        </div>
    );
};
