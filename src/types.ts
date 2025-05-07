export type Size = {
  label: string;
  value: 'small' | 'medium' | 'large'| 'xl';
};

export type Service = {
  label: string;
  value: 'template' | 'designer' | 'upload';
};

export type CustomizerState = {
  selectedSize: Size;
  selectedService: Service;
  uploadedImage: string | null;
};