'use client'
import { useState, ChangeEvent, FormEvent } from 'react';

interface ApiResponseDetails {
  id: number;
  content: string;
  prompt_token_count: number;
  output_token_count: number;
  total_tokens_count: number;
  created_at: string;
}

interface ApiResponse {
  id: number;
  name: string;
  text_prompt: string;
  file_prompt: number;
  response: ApiResponseDetails;
  images: string[];
}

const Spinner = () => (
  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
);

export default function CarImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const assistant_id = null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Сурет файлын таңдаңыз.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('assistant', `${assistant_id}`);
    formData.append('image', selectedFile);
    formData.append('stream', 'false');
    formData.append('text_prompt', `Көліктің түсі, маркасы, және нөмірі қандай?. Сипаттаманы осындай түрде бер: Бренд: Toyota Түсі:  Қызыл Автокөліктің нөмірі: 12 X 332 Қосымша ақпарат: Көлікті жалпы сипаттап бер`);

    try {
      const response = await fetch(
        `https://oylan.nu.edu.kz/api/v1/assistant/${assistant_id}/interactions/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Api-Key ${process.env.NEXT_PUBLIC_OYLAN_API_KEY}`,
            'Accept': 'application/json'
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`API қатесі: ${errorData}`);
      }
      const data: ApiResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Күтпеген қате орын алды');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Көліктің суретін жүктеңіз
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              id="fileInput"
              type="file" 
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="hidden"
            />
            <label 
              htmlFor="fileInput"
              className="cursor-pointer inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
            >
              {selectedFile ? 'Файлды өзгерту' : 'Файлды таңдау'}
            </label>
            {selectedFile && (
              <span className="ml-2 text-gray-700">{selectedFile.name}</span>
            )}
          </div>
          {previewUrl && (
            <div className="flex justify-center">
              <img 
                src={previewUrl} 
                alt="Көліктің алдын ала қарауы" 
                className="max-w-full h-auto rounded-lg shadow-md" 
              />
            </div>
          )}
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold flex justify-center items-center"
          >
            {isLoading ? <Spinner /> : 'Суретті жүктеу'}
          </button>
        </form>
        {isLoading && (
          <p className="mt-4 text-center text-gray-700 font-semibold">
            Жүктелуде... Күте тұрыңыз.
          </p>
        )}
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Көлік сипаттамасы</h2>
            <p className="text-gray-700">{result.response.content}</p>
          </div>
        )}
        {error && (
          <p className="mt-4 text-center text-red-500 font-bold">{error}</p>
        )}
      </div>
    </div>
  );
}
