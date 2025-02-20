import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '@heroui/card';
import { Progress } from '@heroui/progress';
import { ActivationData, ActivationDataDto } from '../../types/activation-data';
import { activationStorage } from '../../config/storage';
import logo from "../../assets/images/boeing_black.png";

interface DownloadProgress {
  asset: string;
  progress: number;
}

export const AssetDownloaderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activationDataDto: ActivationDataDto = location.state || {};
  const [currentAsset, setCurrentAsset] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [totalAssets, setTotalAssets] = useState<number>(0);
  const [downloadedAssets, setDownloadedAssets] = useState<number>(0);

  useEffect(() => {
    if (!activationDataDto.pin) {
      navigate('/', { replace: true });
      return;
    }

    const downloadAssets = async () => {
      try {
        // Calculate total assets to download
        const totalCount = 1 + activationDataDto.products.length; // Video + Models
        setTotalAssets(totalCount);

        // Create activation data object
        const activationData: ActivationData = {
          ...activationDataDto,
          attractionVideo: null as unknown as Blob,
          products: []
        };

        // Download attraction video
        setCurrentAsset('Attraction Video');
        const videoBlob = await downloadFile(activationDataDto.attractionVideoUrl);
        activationData.attractionVideo = videoBlob;
        setDownloadedAssets(prev => prev + 1);

        // Download product models
        for (const product of activationDataDto.products) {
          setCurrentAsset(`Model: ${product.name.en}`);
          const modelBlob = await downloadFile(product.modelUrl);
          activationData.products.push({
            ...product,
            model: modelBlob
          });
          setDownloadedAssets(prev => prev + 1);
        }

        // Save to localforage
        await activationStorage.setItem(activationDataDto.pin, activationData);

        // Navigate to attraction video page instead of language selection
        navigate('/attraction', { replace: true });
      } catch (error) {
        console.error('Error downloading assets:', error);
        navigate('/', { replace: true });
      }
    };

    downloadAssets();
  }, [activationDataDto, navigate]);

  const downloadFile = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    const reader = response.body?.getReader();
    const contentLength = Number(response.headers.get('Content-Length')) || 0;
    let receivedLength = 0;
    const chunks: Uint8Array[] = [];

    if (!reader) throw new Error('Failed to start download');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      receivedLength += value.length;
      setProgress((receivedLength / contentLength) * 100);
    }

    const blob = new Blob(chunks);
    return blob;
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]">
      <Card>
        <CardBody>
          <div className="flex flex-col items-center gap-8">
            <img src={logo} alt="logo" className="w-[25rem] h-auto" />
            <div className="text-2xl font-bold text-center text-black">
              Downloading Assets
            </div>
            <div className="w-full max-w-md">
              <div className="mb-2 flex justify-between text-sm text-gray-600">
                <span>{currentAsset}</span>
                <span>{`${downloadedAssets}/${totalAssets}`}</span>
              </div>
              <Progress
                value={progress}
                className="w-full"
                size="lg"
              />
              <div className="mt-4 text-center text-sm text-gray-500">
                Please wait while we download the necessary assets...
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}; 