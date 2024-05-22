'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Document {
  title: string;
  path: string;
}

interface ExperienceData {
  additionalData?: any;
  documents: Document[];
}

const ExperienceUploader: React.FC = () => {
  const [jsonData, setJsonData] = useState<string>('{}');
  const [files, setFiles] = useState<File[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [secretCode, setSecretCode] = useState<string>('');
  const expectedSecretCode = '0000';
  const [origin, setOrigin] = useState<string>('');
  useEffect(() => {
    const tempOrigin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : '';

    setOrigin(tempOrigin);
  }, []);

  console.log(origin);

  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSecretCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSecretCode(event.target.value);
  };

  const convertFilesToBase64 = async () => {
    setIsConverting(true);
    const convertedDocuments = await Promise.all(
      files.map(async (file): Promise<Document> => {
        const base64 = await convertToBase64(file);
        return {
          title: file.name,
          path: base64.split(';base64,').pop() as string,
        };
      }),
    );
    setDocuments(convertedDocuments);
    setIsConverting(false);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (secretCode !== expectedSecretCode) {
      alert('Incorrect secret code.');
      return;
    }
    if (!documents.length) {
      alert('Please convert files to Base64 before submitting.');
      return;
    }

    try {
      const additionalData = JSON.parse(jsonData);
      const experienceData: ExperienceData = {
        ...additionalData,
        documents,
      };

      setIsUploading(true);

      console.log('trying to fetch', `${origin}/admin/api`);

      const response = await fetch(`${origin}/admin/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experienceData),
      });

      const result = await response.json();
      alert(`Upload successful: ${result.message}`);
      setIsUploading(false);
    } catch (error) {
      console.error('Failed to upload:', error);
      alert('Failed to upload, check the console for more information.');
      setIsUploading(false);
    }
  };

  return (
    <div className="pt-20">
      <h1>Upload PDF Files as Base64</h1>
      <textarea
        value={jsonData}
        onChange={handleJsonChange}
        placeholder="Enter additional JSON data here"
        rows={10}
        cols={50}
      />
      <br />
      <input
        title="uploaded"
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
      />
      <button onClick={convertFilesToBase64} disabled={isConverting}>
        {isConverting ? 'Converting...' : 'Convert to Base64'}
      </button>
      <br />
      <input
        type="text"
        value={secretCode}
        onChange={handleSecretCodeChange}
        placeholder="Enter secret code"
      />
      <br />
      <button onClick={handleSubmit} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Submit'}
      </button>
      {documents.length > 0 && (
        <div>
          <h2>Converted Documents</h2>
          <ul>
            {documents.map((doc, index) => (
              <li key={index}>{doc.title} - Ready</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExperienceUploader;
