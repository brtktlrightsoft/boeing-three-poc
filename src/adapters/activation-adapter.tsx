// import { ActivationDataDto } from '../types/activation-data';

// interface ODataField{
//     Identifier: string;
//     Type: string;
//     TypeName?: string;
//     IsMultiSelect: boolean;
// }

// interface ODataDataType{
//     Identifier: string;
//     Id: string;
//     Localizations: string[];
//     Fields: ODataField[]
// }
// interface ODataResponse<T> {
//   '@odata.context': string;
//   value: T[];
// }

// type ODataSingleResponse<T> = T & {
//     '@odata.context': string;
//     Id: string;
//     Language: string;
//   };

// interface AssetData {
//   Id: string;
//   Description: string;
//   ObjectUrl: string;
// }

// interface DeviceData {
//   Id: string;
//   Language: string;
//   name: string;
//   pin: string;
//   activation: string;
// }

// interface ActivationData {
//   Id: string;
//   Language: string;
//   languages: string[];
//   products: string[];
//   controls: string[];
//   'attraction-video': AssetData;
// }

// export class ActivationAdapter {
//   private baseUrl = 'https://localhost:7297/odata';
//   private dataTypes: ODataDataType[] = [];
//   private devices: DeviceData[] = [];

//   private async fetchOData<T>(endpoint: string): Promise<T> {
//     const response = await fetch(`${this.baseUrl}/${endpoint}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   }

//   public async getDeviceActivation(deviceId: string): Promise<ActivationDataDto> {
//     // First get device data
//     const deviceResponse = await this.fetchOData<ODataSingleResponse<DeviceData>>(`Data/${deviceId}?type=device`);
    
//     if (!deviceResponse.activation) {
//       throw new Error('Device has no activation data');
//     }

//     // Then get activation data
//     const activationResponse = await this.fetchOData<ODataSingleResponse<ActivationData>>(`Data/${deviceResponse.activation}?type=activation&language=en`);

//     // Transform the response into ActivationDataDto
//     const activationDto: ActivationDataDto = {
//       pin: deviceResponse.pin,
//       deviceId: deviceResponse.Id,
//       name: deviceResponse.name,
//       attractionVideoUrl: activationResponse['attraction-video'].ObjectUrl,
//       languages: activationResponse.languages.reduce((acc: Record<string, string>, lang: string) => {
//         acc[lang] = lang; // You might want to map these to proper language names
//         return acc;
//       }, {} as Record<string, string>),
//       products: await this.fetchProducts(activationResponse.products),
//     };

//     return activationDto;
//   }

//   private async fetchProducts(productIds: string[]): Promise<any[]> {
//     const productPromises = productIds.map(id => 
//       this.fetchOData<ODataSingleResponse<any>>(`Data/${id}?type=product&language=en`)
//     );
    
//     return Promise.all(productPromises);
//   }

//   private async fetchDevices(): Promise<void> {
//     const devices = await this.fetchOData<ODataResponse<DeviceData>>('Data?type=device');
//     this.devices = devices.value;
//   }

//   private async fetchDataTypes(): Promise<void> {
//     const dataTypes = await this.fetchOData<ODataResponse<ODataDataType>>('Data?type=data-type');
//     this.dataTypes = dataTypes.value;
//   }

// //   private async fetchActivationData(activationId: string): Promise<ActivationData> {
// //     const language = this.dataTypes.find(dt => dt.Identifier === 'activation')?.Localizations[0];
// //     const activation = await this.fetchOData<ODataSingleResponse<ActivationData>>(`Data(${activationId})?type=activation&language=${language}`);
// //     return activation;
// //   }

//   public async init(): Promise<void> {
//     await Promise.all([
//       this.fetchDevices(),
//       this.fetchDataTypes()
//     ]);
//   }

  
// } 