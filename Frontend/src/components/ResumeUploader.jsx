import { useRef, useState } from 'react';
import { UploadCloud, FileText, X, AlertCircle } from 'lucide-react';

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function ResumeUploader({ file, onFileSelect, onFileRemove, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState(null);
  const fileInputRef = useRef(null);

  const validateAndSelect = (selectedFile) => {
    setLocalError(null);
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith('.pdf') && selectedFile.type !== 'application/pdf') {
      setLocalError('Only PDF files are supported. Please upload a .pdf file.');
      return;
    }

    onFileSelect(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSelect(droppedFile);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSelect(e.target.files[0]);
    }
  };

  const handleAreaClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between h-full transition-all">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Upload Your Resume
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Provide your existing resume in PDF format
            </p>
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            PDF only
          </span>
        </div>

        {/* Upload Dropzone / File Display */}
        {!file ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleAreaClick}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[220px] ${
              isDragging
                ? 'border-blue-500 bg-blue-50/60 scale-[0.99]'
                : 'border-slate-300 hover:border-blue-400 bg-slate-50/40 hover:bg-slate-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs">
              <UploadCloud className="w-6 h-6" />
            </div>

            <p className="text-sm font-semibold text-slate-800">
              Click to browse <span className="font-normal text-slate-500">or drag & drop</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports searchable single/multi-page PDF documents
            </p>

            <span className="inline-block mt-4 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              PDF format only
            </span>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleInputChange}
              disabled={disabled}
            />
          </div>
        ) : (
          <div className="border border-blue-200 bg-blue-50/40 rounded-xl p-5 min-h-[220px] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3.5">
                <div className="w-11 h-11 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900 break-all line-clamp-1">
                      {file.name}
                    </p>
                    <span className="text-[11px] font-bold uppercase bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                      PDF
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatFileSize(file.size)}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                    <span>✓</span> Ready for semantic analysis
                  </p>
                </div>
              </div>

              {!disabled && (
                <button
                  type="button"
                  onClick={onFileRemove}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-white"
                  title="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="pt-4 border-t border-blue-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleAreaClick}
                disabled={disabled}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer"
              >
                Replace file
              </button>
              <span className="text-slate-500">PDF format verified</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {localError && (
          <div className="mt-3 flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{localError}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
        Ensure your PDF contains selectable text rather than scanned images for optimal parsing.
      </div>
    </div>
  );
}
